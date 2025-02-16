import { getFromTableDB } from "$lib/server/db";
import { getRequestsInfo } from "./requests.server";
import { mailRequester } from '$lib/server/emails.js';

// EMAILING
export async function emailRequester(table, emailDetails, currRequestStatus, currRequestRemark, emailType) {
    const approversEmails = [];
    for (const row of (await getFromTableDB("approvals", {'request_id' : emailDetails.request.id})).body.result.rows) {
        if (row.approver_id)
            approversEmails.push((await getFromTableDB("users", {'id': row.approver_id})).body.result.rows[0]?.email)
        else approversEmails.push(null);
    }

    // refresh
    emailDetails.request['approversEmails'] = approversEmails;
    const appr_idx = approversEmails.findIndex(x => x == emailDetails.approver.email);
    if (currRequestRemark) emailDetails.request['remarks'][appr_idx] = currRequestRemark; // only refresh if new remarks is not just empty
    emailDetails.request['statuses'][appr_idx] = currRequestStatus;

    const reqInfo = (await getRequestsInfo(emailDetails.requester.id, emailDetails.requester.user_access_level)).find(req => req.id == emailDetails.request.id && req.table === table)
    emailDetails.request.requested = reqInfo?.requestedItems;
    const assignedItemsIDs = reqInfo?.requestRows?.filter(row => row.request_id == emailDetails.request.id).map(row => row.equipment_id || row.venue_id || row.assigned_child_id);
    emailDetails.request.assigned = []
    for (const _id of assignedItemsIDs) {
        emailDetails.request.assigned.push((await getFromTableDB(emailDetails.request.type == 'class' ? 'childs' : emailDetails.request.type + 's', {id: _id})).body.result.rows[0]?.name);
    }
    
    return await mailRequester(emailDetails.request, emailDetails.requester, emailDetails.approver, emailType); 
}