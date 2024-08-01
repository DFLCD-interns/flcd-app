// import * as db from '../../lib/server/dbjoshua.js';

// /** @type {import('./$types').LayoutServerLoad} */
// export async function load() {
// 	return {
// 		equipment: await db.getEquipmentDB()
// 	};
// }

import * as db from '$lib/server/db.js';
/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	return {
		equipment: await db.getEquipmentDB(),
		equipmentTypes: await db.getEquipmentTypesDB(),
	};
}
