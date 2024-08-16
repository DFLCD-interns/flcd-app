import { insertIntoTableDB, getEquipmentDB, getEquipmentTypesDB, deleteFromTableDB } from '$lib/server/db';
import { fail } from "@sveltejs/kit";
/** @type {import('./$types').Actions} */

export const actions = {
    createBatch: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("batches", data);
            return {success: response.success}; 
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success}; 
        }
    },

    createClass: async ({cookies, request}) => {
        try {
            const data = await request.formData();
            const response = await insertIntoTableDB("classes", data);
            return {success: response.success}; 
        } catch (error) {   
            console.error("Action failed:", error.message);
            return {success: response.success}; 
        }
    },

    addEquipment: async ({ request, cookies }) => {
        const formData = await request.formData();
        const name = formData.get("name");
        const location = formData.get("location");
        const notes = formData.get("notes");
        let type = formData.get("type");

        let equipmentNames = await getEquipmentDB()
        equipmentNames = equipmentNames.map((item) => (item.name));
        console.log(equipmentNames);
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

    deleteEquipment: async ({ request, cookies }) => {
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
}