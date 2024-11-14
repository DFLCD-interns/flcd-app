import { S as SESSION_COOKIE_NAME } from './constants-DlhdG_zK.js';
import './db-D213Zxh3.js';
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

const index = 17;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CYLKckKG.js')).default;
const server_id = "src/routes/logout/+page.server.js";
const imports = ["_app/immutable/nodes/17.Pkz8syOQ.js","_app/immutable/chunks/scheduler.DARHZdcz.js","_app/immutable/chunks/index.BOD7_7ti.js","_app/immutable/chunks/Button.DmkqkWvm.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/Card.B-2JLgPn.js","_app/immutable/chunks/Frame.DOMMRkx1.js","_app/immutable/chunks/ChevronLeftOutline.Cs3qs69M.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=17-CjTj0PgI.js.map
