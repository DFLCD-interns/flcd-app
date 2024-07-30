import { insertIntoTableDB } from '$lib/server/db';

export const actions = {
    createBaseRequest: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("base_requests", data);
            return response.ok;
        } catch (error) {   
            console.error("Action failed:", error.message);
            return response.ok;
        }
    }
}