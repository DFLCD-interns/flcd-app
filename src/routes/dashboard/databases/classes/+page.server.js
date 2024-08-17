import * as db from '$lib/server/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		batches: await db.getAllClassesDB(),
        batches_only_table: await db.getBatchesDB(),
        classes_only_table: await db.getClassesDB(),
        classes_batch_table: await db.getBatchesAndClassesDB()
	};
}

export const actions = {
    createBatch: async ({cookies, request}) => {
        console.log('hi')
        try {
            const data = await request.formData();
            const response = await db.insertIntoTableDB("batches", data);
            return {success: response.success}; 
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success}; 
        }
    },
    createClass: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await db.insertIntoTableDB("classes", data);
            return {success: response.success}; 
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success}; 
        }
    },
    addChild: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await db.insertIntoTableDB("childs", data);
            return {success: response.success}; 
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success}; 
        }
    }
}