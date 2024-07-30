import { insertIntoTableDB } from '$lib/server/db';

export const actions = {
    createVenue: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("venues", data);
            return response.ok;
        } catch (error) {   
            console.error("Action failed:", error.message);
            return response.ok;
        }
    }
}