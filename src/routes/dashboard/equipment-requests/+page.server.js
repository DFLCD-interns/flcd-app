import { insertIntoTableDB, getLatestBaseRequestID, getUserFromSessionDB, getUserWithMatchingEmail, getUsersWithAccessLevel } from '$lib/server/db.js';
import { mailRequesterOnResponse } from '$lib/server/emails.js'

async function insertBaseRequest(user, data, isFLCD, instructor = null) {
    const base_fd = new FormData();
    base_fd.append('requester_id', user?.user_id);
    if (isFLCD && instructor) base_fd.append('instructor_id', instructor.id);
    base_fd.append('purpose', data.get('purpose'));
    if (!isFLCD) base_fd.append('affiliation', data.get('affiliation'));

    try {
        await insertIntoTableDB('base_requests', base_fd);
        const request_id = await getLatestBaseRequestID(user?.user_id);
        return request_id;
    } catch (error) {
        throw new Error('Error writing to database');
    }
}

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
    // for (let member of staff) {
    //     await insertApproval(member.id);
    // }
    if (staff) await insertApproval(staff.id, 0);
    if (fic) await insertApproval(fic.id, 1);
    if (chair) await insertApproval(chair.id, 1);
}


/** @type {import('./$types').Actions} */
export const actions = {    
    submitEquipmentRequest: async ({ request, cookies }) => {
        const session = cookies.get("session_id");
        const user = await getUserFromSessionDB(session);
        const data = await request.formData();
        const staff = await getUsersWithAccessLevel(3);
        const isFLCD = user?.access_level === 5;

        let instructor;
        let instructorEmail;
        if (isFLCD) {
            instructorEmail = data.get('instructor_email');
            if (!instructorEmail.endsWith('@up.edu.ph')) {
                instructorEmail = `${instructorEmail}@up.edu.ph`;
            }
            instructor = await getUserWithMatchingEmail(instructorEmail);

            if (instructor.length < 1 || instructor[0]?.access_level !== 4) {
                return {
                    status: 409,
                    body: {
                        message: 'Email of coordinating faculty is not valid.',
                        error: undefined
                    }
                };
            }
            instructor = instructor[0];
        }

        try {
            const request_id = await insertBaseRequest(user, data, isFLCD, instructor);
            const fic = await getUsersWithAccessLevel(2);
            await insertApprovals(request_id, instructor, staff[0], fic[0]);

            // Insert equipment requests
            const promised_start_time = data.get('promised_start_time');
            const promised_end_time = data.get('promised_end_time');
            const location = data.get('location');
            const selectedEq = data.getAll('selectedEq');

            for (let eq of selectedEq) {
                const quantity = parseInt(data.get(eq));
                for (let i = 0; i < quantity; i++) {
                    const fd = {
                        promised_start_time,
                        promised_end_time,
                        location,
                        equipment_type: eq,
                        request_id,
                    };
                    const form_data = new FormData();
                    for (let key in fd) {
                        form_data.append(key, fd[key]);
                    }
                    await insertIntoTableDB('equipment_requests', form_data);
                }
            }

            // const mailRes = await mailRequesterOnResponse(user.user_id, undefined); 
            // console.log(mailRes);

            return {
                status: 200,
                body: {
                    message: 'Form submitted successfully!',
                    data: 'owo this is Clarisse',
                }
            };
        } catch (error) {
            console.error('meow')
            console.error(error.message)
            return {
                status: 500,
                body: {
                    message: error.message,
                    error: error.message
                }
            };
        }
    },
    
    submitVenueRequest: async ({ request, cookies }) => {
        const session = cookies.get("session_id");
        const user = await getUserFromSessionDB(session);
        const data = await request.formData();
        const staff = await getUsersWithAccessLevel(3);
        const isFLCD = user?.access_level === 5;

        let instructor;
        if (isFLCD) {
            let instructorEmail = data.get('instructor_email');
            if (!instructorEmail.endsWith('@up.edu.ph')) {
                instructorEmail = `${instructorEmail}@up.edu.ph`;
            }
            instructor = await getUserWithMatchingEmail(instructorEmail);

            if (instructor.length < 1 || instructor[0]?.access_level !== 4) {
                return {
                    status: 409,
                    body: {
                        message: 'Email of coordinating faculty is not valid.',
                        error: undefined
                    }
                };
            }
            instructor = instructor[0];
        }

        try {
            const request_id = await insertBaseRequest(user, data, isFLCD, instructor);
            const fic = await getUsersWithAccessLevel(2);
            const chair = await getUsersWithAccessLevel(1);
            await insertApprovals(request_id, instructor, staff[0], fic[0], chair[0]);

            // Insert venue request
            const selectedVenue = data.getAll('selectedVenue');

            for (let venueID of selectedVenue) {
                const fd = {
                    date_needed: data.get('date_needed'),
                    start_time: data.get('start_time'),
                    end_time: data.get('end_time'),
                    venue_id: parseInt(venueID),
                    request_id,
                };
                const form_data = new FormData();
                for (let key in fd) {
                    form_data.append(key, fd[key]);
                }
                await insertIntoTableDB('venue_requests', form_data);
            }
            
            return {
                status: 200,
                body: {
                    message: 'Form submitted successfully!',
                    data: 'owo this is Clarisse',
                }
            };
        } catch (error) {
            return {
                status: 500,
                body: {
                    message: error.message,
                    error: error.message,
                }
            };
        }
    },
};