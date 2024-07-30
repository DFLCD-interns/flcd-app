import { insertIntoTableDB } from '$lib/server/db';

export const actions = {
    createEquipmentRequest: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("equipment_requests", data);
            return {success: response.success};
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success};
        }
    },
    createVenueRequest: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("venue_requests", data);
            return {success: response.success};
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success};
        }
    }
}