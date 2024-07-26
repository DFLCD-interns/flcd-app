import { SESSION_COOKIE_NAME } from '$lib/server/constants.js';
import { validateSession } from '$lib/server/auth.js';
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
    addBatch: async ({request, cookies}) => {
        const formData = await request.formData();

        const session_id = cookies.get(SESSION_COOKIE_NAME);

        const session_validation_result = await validateSession(session_id);

        console.log(`/test-batches/+page.server.js - addBatch - session retrieved: ${session_validation_result}`);


        if (session_validation_result.userId) {
            console.log(`session retrieved for user ${session_validation_result.userId}`);
        } 
        
        const batch_name = formData.get("name");
        const batch_description = formData.get("description");

    },
}