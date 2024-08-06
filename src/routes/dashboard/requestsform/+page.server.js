import { insertIntoTableDB, getLatestBaseRequestID, getUserFromSessionDB, getUserWithMatchingEmail } from '$lib/server/db.js';

/** @type {import('./$types').Actions} */
export const actions = {    
    default: async ({ request, cookies }) => {
        const session = cookies.get("session_id");
        const user = await getUserFromSessionDB(session);
        const data = await request.formData();

        const instructor = await getUserWithMatchingEmail(data.get('instructor_email'));
        if (user.access_level === 5) { // if FLCD student
            // check if instructor email exists
            if (instructor.length < 1) {
                return {
                    status: 409,
                    body: {
                        message: 'Instructor email does not exist.',
                        error: undefined
                    }
                }
            }
        }
        
        // BASE-REQUESTS INSERT

        var base_fd = new FormData();
        base_fd.append('requester_id', user.user_id);
        base_fd.append('instructor_id', instructor[0].id);
        base_fd.append('purpose', data.get('purpose'));
        base_fd.append('max_approval_layer', 2); // faculty-in-charge

        try {
            // Insert the form data into the database
            await insertIntoTableDB('base_requests', base_fd);
            
        } 
        catch (error) {
            console.error('Error writing to database:', error);
            return {
                status: 500,
                body: {
                    message: 'Error writing to database',
                    error: error.message
                }
            };
        }
        
        // get newly added base-request id 
        const request_id = await getLatestBaseRequestID(user.user_id);
        // console.log("\nREQUEST ID: " + request_id + "\n");

        // APPROVALS INSERT

        for (let i = 0; i < 3; i++) { // 3 is admin_approve_layer for equipment requests
            var fd = new FormData();
            fd.append('status', 'pending');  // pending, approved, declined
            fd.append('approver_id', 1);  // placeholder
            fd.append('request_id', request_id);

            try {
                // Insert the form data into the database
                await insertIntoTableDB('approvals', fd);

            } 
            catch (error) {
                console.error('Error writing to database:', error);
                return {
                    status: 500,
                    body: {
                        message: 'Error writing to database',
                        error: error.message
                    }
                };
            }
        }

        // EQUIPMENT-REQUESTS INSERT
        const promised_start_time = data.get('promised_start_time');
        const promised_end_time = data.get('promised_end_time');
        const location = data.get('location');
        const selectedEq = data.getAll('selectedEq');
        // console.log('selectedEq: ' + selectedEq);
        
        let total = 0;
        for (let i = 0; i < selectedEq.length; i++) {
            for (let j = 0; j < parseInt(data.get(selectedEq[i])); j++) {
                
                var fd = {
                    promised_start_time: promised_start_time,
                    promised_end_time: promised_end_time,
                    location: location,
                    equipment_type: selectedEq[i],
                    request_id: request_id
                    // equipment_id --- to be set by approver
                };

                var form_data = new FormData();
                for ( var key in fd ) {
                    form_data.append(key, fd[key]);
                }
                // console.log([...form_data.keys()]);
                // console.log([...form_data.values()]);

                try {
                    // Insert the form data into the database
                    insertIntoTableDB('equipment_requests', form_data);
                    
                } 
                catch (error) {
                    console.error('Error writing to database:', error);
                    return {
                        status: 500,
                        body: {
                            message: 'Error writing to database',
                            error: error.message
                        }
                    };
                }
            }
            total += parseInt(data.get(selectedEq[i]))
        }
        // console.log('total requested equipment: ' + total)


        return {
            status: 200,
            body: {
                message: 'Form submitted successfully!',
                data: {selectedEq, total, promised_start_time, promised_end_time}
            }
        };
    }
};