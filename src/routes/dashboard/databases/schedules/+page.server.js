import { addUnavailableSlot, deleteUnavailableSlot, getSections, getUnavailable, getUnavailableWSection } from '$lib/server/db';

export const actions = {
    addUnavailableSlots: async ({ request }) => {
        const formData = await request.formData();
        const sections = formData.getAll("section");
        const timeslots = formData.getAll("timeslot");
        const dates = formData.getAll("date");
        for (let i=0; i < sections.length; i++){
            const us = await addUnavailableSlot(sections[i], dates[i], timeslots[i]);
        }
    },
    deleteRow: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const del = await deleteUnavailableSlot(id);
    }
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return{
        amclasses: await getSections('AM'),
        pmclasses: await getSections('PM'),
        unavailable: await getUnavailable(),
        unavailable2: await getUnavailableWSection()
    }
}