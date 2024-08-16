import * as db from '$lib/server/db.js';
import { getRequestsInfo } from './requests.server.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
	const session = cookies.get('session_id');
	if (!session) throw new Error("No Session ID found! not logged in?");
	const user = await db.getUserFromSessionDB(session);
	
	const searchFormData = new FormData();
	searchFormData.append('access_level', await db.getUserPriv(session));
	const user_access_level_label = await db.getFromTableDB('user_types', searchFormData);
		
	const childQuery = await db.getFromTableDB('childs', new FormData());

	return {
		requestsInfo: await getRequestsInfo(user?.user_id, user?.access_level),
		equipments: await db.getEquipmentDB(),
		equipmentTypes: await db.getEquipmentTypesDB(),
		equipmentsStatuses: await db.getEquipmentsStatusesDB(),
		venues: await db.getVenueDB(),
		venuesStatuses: await db.getVenuesStatusesDB(),
		childs: childQuery?.body.result.rows,
		current_user: user, 
		user_access_level_label: user_access_level_label?.body.result.rows[0]?.description
	};
}