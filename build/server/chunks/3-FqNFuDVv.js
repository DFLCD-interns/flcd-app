import { S as SESSION_COOKIE_NAME } from './constants-DlhdG_zK.js';
import { c as createSessionByEmail } from './auth-DfRGThfN.js';
import { f as fail, r as redirect } from './index-DHSpIlkf.js';
import 'uuid';
import './db-D213Zxh3.js';
import 'pg';
import 'crypto';

const actions = {
  signin: async ({ request, cookies }) => {
    const formData = await request.formData();
    const password = formData.get("password");
    let email = formData.get("email");
    if (!email.endsWith("@up.edu.ph")) {
      email = `${email}@up.edu.ph`;
    }
    try {
      const sessionCreationResult = await createSessionByEmail(email, password);
      cookies.set(SESSION_COOKIE_NAME, sessionCreationResult.id, {
        path: "/",
        httpOnly: false,
        sameSite: "lax",
        secure: false,
        maxAge: 60 * 60 * 12
      });
    } catch (error) {
      console.error("Error: ", error.message);
      return fail(500, {
        email,
        password,
        message: error.message
      });
    }
    throw redirect(303, "/dashboard");
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CmR6h-75.js')).default;
const server_id = "src/routes/+page.server.js";
const imports = ["_app/immutable/nodes/3.D0yl7VB3.js","_app/immutable/chunks/scheduler.DARHZdcz.js","_app/immutable/chunks/index.BOD7_7ti.js","_app/immutable/chunks/forms.BovpqlDw.js","_app/immutable/chunks/entry.B3oirdxR.js","_app/immutable/chunks/index.CyH2wcdx.js","_app/immutable/chunks/Button.DmkqkWvm.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/Label.CnKRS200.js","_app/immutable/chunks/Input.BZuiHxSs.js","_app/immutable/chunks/Wrapper.DDar7dFK.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.D_y5BEFO.js"];
const stylesheets = ["_app/immutable/assets/3.CC4ivnEq.css","_app/immutable/assets/Toaster.CLpmFrbv.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=3-FqNFuDVv.js.map
