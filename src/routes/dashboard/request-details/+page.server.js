import { insertIntoTableDB, getFromTableDB, updateTableDB } from '$lib/db';

export const actions = {
    createApprovalForm: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("approvals", data);
            return response.ok;
        } catch (error) {   
            console.error("Action failed:", error.message);
            return response.ok;
        }
    }, 
    approve: async ({cookies, request}) => {
        try {
            const updateFormData = await request.formData(); // user input
            updateFormData.append('status', 'approved'); 
            
            const searchFormData = new FormData();
            searchFormData.append('request_id', 1); // debug, must come from page (parameters?)
            searchFormData.append('approver_id', 1); // debug, must come from cookies

            const response = await updateTableDB("approvals", searchFormData, updateFormData);
            return response.ok;
        } catch (error) {   
            console.error("Action failed:", error.message);
            return response.ok;
        }
    },
    getApprovalForms: async ({cookies, request}) => {
        try {
            const data = await request.formData(); // user input
            data.append('request_id', 1); // debug, must come from page
            data.append('approver_id', 1);  // debug, must come from cookies

            const response = await getFromTableDB("approvals", searchFormData); 
            const queryResults = (await response.json()).result;

            console.log(queryResults);

            return response.ok;
        } catch (error) {   
            console.error("Action failed:", error.message);
            return response.ok;
        }
    }
}