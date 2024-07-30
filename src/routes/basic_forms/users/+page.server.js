import { insertIntoTableDB } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export const actions = {
    register: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("users", data);
            return response.ok;
        } catch (error) {   
            console.error("Action failed:", error.message);
            return response.ok;
        }
    }
}