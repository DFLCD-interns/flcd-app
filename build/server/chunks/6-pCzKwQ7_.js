import { g as getUserFromSessionDB, o as getUserBaseRequests, p as deleteRequest } from './db-D_ZfyofE.js';
import 'pg';

async function load({ cookies }) {
  const session = cookies.get("session_id");
  const user = await getUserFromSessionDB(session);
  const user_id = user?.user_id;
  const requests = await getUserBaseRequests(user_id);
  return {
    requests
  };
}
const actions = {
  deleteRequest: async ({ request, cookies }) => {
    try {
      const formData = await request.formData();
      const response2 = await deleteRequest(formData.get("request_table_name"), formData.get("request_id"));
      return { success: response2?.success };
    } catch (error) {
      console.error("Action failed:", error.message);
      return { success: response?.success };
    }
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Ctghvekg.js')).default;
const server_id = "src/routes/dashboard/+page.server.js";
const imports = ["_app/immutable/nodes/6.DXwP9NRq.js","_app/immutable/chunks/scheduler.DOp8wpeX.js","_app/immutable/chunks/index.DWy7Bods.js","_app/immutable/chunks/each.xxwK4Lbk.js","_app/immutable/chunks/MultiSelect.CdzMrb2V.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Badge.DEbT3qjz.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/index.BQaFFxeS.js","_app/immutable/chunks/GradientButton.DdhgmlZd.js","_app/immutable/chunks/Button.BXa4MMB8.js","_app/immutable/chunks/Search.C7MWu5Gt.js","_app/immutable/chunks/Wrapper.Dkt-i6bG.js","_app/immutable/chunks/Input.Co8tTmGU.js","_app/immutable/chunks/Select.CbOpMfno.js","_app/immutable/chunks/FilterSolid.k7JC76lm.js","_app/immutable/chunks/Card.B-RoMR1e.js","_app/immutable/chunks/Frame.CkqC4DDT.js","_app/immutable/chunks/entry.DBH_V7Gc.js","_app/immutable/chunks/index.DELnobZO.js","_app/immutable/chunks/index.DpqlAqME.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.naqoLmSw.js","_app/immutable/chunks/stores.DJoIe9TJ.js"];
const stylesheets = ["_app/immutable/assets/Toaster.CLpmFrbv.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=6-pCzKwQ7_.js.map
