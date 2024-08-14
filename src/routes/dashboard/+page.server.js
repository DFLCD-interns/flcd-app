import {getUserFromSessionDB, getUserBaseRequests, deleteRequest} from '$lib/server/db.js'; 

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const session = cookies.get('session_id');
	const user = await getUserFromSessionDB(session);
	const user_id = user?.user_id;

	const requests = await getUserBaseRequests(user_id);	
	return {
		requests: requests
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	deleteRequest: async ({request, cookies}) => {
		try {
			const formData = await request.formData();
			const response = await deleteRequest(formData.get('request_table_name'), formData.get('request_id'));
            return {success: response?.success}; 
		}
		catch (error) {
			console.error("Action failed:", error.message);
			return {success: response?.success}; 
		}
	}
 }