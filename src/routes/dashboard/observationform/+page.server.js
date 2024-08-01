import { createObservationRequestServer } from "./requests.server"
import {SESSION_COOKIE_NAME} from "$lib/server/constants.js"

export const actions = {
    createObservationRequest: async ({request, cookies}) => {
        const server_req = createObservationRequestServer(cookies.get(SESSION_COOKIE_NAME), staff_assistant_id, purpose, office, company, timeslots);
        
        return { success: true ,
            base_request_uuid: server_req
        };
    },
}