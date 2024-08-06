import { getFromTableDB, getApprovalsInfo, getTotalStatus, getUserFromSessionDB, getUserBaseRequests, getUserEquipmentRequests, getEquipmentRequestsDB, getVenueRequestsDB, getClassRequestsDB, getChildRequestsDB } from '$lib/server/db.js'; 

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const session = cookies.get('session_id');
	const user = await getUserFromSessionDB(session);
	const user_id = user?.user_id;

	const requests = await getUserBaseRequests(user_id);
	const equipment_requests = await getUserEquipmentRequests(user_id);
	const equipment_requests_admin = await getEquipmentRequestsDB();
	const venue_requests = await getVenueRequestsDB();
	const child_requests = await getChildRequestsDB();
	const class_requests = await getClassRequestsDB();
	
	
	return {
		equipment_requests:equipment_requests,
		equipment_requests2: equipment_requests_admin,
		requests: requests,
		venue_requests: venue_requests,
		child_requests: child_requests,
		class_requests: class_requests,
	};
}