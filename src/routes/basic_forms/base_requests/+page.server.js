import { insertIntoTableDB } from '$lib/server/db.js';

export const actions = {
    createBaseRequest: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("base_requests", data);
            return {success: response.success};
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success};
        }
    }
}