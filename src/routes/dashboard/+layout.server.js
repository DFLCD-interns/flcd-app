import * as db from '../../lib/server/dbjoshua.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
	const session = cookies.get('session_id');
	return {
		equipment: await db.getEquipmentDB(),
		current_user: await db.getUserFromSessionDB(session)
	};
}

import * as db from '$lib/server/db.js';
/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	return {
		equipment: await db.getEquipmentDB(),
		equipmentTypes: await db.getEquipmentTypesDB(),
	};
}
