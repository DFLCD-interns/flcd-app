// import { insertIntoTableDB } from '$lib/server/db';
// import { SESSION_COOKIE_NAME } from '$lib/server/constants';
// import { createObservationRequest, createObservationRequestServer } from './requests.server';

// export const actions = {
//     createClassRequest: async ({cookies, request}) => {
//         try {
//             const data = await request.formData();
//             const response = await insertIntoTableDB("class_requests", data);
//             return {success: response.success};
//         } catch (error) {   
//             console.error("Action failed:", error.message);
//             return {success: response.success};
//         }
//     },
//     createObservationRequest: async ({cookies, request}) => {
//         const obs = await createObservationRequestServer(cookies.get(SESSION_COOKIE_NAME));
//     }
// }

// // for a specific request type, a approval route must be set in advance which will be the autofill for the current approver