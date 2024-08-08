import { getFromTableDB, getApprovalsInfo, getTotalStatus, getUserFromSessionDB, getUserBaseRequests, getUserEquipmentRequests, getEquipmentRequestsDB, getVenueRequestsDB, getClassRequestsDB, getChildRequestsDB } from '$lib/server/db.js'; 

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const session = cookies.get('session_id');
	const user = await getUserFromSessionDB(session);
	const user_id = user?.user_id;

	const requests = await getUserBaseRequests(user_id);	
	return {
		requests: requests,
	};
}