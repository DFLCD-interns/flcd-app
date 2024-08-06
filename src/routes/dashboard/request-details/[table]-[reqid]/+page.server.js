import { insertIntoTableDB, getFromTableDB, updateTableDB, getRequestDetailsDB, getUserFromSessionDB } from '$lib/server/db'; 

/** @type {import('./$types.js').LayoutServerLoad} */
export const load = async ( {cookies, params} ) => {
    try {
        const formData = new FormData(); // user input
        formData.append('request_id', params.reqid);
        const approvalsInfo = await getApprovalsInfo(formData);
        const requestDetails = await getRequestDetailsDB(params.table, params.reqid);

        const approvalStatuses = approvalsInfo.statuses;
        const approverNames = approvalsInfo.displayNames;
        const totalStatus = getTotalStatus(approverNames, approvalStatuses);
        
        return {
            approvalForms: {
                totalStatus: totalStatus,
                statuses: approvalStatuses, 
                displayNames: approverNames,
            },
            requestType: params.table,
            requestDetails: requestDetails
        }; 
    } catch (error) {   
        console.error("Action failed:", error.message);
        return { error: error }; 
    }
}

export const actions = {
    createApprovalForm: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("approvals", data);
            return {success: response.success}; 
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success}; 
        }
    }, 
    approve: async ({cookies, request, params}) => {
        try {
            const session = cookies.get('session_id');
            const user = await getUserFromSessionDB(session);
            
            const inputFormData = await request.formData(); // the user input
            inputFormData.append('approver_id', user?.user_id);
            inputFormData.append('request_id', params.reqid);

            const updateFormData = new FormData();
            updateFormData.append('status', inputFormData.get('status'));
            updateFormData.append('remarks', inputFormData.get('remarks'));

            const searchFormData = new FormData();
            searchFormData.append('request_id', inputFormData.get('request_id')); 
            searchFormData.append('approver_id', inputFormData.get('approver_id')); 

            const response = await updateTableDB("approvals", searchFormData, updateFormData);
            return {success: response.success}; 
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success}; 
        }
    }
}