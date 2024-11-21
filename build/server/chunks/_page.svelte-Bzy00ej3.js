import { c as create_ssr_component, v as validate_component, d as each, b as add_attribute, e as escape, q as compute_rest_props, p as getContext, g as spread, t as escape_attribute_value, h as escape_object } from './ssr-D-0G9OQq.js';
import { B as Button } from './Button-Dk4SyiMB.js';
import { G as GradientButton } from './GradientButton-ClcQ1Dti.js';
import { L as Label } from './Label-YZOSSFZ8.js';
import { I as Input } from './Input-DIWB2hTs.js';
import { S as Search } from './Search-DDQ6kMLb.js';
import { S as Select } from './Select-cnLI2Umv.js';
import { T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell, f as TrashBinOutline, M as Modal } from './TrashBinOutline-CP3XjY4w.js';
import { C as CirclePlusSolid } from './CirclePlusSolid-BFyfqb9c.js';
import { P as PlusOutline } from './PlusOutline-DHpaaUqu.js';
import { t as twMerge } from './bundle-mjs-BLGuyV0D.js';
import { T as TrashBinSolid } from './TrashBinSolid-BziiwHWz.js';
import './Wrapper-DxnNrkYf.js';
import './Frame-72CUdra3.js';

const SearchOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "withEvents", "title", "strokeWidth", "desc", "ariaLabel"]);
  const ctx = getContext("iconCtx") ?? {};
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };
  let { size = ctx.size || "md" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { color = ctx.color || "currentColor" } = $$props;
  let { withEvents = ctx.withEvents || false } = $$props;
  let { title = {} } = $$props;
  let { strokeWidth = ctx.strokeWidth || "2" } = $$props;
  let { desc = {} } = $$props;
  let ariaDescribedby = `${title.id || ""} ${desc.id || ""}`;
  let hasDescription = false;
  let { ariaLabel = "search outline" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0) $$bindings.role(role);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.withEvents === void 0 && $$bindings.withEvents && withEvents !== void 0) $$bindings.withEvents(withEvents);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  if ($$props.desc === void 0 && $$bindings.desc && desc !== void 0) $$bindings.desc(desc);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
  {
    if (title.id || desc.id) {
      hasDescription = true;
    } else {
      hasDescription = false;
    }
  }
  return `${withEvents ? `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { color: escape_attribute_value(color) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size ?? "md"], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      {
        "aria-describedby": escape_attribute_value(hasDescription ? ariaDescribedby : void 0)
      },
      { viewBox: "0 0 24 24" }
    ],
    {}
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round"${add_attribute("stroke-width", strokeWidth, 0)} d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"></path></svg>` : `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { color: escape_attribute_value(color) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size ?? "md"], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      {
        "aria-describedby": escape_attribute_value(hasDescription ? ariaDescribedby : void 0)
      },
      { viewBox: "0 0 24 24" }
    ],
    {}
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round"${add_attribute("stroke-width", strokeWidth, 0)} d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"></path></svg>`} `;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let amclasses = data.amclasses;
  let pmclasses = data.pmclasses;
  let unavailable = data.unavailable2;
  let id = "";
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
  let DeleteModal = false;
  let AddModal = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="p-10"><form class="flex gap-2 pb-5">${validate_component(Search, "Search").$$render($$result, { size: "md" }, {}, {})} ${validate_component(GradientButton, "GradientButton").$$render($$result, { color: "green", class: "!p-2.5" }, {}, {
      default: () => {
        return `${validate_component(SearchOutline, "SearchOutline").$$render($$result, { class: "w-6 h-6" }, {}, {})}`;
      }
    })}</form> <div class="flex items-center justify-between pb-5"><p class="font-semibold text-xl text-gray-700" data-svelte-h="svelte-immv0j">Schedule Database</p> ${validate_component(GradientButton, "GradientButton").$$render(
      $$result,
      {
        color: "green",
        class: "inline-flex text-center gap-2"
      },
      {},
      {
        default: () => {
          return `${validate_component(CirclePlusSolid, "CirclePlusSolid").$$render($$result, {}, {}, {})}Add Unavailable Slot`;
        }
      }
    )}</div> <div class="pb-5">${unavailable.length != 0 ? `${validate_component(Table, "Table").$$render($$result, { shadow: true }, {}, {
      default: () => {
        return `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {})} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
              default: () => {
                return `date`;
              }
            })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
              default: () => {
                return `section`;
              }
            })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
              default: () => {
                return `timeslot`;
              }
            })}`;
          }
        })} ${validate_component(TableBody, "TableBody").$$render($$result, { tableBodyClass: "divide-y" }, {}, {
          default: () => {
            return `${each(unavailable, (xslot) => {
              return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `<button>${validate_component(TrashBinOutline, "TrashBinOutline").$$render($$result, { class: "text-green-600" }, {}, {})}</button> `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(xslot.observe_date)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(xslot.name)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(xslot.timeslot)}`;
                    }
                  })} `;
                }
              })}`;
            })}`;
          }
        })}`;
      }
    })}` : `<p class="content-center text-gray-500" data-svelte-h="svelte-fjkzzz">No unavailable slots yet</p>`}</div></div> ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Add Unavailable Slots",
        open: AddModal
      },
      {
        open: ($$value) => {
          AddModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<form method="POST" action="?/addUnavailableSlots"><div>${each(inputSlots, (row, index) => {
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
          })}</form>`;
        }
      }
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Delete from database?",
        open: DeleteModal
      },
      {
        open: ($$value) => {
          DeleteModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="flex gap-5 justify-center"><form method="POST" action="?/deleteRow"><input type="hidden" name="id"${add_attribute("value", id, 0)}> ${validate_component(GradientButton, "GradientButton").$$render($$result, { color: "green", type: "submit" }, {}, {
            default: () => {
              return `Confirm`;
            }
          })}</form></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-Bzy00ej3.js.map
