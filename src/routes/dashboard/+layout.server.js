import * as db from '$lib/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	return {
		equipment: await db.getEquipmentDB()
	};
}