import { c as getEquipmentDB, d as getEquipmentTypesDB, q as insertIntoTableDB, w as deleteFromTableDB, x as updateTableDB } from './db-D_ZfyofE.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-DWShG8Lc.js')).default;
const server_id = "src/routes/dashboard/databases/equipments/+page.server.js";
const imports = ["_app/immutable/nodes/10.BAOoaqir.js","_app/immutable/chunks/scheduler.DOp8wpeX.js","_app/immutable/chunks/index.DWy7Bods.js","_app/immutable/chunks/each.xxwK4Lbk.js","_app/immutable/chunks/Button.BXa4MMB8.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/GradientButton.DdhgmlZd.js","_app/immutable/chunks/Label.CeVi60PH.js","_app/immutable/chunks/Input.Co8tTmGU.js","_app/immutable/chunks/Wrapper.Dkt-i6bG.js","_app/immutable/chunks/MultiSelect.CdzMrb2V.js","_app/immutable/chunks/Badge.DEbT3qjz.js","_app/immutable/chunks/index.BQaFFxeS.js","_app/immutable/chunks/Search.C7MWu5Gt.js","_app/immutable/chunks/Select.CbOpMfno.js","_app/immutable/chunks/TrashBinOutline.B6LB4Ldt.js","_app/immutable/chunks/Frame.CkqC4DDT.js","_app/immutable/chunks/CloseOutline.vdu5KTRw.js","_app/immutable/chunks/EditOutline.z7FUiLX2.js","_app/immutable/chunks/CirclePlusSolid.CJvFe9yH.js","_app/immutable/chunks/downloadcsv.LbUqkH5T.js","_app/immutable/chunks/FilterSolid.k7JC76lm.js","_app/immutable/chunks/forms.BXne0zmk.js","_app/immutable/chunks/entry.DBH_V7Gc.js","_app/immutable/chunks/index.DELnobZO.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.naqoLmSw.js"];
const stylesheets = ["_app/immutable/assets/Toaster.CLpmFrbv.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=10-87TCr_-L.js.map
