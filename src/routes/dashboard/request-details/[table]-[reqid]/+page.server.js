import { getApprovalsInfo, getTotalStatus, insertIntoTableDB, getFromTableDB, updateTableDB, getRequestDetailsDB, getUserFromSessionDB } from '$lib/server/db'; 
import { mailuser } from '$lib/server/emails.js';

/** @type {import('./$types.js').LayoutServerLoad} */
export const load = async ( {cookies, params, parent} ) => {
    try {
        const parentData = await parent();
        const requestDetails = await getRequestDetailsDB(params.table, params.reqid);
        const request = parentData.requestsInfo.find(req => req.id == params.reqid && req.table === params.table);
        const equipmentRequestRows = request.equipmentRequestRows?.filter(row => row.request_id == params.reqid)

        const totalStatus = request.status;
        const displayNames = request.approvalsInfo.displayNames;
        const statuses = request.approvalsInfo.statuses;
        const canRespond = (totalStatus !== 'approved' && totalStatus !== 'declined') && (
            parentData.user_access_level_label === displayNames[Math.max(statuses.findLastIndex(status => status === 'approved'), 0)] || 
            parentData.user_access_level_label === displayNames[Math.max(statuses.findIndex(status => status === 'pending'), 0)]);

        return {
            approvalForms: {
                totalStatus: totalStatus,
                statuses: statuses,
                displayNames: displayNames,
                remarks: request.approvalsInfo.remarks,
                canRespond: canRespond
            },
            requestName: request.name,
            requestType: params.table,
            requestID: params.reqid,
            requestDetails: requestDetails,
            requestedItems: request.requestedItems,
            equipmentRequestRows: equipmentRequestRows,
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
            
            const inputFormData = await request.formData(); // the user input
            inputFormData.append('approver_id', user?.user_id);
            inputFormData.append('request_id', params.reqid);

            const updateFormData = new FormData();
            updateFormData.append('status', inputFormData.get('status'));
            if (inputFormData.get('remarks'))
                updateFormData.append('remarks', inputFormData.get('remarks'));

            const searchFormData = new FormData();
            searchFormData.append('request_id', inputFormData.get('request_id')); 
            searchFormData.append('approver_id', inputFormData.get('approver_id')); 

            const response = await updateTableDB("approvals", searchFormData, updateFormData);

            // Updating assigned equipment ids
            
            const status = inputFormData.get('status')
            const remarks = inputFormData.get('remarks')
            const approverID = inputFormData.get('approver_id')
            inputFormData.delete('remarks');
            inputFormData.delete('status');
            inputFormData.delete('request_id');
            inputFormData.delete('approver_id');
            const assignedEquipIDs = [...inputFormData.values()]
            const equipReqsIDs = [...inputFormData.keys()].map(key => key.split('_')[2])
            
            let response2 = {success: true}; 
            for (let i = 0; i < assignedEquipIDs.length; i++) {
                if (!assignedEquipIDs[i]) continue;

                const _updateFormData = new FormData();
                _updateFormData.append('equipment_id', assignedEquipIDs[i] == -1 ? null : assignedEquipIDs[i])
                
                const _searchFormData = new FormData();
                _searchFormData.append('id', equipReqsIDs[i])
                
                response2 = await updateTableDB("equipment_requests", _searchFormData, _updateFormData);
            }
           
            // emailing

            await mailuser(
                `[FLCD APP] New response to your request`,
                `Hi, your request (ID #${params.reqid}) has a new response. '${remarks}' - by [user with ID ${approverID}]. Kindly check the web app for the exact status of your request.`,
                `legara.cedric@gmail.com`) //TODO placeholder, change to student id

            return {success: response?.success && response2?.success}; 
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response?.success && response2?.success}; 
        }
    }
}