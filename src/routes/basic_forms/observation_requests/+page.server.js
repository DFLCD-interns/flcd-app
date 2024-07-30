import { insertIntoTableDB } from '$lib/server/db';

export const actions = {
    createChildRequest: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("child_requests", data);
            return {success: response.success};
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success};
        }
    },
    createPreferredTimeChild: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("preferred_times_child", data);
            return {success: response.success};
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success};
        }
    },
    createClassRequest: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("class_requests", data);
            return {success: response.success};
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success};
        }
    },
    createPreferredTimeClass: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("preferred_times_class", data);
            return {success: response.success};
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success};
        }
    },
}