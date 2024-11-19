import { S as SESSION_COOKIE_NAME } from './constants-DlhdG_zK.js';
import './db-D_ZfyofE.js';
import { r as redirect } from './index-DHSpIlkf.js';
import 'pg';

const actions = {
  logout: async ({ request, cookies }) => {
    cookies.delete(SESSION_COOKIE_NAME, { path: "/" });
    throw redirect(303, "/");
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 18;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DZCB5d_G.js')).default;
const server_id = "src/routes/logout/+page.server.js";
const imports = ["_app/immutable/nodes/18.KE55MTW5.js","_app/immutable/chunks/scheduler.DOp8wpeX.js","_app/immutable/chunks/index.DWy7Bods.js","_app/immutable/chunks/Button.BXa4MMB8.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/Card.B-RoMR1e.js","_app/immutable/chunks/Frame.CkqC4DDT.js","_app/immutable/chunks/ChevronLeftOutline.Dk26zTC0.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=18-BxEDw9vm.js.map
