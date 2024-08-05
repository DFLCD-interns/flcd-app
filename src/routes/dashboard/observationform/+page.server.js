import { createObservationRequestServer } from "./requests.server"
import {SESSION_COOKIE_NAME} from "$lib/server/constants.js"

export const actions = {
    createObservationRequest: async ({request, cookies}) => {
        // TODO: PARSE THE INPUTS HERE
        const formData = await request.formData();
        const staff_assistant_id = formData.get("staff_assistant_id");
        const purpose = formData.get("purpose");
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
        
        const server_req = await createObservationRequestServer(cookies.get(SESSION_COOKIE_NAME), staff_assistant_id, purpose, timeslots);
        
        return { success: true ,
            base_request_uuid: server_req
        };
    },
}