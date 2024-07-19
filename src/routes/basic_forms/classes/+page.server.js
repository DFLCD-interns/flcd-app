import { insertIntoTableDB } from '$lib/db';
import { redirect } from '@sveltejs/kit';

export const actions = {
    createBatch: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("batches", data);
            return response.ok;
        } catch (error) {   
            console.error("Action failed:", error.message);
            return response.ok;
        }
    },
    createClass: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("classes", data);
            return response.ok;
        } catch (error) {   
            console.error("Action failed:", error.message);
            return response.ok;
        }
    }
}