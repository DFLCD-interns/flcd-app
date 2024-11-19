import { I as getRequestDetailsDB, g as getUserFromSessionDB, b as getFromTableDB, x as updateTableDB } from './db-D_ZfyofE.js';
import 'pg';

async function mailuser(subject, body, recipient) {
  try {
    const res = await fetch("http://127.0.0.1:5000/mail", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ subject, body: body.replaceAll(/ {4}/g, ""), recipient })
    });
    return res;
  } catch (error) {
    console.error("error sending email (could be faulty internet connection or flask problems):", error);
    return { ok: false };
  }
}
async function mailRequesterOnResponse(requesterName, requestName, approverName, remarks, statuses, approversEmails, assignedItems, requesterEmail) {
  const subject = `[FLCD-APP] New response to your request!`;
  const recipient = "legara.cedric@gmail.com";
  const status = statuses.map(
    (status2, index) => status2 == "approved" ? `approved by ${approversEmails[index]}` : status2 == "pending" ? `pending with ${approversEmails[index] ?? "any faculty staff"}` : status2 == "declined" ? `declined by ${approversEmails[index]}` : `unknown status with ${approversEmails[index] ?? "???"}`
  ).join(", ");
  const _assignedItems = assignedItems.filter((_item) => _item != null).join("\n• ");
  const body = `Dear DFLCD eLaan user ${requesterName},

    Your ${requestName} request has a new response by ${approverName}, with the following remarks:

    ${remarks ? '"' + remarks + '"' : "(no remarks)"}
    
    Your request's status is: ${status}, with the following ${requestName == "observation" ? "child" : requestName + "s"} assigned to you:

    ${_assignedItems ? "• " + _assignedItems : "(nothing assigned as of now)"}
    
    This is an automated email; please redirect all your inquiries to the listed approvers above.`;
  return await mailuser(subject, body, recipient);
}
const load = async ({ cookies, params, parent }) => {
  try {
    const parentData = await parent();
    const requestDetails = await getRequestDetailsDB(params.table, params.reqid);
    const requestInfo = parentData.requestsInfo.find((req) => req.id == params.reqid && req.table === params.table);
    const requestRows = requestInfo?.requestRows?.filter((row) => row.request_id == params.reqid);
    const totalStatus = requestInfo?.status;
    const displayNames = requestInfo?.approvalsInfo?.displayNames;
    const statuses = requestInfo?.approvalsInfo?.statuses;
    const canRespond = totalStatus && displayNames && statuses ? totalStatus !== "approved" && totalStatus !== "declined" && (parentData.user_access_level_label === displayNames[Math.max(statuses?.findLastIndex((status) => status === "approved") || 0, 0)] || parentData.user_access_level_label === displayNames[Math.max(statuses?.findIndex((status) => status === "pending") || 0, 0)]) : false;
    return {
      approvalForms: {
        totalStatus,
        statuses,
        displayNames,
        remarks: requestInfo?.approvalsInfo?.remarks,
        canRespond
      },
      requestType: params.table?.split("_")[0],
      requestID: params.reqid,
      requestDetails,
      requestName: requestInfo?.name,
      requestedItems: requestInfo?.requestedItems,
      startDate: requestInfo?.date,
      endDate: requestInfo?.actual_date_end,
      requestRows
    };
  } catch (error) {
    console.error("Load failed:", error.message);
    return { error };
  }
};
const actions = {
  approve: async ({ cookies, request, params }) => {
    try {
      const session = cookies.get("session_id");
      const user = await getUserFromSessionDB(session);
      const inputFormData = await request.formData();
      const updateFormData = new FormData();
      updateFormData.append("status", inputFormData.get("status"));
      if (inputFormData.get("remarks")) updateFormData.append("remarks", inputFormData.get("remarks"));
      const searchFormData = new FormData();
      searchFormData.append("request_id", params.reqid);
      searchFormData.append("approver_id", user?.user_id);
      if (user?.access_level === 3 && !(await getFromTableDB("approvals", searchFormData)).body.result.rows[0]) {
        searchFormData.set("approver_id", null);
        updateFormData.append("approver_id", user?.user_id);
      }
      const response3 = await updateTableDB("approvals", searchFormData, updateFormData);
      const remarks = inputFormData.get("remarks");
      inputFormData.delete("remarks");
      inputFormData.delete("status");
      const assignedItemIDs = [...inputFormData.values()];
      const itemReqIDs = [...inputFormData.keys()].map((key) => key.split("_")[2]);
      const type = [...inputFormData.keys()][0]?.split("_")[0];
      let response22 = { success: true };
      for (let i = 0; i < assignedItemIDs.length; i++) {
        if (!assignedItemIDs[i]) continue;
        const _searchFormData = new FormData();
        _searchFormData.append("id", itemReqIDs[i]);
        const _updateFormData = new FormData();
        if (type == "class") _updateFormData.append("assigned_child_id", assignedItemIDs[i]);
        else _updateFormData.append(`${type}_id`, assignedItemIDs[i] == -1 ? null : assignedItemIDs[i]);
        response22.success &&= (await updateTableDB(`${type}_requests`, _searchFormData, _updateFormData)).success;
      }
      const requesterID = (await getFromTableDB("base_requests", { "id": params.reqid })).body.result.rows[0]?.requester_id;
      const requester = (await getFromTableDB("users", { "id": requesterID })).body.result.rows[0];
      const requesterName = requester.first_name + " " + requester.last_name;
      const requesterEmail = requester.email;
      const requestName = type == "class" ? "observation" : type;
      const approverName = user.first_name + " " + user.last_name;
      const statuses = [];
      const _approversIDs = [];
      (await getFromTableDB("approvals", { "request_id": params.reqid })).body.result.rows?.forEach((row) => {
        statuses.push(row.status);
        _approversIDs.push(row.approver_id);
      });
      const approversEmails = [];
      for (const _id of _approversIDs) {
        approversEmails.push((await getFromTableDB("users", { "id": _id })).body.result.rows[0]?.email);
      }
      const _assignedItemsID = (await getFromTableDB(`${type}_requests`, { "request_id": params.reqid })).body.result.rows.map((row) => row.equipment_id || row.venue_id || row.assigned_child_id);
      const _table_name = type == "class" ? "childs" : type + "s";
      const assignedItems = [];
      for (const _id of _assignedItemsID) {
        if (type == "class" && assignedItems[0]) break;
        const _item = (await getFromTableDB(_table_name, { "id": _id })).body.result.rows[0];
        assignedItems.push(_item?.name);
      }
      const mailRes = await mailRequesterOnResponse(requesterName, requestName, approverName, remarks, statuses, approversEmails, assignedItems, requesterEmail);
      return { success: response3?.success && response22?.success, mail_success: mailRes.ok || false };
    } catch (error) {
      console.error("Action failed:", error.message);
      return { success: response?.success && response2?.success, mail_success: false };
    }
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 16;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BdxnsSPF.js')).default;
const server_id = "src/routes/dashboard/request-details/[table]-[reqid]/+page.server.js";
const imports = ["_app/immutable/nodes/16.Bxn_3VOQ.js","_app/immutable/chunks/scheduler.DOp8wpeX.js","_app/immutable/chunks/index.DWy7Bods.js","_app/immutable/chunks/each.xxwK4Lbk.js","_app/immutable/chunks/Badge.DEbT3qjz.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/index.BQaFFxeS.js","_app/immutable/chunks/GradientButton.DdhgmlZd.js","_app/immutable/chunks/Button.BXa4MMB8.js","_app/immutable/chunks/ArrowLeftOutline.B1YlDHwL.js","_app/immutable/chunks/TrashBinSolid.CeouKbXI.js","_app/immutable/chunks/index.DpqlAqME.js","_app/immutable/chunks/Frame.CkqC4DDT.js","_app/immutable/chunks/index.DELnobZO.js","_app/immutable/chunks/Wrapper.Dkt-i6bG.js","_app/immutable/chunks/ExclamationCircleOutline.VthikqZ9.js","_app/immutable/chunks/entry.CL2sXVfz.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=16-fXzqcHX_.js.map
