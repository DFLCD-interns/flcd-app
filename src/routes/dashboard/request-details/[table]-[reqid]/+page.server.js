import { getFromTableDB, updateTableDB, deleteRequest, deleteFromTableDB, getRequestDetailsDB, getUserFromSessionDB } from '$lib/server/db'; 
import { mailRequesterOnResponse } from '$lib/server/emails.js';

/** @type {import('./$types.js').LayoutServerLoad} */
export const load = async ( {cookies, params, parent} ) => {
    try {
        const parentData = await parent();
        const requestDetails = await getRequestDetailsDB(params.table, params.reqid);
        const requestInfo = parentData.requestsInfo.find(req => req.id == params.reqid && req.table === params.table);
        const requestRows = requestInfo?.requestRows?.filter(row => row.request_id == params.reqid)

        const totalStatus = requestInfo?.status;
        const displayNames = requestInfo?.approvalsInfo?.displayNames;
        const statuses = requestInfo?.approvalsInfo?.statuses;
        const canRespond = totalStatus && displayNames && statuses ? (totalStatus !== 'approved' && totalStatus !== 'declined') && (
            parentData.user_access_level_label === displayNames[Math.max(statuses?.findLastIndex(status => status === 'approved') || 0, 0)] || 
            parentData.user_access_level_label === displayNames[Math.max(statuses?.findIndex(status => status === 'pending')  || 0, 0)]) : false;

        return {
            approvalForms: {
                totalStatus: totalStatus,
                statuses: statuses,
                displayNames: displayNames,
                remarks: requestInfo?.approvalsInfo?.remarks,
                canRespond: canRespond
            },
            requestType: params.table?.split('_')[0],
            requestID: params.reqid,
            requestDetails: requestDetails,
            requestName: requestInfo?.name,
            requestedItems: requestInfo?.requestedItems,
            startDate: requestInfo?.date,
            endDate: requestInfo?.actual_date_end,
            requestRows: requestRows,
        }
    } catch (error) {   
        console.error("Load failed:", error.message);
        return { error: error }; 
    }
}

export const actions = {
    approve: async ({cookies, request, params}) => {
        try {
            const session = cookies.get('session_id');
            const user = await getUserFromSessionDB(session);
            
            const inputFormData = await request.formData(); // the user input (remarks, approve/decline)

            const updateFormData = new FormData();
            updateFormData.append('status', inputFormData.get('status'));
            if (inputFormData.get('remarks')) updateFormData.append('remarks', inputFormData.get('remarks'));
            
            const searchFormData = new FormData();
            searchFormData.append('request_id', params.reqid); 
            searchFormData.append('approver_id', user?.user_id);
            
            // check if this form is for admin staff AND no admin staff has yet to respond
            if (user?.access_level === 3 && !(await getFromTableDB('approvals', searchFormData)).body.result.rows[0]) {
                searchFormData.set('approver_id', null); // look for the no-approver approval form
                updateFormData.append('approver_id', user?.user_id); // save this user as the approver
            }

            const response = await updateTableDB("approvals", searchFormData, updateFormData);

            // Updating assigned ids
            // const status = inputFormData.get('status')
            const remarks = inputFormData.get('remarks')
            // const approverID = searchFormData.get('approver_id')
            inputFormData.delete('remarks');
            inputFormData.delete('status');
            const assignedItemIDs = [...inputFormData.values()];
            const itemReqIDs = [...inputFormData.keys()].map(key => key.split('_')[2]);
            const type = [...inputFormData.keys()][0]?.split('_')[0];
            
            // assigning item ids
            let response2 = {success: true}; 
            for (let i = 0; i < assignedItemIDs.length; i++) {
                if (!assignedItemIDs[i]) continue;

                const _searchFormData = new FormData();
                _searchFormData.append('id', itemReqIDs[i])

                const _updateFormData = new FormData();
                if (type == 'class') _updateFormData.append('assigned_child_id', assignedItemIDs[i]);
                else _updateFormData.append(`${type}_id`, assignedItemIDs[i] == -1 ? null : assignedItemIDs[i]);
                response2.success &&= (await updateTableDB(`${type}_requests`, _searchFormData, _updateFormData)).success;
            }
           
            // emailing

            const requesterID = (await getFromTableDB("base_requests", {'id': params.reqid})).body.result.rows[0]?.requester_id;
            const requester = (await getFromTableDB("users", {'id': requesterID})).body.result.rows[0];
            const requesterName = requester.first_name + ' ' + requester.last_name;
            const requesterEmail = requester.email;

            const requestName = type == 'class' ? 'observation' : type;
            const approverName = user.first_name + ' ' + user.last_name;            
            
            const statuses = [];
            const _approversIDs = [];
            (await getFromTableDB("approvals", {'request_id' : params.reqid})).body.result.rows?.forEach(row => {
                statuses.push(row.status)
                _approversIDs.push(row.approver_id)
            })

            const approversEmails = [];
            for (const _id of _approversIDs) {
                approversEmails.push((await getFromTableDB("users", {'id': _id})).body.result.rows[0]?.email)
            }
            
            const _assignedItemsID = (await getFromTableDB(`${type}_requests`, {'request_id': params.reqid})).body.result.rows.map(row => row.equipment_id || row.venue_id || row.assigned_child_id);
            const _table_name = type == 'class' ? 'childs' : type + 's';
            const assignedItems = [];
            for (const _id of _assignedItemsID) {
                if (type == 'class' && assignedItems[0]) break; // only 1 for class request
                const _item = (await getFromTableDB(_table_name, {'id': _id})).body.result.rows[0];
                assignedItems.push(_item?.name)
            }

            // console.log(requesterID)
            // console.log(requester)
            // console.log(requesterName)
            // console.log(requesterEmail)
            // console.log(requestName)
            // console.log(approverName)
            // console.log(statuses)
            // console.log(_approversIDs)
            // console.log(approversEmails)
            // console.log(_assignedItemsID)
            // console.log(_table_name)
            // console.log(assignedItems)

            // requesterName, requestName, approverName, remarks, statuses, approversEmails, assignedItems, requesterEmail
            const mailRes = await mailRequesterOnResponse(requesterName, requestName, approverName, remarks, statuses, approversEmails, assignedItems, requesterEmail);
            // const mailRes = await mailRequesterOnResponse(_requesterDetails, _requestDetails, _approverDetails); // plan to refactor

            return {success: response?.success && response2?.success, mail_success: mailRes.ok || false}; 
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response?.success && response2?.success, mail_success: false}; 
        }
    }
}