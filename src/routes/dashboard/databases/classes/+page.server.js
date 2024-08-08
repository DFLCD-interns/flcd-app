import * as db from '$lib/server/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		batches: await db.getAllClassesDB(),
        batches_only_table: await db.getBatchesDB(),
        classes_only_table: await db.getClassesDB()
	};
}

export const actions = {
    createBatch: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("batches", data);
            return {success: response.success}; 
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success}; 
        }
    },
    createClass: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("classes", data);
            return {success: response.success}; 
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success}; 
        }
    }
}