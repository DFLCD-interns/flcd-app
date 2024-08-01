import * as db from '../../../../lib/server/dbjoshua.js';

/** @type {import('./$types.js').LayoutServerLoad} */
export async function load({params}) {
	return {
		type: params.table,
		reqdetails: await db.getRequestDetailsDB(params.table, params.reqid),
	};
}