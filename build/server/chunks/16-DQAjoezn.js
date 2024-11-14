import { g as getUserFromSessionDB, H as getUsersWithAccessLevel, D as getUserWithMatchingEmail, o as insertIntoTableDB, F as getLatestBaseRequestID } from './db-D213Zxh3.js';
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
  submitEquipmentRequest: async ({ request, cookies }) => {
    const session = cookies.get("session_id");
    const user = await getUserFromSessionDB(session);
    const data = await request.formData();
    const staff = await getUsersWithAccessLevel(3);
    const isFLCD = user?.access_level === 5;
    let instructor;
    let instructorEmail;
    if (isFLCD) {
      instructorEmail = data.get("instructor_email");
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
      await insertApprovals(request_id, instructor, staff[0], fic[0]);
      const promised_start_time = data.get("promised_start_time");
      const promised_end_time = data.get("promised_end_time");
      const location = data.get("location");
      const selectedEq = data.getAll("selectedEq");
      for (let eq of selectedEq) {
        const quantity = parseInt(data.get(eq));
        for (let i = 0; i < quantity; i++) {
          const fd = {
            promised_start_time,
            promised_end_time,
            location,
            equipment_type: eq,
            request_id
          };
          const form_data = new FormData();
          for (let key in fd) {
            form_data.append(key, fd[key]);
          }
          await insertIntoTableDB("equipment_requests", form_data);
        }
      }
      return {
        status: 200,
        body: {
          message: "Form submitted successfully!",
          data: "owo this is Clarisse"
        }
      };
    } catch (error) {
      console.error("meow");
      console.error(error.message);
      return {
        status: 500,
        body: {
          message: error.message,
          error: error.message
        }
      };
    }
  },
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

const index = 16;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-E9OPopBm.js')).default;
const server_id = "src/routes/dashboard/requests-form/+page.server.js";
const imports = ["_app/immutable/nodes/16.BzGDV44H.js","_app/immutable/chunks/scheduler.DARHZdcz.js","_app/immutable/chunks/index.BOD7_7ti.js","_app/immutable/chunks/each.BDsanpQE.js","_app/immutable/chunks/Button.DmkqkWvm.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/GradientButton.BraljpKT.js","_app/immutable/chunks/Card.B-2JLgPn.js","_app/immutable/chunks/Frame.DOMMRkx1.js","_app/immutable/chunks/Label.CnKRS200.js","_app/immutable/chunks/Input.BZuiHxSs.js","_app/immutable/chunks/Wrapper.DDar7dFK.js","_app/immutable/chunks/MultiSelect.CGv41oEy.js","_app/immutable/chunks/Badge.6depYmLh.js","_app/immutable/chunks/index.BW-EZrt_.js","_app/immutable/chunks/Tabs.DrgSt1v_.js","_app/immutable/chunks/index.CyH2wcdx.js","_app/immutable/chunks/ChevronLeftOutline.Cs3qs69M.js","_app/immutable/chunks/forms.BovpqlDw.js","_app/immutable/chunks/entry.B3oirdxR.js"];
const stylesheets = ["_app/immutable/assets/16.C4fDKZK4.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=16-DQAjoezn.js.map
