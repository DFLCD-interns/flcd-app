import { getFromTableDB, getApprovalsInfo, getTotalStatus } from '$lib/server/db.js'; 

async function getAdminCards(user_id, equipment_requests, venue_requests, child_requests, class_requests) {
	
	const equipReqsGroupedDict = {};
	equipment_requests.forEach(row => {
		if (Object.keys(equipReqsGroupedDict).includes(row.request_id.toString())) 
			equipReqsGroupedDict[row.request_id].push(row); // add to existing key-value pair
		else equipReqsGroupedDict[row.request_id] = [row]; // new key-value pair
	});

	const requestsDisplay = [];
	Object.values(equipReqsGroupedDict).forEach(function (groupedItem) {
		requestsDisplay.push({
			type: 'Equipment Request',
			table:'equipment_requests',
			id: groupedItem[0].request_id,
			name: groupedItem.map(item => item.name).join(', '),
			date: groupedItem[0].borrow_time,
			admin_approve_layer: groupedItem[0].admin_approve_layer,
			status: null
		})
	});
	
	venue_requests.forEach(function (item) {
		requestsDisplay.push({
			type: 'Venue Request',
			table:'venue_requests',
			id: item.request_id,
			name: item.name,
			date: item.date_needed_start,
			admin_approve_layer: item.admin_approve_layer,
			status: null
		})
	});
	
	child_requests.forEach(function (item) {
		requestsDisplay.push({
			type: 'Child Observation Request',
			table:'child_requests',
			id: item.request_id,
			name: item.name,
			date: item.observation_time,
			admin_approve_layer: item.admin_approve_layer,
			status: null
		})
	});
	 
	class_requests.forEach(function (item) {
		requestsDisplay.push({
			type: 'Class Observation Request',
			table:'class_requests',
			id: item.request_id,
			name: item.name,
			date: item.schedule,
			admin_approve_layer: item.admin_approve_layer,
			status: null
		})
	});
	
	const _requestsDisplay = [];
	for (const req of requestsDisplay) {
		const formData = new FormData(); 
		formData.append('request_id', req.id);
		const approvalFormsQuery = await getFromTableDB('approvals', formData);
		const forms = approvalFormsQuery.body.result.rows;
		
		const approvalsInfo = await getApprovalsInfo(formData);
		
		const _form = forms.find((form, i) =>	form.approver_id === user_id && 
												form.status !== 'Declined' && 
												(i == 0 ? true : forms[i-1].status === 'Approved'));
		if (_form) { 
			req.status = getTotalStatus(approvalsInfo.displayNames, approvalsInfo.statuses);
			_requestsDisplay.push(req);
		}
	}
	
	return _requestsDisplay;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const session = cookies.get('session_id');
	const user = await getUserFromSessionDB(session);
	const user_id = user?.user_id;

	const requests = await getUserBaseRequests(user_id);
	const equipment_requests = await getUserEquipmentRequests(user_id);
	const equipment_requests2 = await getEquipmentRequestsDB();
	const venue_requests = await getVenueRequestsDB();
	const child_requests = await getChildRequestsDB();
	const class_requests = await getClassRequestsDB();
	
	let requestsDisplay;
	
	if (user.workgroup < 5) {
		requestsDisplay = await getAdminCards(user_id, equipment_requests2, venue_requests, child_requests, class_requests);
	}	
	
	return {
		requestsDisplay: requestsDisplay,
		equipment_requests:equipment_requests,
		requests: requests,
		equipment_requests: equipment_requests,
		venue_requests: venue_requests,
		child_requests: child_requests,
		class_requests: class_requests,
	};
}