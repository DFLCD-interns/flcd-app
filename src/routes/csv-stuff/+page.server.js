import * as db from '$lib/server/db.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	return {
		equipmentTable: await db.getEquipmentDB()
	};
}