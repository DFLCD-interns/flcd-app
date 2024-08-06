import { createUserDB, getUsersDB } from '$lib/server/db';

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

