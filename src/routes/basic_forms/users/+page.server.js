import { insertIntoTableDB } from '$lib/server/db';

export const actions = {
    register: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("users", data);
            return {success: response.success}; 
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success}; 
        }
    }
}