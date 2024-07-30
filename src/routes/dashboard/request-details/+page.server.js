import { insertIntoTableDB, getFromTableDB, updateTableDB } from '$lib/db';

export const load = async () => {
    try {
        const searchFormData = new FormData(); // user input
        searchFormData.append('request_id', 1); // debug, must come from page (params?)

        const response = await getFromTableDB("approvals", searchFormData); 
        return { success: response.success, body: { result: response.body.result.rows }}; 
    } catch (error) {   
        console.error("Action failed:", error.message);
        return { success: response.success, body: { result: error}}; 
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
    approve: async ({cookies, request}) => {
        try {
            const inputFormData = await request.formData(); // user input
            inputFormData.append('request_id', 1); // debug, must come from page (parameters?)
            inputFormData.append('approver_id', 1); // debug, must come from cookies

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