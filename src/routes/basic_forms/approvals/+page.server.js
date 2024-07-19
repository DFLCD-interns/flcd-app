import { insertIntoTableDB } from '$lib/db';

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
    }
}