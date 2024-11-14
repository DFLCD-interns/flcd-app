// import * as db from '$lib/server/db.js';

// /** @type {import('./$types').PageServerLoad} */
// export async function load() {
// 	return {
// 		user: await db.getUsersListDB(),
// 		userTypes: await db.getUserTypesDB(),
// 	};
// }

import { getUsersListDB, deleteFromTableDB, updateTableDB } from '$lib/server/db';
import { fail } from "@sveltejs/kit";
/** @type {import('./$types').Actions} */

export const actions = {
	deleteUser: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get("id");
        const fd = { id };
        const form_data = new FormData();
        for (let key in fd) {
            form_data.append(key, fd[key]);
        }
        
        try {
            await deleteFromTableDB('users', form_data);
        } catch (error) {   
            console.error("Error: ", error.message);
            return fail(500, {
                message: error.message,
            }); 
        }
    },

    editUser: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get("id");
        const first_name = formData.get("first_name"); const old_first_name = formData.get("old_first_name");
        const last_name = formData.get("last_name"); const old_last_name = formData.get("old_last_name");
        const email = formData.get("email"); const old_email = formData.get("old_email");
        const phone = formData.get("phone"); const old_phone = formData.get("old_phone");
        const student_number = formData.get("student_number"); const old_student_number = formData.get("old_student_number");
		const course = formData.get("course"); const old_course = formData.get("old_course");
		const department = formData.get("department"); const old_department = formData.get("old_department");
		const access_level = formData.get("access_level"); const old_access_level = formData.get("old_access_level");

        if (first_name===old_first_name && last_name===old_last_name && email===old_email && phone===old_phone && student_number==old_student_number && course==old_course && department==old_department && access_level==old_access_level) {
            return fail(500, {
                message: "No changes made.",
            });
        }

		let users = await getUsersListDB();

        let userStudentNumbers = users.map((item) => (item.student_number));
        if (student_number !== old_student_number) {
            if (userStudentNumbers.includes(student_number)) {
                return fail(500, {
                    message: "This student number already exists!",
                });
            }
        }

        let userEmails = users.map((item) => (item.email));
		console.log(old_email)
        if (email !== old_email) {
            if (userEmails.includes(email)) {
                return fail(500, {
                    message: "This email already exists!",
                });
            }
        }

        const id_fd = { id };
        const id_data = new FormData();
        for (let key in id_fd) {
            id_data.append(key, id_fd[key]);
        }

        const fd = {
            first_name,
			last_name,
			email,
			phone,
			student_number,
			course,
			department,
			access_level
        };
        const form_data = new FormData();
        for (let key in fd) {
            form_data.append(key, fd[key]);
        }
        
        try {
            await updateTableDB('users', id_data, form_data);
        } catch (error) {   
            console.error("Error: ", error.message);
            return fail(500, {
                message: error.message,
            }); 
        }
    },
}