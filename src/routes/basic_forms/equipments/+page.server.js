import { insertIntoTableDB } from '$lib/db';

export const actions = {
    createEquipment: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("equipments", data);
            return response.ok;
        } catch (error) {   
            console.error("Action failed:", error.message);
            return response.ok;
        }
    }
}