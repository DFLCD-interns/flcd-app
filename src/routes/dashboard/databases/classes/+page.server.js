import * as db from '$lib/server/db.js';
import { fail } from "@sveltejs/kit";

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

            let batchNames = await db.getBatchesDB()
            batchNames = batchNames.map((item) => (item.name));
            // console.log(equipmentNames);
            batchNames = batchNames.map(item => item.toLowerCase());

            if (batchNames.includes(data.get('name').toLowerCase())) {
                return fail(500, {
                    message: "This batch name already exists!",
                });
            }
            
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

            let classNames = await db.getClassesDB()
            classNames = classNames.map((item) => (item.name));
            // console.log(equipmentNames);
            classNames = classNames.map(item => item.toLowerCase());

            if (classNames.includes(data.get('name').toLowerCase())) {
                return fail(500, {
                    message: "This class name already exists!",
                });
            }

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