import { createUserDB, getUsersDB } from '$lib/db';
import { redirect } from '@sveltejs/kit';

export const actions = {
    register: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const args = [...data.values()];
            const response = await createUserDB(...args.map((val) => val === '' ? null : val));
            return response.ok;
        } catch (error) {
            console.error("Action failed:", error.message);
            return response.ok;
        }
    }
}