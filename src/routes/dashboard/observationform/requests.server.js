// put in here functions which will be called fo rmaking requests, add 1 function for each class of request (observation, equipment, venue) these functions should support an argument that is a list so that these multiple args are rendered as separate entries for the requests while only mapping to a single base request

import { getUserFromSessionDB } from "$lib/server/dbjoshua"

//sample
// export async function createObservationRequest(schedules<list>, user<user>, other args) {
// createbaserequestDB(<args>);
// for (let index = 0; index < schedules.length; index++) {
//     createObservationrequestDB(<args>)
// }
//}

export async function createObservationRequestServer(session_id, args) {
    // getting the user
    const user = await getUserFromSessionDB(session_id);
    
    console.log(user);
    
    // create a base request
    const br = await createBaseRequestDB()

    // create all the other requests
    for (let i = 0; i < timeslots.length; i++) {
        // create sub request here
        const m = 0;
    }
} 