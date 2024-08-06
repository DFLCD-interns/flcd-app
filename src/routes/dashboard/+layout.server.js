import * as db from '$lib/server/db.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
	const session = cookies.get('session_id');
	if (!session) throw new Error("No Session ID found! not logged in?");
	const user = await db.getUserFromSessionDB(session);
	
	const searchFormData = new FormData();
	searchFormData.append('access_level', await db.getUserPriv(session));
	const user_access_level_label = await db.getFromTableDB('user_types', searchFormData);

	let requestsInfo;
	if (user.access_level < 5) {
		const eqReqs = await db.getEquipmentRequestsDB();
		const venueReqs = await db.getVenueRequestsDB();
		const childReqs = await db.getChildRequestsDB();
		const classReqs = await db.getClassRequestsDB();
		requestsInfo = await db.getAdminCards(user.user_id, eqReqs, venueReqs, childReqs, classReqs);
	}	
	else {
		// for non admin
	}

	return {
		requestsInfo: requestsInfo,
		equipment: await db.getEquipmentDB(),
		equipmentTypes: await db.getEquipmentTypesDB(),
		venue: await db.getVenueDB(),
		current_user: user, 
		user_access_level: user_access_level_label.body.result.rows[0]?.description
	};
}