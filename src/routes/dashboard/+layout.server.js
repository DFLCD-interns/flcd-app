import * as db from '$lib/server/db.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
	const session = cookies.get('session_id');
	if (!session) {
		throw new Error("No Session ID found! not logged in?");
	}
	const searchFormData = new FormData();
	searchFormData.append('access_level', await db.getUserPriv(session));
	const userWorkgroup = await db.getFromTableDB('user_types', searchFormData);

	return {
		equipment: await db.getEquipmentDB(),
		equipmentTypes: await db.getEquipmentTypesDB(),
		current_user: await db.getUserFromSessionDB(session), 
		user_workgroup: userWorkgroup.body.result.rows[0].description
	};
}