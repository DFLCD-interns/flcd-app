import { getFromTableDB, updateTableDB, getRequestDetailsDB, getUserFromSessionDB } from '$lib/server/db'; 
import { mailRequesterOnResponse } from '$lib/server/emails.js';
import { getRequestsInfo } from '../../requests.server.js';

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
            staffEmails: (await getFromTableDB("users", {access_level: 3})).body.result.rows.map(x => x.email)
        }
    } catch (error) {   
        console.error("Load failed:", error.message);
        return { error: error }; 
    }
}

export const actions = {
    approve: async ({cookies, request, params, url}) => {
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

            console.log('uwu')
            const response = await updateTableDB("approvals", searchFormData, updateFormData);
            console.log('uwu2', response)

            // Updating assigned ids
            const curr_status = inputFormData.get('status')
            const curr_remarks = inputFormData.get('remarks')
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

            // EMAILING
            const mailRes = await emailStudentOnNewResponse(params, url, curr_status, curr_remarks);

            return {success: response?.success && response2?.success, mail_success: mailRes.ok || false}; 
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response?.success && response2?.success, mail_success: false}; 
        }
    }
}

// EMAILING
async function emailStudentOnNewResponse(params, url, requestStatus, requestRemarks) {
    const emailDetails = JSON.parse(decodeURIComponent(url.searchParams.get('emailDetails')))
    const approversEmails = [];
    for (const row of (await getFromTableDB("approvals", {'request_id' : params.reqid})).body.result.rows) {
        if (row.approver_id)
            approversEmails.push((await getFromTableDB("users", {'id': row.approver_id})).body.result.rows[0]?.email)
        else approversEmails.push(null);
    }

    // refresh
    emailDetails.request['approversEmails'] = approversEmails;
    const appr_idx = approversEmails.findIndex(x => x == emailDetails.approver.email);
    emailDetails.request['remarks'][appr_idx] = requestRemarks;
    emailDetails.request['statuses'][appr_idx] = requestStatus;

    const reqInfo = (await getRequestsInfo(emailDetails.requester.id, emailDetails.requester.user_access_level)).find(req => req.id == params.reqid && req.table === params.table)
    emailDetails.request.requested = reqInfo?.requestedItems;
    const assignedItemsIDs = reqInfo?.requestRows?.filter(row => row.request_id == params.reqid).map(row => row.equipment_id || row.venue_id || row.assigned_child_id);
    emailDetails.request.assigned = []
    for (const _id of assignedItemsIDs) {
        emailDetails.request.assigned.push((await getFromTableDB(emailDetails.request.type == 'class' ? 'childs' : emailDetails.request.type + 's', {id: _id})).body.result.rows[0]?.name);
    }
    
    return await mailRequesterOnResponse(emailDetails.request, emailDetails.requester, emailDetails.approver); 
}