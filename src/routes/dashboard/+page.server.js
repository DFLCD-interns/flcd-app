import * as db from '../../lib/server/dbjoshua.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		equipment_requests: await db.getEquipmentRequestsDB(),
		venue_requests: await db.getVenueRequestsDB(),
		child_requests: await db.getChildRequestsDB(),
		class_requests: await db.getClassRequestsDB(),
	};
}