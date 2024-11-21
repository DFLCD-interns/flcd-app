import { c as getEquipmentDB } from './db-D_ZfyofE.js';
import 'pg';

async function load() {
  return {
    equipmentTable: await getEquipmentDB()
  };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BQxmrnYR.js')).default;
const server_id = "src/routes/csv-stuff/+page.server.js";
const imports = ["_app/immutable/nodes/5.DZKT6TEY.js","_app/immutable/chunks/scheduler.DOp8wpeX.js","_app/immutable/chunks/index.DWy7Bods.js","_app/immutable/chunks/Button.BXa4MMB8.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/Card.B-RoMR1e.js","_app/immutable/chunks/Frame.CkqC4DDT.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=5-C1QnDr8c.js.map
