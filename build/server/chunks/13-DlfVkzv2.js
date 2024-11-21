import { q as insertIntoTableDB } from './db-D_ZfyofE.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-CfI__5z9.js')).default;
const server_id = "src/routes/dashboard/databases/venues/+page.server.js";
const imports = ["_app/immutable/nodes/13.BlE2IMFY.js","_app/immutable/chunks/scheduler.DOp8wpeX.js","_app/immutable/chunks/index.DWy7Bods.js","_app/immutable/chunks/each.xxwK4Lbk.js","_app/immutable/chunks/GradientButton.DdhgmlZd.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/Button.BXa4MMB8.js","_app/immutable/chunks/Label.CeVi60PH.js","_app/immutable/chunks/Input.Co8tTmGU.js","_app/immutable/chunks/Wrapper.Dkt-i6bG.js","_app/immutable/chunks/Search.C7MWu5Gt.js","_app/immutable/chunks/TrashBinOutline.B6LB4Ldt.js","_app/immutable/chunks/Frame.CkqC4DDT.js","_app/immutable/chunks/EditOutline.z7FUiLX2.js","_app/immutable/chunks/CirclePlusSolid.CJvFe9yH.js","_app/immutable/chunks/downloadcsv.LbUqkH5T.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=13-DlfVkzv2.js.map
