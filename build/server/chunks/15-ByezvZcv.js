import { E as getUserWithMatchingEmail, A as getSections, B as getUnavailable, g as getUserFromSessionDB, G as createBaseRequestDB2, F as getLatestBaseRequestID, H as createClassRequestDB, D as getUsersWithAccessLevel, q as insertIntoTableDB } from './db-D_ZfyofE.js';
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

const index = 15;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D7wblv8B.js')).default;
const server_id = "src/routes/dashboard/observation-form/+page.server.js";
const imports = ["_app/immutable/nodes/15.A5sHwjmd.js","_app/immutable/chunks/scheduler.DOp8wpeX.js","_app/immutable/chunks/index.DWy7Bods.js","_app/immutable/chunks/each.xxwK4Lbk.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/index.BQaFFxeS.js","_app/immutable/chunks/Frame.CkqC4DDT.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/GradientButton.DdhgmlZd.js","_app/immutable/chunks/Button.BXa4MMB8.js","_app/immutable/chunks/Card.B-RoMR1e.js","_app/immutable/chunks/Label.CeVi60PH.js","_app/immutable/chunks/Input.Co8tTmGU.js","_app/immutable/chunks/Wrapper.Dkt-i6bG.js","_app/immutable/chunks/Select.CbOpMfno.js","_app/immutable/chunks/Tabs.Bb_5r9lH.js","_app/immutable/chunks/index.DELnobZO.js","_app/immutable/chunks/ChevronLeftOutline.Dk26zTC0.js","_app/immutable/chunks/TrashBinSolid.CeouKbXI.js"];
const stylesheets = ["_app/immutable/assets/14.C4fDKZK4.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=15-ByezvZcv.js.map
