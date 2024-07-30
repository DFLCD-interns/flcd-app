import { SESSION_COOKIE_NAME } from '$lib/server/constants.js';
import { createSessionByEmail } from '$lib/server/auth.js';
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
logout: async ({request, cookies}) => {
    cookies.delete(SESSION_COOKIE_NAME, {path: "/"});
    throw redirect(303, "/");
},
}