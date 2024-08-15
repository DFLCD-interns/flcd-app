import * as db from '$lib/server/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		user: await db.getUsersListDB(),
		userTypes: await db.getUserTypesDB(),
	};
}