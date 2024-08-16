import { createObservationRequestServer } from "./requests.server"
import {SESSION_COOKIE_NAME} from "$lib/server/constants.js"
import { getSections, getUnavailable, getUnavailableWSection, getUserWithMatchingEmail} from "../../../lib/server/db.js";

export const actions = {
    createObservationRequest: async ({request, cookies}) => {
        // TODO: PARSE THE INPUTS HERE
        const formData = await request.formData();
        const purpose = "Observation"
        //const office = formData.get("office");
        //const company = formData.get("company");
        const class_id = formData.get("class_id");
        // const timeslots = formData.getAll("timeslots");
        const selectedDates = formData.getAll("selectedDate");
        const selectedSlots = formData.getAll("selectedSlot");

        // console.log("+page.server - observationrequests ", selectedDates, selectedSlots);
        // Fetching timeslots
        // const sample = {
        //     class_id: 3,
        //     timeslot: "13:00-14:00"
        //     observe_date: DATE(<Aug 4, 2024>)
        // }
        let timeslots = [];
        for (let i = 0; i < selectedDates.length; i++) {
            timeslots.push({
                class_id: class_id,
                timeslot: selectedSlots[i],
                observe_date: selectedDates[i]
            });
        }

        let instructor;
        let instructorEmail;
        
        instructorEmail = formData.get('instructor_email');
        if (!instructorEmail.endsWith('@up.edu.ph')) {
            instructorEmail = `${instructorEmail}@up.edu.ph`;
        }
        instructor = await getUserWithMatchingEmail(instructorEmail);

        if (instructor.length < 1 || instructor[0].access_level !== 4) {
            return {
                status: 409,
                body: {
                    message: 'Email of coordinating faculty is not valid.',
                    error: undefined
                }
            };
        }
        instructor = instructor[0];
        
        const server_req = await createObservationRequestServer(cookies.get(SESSION_COOKIE_NAME), purpose, timeslots, instructor);
        
        return { success: true ,
            base_request_uuid: server_req
        };
    },
}


/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return{
        amclasses: await getSections('AM'),
        pmclasses: await getSections('PM'),
        unavailable: await getUnavailable()
    }
}