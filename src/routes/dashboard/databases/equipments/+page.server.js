import { insertIntoTableDB, getEquipmentDB, getEquipmentTypesDB, deleteFromTableDB, updateTableDB } from '$lib/server/db';
import { fail } from "@sveltejs/kit";
/** @type {import('./$types').Actions} */

export const actions = {
    addEquipment: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get("name");
        const location = formData.get("location");
        const notes = formData.get("notes");
        let type = formData.get("type");

        let equipmentNames = await getEquipmentDB()
        equipmentNames = equipmentNames.map((item) => (item.name));
        equipmentNames = equipmentNames.map(item => item.toLowerCase());
        if (equipmentNames.includes(name.toLowerCase())) {
            return fail(500, {
                message: "This equipment name already exists!",
            });
        }

        let equipmentTypes = await getEquipmentTypesDB()
        equipmentTypes = equipmentTypes.map((item) => (item.type));
        equipmentTypes = equipmentTypes.map(item => item.toLowerCase());

        if (type == "other") {
            type = formData.get("new_type");
            if (equipmentTypes.includes(type.toLowerCase())) {
                return fail(500, {
                    message: "This equipment type already exists!",
                });
            }
        }

        const fd = {
            name,
            type,
            location,
            status: 'available',
            notes,
        };
        const form_data = new FormData();
        for (let key in fd) {
            form_data.append(key, fd[key]);
        }

        try {
            await insertIntoTableDB('equipments', form_data);
        } catch (error) {   
            console.error("Error: ", error.message);
            return fail(500, {
                message: error.message,
            }); 
        }
    },

    deleteEquipment: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get("id");
        const fd = { id };
        const form_data = new FormData();
        for (let key in fd) {
            form_data.append(key, fd[key]);
        }
        
        try {
            await deleteFromTableDB('equipments', form_data);
        } catch (error) {   
            console.error("Error: ", error.message);
            return fail(500, {
                message: error.message,
            }); 
        }
    },

    editEquipment: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get("id");
        const name = formData.get("name"); const old_name = formData.get("old_name");
        const type = formData.get("type"); const old_type = formData.get("old_type");
        const location = formData.get("location"); const old_location = formData.get("old_location");
        const status = formData.get("status"); const old_status = formData.get("old_status");
        const notes = formData.get("notes"); const old_notes = formData.get("old_notes");

        if (name===old_name && type===old_type && location===old_location && status===old_status && notes===old_notes) {
            return fail(500, {
                message: "No changes made.",
            });
        }

        let equipmentNames = await getEquipmentDB()
        equipmentNames = equipmentNames.map((item) => (item.name));
        equipmentNames = equipmentNames.map(item => item.toLowerCase());
        if (name !== old_name) {
            if (equipmentNames.includes(name.toLowerCase())) {
                return fail(500, {
                    message: "This equipment name already exists!",
                });
            }
        }

        const id_fd = { id };
        const id_data = new FormData();
        for (let key in id_fd) {
            id_data.append(key, id_fd[key]);
        }

        const fd = {
            name,
            type,
            location,
            status,
            notes,
        };
        const form_data = new FormData();
        for (let key in fd) {
            form_data.append(key, fd[key]);
        }
        
        try {
            await updateTableDB('equipments', id_data, form_data);
        } catch (error) {   
            console.error("Error: ", error.message);
            return fail(500, {
                message: error.message,
            }); 
        }
    },
}