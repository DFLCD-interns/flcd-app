import * as db from '../../lib/server/dbjoshua.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const session = cookies.get('session_id');
	const user = await db.getUserFromSessionDB(session);
	const userid = user?.user_id;
	return {
		equipment_requests: await db.getUserEquipmentRequests(userid),
		requests: await db.getUserBaseRequests(userid),
		equipment_requests2: await db.getEquipmentRequests2DB(),
		venue_requests: await db.getVenueRequestsDB(),
		child_requests: await db.getChildRequestsDB(),
		class_requests: await db.getClassRequestsDB(),
	};
}