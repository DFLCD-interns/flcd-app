import { B as getUsersListDB, C as getUserTypesDB } from './db-D213Zxh3.js';
import 'pg';

async function load() {
  return {
    user: await getUsersListDB(),
    userTypes: await getUserTypesDB()
  };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-gK8YkFGg.js')).default;
const server_id = "src/routes/dashboard/databases/users/+page.server.js";
const imports = ["_app/immutable/nodes/12.Cfb8cfMG.js","_app/immutable/chunks/scheduler.DARHZdcz.js","_app/immutable/chunks/index.BOD7_7ti.js","_app/immutable/chunks/each.BDsanpQE.js","_app/immutable/chunks/GradientButton.BraljpKT.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/Button.DmkqkWvm.js","_app/immutable/chunks/Label.CnKRS200.js","_app/immutable/chunks/Input.BZuiHxSs.js","_app/immutable/chunks/Wrapper.DDar7dFK.js","_app/immutable/chunks/MultiSelect.CGv41oEy.js","_app/immutable/chunks/Badge.6depYmLh.js","_app/immutable/chunks/index.BW-EZrt_.js","_app/immutable/chunks/Search.Bxq8L1DV.js","_app/immutable/chunks/TrashBinOutline.CzhzF3hA.js","_app/immutable/chunks/Frame.DOMMRkx1.js","_app/immutable/chunks/EditOutline.BiaciCHH.js","_app/immutable/chunks/FilterSolid.DGsfzOaO.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=12-C10E_jB3.js.map
