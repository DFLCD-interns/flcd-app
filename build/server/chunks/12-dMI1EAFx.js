import { w as deleteFromTableDB, j as getUsersListDB, x as updateTableDB } from './db-D_ZfyofE.js';
import { f as fail } from './index-DHSpIlkf.js';
import 'pg';

const actions = {
  deleteUser: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id");
    const fd = { id };
    const form_data = new FormData();
    for (let key in fd) {
      form_data.append(key, fd[key]);
    }
    try {
      await deleteFromTableDB("users", form_data);
    } catch (error) {
      console.error("Error: ", error.message);
      return fail(500, {
        message: error.message
      });
    }
  },
  editUser: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id");
    const first_name = formData.get("first_name");
    const old_first_name = formData.get("old_first_name");
    const last_name = formData.get("last_name");
    const old_last_name = formData.get("old_last_name");
    const email = formData.get("email");
    const old_email = formData.get("old_email");
    const phone = formData.get("phone");
    const old_phone = formData.get("old_phone");
    const student_number = formData.get("student_number");
    const old_student_number = formData.get("old_student_number");
    const course = formData.get("course");
    const old_course = formData.get("old_course");
    const department = formData.get("department");
    const old_department = formData.get("old_department");
    const access_level = formData.get("access_level");
    const old_access_level = formData.get("old_access_level");
    if (first_name === old_first_name && last_name === old_last_name && email === old_email && phone === old_phone && student_number == old_student_number && course == old_course && department == old_department && access_level == old_access_level) {
      return fail(500, {
        message: "No changes made."
      });
    }
    let users = await getUsersListDB();
    let userStudentNumbers = users.map((item) => item.student_number);
    if (student_number !== old_student_number) {
      if (userStudentNumbers.includes(student_number)) {
        return fail(500, {
          message: "This student number already exists!"
        });
      }
    }
    let userEmails = users.map((item) => item.email);
    console.log(old_email);
    if (email !== old_email) {
      if (userEmails.includes(email)) {
        return fail(500, {
          message: "This email already exists!"
        });
      }
    }
    const id_fd = { id };
    const id_data = new FormData();
    for (let key in id_fd) {
      id_data.append(key, id_fd[key]);
    }
    const fd = {
      first_name,
      last_name,
      email,
      phone,
      student_number,
      course,
      department,
      access_level
    };
    const form_data = new FormData();
    for (let key in fd) {
      form_data.append(key, fd[key]);
    }
    try {
      await updateTableDB("users", id_data, form_data);
    } catch (error) {
      console.error("Error: ", error.message);
      return fail(500, {
        message: error.message
      });
    }
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CGJ3Q8_t.js')).default;
const server_id = "src/routes/dashboard/databases/users/+page.server.js";
const imports = ["_app/immutable/nodes/12.BnVAqBK5.js","_app/immutable/chunks/scheduler.DOp8wpeX.js","_app/immutable/chunks/index.DWy7Bods.js","_app/immutable/chunks/each.xxwK4Lbk.js","_app/immutable/chunks/Button.BXa4MMB8.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/GradientButton.DdhgmlZd.js","_app/immutable/chunks/Label.CeVi60PH.js","_app/immutable/chunks/Input.Co8tTmGU.js","_app/immutable/chunks/Wrapper.Dkt-i6bG.js","_app/immutable/chunks/MultiSelect.CdzMrb2V.js","_app/immutable/chunks/Badge.DEbT3qjz.js","_app/immutable/chunks/index.BQaFFxeS.js","_app/immutable/chunks/Search.C7MWu5Gt.js","_app/immutable/chunks/TrashBinOutline.B6LB4Ldt.js","_app/immutable/chunks/Frame.CkqC4DDT.js","_app/immutable/chunks/CloseOutline.vdu5KTRw.js","_app/immutable/chunks/EditOutline.z7FUiLX2.js","_app/immutable/chunks/FilterSolid.k7JC76lm.js","_app/immutable/chunks/forms.BXne0zmk.js","_app/immutable/chunks/entry.DBH_V7Gc.js","_app/immutable/chunks/index.DELnobZO.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.naqoLmSw.js"];
const stylesheets = ["_app/immutable/assets/Toaster.CLpmFrbv.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=12-dMI1EAFx.js.map
