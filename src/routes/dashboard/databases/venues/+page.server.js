import * as db from '$lib/server/db.js';

export const actions = {
    addVenue: async ({request}) => {
        try {
            const data = await request.formData();
            const response = await db.insertIntoTableDB("venues", data);
            return {success: response.success}; 
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success}; 
        }
    }
}