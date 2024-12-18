// put in here functions which will be called fo rmaking requests, add 1 function for each class of request (observation, equipment, venue) these functions should support an argument that is a list so that these multiple args are rendered as separate entries for the requests while only mapping to a single base request

import { createClassRequestDB, getUserFromSessionDB, getUsersWithAccessLevel, insertIntoTableDB, createBaseRequestDB2, getLatestBaseRequestID } from "$lib/server/db";
import { v4 as uuid } from "uuid";

//sample
// export async function createObservationRequest(schedules<list>, user<user>, other args) {
// createbaserequestDB(<args>);
// for (let index = 0; index < schedules.length; index++) {
//     createObservationrequestDB(<args>)
// }
//}

async function insertApprovals(request_id, instructor = null, staff, fic, chair = null) {
    const insertApproval = async (approver_id, not_null) => {
        const fd = new FormData();
        fd.append('status', 'pending');
        fd.append('request_id', request_id);
        if (not_null == 1) fd.append('approver_id', approver_id);
        try {
            await insertIntoTableDB('approvals', fd);
        } catch (error) {
            throw new Error('Error writing to database');
        }
    };

    if (instructor) await insertApproval(instructor.id, 1);
    await insertApproval(null, 0); // staff can be multiple; so treated and identified as null 
    if (fic) await insertApproval(fic.id, 1); 
    if (chair) await insertApproval(chair.id, 1);
}

export async function createObservationRequestServer(session_id, purpose, timeslots, instructor) {
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
    //createBaseRequestDB(instructor_id, staff_assistant_id, purpose, office, company, requester_id, completion_time)
    
    // staff_assistant_id, purpose, requester_id, completion_time
    // is max approve level 2 or 3 for this idk
    const br = await createBaseRequestDB2(purpose, user.user_id, instructor.id); // TODO fix this
    
    // fetch the newly created base request via its id so we can get the id of that base_request??? sorry LMAO
    const base_req_id = await getLatestBaseRequestID(user.user_id);
    // console.log("after get base request by uuid");

    // create all the other requests
    for (let i = 0; i < timeslots.length; i++) {
        // create sub request here
        const cr = await createClassRequestDB(timeslots[i].class_id, base_req_id, timeslots[i].timeslot, timeslots[i].observe_date);
    }

    const fic = await getUsersWithAccessLevel(2);
    const idk = await insertApprovals(base_req_id, instructor, null, fic[0], null);

    // returning the uuid of the base_request ... just cause idk what to return SDHJSDHJHJSDHJDSHJSDHJDSHJSDHJSD
    return 1;
} 