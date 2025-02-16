import { emailRequester } from "../emailWrapper.server";
import { getRequestsInfo } from "../requests.server";
import { getRequestDetailsDB, getFromTableDB } from "$lib/server/db";
import { emailTypes } from '$lib/server/emails.js';

// requester -> user_id, access_level
export async function emailRequester_submit(requester, table, requestID) {
    console.log("owowwowo:", requester, table, requestID)

    const requestDetails = await getRequestDetailsDB(table, requestID);
    const requestInfo = (await getRequestsInfo(requester.user_id, requester.access_level)).find(req => req.id == requestID && req.table === table);

    const emailDetails = {
        request: {
            id: requestID,
            name: requestInfo?.name,
            type: table?.split('_')[0], 
            date_start: requestInfo?.date,
            date_end: requestDetails[0]?.promised_end_time || requestInfo?.actual_date_end,
            location: requestDetails[0]?.location,
            remarks: requestInfo?.approvalsInfo?.remarks,
            statuses: requestInfo?.approvalsInfo?.statuses,
            requested: requestInfo?.requestedItems,
            assigned: requestDetails[0]?.child_name || requestDetails.map(x => [x.equipment_name, x.location])
        },
        requester: {
            id: requestDetails[0]?.requester_id,
            name: requestDetails[0]?.requester_firstname + ' ' + requestDetails[0]?.requester_lastname,
            email: requestDetails[0]?.email,
            contactNum: requestDetails[0]?.contactno,
            department: requestDetails[0]?.dept,
            access_level: requestDetails[0]?.requester_access_level
        },
        approver: {
            name: requester.first_name + ' ' + requester.last_name,
            email: requester.email,
            staffEmails: (await getFromTableDB("users", {access_level: 3})).body.result.rows.map(x => x.email)
        }
    }

    console.log("meowmewo:", emailDetails)

    return await emailRequester(table, emailDetails, "pending", "", emailTypes.SUBMISSION);
}