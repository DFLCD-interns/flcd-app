import { SESSION_COOKIE_NAME } from '$lib/server/constants.js';
import { createSessionByEmail } from '$lib/server/auth.js';
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
	signin: async ({request, cookies}) => {

		const formData = await request.formData();
		const password = formData.get("password");
		let email = formData.get("email");
		// if (!email.endsWith('@up.edu.ph')) {
		// 	email = `${email}@up.edu.ph`;
		// }

		try {
			const sessionCreationResult = await createSessionByEmail(email, password);

			cookies.set(SESSION_COOKIE_NAME, sessionCreationResult.id, {
				path: "/",
				httpOnly: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 12,
			});

		} catch (error) {
			console.error("Error: ", error.message);
			return fail(500, {
                email,
                password,
                message: error.message,
            });
		}
		throw redirect(303, "/dashboard");
	},
};

// import { SESSION_COOKIE_NAME } from '$lib/constants.js';

// export const actions = {
//     default: async ({request, cookies}) => {
//         const formData = await request.formData();

//         const email = formData.get("email");
//         const password = formData.get("password");

//         try {
//             const registerResult = createUser(email, password);

//             cookies.set(SESSION_COOKIE_NAME, registerResult.id)
//         } catch(error) {

//         }
//     }
// }