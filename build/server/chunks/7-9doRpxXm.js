import { q as insertIntoTableDB } from './db-D_ZfyofE.js';
import 'pg';

const actions = {
  createBatch: async ({ cookies, request }) => {
    try {
      const data = await request.formData();
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
      const response2 = await insertIntoTableDB("classes", data);
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

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-cgErmE5X.js')).default;
const server_id = "src/routes/dashboard/classes/+page.server.js";
const imports = ["_app/immutable/nodes/7.BryLKrIO.js","_app/immutable/chunks/scheduler.DOp8wpeX.js","_app/immutable/chunks/index.DWy7Bods.js"];
const stylesheets = ["_app/immutable/assets/7.CgDVVWHk.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=7-9doRpxXm.js.map
