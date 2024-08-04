// put in here functions which will be called fo rmaking requests, add 1 function for each class of request (observation, equipment, venue) these functions should support an argument that is a list so that these multiple args are rendered as separate entries for the requests while only mapping to a single base request

import { createClassRequestDB, getBaseRequestByUuid, createBaseRequestDB, getUserFromSessionDB } from "$lib/server/dbjoshua";
import { v4 as uuid } from "uuid";

//sample
// export async function createObservationRequest(schedules<list>, user<user>, other args) {
// createbaserequestDB(<args>);
// for (let index = 0; index < schedules.length; index++) {
//     createObservationrequestDB(<args>)
// }
//}

export async function createObservationRequestServer(session_id, staff_assistant_id, purpose, office, company, timeslots) {
    // NOTE: timeslots must be a list of objects!
    // each object must have this format (example with class id 3 and timeslot 13:00 to 14:00):
    // const sample = {
    //     class_id: 3,
    //     timeslot: "13:00-14:00"
    //     observe_date: DATE(<Aug 4, 2024>)
    // }

    // console.log("request.js - timeslots - ", timeslots);

    // getting the user
    const user = await getUserFromSessionDB(session_id);
    
    // console.log("requests.js - user ", user);
    
    // create a base request
    //createBaseRequestDB(faculty_id, staff_assistant_id, purpose, office, company, admin_approve_layer, requester_id, completion_time)
    const br_uuid = uuid();

    const br = await createBaseRequestDB(null, staff_assistant_id, purpose, office, company, 3, user.id, null, br_uuid);

    // fetch the newly created base request via its uuid so we can get the id of that base_request
    const base_req = await getBaseRequestByUuid(br_uuid);
    // console.log("after get base request by uuid");


    // create all the other requests
    for (let i = 0; i < timeslots.length; i++) {
        // create sub request here
        const cr = await createClassRequestDB(timeslots[i].class_id, base_req.id, timeslots[i].timeslot, timeslots[i].observe_date);
    }

    // returning the uuid of the base_request ... just cause idk what to return
    return br_uuid;
} 