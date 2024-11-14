import { c as getEquipmentDB } from './db-D213Zxh3.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-CHzqB4NL.js')).default;
const server_id = "src/routes/csv-stuff/+page.server.js";
const imports = ["_app/immutable/nodes/5.CFCsOh3s.js","_app/immutable/chunks/scheduler.DARHZdcz.js","_app/immutable/chunks/index.BOD7_7ti.js","_app/immutable/chunks/Button.DmkqkWvm.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/Card.B-2JLgPn.js","_app/immutable/chunks/Frame.DOMMRkx1.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=5-D6iJVSpu.js.map
