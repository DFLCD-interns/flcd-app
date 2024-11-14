import { p as getAllClassesDB, q as getBatchesDB, r as getClassesDB, s as getBatchesAndClassesDB, t as getUsersDB, o as insertIntoTableDB } from './db-D213Zxh3.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-DG0-ldM1.js')).default;
const server_id = "src/routes/dashboard/databases/classes/+page.server.js";
const imports = ["_app/immutable/nodes/9.e2kv8dsA.js","_app/immutable/chunks/scheduler.DARHZdcz.js","_app/immutable/chunks/index.BOD7_7ti.js","_app/immutable/chunks/each.BDsanpQE.js","_app/immutable/chunks/Button.DmkqkWvm.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/GradientButton.BraljpKT.js","_app/immutable/chunks/Label.CnKRS200.js","_app/immutable/chunks/Input.BZuiHxSs.js","_app/immutable/chunks/Wrapper.DDar7dFK.js","_app/immutable/chunks/MultiSelect.CGv41oEy.js","_app/immutable/chunks/Badge.6depYmLh.js","_app/immutable/chunks/index.BW-EZrt_.js","_app/immutable/chunks/Search.Bxq8L1DV.js","_app/immutable/chunks/Select.CfcdSY0U.js","_app/immutable/chunks/TrashBinOutline.CzhzF3hA.js","_app/immutable/chunks/Frame.DOMMRkx1.js","_app/immutable/chunks/EditOutline.BiaciCHH.js","_app/immutable/chunks/CirclePlusSolid.CMCBW1LG.js","_app/immutable/chunks/downloadcsv.CMK_z_oq.js","_app/immutable/chunks/FilterSolid.DGsfzOaO.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.D_y5BEFO.js","_app/immutable/chunks/index.CyH2wcdx.js","_app/immutable/chunks/forms.BovpqlDw.js","_app/immutable/chunks/entry.B3oirdxR.js"];
const stylesheets = ["_app/immutable/assets/Toaster.CLpmFrbv.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=9-B0VUt6yl.js.map
