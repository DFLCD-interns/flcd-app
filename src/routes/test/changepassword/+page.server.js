import { changePassword } from '$lib/server/auth.js';
import { mailuser } from '$lib/server/emails.js';
import { randomUUID } from 'crypto';

export const actions = {
    changepassword: async ({request, cookies}) => {
        const formData = await request.formData();
        const email = formData.get("email")
        const otp = randomUUID().toString();
        const res = await mailuser("Password Change Request", `A password change has been requested, your OTP is ${otp}.`, email);

        return {success: true};
    },
}