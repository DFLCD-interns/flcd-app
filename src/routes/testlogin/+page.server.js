import { SESSION_COOKIE_NAME } from '$lib/constants.js';

export const actions = {
    default: async ({request, cookies}) => {
        const formData = await request.formData();

        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const registerResult = createUser(email, password);

            cookies.set(SESSION_COOKIE_NAME, registerResult.id)
        } catch(error) {

        }
    }
}