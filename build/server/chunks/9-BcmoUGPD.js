import { r as getAllClassesDB, s as getBatchesDB, t as getClassesDB, u as getBatchesAndClassesDB, v as getUsersDB, q as insertIntoTableDB } from './db-D_ZfyofE.js';
import { f as fail } from './index-DHSpIlkf.js';
import 'pg';

async function load() {
  return {
    batches: await getAllClassesDB(),
    batches_only_table: await getBatchesDB(),
    classes_only_table: await getClassesDB(),
    classes_batch_table: await getBatchesAndClassesDB(),
    users: await getUsersDB()
  };
}
const actions = {
  createBatch: async ({ cookies, request }) => {
    console.log("hi");
    try {
      const data = await request.formData();
      let batchNames = await getBatchesDB();
      batchNames = batchNames.map((item) => item.name);
      batchNames = batchNames.map((item) => item.toLowerCase());
      if (batchNames.includes(data.get("name").toLowerCase())) {
        return fail(500, {
          message: "This batch name already exists!"
        });
      }
      const response2 = await insertIntoTableDB("batches", data);
      return { success: response2.success };
    } catch (error) {
      console.error("Action failed:", error.message);
      return { success: response.success };
    }
  },
  createClass: async ({ cookies, request }) => {
    try {
      const data = await request.formData();
      let classNames = await getClassesDB();
      classNames = classNames.map((item) => item.name);
      classNames = classNames.map((item) => item.toLowerCase());
      if (classNames.includes(data.get("name").toLowerCase())) {
        return fail(500, {
          message: "This class name already exists!"
        });
      }
      const response2 = await insertIntoTableDB("classes", data);
      return { success: response2.success };
    } catch (error) {
      console.error("Action failed:", error.message);
      return { success: response.success };
    }
  },
  addChild: async ({ cookies, request }) => {
    try {
      const data = await request.formData();
      const response2 = await insertIntoTableDB("childs", data);
      return { success: response2.success };
    } catch (error) {
      console.error("Action failed:", error.message);
      return { success: response.success };
    }
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Dg39csiR.js')).default;
const server_id = "src/routes/dashboard/databases/classes/+page.server.js";
const imports = ["_app/immutable/nodes/9.CMBSWOz6.js","_app/immutable/chunks/scheduler.DOp8wpeX.js","_app/immutable/chunks/index.DWy7Bods.js","_app/immutable/chunks/each.xxwK4Lbk.js","_app/immutable/chunks/Button.BXa4MMB8.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/GradientButton.DdhgmlZd.js","_app/immutable/chunks/Label.CeVi60PH.js","_app/immutable/chunks/Input.Co8tTmGU.js","_app/immutable/chunks/Wrapper.Dkt-i6bG.js","_app/immutable/chunks/MultiSelect.CdzMrb2V.js","_app/immutable/chunks/Badge.DEbT3qjz.js","_app/immutable/chunks/index.BQaFFxeS.js","_app/immutable/chunks/Search.C7MWu5Gt.js","_app/immutable/chunks/Select.CbOpMfno.js","_app/immutable/chunks/TrashBinOutline.B6LB4Ldt.js","_app/immutable/chunks/Frame.CkqC4DDT.js","_app/immutable/chunks/EditOutline.z7FUiLX2.js","_app/immutable/chunks/CirclePlusSolid.CJvFe9yH.js","_app/immutable/chunks/downloadcsv.LbUqkH5T.js","_app/immutable/chunks/FilterSolid.k7JC76lm.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.naqoLmSw.js","_app/immutable/chunks/index.DELnobZO.js","_app/immutable/chunks/forms.BXne0zmk.js","_app/immutable/chunks/entry.DBH_V7Gc.js"];
const stylesheets = ["_app/immutable/assets/Toaster.CLpmFrbv.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=9-BcmoUGPD.js.map
