import * as db from '$lib/server/db.js';
import * as db2 from '$lib/server/dbjoshua.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
	const session = cookies.get('session_id');
	return {
		equipment: await db2.getEquipmentDB(),
		equipmentTypes: await db.getEquipmentTypesDB(),
		current_user: await db2.getUserFromSessionDB(session)
	};
}