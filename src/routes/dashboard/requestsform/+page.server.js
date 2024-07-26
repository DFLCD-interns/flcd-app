import { insertIntoTableDB } from '../../../lib/db';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        //base-requests insert
        
        
        //equipment-tables insert
        const selectedEq = data.getAll('selectedEq');
        const start_time = data.get('start_time');
        const promised_return_time = data.get('return_time');
        console.log(selectedEq);
        for (let i = 0; i < selectedEq.length; i++) {
            var fd = {
                count: data.get(selectedEq[i]),
                start_time: start_time,
                promised_return_time: promised_return_time,
                equipment_id: selectedEq[i]
            };

            var form_data = new FormData();
            for ( var key in fd ) {
                form_data.append(key, fd[key]);
            }
            console.log([...form_data.keys()]);
            console.log([...form_data.values()]);

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
        return {
            status: 200,
            body: {
                message: 'Form submitted successfully!',
                data: {selectedEq, start_time, promised_return_time}
            }
        };
    }
};