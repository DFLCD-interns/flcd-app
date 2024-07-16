import { insertIntoTableDB } from '$lib/db';
import { redirect } from '@sveltejs/kit';

export const actions = {
    register: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const newUser = await insertIntoTableDB("users", data);
        } catch (error) {   
            return { status: 503 }
        }
        throw redirect(303, '/dashboard'); // idk how to make this work
    }
}