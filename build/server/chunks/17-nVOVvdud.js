import { g as getUserFromSessionDB, D as getUsersWithAccessLevel, E as getUserWithMatchingEmail, q as insertIntoTableDB, F as getLatestBaseRequestID } from './db-D_ZfyofE.js';
import 'pg';

async function insertBaseRequest(user, data, isFLCD, instructor = null) {
  const base_fd = new FormData();
  base_fd.append("requester_id", user?.user_id);
  if (isFLCD && instructor) base_fd.append("instructor_id", instructor.id);
  base_fd.append("purpose", data.get("purpose"));
  if (!isFLCD) base_fd.append("affiliation", data.get("affiliation"));
  try {
    await insertIntoTableDB("base_requests", base_fd);
    const request_id = await getLatestBaseRequestID(user?.user_id);
    return request_id;
  } catch (error) {
    throw new Error("Error writing to database");
  }
}
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
  if (staff) await insertApproval(staff.id, 0);
  if (fic) await insertApproval(fic.id, 1);
  if (chair) await insertApproval(chair.id, 1);
}
const actions = {
  submitVenueRequest: async ({ request, cookies }) => {
    const session = cookies.get("session_id");
    const user = await getUserFromSessionDB(session);
    const data = await request.formData();
    const staff = await getUsersWithAccessLevel(3);
    const isFLCD = user?.access_level === 5;
    let instructor;
    if (isFLCD) {
      let instructorEmail = data.get("instructor_email");
      if (!instructorEmail.endsWith("@up.edu.ph")) {
        instructorEmail = `${instructorEmail}@up.edu.ph`;
      }
      instructor = await getUserWithMatchingEmail(instructorEmail);
      if (instructor.length < 1 || instructor[0]?.access_level !== 4) {
        return {
          status: 409,
          body: {
            message: "Email of coordinating faculty is not valid.",
            error: void 0
          }
        };
      }
      instructor = instructor[0];
    }
    try {
      const request_id = await insertBaseRequest(user, data, isFLCD, instructor);
      const fic = await getUsersWithAccessLevel(2);
      const chair = await getUsersWithAccessLevel(1);
      await insertApprovals(request_id, instructor, staff[0], fic[0], chair[0]);
      const selectedVenue = data.getAll("selectedVenue");
      for (let venueID of selectedVenue) {
        const fd = {
          date_needed: data.get("date_needed"),
          start_time: data.get("start_time"),
          end_time: data.get("end_time"),
          venue_id: parseInt(venueID),
          request_id
        };
        const form_data = new FormData();
        for (let key in fd) {
          form_data.append(key, fd[key]);
        }
        await insertIntoTableDB("venue_requests", form_data);
      }
      return {
        status: 200,
        body: {
          message: "Form submitted successfully!",
          data: "owo this is Clarisse"
        }
      };
    } catch (error) {
      return {
        status: 500,
        body: {
          message: error.message,
          error: error.message
        }
      };
    }
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 17;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B4tyOJTc.js')).default;
const server_id = "src/routes/dashboard/venue-requests/+page.server.js";
const imports = ["_app/immutable/nodes/17.C7Jw2O-H.js","_app/immutable/chunks/scheduler.DOp8wpeX.js","_app/immutable/chunks/index.DWy7Bods.js","_app/immutable/chunks/Button.BXa4MMB8.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/GradientButton.DdhgmlZd.js","_app/immutable/chunks/Card.B-RoMR1e.js","_app/immutable/chunks/Frame.CkqC4DDT.js","_app/immutable/chunks/Label.CeVi60PH.js","_app/immutable/chunks/Input.Co8tTmGU.js","_app/immutable/chunks/Wrapper.Dkt-i6bG.js","_app/immutable/chunks/MultiSelect.CdzMrb2V.js","_app/immutable/chunks/each.xxwK4Lbk.js","_app/immutable/chunks/Badge.DEbT3qjz.js","_app/immutable/chunks/index.BQaFFxeS.js","_app/immutable/chunks/Tabs.Bb_5r9lH.js","_app/immutable/chunks/index.DELnobZO.js","_app/immutable/chunks/ChevronLeftOutline.Dk26zTC0.js","_app/immutable/chunks/forms.BXne0zmk.js","_app/immutable/chunks/entry.DBH_V7Gc.js"];
const stylesheets = ["_app/immutable/assets/17.BxSdjKQT.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=17-nVOVvdud.js.map
