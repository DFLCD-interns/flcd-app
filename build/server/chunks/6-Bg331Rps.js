import { g as getUserFromSessionDB, m as getUserBaseRequests, n as deleteRequest } from './db-D213Zxh3.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-BvWTb3mC.js')).default;
const server_id = "src/routes/dashboard/+page.server.js";
const imports = ["_app/immutable/nodes/6.CewXK6du.js","_app/immutable/chunks/scheduler.DARHZdcz.js","_app/immutable/chunks/index.BOD7_7ti.js","_app/immutable/chunks/each.BDsanpQE.js","_app/immutable/chunks/MultiSelect.CGv41oEy.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Badge.6depYmLh.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/index.BW-EZrt_.js","_app/immutable/chunks/GradientButton.BraljpKT.js","_app/immutable/chunks/Button.DmkqkWvm.js","_app/immutable/chunks/Search.Bxq8L1DV.js","_app/immutable/chunks/Wrapper.DDar7dFK.js","_app/immutable/chunks/Input.BZuiHxSs.js","_app/immutable/chunks/Select.CfcdSY0U.js","_app/immutable/chunks/FilterSolid.DGsfzOaO.js","_app/immutable/chunks/Card.B-2JLgPn.js","_app/immutable/chunks/Frame.DOMMRkx1.js","_app/immutable/chunks/entry.B3oirdxR.js","_app/immutable/chunks/index.CyH2wcdx.js","_app/immutable/chunks/index.DpqlAqME.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.D_y5BEFO.js","_app/immutable/chunks/stores.CDvgm-dG.js"];
const stylesheets = ["_app/immutable/assets/Toaster.CLpmFrbv.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=6-Bg331Rps.js.map
