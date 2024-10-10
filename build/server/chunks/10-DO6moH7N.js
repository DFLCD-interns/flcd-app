import { c as getEquipmentDB, d as getEquipmentTypesDB, o as insertIntoTableDB, u as deleteFromTableDB, v as updateTableDB } from './db-D213Zxh3.js';
import { f as fail } from './index-DHSpIlkf.js';
import 'pg';

const actions = {
  addEquipment: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const location = formData.get("location");
    const notes = formData.get("notes");
    let type = formData.get("type");
    let equipmentNames = await getEquipmentDB();
    equipmentNames = equipmentNames.map((item) => item.name);
    equipmentNames = equipmentNames.map((item) => item.toLowerCase());
    if (equipmentNames.includes(name.toLowerCase())) {
      return fail(500, {
        message: "This equipment name already exists!"
      });
    }
    let equipmentTypes = await getEquipmentTypesDB();
    equipmentTypes = equipmentTypes.map((item) => item.type);
    equipmentTypes = equipmentTypes.map((item) => item.toLowerCase());
    if (type == "other") {
      type = formData.get("new_type");
      if (equipmentTypes.includes(type.toLowerCase())) {
        return fail(500, {
          message: "This equipment type already exists!"
        });
      }
    }
    const fd = {
      name,
      type,
      location,
      status: "available",
      notes
    };
    const form_data = new FormData();
    for (let key in fd) {
      form_data.append(key, fd[key]);
    }
    try {
      await insertIntoTableDB("equipments", form_data);
    } catch (error) {
      console.error("Error: ", error.message);
      return fail(500, {
        message: error.message
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
      await deleteFromTableDB("equipments", form_data);
    } catch (error) {
      console.error("Error: ", error.message);
      return fail(500, {
        message: error.message
      });
    }
  },
  editEquipment: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id");
    const name = formData.get("name");
    const old_name = formData.get("old_name");
    const type = formData.get("type");
    const old_type = formData.get("old_type");
    const location = formData.get("location");
    const old_location = formData.get("old_location");
    const status = formData.get("status");
    const old_status = formData.get("old_status");
    const notes = formData.get("notes");
    const old_notes = formData.get("old_notes");
    if (name === old_name && type === old_type && location === old_location && status === old_status && notes === old_notes) {
      return fail(500, {
        message: "No changes made."
      });
    }
    let equipmentNames = await getEquipmentDB();
    equipmentNames = equipmentNames.map((item) => item.name);
    equipmentNames = equipmentNames.map((item) => item.toLowerCase());
    if (name !== old_name) {
      if (equipmentNames.includes(name.toLowerCase())) {
        return fail(500, {
          message: "This equipment name already exists!"
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
      notes
    };
    const form_data = new FormData();
    for (let key in fd) {
      form_data.append(key, fd[key]);
    }
    try {
      await updateTableDB("equipments", id_data, form_data);
    } catch (error) {
      console.error("Error: ", error.message);
      return fail(500, {
        message: error.message
      });
    }
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 10;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BXHQY-NF.js')).default;
const server_id = "src/routes/dashboard/databases/equipments/+page.server.js";
const imports = ["_app/immutable/nodes/10.BB87WWD_.js","_app/immutable/chunks/scheduler.DARHZdcz.js","_app/immutable/chunks/index.BOD7_7ti.js","_app/immutable/chunks/each.BDsanpQE.js","_app/immutable/chunks/Button.DmkqkWvm.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/GradientButton.BraljpKT.js","_app/immutable/chunks/Label.CnKRS200.js","_app/immutable/chunks/Input.BZuiHxSs.js","_app/immutable/chunks/Wrapper.DDar7dFK.js","_app/immutable/chunks/MultiSelect.CGv41oEy.js","_app/immutable/chunks/Badge.6depYmLh.js","_app/immutable/chunks/index.BW-EZrt_.js","_app/immutable/chunks/Search.Bxq8L1DV.js","_app/immutable/chunks/Select.CfcdSY0U.js","_app/immutable/chunks/TrashBinOutline.CzhzF3hA.js","_app/immutable/chunks/Frame.DOMMRkx1.js","_app/immutable/chunks/EditOutline.BiaciCHH.js","_app/immutable/chunks/CirclePlusSolid.CMCBW1LG.js","_app/immutable/chunks/downloadcsv.CMK_z_oq.js","_app/immutable/chunks/FilterSolid.DGsfzOaO.js","_app/immutable/chunks/forms.BovpqlDw.js","_app/immutable/chunks/entry.B3oirdxR.js","_app/immutable/chunks/index.CyH2wcdx.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.D_y5BEFO.js"];
const stylesheets = ["_app/immutable/assets/Toaster.CLpmFrbv.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=10-DO6moH7N.js.map
