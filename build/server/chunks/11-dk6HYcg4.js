import { y as addUnavailableSlot, z as deleteUnavailableSlot, A as getSections, B as getUnavailable, C as getUnavailableWSection } from './db-D_ZfyofE.js';
import 'pg';

const actions = {
  addUnavailableSlots: async ({ request }) => {
    const formData = await request.formData();
    const sections = formData.getAll("section");
    const timeslots = formData.getAll("timeslot");
    const dates = formData.getAll("date");
    for (let i = 0; i < sections.length; i++) {
      await addUnavailableSlot(sections[i], dates[i], timeslots[i]);
    }
  },
  deleteRow: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id");
    await deleteUnavailableSlot(id);
  }
};
async function load() {
  return {
    amclasses: await getSections("AM"),
    pmclasses: await getSections("PM"),
    unavailable: await getUnavailable(),
    unavailable2: await getUnavailableWSection()
  };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 11;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Bzy00ej3.js')).default;
const server_id = "src/routes/dashboard/databases/schedules/+page.server.js";
const imports = ["_app/immutable/nodes/11.CLFIxx21.js","_app/immutable/chunks/scheduler.DOp8wpeX.js","_app/immutable/chunks/index.DWy7Bods.js","_app/immutable/chunks/each.xxwK4Lbk.js","_app/immutable/chunks/Button.BXa4MMB8.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/GradientButton.DdhgmlZd.js","_app/immutable/chunks/Label.CeVi60PH.js","_app/immutable/chunks/Input.Co8tTmGU.js","_app/immutable/chunks/Wrapper.Dkt-i6bG.js","_app/immutable/chunks/Search.C7MWu5Gt.js","_app/immutable/chunks/Select.CbOpMfno.js","_app/immutable/chunks/TrashBinOutline.B6LB4Ldt.js","_app/immutable/chunks/Frame.CkqC4DDT.js","_app/immutable/chunks/CirclePlusSolid.CJvFe9yH.js","_app/immutable/chunks/PlusOutline.Boae9Dws.js","_app/immutable/chunks/TrashBinSolid.CeouKbXI.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=11-dk6HYcg4.js.map
