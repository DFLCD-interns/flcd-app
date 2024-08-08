

export const actions = {
    mailme: async ({request, cookies}) => {
        const formData = await request.formData();
        const subject = formData.get("subject");
        const ebody = formData.get("body");
        const recipient = formData.get("recipient"); 
        const res = await fetch('http://127.0.0.1:5000/mail', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: `{"subject":"${subject}","body":"${ebody}","recipient":"${recipient}"}`
        })
        return {success: true};
    },
}