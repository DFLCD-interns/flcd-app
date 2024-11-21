import { c as create_ssr_component, d as each, v as validate_component, e as escape, b as add_attribute } from './ssr-D-0G9OQq.js';
import { B as Button } from './Button-Dk4SyiMB.js';
import { L as Label } from './Label-YZOSSFZ8.js';
import { I as Input } from './Input-DIWB2hTs.js';
import { S as Select } from './Select-cnLI2Umv.js';
import { P as PlusOutline } from './PlusOutline-DHpaaUqu.js';
import { T as TrashBinSolid } from './TrashBinSolid-BziiwHWz.js';
import './bundle-mjs-BLGuyV0D.js';
import './Wrapper-DxnNrkYf.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let amclasses = data.amclasses;
  let pmclasses = data.pmclasses;
  let unavailable = data.unavailable2;
  let inputSlots = [
    {
      amorpm: "",
      section: "",
      date: "",
      time: ""
    }
  ];
  let amslots = [
    { name: "8:00 - 9:00", value: "8-9" },
    { name: "9:00 - 10:00", value: "9-10" },
    { name: "10:00 - 11:00", value: "10-11" }
  ];
  let pmslots = [
    { name: "1:00 - 2:00", value: "1-2" },
    { name: "2:00 - 3:00", value: "2-3" },
    { name: "3:00 - 4:00", value: "3-4" }
  ];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<h5 data-svelte-h="svelte-1kxqerc">View/delete unavailable slots</h5> <ul>${each(unavailable, (xslot) => {
      return `<li class="mb-2">${escape(xslot.observe_date)} ${escape(xslot.name)} ${escape(xslot.timeslot)} <form method="POST" action="?/deleteRow"><div class="flex"><input type="hidden" name="id"${add_attribute("value", xslot.id, 0)}> ${validate_component(Button, "Button").$$render(
        $$result,
        {
          outline: true,
          color: "red",
          type: "submit",
          class: "w-2"
        },
        {},
        {
          default: () => {
            return `${validate_component(TrashBinSolid, "TrashBinSolid").$$render($$result, { class: "sm" }, {}, {})}`;
          }
        }
      )} </div></form> </li>`;
    })}</ul> <h5 data-svelte-h="svelte-kwmtkc">Add unavailable slots</h5> <div class="p-3"><form method="POST" action="?/addUnavailableSlots"><div>${each(inputSlots, (row, index) => {
      return `<div class="flex justify-end">${validate_component(Button, "Button").$$render(
        $$result,
        {
          class: "block !p-2 mb-2 align-self-end",
          color: "red",
          size: "sm",
          outline: true
        },
        {},
        {
          default: () => {
            return `${validate_component(TrashBinSolid, "TrashBinSolid").$$render($$result, {}, {}, {})}`;
          }
        }
      )}</div> <div class="grid sm:grid-cols-2 gap-2">${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
        default: () => {
          return `<span data-svelte-h="svelte-2iqozj">Date of Observation</span> ${validate_component(Input, "Input").$$render(
            $$result,
            {
              required: true,
              name: "date",
              type: "date",
              value: row.date
            },
            {
              value: ($$value) => {
                row.date = $$value;
                $$settled = false;
              }
            },
            {}
          )} `;
        }
      })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
        default: () => {
          return `<span data-svelte-h="svelte-1fe62de">Time of Day</span> ${validate_component(Select, "Select").$$render(
            $$result,
            {
              required: true,
              name: "amorpm",
              value: row.amorpm
            },
            {
              value: ($$value) => {
                row.amorpm = $$value;
                $$settled = false;
              }
            },
            {
              default: () => {
                return `<option value="AM" data-svelte-h="svelte-1w265ia">AM</option> <option value="PM" data-svelte-h="svelte-yg4iun">PM</option> `;
              }
            }
          )} `;
        }
      })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
        default: () => {
          return `<span data-svelte-h="svelte-zy9d7v">Section</span> ${validate_component(Select, "Select").$$render(
            $$result,
            {
              required: true,
              name: "section",
              disabled: row.amorpm == "",
              value: row.section
            },
            {
              value: ($$value) => {
                row.section = $$value;
                $$settled = false;
              }
            },
            {
              default: () => {
                return `${each(row.amorpm == "AM" ? amclasses : pmclasses, (section) => {
                  return `<option${add_attribute("value", section.id, 0)}>${escape(section.name)}</option>`;
                })} `;
              }
            }
          )} `;
        }
      })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
        default: () => {
          return `<span data-svelte-h="svelte-ul6egf">Timeslot</span> ${validate_component(Select, "Select").$$render(
            $$result,
            {
              required: true,
              name: "timeslot",
              disabled: row.amorpm == "",
              items: row.amorpm == "AM" ? amslots : pmslots,
              value: row.time
            },
            {
              value: ($$value) => {
                row.time = $$value;
                $$settled = false;
              }
            },
            {}
          )} `;
        }
      })} </div>`;
    })}</div> ${validate_component(Button, "Button").$$render($$result, { color: "alternative" }, {}, {
      default: () => {
        return `${validate_component(PlusOutline, "PlusOutline").$$render($$result, {}, {}, {})}Add Slots`;
      }
    })} ${validate_component(Button, "Button").$$render($$result, { type: "submit" }, {}, {
      default: () => {
        return `Make Unavailable`;
      }
    })}</form></div> <p data-svelte-h="svelte-6a4qnx"></p><ul>${each(inputSlots, (slot) => {
      return `<li>${escape(slot.section)} ${escape(slot.date)} ${escape(slot.time)}</li>`;
    })}</ul>`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-DzHSnuiO.js.map
