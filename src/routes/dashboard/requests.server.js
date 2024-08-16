import { getEquipmentRequestsDB, getVenueRequestsDB, getClassRequestsDB, getFromTableDB } from "$lib/server/db";
import { postgresTimeToReadable } from '$lib';
import { format } from 'date-fns';

// For dashboard, only supposed to get brief details
export async function getRequestsInfo(user_id, user_access_level) {
	
    // Get all requests
    const equipment_requests = await getEquipmentRequestsDB();
    const venue_requests = await getVenueRequestsDB();
    const class_requests = await getClassRequestsDB();
  
    // Storage for return
    const allRequests = [];
  
    // Get equipment request dictionary (key: base req id, value: equipment request rows)
    const equipReqsGroupedDict = {};
    equipment_requests.forEach(row => {
        if (Object.keys(equipReqsGroupedDict).includes(row.request_id.toString())) 
            equipReqsGroupedDict[row.request_id].push(row); // add to existing key-value pair
        else equipReqsGroupedDict[row.request_id] = [row]; // new key-value pair
    });
  
    // Summarize equipment requests information
    Object.values(equipReqsGroupedDict).forEach(function (groupedItem) {
        const desiredEquipments = groupedItem.reduce((equipTypeDict, item) => {
            if (Object.keys(equipTypeDict).includes(item?.equipment_type)) 
                equipTypeDict[item?.equipment_type]++; // increment total
            else equipTypeDict[item?.equipment_type] = 1; // else add to dict
            return equipTypeDict;
        }, {}) // key-value pair of each equip as key and the count as value
        const requestName = Object.entries(desiredEquipments).map(entry => entry.join(' (') + ')').join(', ');
        
        allRequests.push ({
            type: 'Equipment Request',
            table:'equipment_requests',
            id: groupedItem[0]?.request_id,
            requester_id: groupedItem[0]?.requester_id,
            name: requestName,
            created: groupedItem[0]?.created,
            date: groupedItem[0]?.promised_start_time,
            actual_date_end: groupedItem[0]?.actual_end_time,
            status: null,
            approvalsInfo: null,
            requestedItems: desiredEquipments, // these are equipment types
            requestRows: groupedItem,
        })
    });
    
    // Get venue request dictionary (key: base req id, value: venue request rows)
    const venueReqsGroupedDict = {};
    venue_requests.forEach(row => {
        if (Object.keys(venueReqsGroupedDict).includes(row.request_id.toString())) 
            venueReqsGroupedDict[row.request_id].push(row); // add to existing key-value pair
        else venueReqsGroupedDict[row.request_id] = [row]; // new key-value pair
    });
  
    // Summarize venue requests information
    Object.values(venueReqsGroupedDict).forEach(function (groupedItem) {
        const noAssignedCount = groupedItem.reduce((_noAssignedCount, item) => item.name ? _noAssignedCount : (++_noAssignedCount), 0);
        const requestName = groupedItem.map(item => item.name).join(', ') + (noAssignedCount != 0 ? `(${noAssignedCount} unavailable venues)` : '');
        
        const start_date = new Date(format(groupedItem[0].date_needed, 'yyyy-MM-dd') + 'T' + groupedItem[0].start_time)
        const end_date = new Date(format(groupedItem[0].date_needed, 'yyyy-MM-dd') + 'T' + groupedItem[0].end_time)
        const desiredVenues = groupedItem.reduce((venueDict, item) => {
            if (!Object.keys(venueDict).includes(item?.venue_id)) 
            venueDict[item?.venue_id] = item?.name; 
            return venueDict;
        }, {}) // key-value pair of each venue name as key and the id as value
        allRequests.push({
            type: 'Venue Request',
            table:'venue_requests',
            id: groupedItem[0].request_id,
            requester_id: groupedItem[0]?.requester_id,
            name: requestName,
            created: groupedItem[0].created,
            date: start_date,
            actual_date_end: end_date,
            status: null,
            approvalsInfo: null,
            requestedItems: desiredVenues, // these are the venues
            requestRows: groupedItem,
        })
    });
        
    // console.log(class_requests);
      
    // Get class request dictionary (key: base req id, value: class request rows)
    const classReqsGroupedDict = {};
    class_requests.forEach(row => {
        if (Object.keys(classReqsGroupedDict).includes(row.request_id.toString())) 
            classReqsGroupedDict[row.request_id].push(row); // add to existing key-value pair
        else classReqsGroupedDict[row.request_id] = [row]; // new key-value pair
    });

    const maxDisplayDates = 2;
    Object.values(classReqsGroupedDict).forEach(function (groupedItem) {
        const desiredDates = [];
        const displayStartDates = groupedItem.map((item, i) => {
            if (i == maxDisplayDates) return '...';
            const desiredDate = new Date(format(item.observe_date, 'yyyy-MM-dd'));
            const period = item.timeslot.split('-');
            const desiredStartDate = new Date(desiredDate.setHours(period[0]));
            const desiredEndDate = new Date(desiredDate.setHours(period[1]));
            desiredDates.push([desiredStartDate, desiredEndDate]);
            if (i < maxDisplayDates) return postgresTimeToReadable(desiredStartDate)
        }).join(' / ')

        allRequests.push({
            type: 'Class Observation Request',
            table:'class_requests',
            id: groupedItem[0].request_id, // base request id
            requester_id: groupedItem[0]?.requester_id, 
            name: groupedItem[0].name,
            created: groupedItem[0].created,
            date: displayStartDates, // show all possible starts FOR DISPLAY
            actual_date_end: desiredDates[desiredDates.length-1][1], // show only max end FOR SORTING TO HISTORY
            status: null,
            approvalsInfo: null,
            requestedItems: desiredDates, // 2d array (containing 1d array with 2 elements, start date and end date)
            requestRows: groupedItem,
        })
    })
  
    const requestsInfo = [];
    for (const req of allRequests) {
        const formData = new FormData(); 
        formData.append('request_id', req.id);
        const approvalFormsQuery = await getFromTableDB('approvals', formData);
        const forms = approvalFormsQuery.body.result.rows;
        
        const approvalsInfo = await getApprovalsInfo(formData);

        let valid;
        if (user_access_level < 5) // if admin
        valid = forms.some((form, i) =>	{
            // valid if this user is the approver AND the previous approver has approved
            const validIfApprover = form.approver_id === user_id && (i == 0 ? true : forms[i-1].status === 'approved');
            // also valid if the approver is null AND the access level of this user is ADMIN STAFF (level 3) 
            const validIfAdminStaff = (!form.approver_id) && user_access_level === 3;
            return validIfApprover || validIfAdminStaff; 
        });
        else valid = req.requester_id === user_id;

        if (valid) {
            req.status = getTotalStatus(approvalsInfo.displayNames, approvalsInfo.statuses);
            req.approvalsInfo = approvalsInfo;
            requestsInfo.push(req);
        }
    }

    return requestsInfo;
  }
  
