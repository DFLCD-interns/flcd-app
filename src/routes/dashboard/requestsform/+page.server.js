import { insertIntoTableDB, getLatestBaseRequestID, getUserFromSessionDB, getUserWithMatchingEmail, getUsersWithAccessLevel } from '$lib/server/db.js';

/** @type {import('./$types').Actions} */
export const actions = {    
    submitEquipmentRequest: async ({ request, cookies }) => {
        const session = cookies.get("session_id");
        const user = await getUserFromSessionDB(session);
        const data = await request.formData();
        const staff = await getUsersWithAccessLevel(3);
        const isFLCD = (user.access_level === 5)

        if (isFLCD) {
            let instructorEmail = data.get('instructor_email');
            // Append the domain to the email if it's not already there
            if (!instructorEmail.endsWith('@up.edu.ph')) {
              instructorEmail = `${instructorEmail}@up.edu.ph`;
            }
            const instructor = await getUserWithMatchingEmail(instructorEmail);
            // console.log(instructor[0].email)

            // check if instructor email is valid
            if (instructor.length < 1 || instructor[0].access_level !== 4) {
                console.log("INVALID INSTRUCTOR EMAIL")
                return {
                    status: 409,
                    body: {
                        message: 'Email of coordinating faculty is not valid.',
                        error: undefined
                    }
                }
            }
        }

        // BASE-REQUESTS INSERT

        var base_fd = new FormData();
        base_fd.append('requester_id', user.user_id);
        if (isFLCD) { base_fd.append('instructor_id', instructor[0].id); }
        base_fd.append('purpose', data.get('purpose'));
        if (!isFLCD) { base_fd.append('affiliation', data.get('affiliation')); }

        try {
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

        if (isFLCD) {  // for FLCD Instructor
            var fd = new FormData();
            fd.append('status', 'pending');  // pending, approved, declined
            fd.append('request_id', request_id);
            fd.append('approver_id', instructor[0].id);

            try {
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
 
        for (let i = 0; i < staff.length; i++) {  // for Faculty/Staff (can be multiple)
            var fd = new FormData();
            fd.append('status', 'pending');  // pending, approved, declined
            fd.append('request_id', request_id);
            fd.append('approver_id', staff[i].id);

            try {
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

        const fic = await getUsersWithAccessLevel(2); // for FIC
        var fd = new FormData();  
        fd.append('status', 'pending');  // pending, approved, declined
        fd.append('request_id', request_id);
        fd.append('approver_id', fic[0].id);
        try {
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


        // console.log("REQUEST FORM SUBMITTED SUCCESSFULLY");
        return {
            status: 200,
            body: {
                message: 'Form submitted successfully!',
                data: '{selectedEq, total, promised_start_time, promised_end_time}'
            }
        };
    },




    submitVenueRequest: async ({ request, cookies }) => {
        const session = cookies.get("session_id");
        const user = await getUserFromSessionDB(session);
        const data = await request.formData();
        const staff = await getUsersWithAccessLevel(3);
        const isFLCD = (user.access_level === 5)
    },
};