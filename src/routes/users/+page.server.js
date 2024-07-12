import { createUserDB, getUsersDB } from '$lib/db';

export const actions = {
    register: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const args = [...data.values()];
            const newUser = await createUserDB(...args.map((val) => val === '' ? null : val));
            return { user: newUser, status: 201}
          } catch (error) {
            return { status: 503 }
        }
    }
}