// Formdata should contain approver_id to search
async function getApprovalsInfo(searchFormData) { 
    const formsQuery = await getFromTableDB("approvals", searchFormData); 
  
    const statuses = [], remarks = [], userIDs = [];
    formsQuery.body.result.rows.map(async row => {
      statuses.push(row?.status);
      remarks.push(row?.remarks);
      userIDs.push(row?.approver_id);
    })
  
    const displayNames = [];
    searchFormData.delete('request_id');
    const searchFormData2 = new FormData();
    for (const row of formsQuery?.body.result.rows) {
        let access_level = undefined;
        if (row.approver_id) {
            searchFormData.set('id', row.approver_id);
            const approverQuery = await getFromTableDB("users", searchFormData);
            if (!approverQuery?.body) throw new Error(`no appover matching the id ${searchFormData.get('id')}`);  
            access_level = approverQuery?.body.result.rows[0]?.access_level;
        }
        else access_level = 3; // if null, this must be for all the possbile Admin Staffs, which is user level 3
    
        searchFormData2.set('access_level', access_level);
        const access_levelQuery = await getFromTableDB("user_types", searchFormData2);
        const displayName = access_levelQuery.body.result.rows[0]?.description;
    
        displayNames.push(displayName);
    }
    
    return { 
      statuses: statuses, 
      remarks: remarks,
      displayNames: displayNames,
      userIDs: userIDs
    };
  }
  
// For requests
function getTotalStatus(names, statuses) {
    if (statuses.includes("declined"))
        return "declined";
    else if (statuses.includes("pending"))
        return "pending with " + names[statuses.findIndex((status) => status === 'pending')];
    else if (statuses.every((elem) => elem === "approved"))
        return "approved";
    else {
        console.error("Total status of form cannot be determined.")
        return "cannot be determined";
    } 
}