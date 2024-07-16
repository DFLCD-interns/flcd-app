import { insertIntoTableDB } from '$lib/db';
import { redirect } from '@sveltejs/kit';

export const actions = {
    createBatch: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const newBatch = await insertIntoTableDB("batches", data);
        } catch (error) {   
            return { status: 503 }
        }
    },
    createClass: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            // handler id is from cookies
            // batch id is dropdown or the latest one (?)
            const newBatch = await insertIntoTableDB("classes", data);
        } catch (error) {   
            return { status: 503 }
        }
    }
}