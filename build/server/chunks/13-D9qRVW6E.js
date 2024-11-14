import { o as insertIntoTableDB } from './db-D213Zxh3.js';
import 'pg';

const actions = {
  addVenue: async ({ request }) => {
    try {
      const data = await request.formData();
      const response2 = await insertIntoTableDB("venues", data);
      return { success: response2.success };
    } catch (error) {
      console.error("Action failed:", error.message);
      return { success: response.success };
    }
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 13;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BYT6c2fs.js')).default;
const server_id = "src/routes/dashboard/databases/venues/+page.server.js";
const imports = ["_app/immutable/nodes/13.CxoUcBOe.js","_app/immutable/chunks/scheduler.DARHZdcz.js","_app/immutable/chunks/index.BOD7_7ti.js","_app/immutable/chunks/each.BDsanpQE.js","_app/immutable/chunks/GradientButton.BraljpKT.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/Button.DmkqkWvm.js","_app/immutable/chunks/Label.CnKRS200.js","_app/immutable/chunks/Input.BZuiHxSs.js","_app/immutable/chunks/Wrapper.DDar7dFK.js","_app/immutable/chunks/Search.Bxq8L1DV.js","_app/immutable/chunks/TrashBinOutline.CzhzF3hA.js","_app/immutable/chunks/Frame.DOMMRkx1.js","_app/immutable/chunks/EditOutline.BiaciCHH.js","_app/immutable/chunks/CirclePlusSolid.CMCBW1LG.js","_app/immutable/chunks/downloadcsv.CMK_z_oq.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=13-D9qRVW6E.js.map
