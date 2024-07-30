import { insertIntoTableDB } from '$lib/server/db';

export const actions = {
    createVenue: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("venues", data);
            return {success: response.success};
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success};
        }
    }
}