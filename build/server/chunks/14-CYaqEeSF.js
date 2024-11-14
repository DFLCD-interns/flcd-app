import { D as getUserWithMatchingEmail, y as getSections, z as getUnavailable, g as getUserFromSessionDB, E as createBaseRequestDB2, F as getLatestBaseRequestID, G as createClassRequestDB, H as getUsersWithAccessLevel, o as insertIntoTableDB } from './db-D213Zxh3.js';
import { S as SESSION_COOKIE_NAME } from './constants-DlhdG_zK.js';
import 'pg';

async function insertApprovals(request_id, instructor = null, staff, fic, chair = null) {
  const insertApproval = async (approver_id, not_null) => {
    const fd = new FormData();
    fd.append("status", "pending");
    fd.append("request_id", request_id);
    if (not_null == 1) fd.append("approver_id", approver_id);
    try {
      await insertIntoTableDB("approvals", fd);
    } catch (error) {
      throw new Error("Error writing to database");
    }
  };
  if (instructor) await insertApproval(instructor.id, 1);
  await insertApproval(null, 0);
  if (fic) await insertApproval(fic.id, 1);
  if (chair) await insertApproval(chair.id, 1);
}
async function createObservationRequestServer(session_id, purpose, timeslots, instructor) {
  const user = await getUserFromSessionDB(session_id);
  await createBaseRequestDB2(purpose, user.user_id, instructor.id);
  const base_req_id = await getLatestBaseRequestID(user.user_id);
  for (let i = 0; i < timeslots.length; i++) {
    await createClassRequestDB(timeslots[i].class_id, base_req_id, timeslots[i].timeslot, timeslots[i].observe_date);
  }
  const fic = await getUsersWithAccessLevel(2);
  await insertApprovals(base_req_id, instructor, null, fic[0], null);
  return 1;
}
const actions = {
  createObservationRequest: async ({ request, cookies }) => {
    const formData = await request.formData();
    const purpose = "Observation";
    const class_id = formData.get("class_id");
    const selectedDates = formData.getAll("selectedDate");
    const selectedSlots = formData.getAll("selectedSlot");
    let timeslots = [];
    for (let i = 0; i < selectedDates.length; i++) {
      timeslots.push({
        class_id,
        timeslot: selectedSlots[i],
        observe_date: selectedDates[i]
      });
    }
    let instructor;
    let instructorEmail;
    instructorEmail = formData.get("instructor_email");
    if (!instructorEmail.endsWith("@up.edu.ph")) {
      instructorEmail = `${instructorEmail}@up.edu.ph`;
    }
    instructor = await getUserWithMatchingEmail(instructorEmail);
    if (instructor.length < 1 || instructor[0].access_level !== 4) {
      return {
        status: 409,
        body: {
          message: "Email of coordinating faculty is not valid.",
          error: void 0
        }
      };
    }
    instructor = instructor[0];
    const server_req = await createObservationRequestServer(cookies.get(SESSION_COOKIE_NAME), purpose, timeslots, instructor);
    return {
      success: true,
      base_request_uuid: server_req
    };
  }
};
async function load() {
  return {
    amclasses: await getSections("AM"),
    pmclasses: await getSections("PM"),
    unavailable: await getUnavailable()
  };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 14;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Ga-i0BqQ.js')).default;
const server_id = "src/routes/dashboard/observation-form/+page.server.js";
const imports = ["_app/immutable/nodes/14.CrnaV5Hb.js","_app/immutable/chunks/scheduler.DARHZdcz.js","_app/immutable/chunks/index.BOD7_7ti.js","_app/immutable/chunks/each.BDsanpQE.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/index.BW-EZrt_.js","_app/immutable/chunks/Frame.DOMMRkx1.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/GradientButton.BraljpKT.js","_app/immutable/chunks/Button.DmkqkWvm.js","_app/immutable/chunks/Card.B-2JLgPn.js","_app/immutable/chunks/Label.CnKRS200.js","_app/immutable/chunks/Input.BZuiHxSs.js","_app/immutable/chunks/Wrapper.DDar7dFK.js","_app/immutable/chunks/Select.CfcdSY0U.js","_app/immutable/chunks/Tabs.DrgSt1v_.js","_app/immutable/chunks/index.CyH2wcdx.js","_app/immutable/chunks/ChevronLeftOutline.Cs3qs69M.js","_app/immutable/chunks/TrashBinSolid.BBSA_bow.js"];
const stylesheets = ["_app/immutable/assets/16.C4fDKZK4.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=14-CYaqEeSF.js.map
