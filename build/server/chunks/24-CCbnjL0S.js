import { S as SESSION_COOKIE_NAME } from './constants-DlhdG_zK.js';
import { b as createUser, c as createSessionByEmail } from './auth-DfRGThfN.js';
import { f as fail, r as redirect } from './index-DHSpIlkf.js';
import 'uuid';
import './db-D213Zxh3.js';
import 'pg';
import 'crypto';

const actions = {
  register: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const confirm_password = formData.get("confirm_password");
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const phone = formData.get("phone");
    let department = formData.get("department");
    if (!email.endsWith("@up.edu.ph")) {
      return fail(500, {
        email,
        password,
        message: "Please use your UP mail."
      });
    }
    if (!password || password !== confirm_password) {
      return fail(500, {
        email,
        password,
        message: "Passwords don't match!"
      });
    }
    let access_level;
    if (department == "DFLCD") {
      access_level = 5;
    } else {
      access_level = 6;
    }
    try {
      const createUserResult = await createUser(first_name, last_name, email, password, phone, null, null, department, access_level);
      const sessionCreationResult = await createSessionByEmail(email, password);
      cookies.set(SESSION_COOKIE_NAME, sessionCreationResult.id, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
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
    throw redirect(303, "/dashboard?registered=true");
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 24;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-MGU_ATAr.js')).default;
const server_id = "src/routes/register/teacher/+page.server.js";
const imports = ["_app/immutable/nodes/24.BMBnxb6i.js","_app/immutable/chunks/scheduler.DARHZdcz.js","_app/immutable/chunks/index.BOD7_7ti.js","_app/immutable/chunks/forms.BovpqlDw.js","_app/immutable/chunks/entry.B3oirdxR.js","_app/immutable/chunks/index.CyH2wcdx.js","_app/immutable/chunks/Button.DmkqkWvm.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/Label.CnKRS200.js","_app/immutable/chunks/Input.BZuiHxSs.js","_app/immutable/chunks/Wrapper.DDar7dFK.js","_app/immutable/chunks/Select.CfcdSY0U.js","_app/immutable/chunks/each.BDsanpQE.js","_app/immutable/chunks/ArrowLeftOutline.Bd_NjZR2.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.D_y5BEFO.js"];
const stylesheets = ["_app/immutable/assets/22.BILfLaw9.css","_app/immutable/assets/Toaster.CLpmFrbv.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=24-CCbnjL0S.js.map
