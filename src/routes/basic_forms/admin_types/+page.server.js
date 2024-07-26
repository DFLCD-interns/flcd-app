import { insertIntoTableDB } from '$lib/server/db';

export const actions = {
    createAdminType: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("admin_types", data);
            return response.ok;
        } catch (error) {   
            console.error("Action failed:", error.message);
            return response.ok;
        }
    }
}