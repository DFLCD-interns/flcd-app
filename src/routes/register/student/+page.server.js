import { SESSION_COOKIE_NAME } from '$lib/server/constants.js';
import { createUser, createSessionByEmail } from '$lib/server/auth.js';
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
    register: async ({ request, cookies }) => {
        const formData = await request.formData();

        const email = formData.get("email");
        const password = formData.get("password");
        const confirm_password = formData.get("confirm_password");
        const first_name = formData.get("first_name");
        const last_name = formData.get("last_name");
        const phone = formData.get("phone");
        const student_number = formData.get("student_number").split('-').join('');
        const course = formData.get("course");
        let department = formData.get("department");

        if (!email.endsWith('@up.edu.ph')) {
            return fail(500, {
                email,
                password,
                message: "Please use your UP mail.",
            });
        }

        if (!password || password !== confirm_password) {
            return fail(500, {
                email,
                password,
                message: "Passwords don't match!",
            });
        }

        let access_level;
        if (department == "DFLCD") {
            access_level = 5;
        } else {
            access_level = 6;
        }

        try {
            const createUserResult = await createUser(first_name, last_name, email, password, phone, student_number, course, department, access_level);

			// Automatically log the user in
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
		// Redirect to dashboard after successful registration
		throw redirect(303, "/dashboard?registered=true");
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