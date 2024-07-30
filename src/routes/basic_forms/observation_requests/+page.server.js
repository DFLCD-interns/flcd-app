import { insertIntoTableDB } from '$lib/server/db';

export const actions = {
    createChildRequest: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("child_requests", data);
            return response.ok;
        } catch (error) {   
            console.error("Action failed:", error.message);
            return response.ok;
        }
    },
    createPreferredTimeChild: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("preferred_times_child", data);
            return response.ok;
        } catch (error) {   
            console.error("Action failed:", error.message);
            return response.ok;
        }
    },
    createClassRequest: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("class_requests", data);
            return response.ok;
        } catch (error) {   
            console.error("Action failed:", error.message);
            return response.ok;
        }
    },
    createPreferredTimeClass: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("preferred_times_class", data);
            return response.ok;
        } catch (error) {   
            console.error("Action failed:", error.message);
            return response.ok;
        }
    },
}