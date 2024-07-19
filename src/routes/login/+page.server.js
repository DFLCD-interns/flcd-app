import { SESSION_COOKIE_NAME } from '$lib/server/constants.js';
import { createSessionByEmail } from '$lib/server/auth.js';
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
	// default: async ({request, cookies}) => {
	// 	console.log("Invoked default action.")
	// },
	login: async ({request, cookies}) => {
		// TODO log the user in
		const formData = await request.formData();

		const email = formData.get("email");
		const password = formData.get("password");

		try {
			const sessionCreationResult = await createSessionByEmail(email, password);

			cookies.set(SESSION_COOKIE_NAME, sessionCreationResult.id, {
				path: "/",
				httpOnly: false,
			});
		} catch (error) {
			if (error instanceof Error) {
				return fail(500, {
					email,
					password,
					message: error.message,
				});
			} else {
				return fail(500, {
					email,
					password,
					message: "Unknown error occured in server",
				  });
			}
		}

		throw redirect(303, "/");
	},
	
	register: async (event) => {
		// TODO register the user
	}
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