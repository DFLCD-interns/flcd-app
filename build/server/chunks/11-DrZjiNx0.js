import { w as addUnavailableSlot, x as deleteUnavailableSlot, y as getSections, z as getUnavailable, A as getUnavailableWSection } from './db-D213Zxh3.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-vpGvE63-.js')).default;
const server_id = "src/routes/dashboard/databases/schedules/+page.server.js";
const imports = ["_app/immutable/nodes/11.Dv9rIngS.js","_app/immutable/chunks/scheduler.DARHZdcz.js","_app/immutable/chunks/index.BOD7_7ti.js","_app/immutable/chunks/each.BDsanpQE.js","_app/immutable/chunks/Button.DmkqkWvm.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.8vkCkPAV.js","_app/immutable/chunks/GradientButton.BraljpKT.js","_app/immutable/chunks/Label.CnKRS200.js","_app/immutable/chunks/Input.BZuiHxSs.js","_app/immutable/chunks/Wrapper.DDar7dFK.js","_app/immutable/chunks/Search.Bxq8L1DV.js","_app/immutable/chunks/Select.CfcdSY0U.js","_app/immutable/chunks/TrashBinOutline.CzhzF3hA.js","_app/immutable/chunks/Frame.DOMMRkx1.js","_app/immutable/chunks/CirclePlusSolid.CMCBW1LG.js","_app/immutable/chunks/PlusOutline.DcAzg-rI.js","_app/immutable/chunks/TrashBinSolid.BBSA_bow.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=11-DrZjiNx0.js.map
