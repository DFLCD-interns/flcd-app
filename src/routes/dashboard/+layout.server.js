import * as db from '../../lib/server/db.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	return {
		equipment: await db.getEquipmentDB()
	};
}