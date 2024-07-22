/** @type {import('./$types').Actions} */
export const actions = {
	// default: async ({ request }) => {
	// 	const data = await request.formData();
    //     const idk = data.get('start_time')
	// 	console.log(idk);
	// 	return { success: true };
	// }
    default: async ({ request }) => {
        const formData = await request.json();
        const { selectedEq, start_time, return_time } = formData;

        console.log('server side');
        console.log({ selectedEq, start_time, return_time });

        // Handle the form data (e.g., save to a database)
        // You can add validation and error handling as needed

        return {
            status: 200,
            body: {
                message: 'Form submitted successfully!',
                data: { equipmentId, quantity, dateOfUse, returnDate }
            }
        };
    }
};