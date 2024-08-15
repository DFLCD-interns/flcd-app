import { getFromTableDB, updateTableDB, getRequestDetailsDB, getUserFromSessionDB } from '$lib/server/db'; 
import { mailuser } from '$lib/server/emails.js';

/** @type {import('./$types.js').LayoutServerLoad} */
export const load = async ( {cookies, params, parent} ) => {
    try {
        const parentData = await parent();
        const requestDetails = await getRequestDetailsDB(params.table, params.reqid);
        const requestInfo = parentData.requestsInfo.find(req => req.id == params.reqid && req.table === params.table);
        const equipmentRequestRows = requestInfo.equipmentRequestRows?.filter(row => row.request_id == params.reqid)

        const totalStatus = requestInfo.status;
        const displayNames = requestInfo.approvalsInfo.displayNames;
        const statuses = requestInfo.approvalsInfo.statuses;
        const canRespond = (totalStatus !== 'approved' && totalStatus !== 'declined') && (
            parentData.user_access_level_label === displayNames[Math.max(statuses.findLastIndex(status => status === 'approved'), 0)] || 
            parentData.user_access_level_label === displayNames[Math.max(statuses.findIndex(status => status === 'pending'), 0)]);

        return {
            approvalForms: {
                totalStatus: totalStatus,
                statuses: statuses,
                displayNames: displayNames,
                remarks: requestInfo.approvalsInfo.remarks,
                canRespond: canRespond
            },
            requestType: params.table,
            requestID: params.reqid,
            requestDetails: requestDetails,
            requestName: requestInfo.name,
            requestedItems: requestInfo.requestedItems,
            startDate: requestInfo.date,
            endDate: requestInfo.actual_date_end,
            equipmentRequestRows: equipmentRequestRows
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

            // Updating assigned equipment ids
            
            const status = inputFormData.get('status')
            const remarks = inputFormData.get('remarks')
            const approverID = searchFormData.get('approver_id')
            inputFormData.delete('remarks');
            inputFormData.delete('status');
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
                `Hi, your request (ID #${params.reqid}) has a new response - ${status}. '${remarks}' - by [user with ID ${approverID}]. Kindly check the web app for the exact status of your request.`,
                `legara.cedric@gmail.com`) //TODO placeholder, change to student id

            return {success: response?.success && response2?.success}; 
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response?.success && response2?.success}; 
        }
    }
}