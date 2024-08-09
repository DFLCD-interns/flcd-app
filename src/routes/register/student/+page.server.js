import { SESSION_COOKIE_NAME } from '$lib/server/constants.js';
import { createUser } from '$lib/server/auth.js';
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
	register: async ({request, cookies}) => {
		// TODO log the user in
		const formData = await request.formData();

		const email = formData.get("email");
		const password = formData.get("password");
		const first_name = formData.get("first_name");
		const last_name = formData.get("last_name");
		const phone = formData.get("phone");
		const student_number = formData.get("student_number");
		const course = formData.get("course");
		const department = formData.get("department");

        // console.log("signin+page.server.js -- GOT FORM DATA")

		try {
            // console.log("signup+page.server.js - before sessionresult");
			// console.log('creating user...')
			const createUserResult = await createUser(first_name, last_name, email, password, phone, student_number, course, department, 5);
			
            // console.log("register+page.server.js", createUserResult);
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