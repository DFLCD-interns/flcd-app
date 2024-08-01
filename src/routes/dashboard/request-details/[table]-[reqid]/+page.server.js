import { insertIntoTableDB, getFromTableDB, updateTableDB } from '../../../../lib/server/db';
import * as db from '../../../../lib/server/dbjoshua.js';
import { getUserFromSessionDB } from '$lib/server/dbjoshua';

// /** @type {import('./$types.js').LayoutServerLoad} */
// export async function load({params}) {
// 	return {
// 		type: params.table,
// 		reqdetails: await db.getRequestDetailsDB(params.table, params.reqid),
// 	};
// }

async function getApprovalsInfo(searchFormData) { 
    const formsQuery = await getFromTableDB("approvals", searchFormData); 

    const statuses = [];
    formsQuery.body.result.rows.map(async row => {
        statuses.push(row?.status);
    })

    const displayNames = [];
    searchFormData.delete('request_id');
    searchFormData.append('id', 0);
    const searchFormData2 = new FormData();
    searchFormData2.append('access_level', 5);
    for (const row of formsQuery.body.result.rows) {
        searchFormData.set('id', row.approver_id);
        const approverQuery = await getFromTableDB("users", searchFormData);
        const workgroup = approverQuery.body.result.rows[0].workgroup;

        searchFormData2.set('access_level', workgroup-1);
        const workgroupQuery = await getFromTableDB("admin_types", searchFormData2);
        const displayName = workgroupQuery.body.result.rows[0].description;

        displayNames.push(displayName);
    }
    
    return { success: true, body: {
        statuses: statuses, 
        displayNames: displayNames
    }};
}

export const load = async ( {cookies, params} ) => {
    try {
        const session = cookies.get('session_id');
        const user = await getUserFromSessionDB(session);

        const formData = new FormData(); // user input
        formData.append('request_id', 1); // temp
        const approvalsInfo = await getApprovalsInfo(formData);

        return { success: true, body: { 
            user: user,
            approvalFormStatuses: approvalsInfo.body.statuses, 
            approverNames: approvalsInfo.body.displayNames,
			type: params.table,
			reqdetails: await db.getRequestDetailsDB(params.table, params.reqid),
        }}; 
    } catch (error) {   
        console.error("Action failed:", error.message);
        return { success: false, body: { result: error}}; 
    }
}

export const actions = {
    createApprovalForm: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("approvals", data);
            return {success: response.success}; 
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success}; 
        }
    }, 
    approve: async ({cookies, request}) => {
        try {
            const session = cookies.get('session_id');
            const user = await getUserFromSessionDB(session);
            
            const inputFormData = await request.formData(); // the user input
            inputFormData.append('approver_id', user?.user_id);
            inputFormData.append('request_id', 1); // debug, must come from page (parameters?)

            const updateFormData = new FormData();
            updateFormData.append('status', inputFormData.get('status'));
            updateFormData.append('remarks', inputFormData.get('remarks'));

            const searchFormData = new FormData();
            searchFormData.append('request_id', inputFormData.get('request_id')); 
            searchFormData.append('approver_id', inputFormData.get('approver_id')); 

            const response = await updateTableDB("approvals", searchFormData, updateFormData);
            return {success: response.success}; 
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success}; 
        }
    }
}