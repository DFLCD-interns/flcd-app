import { c as create_ssr_component, v as validate_component, d as each, e as escape, b as add_attribute, j as compute_rest_props, l as getContext, g as spread, k as escape_attribute_value, h as escape_object } from './ssr-C5koH-x7.js';
import { B as Button } from './Button-DPoC_1Mm.js';
import { G as GradientButton } from './GradientButton-DPhfIyDU.js';
import { L as Label } from './Label-9_yY5ooj.js';
import { I as Input } from './Input-C11sq5ya.js';
import { M as MultiSelect } from './MultiSelect-B9tTplZ5.js';
import { S as Search } from './Search-CQ97XOSU.js';
import { S as Select } from './Select-CldvkKb8.js';
import { T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell, f as TrashBinOutline, M as Modal } from './TrashBinOutline-B1DbWK73.js';
import { C as ChevronSortOutline, E as EditOutline } from './EditOutline-DKv1LLUI.js';
import { C as CirclePlusSolid } from './CirclePlusSolid-DlGq9gxm.js';
import { D as DownloadSolid } from './DownloadSolid-BPR9V5sw.js';
import { F as FilterSolid } from './FilterSolid-DYonCRCa.js';
import { t as twMerge } from './bundle-mjs-BLGuyV0D.js';
import './Toaster.svelte_svelte_type_style_lang-kZDscJQz.js';
import './client-BUusD8wq.js';
import './Wrapper-Cnx--s0z.js';
import './Badge-A7W5D_Oh.js';
import './index3-CazeuJOF.js';
import './Frame-Cc0rpiY0.js';
import './index4-XrsG0yEK.js';
import './exports-BGi7-Rnc.js';

const RectangleListSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "withEvents", "title", "desc", "ariaLabel"]);
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
  let { desc = {} } = $$props;
  let ariaDescribedby = `${title.id || ""} ${desc.id || ""}`;
  let hasDescription = false;
  let { ariaLabel = "rectangle list solid" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0) $$bindings.role(role);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.withEvents === void 0 && $$bindings.withEvents && withEvents !== void 0) $$bindings.withEvents(withEvents);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
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
      { fill: escape_attribute_value(color) },
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm4.996 2a1 1 0 0 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 8a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-4.004 3a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 11a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-4.004 3a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 14a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Z" clip-rule="evenodd"></path></svg>` : `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: escape_attribute_value(color) },
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm4.996 2a1 1 0 0 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 8a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-4.004 3a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 11a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-4.004 3a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 14a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Z" clip-rule="evenodd"></path></svg>`} `;
});
function formatDate$2(dateString) {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${month}/${day}/${year}  ${hours}:${minutes}`;
}
const BatchTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { access_level } = $$props;
  let { batches } = $$props;
  let tableHead = [];
  if (batches[0] != null) {
    tableHead = Object.keys(batches[0]);
  }
  let EditModal = false;
  let DeleteModal = false;
  let currBatch = batches[0];
  if ($$props.access_level === void 0 && $$bindings.access_level && access_level !== void 0) $$bindings.access_level(access_level);
  if ($$props.batches === void 0 && $$bindings.batches && batches !== void 0) $$bindings.batches(batches);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="pb-5">${batches != null ? `${validate_component(Table, "Table").$$render($$result, { shadow: true }, {}, {
      default: () => {
        return `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
          default: () => {
            return `${each(tableHead, (head) => {
              return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                default: () => {
                  return `<button type="button" class="flex cursor-pointer">${escape(head)} ${validate_component(ChevronSortOutline, "ChevronSortOutline").$$render($$result, { size: "sm" }, {}, {})}</button> `;
                }
              })}`;
            })} ${access_level != 4 ? `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {})}` : ``}`;
          }
        })} ${validate_component(TableBody, "TableBody").$$render($$result, { tableBodyClass: "divide-y" }, {}, {
          default: () => {
            return `${each(batches, (batch) => {
              return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(batch.id)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(batch.name)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(batch.description)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(formatDate$2(batch.created))}`;
                    }
                  })} ${access_level != 4 ? `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `<button>${validate_component(EditOutline, "EditOutline").$$render($$result, { class: "text-green-700 mr-2" }, {}, {})}</button> <button>${validate_component(TrashBinOutline, "TrashBinOutline").$$render($$result, { class: "text-red-700" }, {}, {})}</button> `;
                    }
                  })}` : ``} `;
                }
              })}`;
            })}`;
          }
        })}`;
      }
    })}` : `<p class="content-center text-gray-500" data-svelte-h="svelte-vtw4ps">No batches in database</p>`}</div> ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Edit Batch",
        autoclose: true,
        open: EditModal
      },
      {
        open: ($$value) => {
          EditModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<form><div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Batch Name`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "name",
              type: "text",
              value: currBatch.name,
              required: true
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Description`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "description",
              type: "text",
              value: currBatch.description
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Date Created`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "description",
              type: "text",
              value: currBatch.created,
              onfocus: "(this.type='date')",
              onblur: "(this.type='text')"
            },
            {},
            {}
          )}</div> <div class="mb-6 flex gap-2 justify-center">${validate_component(GradientButton, "GradientButton").$$render($$result, { color: "green" }, {}, {
            default: () => {
              return `Confirm`;
            }
          })} ${validate_component(GradientButton, "GradientButton").$$render($$result, { color: "green" }, {}, {
            default: () => {
              return `Cancel`;
            }
          })}</div></form>`;
        }
      }
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Delete batch " + currBatch.name + " from database?",
        autoclose: true,
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
          return `<div class="flex gap-5 justify-center">${validate_component(GradientButton, "GradientButton").$$render($$result, { color: "green" }, {}, {
            default: () => {
              return `Confirm`;
            }
          })} ${validate_component(GradientButton, "GradientButton").$$render($$result, { color: "green" }, {}, {
            default: () => {
              return `Cancel`;
            }
          })}</div>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
function formatDate$1(dateString) {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${month}/${day}/${year}  ${hours}:${minutes}`;
}
const ClassTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { access_level } = $$props;
  let { classes } = $$props;
  let tableHead = [];
  if (classes[0] != null) {
    tableHead = Object.keys(classes[0]);
  }
  let EditModal = false;
  let DeleteModal = false;
  let currClass = classes[0];
  if ($$props.access_level === void 0 && $$bindings.access_level && access_level !== void 0) $$bindings.access_level(access_level);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0) $$bindings.classes(classes);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="pb-5">${classes != null ? `${validate_component(Table, "Table").$$render($$result, { shadow: true }, {}, {
      default: () => {
        return `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
          default: () => {
            return `${each(tableHead, (head) => {
              return `${head != "batch_id" && head != "handler_id" ? `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                default: () => {
                  return `<button type="button" class="flex cursor-pointer">${escape(head)} ${validate_component(ChevronSortOutline, "ChevronSortOutline").$$render($$result, { size: "sm" }, {}, {})}</button> `;
                }
              })}` : ``}`;
            })} ${access_level != 4 ? `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {})}` : ``}`;
          }
        })} ${validate_component(TableBody, "TableBody").$$render($$result, { tableBodyClass: "divide-y" }, {}, {
          default: () => {
            return `${each(classes, (Class) => {
              return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(Class.class_id)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(Class.class_name)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(Class.batch)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(Class.handler_firstname)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(Class.handler_lastname)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(Class.description)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(Class.schedule)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(formatDate$1(Class.created))}`;
                    }
                  })} ${access_level != 4 ? `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `<button>${validate_component(EditOutline, "EditOutline").$$render($$result, { class: "text-green-700 mr-2" }, {}, {})}</button> <button>${validate_component(TrashBinOutline, "TrashBinOutline").$$render($$result, { class: "text-red-700" }, {}, {})}</button> `;
                    }
                  })}` : ``} `;
                }
              })}`;
            })}`;
          }
        })}`;
      }
    })}` : `<p class="content-center text-gray-500" data-svelte-h="svelte-vtw4ps">No batches in database</p>`}</div> ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Edit Class",
        autoclose: true,
        open: EditModal
      },
      {
        open: ($$value) => {
          EditModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<form><div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Class Name`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "name",
              type: "text",
              value: currClass.class_name,
              required: true
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Batch ID`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "description",
              type: "number",
              value: currClass.batch_id
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Handler ID`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "description",
              type: "number",
              value: currClass.handler_id
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Description`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "description",
              type: "text",
              value: currClass.description
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Schedule`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "description",
              type: "text",
              value: currClass.schedule
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Date Created`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "description",
              type: "text",
              value: currClass.created,
              onfocus: "(this.type='date')",
              onblur: "(this.type='text')"
            },
            {},
            {}
          )}</div> <div class="mb-6 flex gap-2 justify-center">${validate_component(GradientButton, "GradientButton").$$render($$result, { color: "green" }, {}, {
            default: () => {
              return `Confirm`;
            }
          })} ${validate_component(GradientButton, "GradientButton").$$render($$result, { color: "green" }, {}, {
            default: () => {
              return `Cancel`;
            }
          })}</div></form>`;
        }
      }
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Delete batch " + currClass.name + " from database?",
        autoclose: true,
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
          return `<div class="flex gap-5 justify-center">${validate_component(GradientButton, "GradientButton").$$render($$result, { color: "green" }, {}, {
            default: () => {
              return `Confirm`;
            }
          })} ${validate_component(GradientButton, "GradientButton").$$render($$result, { color: "green" }, {}, {
            default: () => {
              return `Cancel`;
            }
          })}</div>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
function formatDate(dateString) {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${month}/${day}/${year}  ${hours}:${minutes}`;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let access_level = data.current_user.access_level;
  let batches = data.batches;
  let tableHead = [];
  if (batches[0] != null) {
    tableHead = Object.keys(batches[0]);
  }
  const handlersItem = data.users.map((user) => {
    return {
      value: user.id,
      name: `${user.id} (${user.first_name} ${user.last_name})`
    };
  });
  console.log(data.batches);
  const batchesItem = data.batches_only_table.map((batch) => {
    return {
      value: batch.id,
      name: `${batch.id} (${batch.name})`
    };
  });
  let EditBatchModal = false;
  let EditClassModal = false;
  let DeleteModal = false;
  let AddBatchModal = false;
  let AddClassModal = false;
  let EditChildModal = false;
  let AddChildModal = false;
  let editBatch = data.batches_only_table[0];
  let editClass = data.classes_only_table[0];
  let editChild = batches[0];
  let searchQuery = "";
  let selectedBatch = [];
  let sBatch = data.batches_only_table.map((item) => ({ value: item.id, name: item.name }));
  let selectedClass = [];
  let sClass = [];
  let selectedView = "";
  let sView = [
    { value: "batches", name: "batches" },
    { value: "classes", name: "classes" },
    { value: "children", name: "children" }
  ];
  let showBatchOnly = false;
  let showClassOnly = false;
  let sortedBatches = data.batches;
  let loading = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        sClass = data.classes_only_table.filter((classItem) => {
          return selectedBatch.some((batch) => batch === classItem.batch_id);
        });
        sClass = sClass.map((item) => ({ value: item.id, name: item.name }));
        if (selectedView === "batches") {
          showBatchOnly = true;
          showClassOnly = false;
        } else if (selectedView === "classes") {
          showClassOnly = true;
          showBatchOnly = false;
        } else {
          showClassOnly = false;
          showBatchOnly = false;
        }
        if (showBatchOnly) {
          batches = data.batches_only_table;
        } else if (showClassOnly) {
          batches = data.classes_batch_table.filter((item) => selectedBatch.length === 0 || selectedBatch.includes(item.batch_id));
          if (selectedBatch.length === 0) {
            batches = data.classes_batch_table;
          }
        } else {
          batches = batches.filter((item) => selectedBatch.length === 0 || selectedBatch.includes(item.batch_id)).filter((item) => selectedClass.length === 0 || selectedClass.includes(item.class_id));
          if (selectedBatch.length === 0) {
            batches = sortedBatches;
          }
          if (selectedClass.length === 0) {
            batches = sortedBatches.filter((item) => selectedBatch.length === 0 || selectedBatch.includes(item.batch_id));
          }
        }
        batches = batches.filter((item) => searchQuery === "" || Object.values(item).some((value) => (
          // Search all string fields
          typeof value === "string" && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )));
      }
    }
    $$rendered = `<div class="p-10"><div class="gap-2 w-full pb-5"><div class="flex gap-2 w-full items-start pb-2">${validate_component(Search, "Search").$$render(
      $$result,
      { size: "md", value: searchQuery },
      {
        value: ($$value) => {
          searchQuery = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex gap-2 pb-2 w-full"><span class="flex text-gray-700 gap-1 pr-1 items-center">${validate_component(RectangleListSolid, "RectangleListSolid").$$render($$result, {}, {}, {})}View:</span> ${validate_component(Select, "Select").$$render(
      $$result,
      {
        class: "w-full bg-white text-gray-400 text-sm",
        placeholder: "select view option",
        items: sView,
        value: selectedView
      },
      {
        value: ($$value) => {
          selectedView = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${showBatchOnly == true ? `` : `${showClassOnly == true ? `<span class="flex text-gray-700 gap-1 pr-1 items-center">${validate_component(FilterSolid, "FilterSolid").$$render($$result, {}, {}, {})}Filter:</span> ${validate_component(MultiSelect, "MultiSelect").$$render(
      $$result,
      {
        class: "w-full bg-white text-gray-400 text-sm",
        placeholder: "select batch",
        items: sBatch,
        value: selectedBatch
      },
      {
        value: ($$value) => {
          selectedBatch = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : `<span class="flex text-gray-700 gap-1 pr-1 items-center">${validate_component(FilterSolid, "FilterSolid").$$render($$result, {}, {}, {})}Filter:</span> ${validate_component(MultiSelect, "MultiSelect").$$render(
      $$result,
      {
        class: "w-full bg-white text-gray-400 text-sm",
        placeholder: "select batch",
        items: sBatch,
        value: selectedBatch
      },
      {
        value: ($$value) => {
          selectedBatch = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(MultiSelect, "MultiSelect").$$render(
      $$result,
      {
        class: "w-full bg-white text-gray-400 text-sm",
        placeholder: "select class",
        items: sClass,
        value: selectedClass
      },
      {
        value: ($$value) => {
          selectedClass = $$value;
          $$settled = false;
        }
      },
      {}
    )}`}`}</div> <hr></div> <div class="flex items-center justify-between pb-5"><p class="font-semibold text-xl text-gray-700" data-svelte-h="svelte-l1bnw">Classes Database</p> <div class="flex gap-2">${access_level != 4 ? `${validate_component(GradientButton, "GradientButton").$$render(
      $$result,
      {
        color: "green",
        class: "inline-flex text-center gap-2"
      },
      {},
      {
        default: () => {
          return `${validate_component(CirclePlusSolid, "CirclePlusSolid").$$render($$result, {}, {}, {})}Add Batch`;
        }
      }
    )} ${validate_component(GradientButton, "GradientButton").$$render(
      $$result,
      {
        color: "green",
        class: "inline-flex text-center gap-2"
      },
      {},
      {
        default: () => {
          return `${validate_component(CirclePlusSolid, "CirclePlusSolid").$$render($$result, {}, {}, {})}Add Class`;
        }
      }
    )} ${validate_component(GradientButton, "GradientButton").$$render(
      $$result,
      {
        color: "green",
        class: "inline-flex text-center gap-2"
      },
      {},
      {
        default: () => {
          return `${validate_component(CirclePlusSolid, "CirclePlusSolid").$$render($$result, {}, {}, {})}Add Child`;
        }
      }
    )}` : ``} ${validate_component(GradientButton, "GradientButton").$$render(
      $$result,
      {
        color: "green",
        class: "inline-flex text-center gap-2"
      },
      {},
      {
        default: () => {
          return `${validate_component(DownloadSolid, "DownloadSolid").$$render($$result, {}, {}, {})}Download Table`;
        }
      }
    )}</div></div> <div class="pb-5">${batches != null && (showBatchOnly == false && showClassOnly == false) ? `${validate_component(Table, "Table").$$render($$result, { shadow: true }, {}, {
      default: () => {
        return `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
          default: () => {
            return `${each(tableHead, (head) => {
              return `${head != "batch_id" && head != "class_id" ? `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                default: () => {
                  return `<button type="button" class="flex cursor-pointer">${escape(head)} ${validate_component(ChevronSortOutline, "ChevronSortOutline").$$render($$result, { size: "sm" }, {}, {})}</button> `;
                }
              })}` : ``}`;
            })} ${access_level != 4 ? `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {})}` : ``}`;
          }
        })} ${validate_component(TableBody, "TableBody").$$render($$result, { tableBodyClass: "divide-y" }, {}, {
          default: () => {
            return `${each(batches, (batch) => {
              return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(batch.batch_name)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(batch.class_name)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(batch.handler_firstname)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(batch.handler_lastname)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(batch.schedule)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(batch.child_name)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(formatDate(batch.child_birthdate))}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(batch.child_trackingid)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(formatDate(batch.child_created))}`;
                    }
                  })} ${access_level != 4 ? `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `<button>${validate_component(EditOutline, "EditOutline").$$render($$result, { class: "text-green-700 mr-2" }, {}, {})}</button> <button>${validate_component(TrashBinOutline, "TrashBinOutline").$$render($$result, { class: "text-red-700" }, {}, {})}</button> `;
                    }
                  })}` : ``} `;
                }
              })}`;
            })}`;
          }
        })}`;
      }
    })}` : `${showBatchOnly == true ? `${validate_component(BatchTable, "BatchTable").$$render($$result, { batches, access_level }, {}, {})}` : `${showClassOnly == true ? `${validate_component(ClassTable, "ClassTable").$$render($$result, { classes: batches, access_level }, {}, {})}` : `<p class="content-center text-gray-500" data-svelte-h="svelte-122wvaw">No classes in database</p>`}`}`}</div></div> ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Edit or Delete Batch",
        autoclose: true,
        open: EditBatchModal
      },
      {
        open: ($$value) => {
          EditBatchModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="mb-6 ">${validate_component(Label, "Label").$$render(
            $$result,
            {
              for: "batch",
              class: "block mb-2 font-bold"
            },
            {},
            {
              default: () => {
                return `Select a batch`;
              }
            }
          )} <select id="batch" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">${each(data.batches_only_table, (b) => {
            return `<option${add_attribute("value", b, 0)}>${escape(b.name)}</option>`;
          })}</select></div> <hr> <form><div class="mb-6"><div class="flex justify-between items-end">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Batch Name`;
            }
          })} <button type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">${validate_component(TrashBinOutline, "TrashBinOutline").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button></div> ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "name",
              type: "text",
              value: editBatch.name,
              required: true
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Description`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "description",
              type: "text",
              value: editBatch.description
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Date Created`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "description",
              type: "text",
              value: editBatch.created,
              onfocus: "(this.type='date')",
              onblur: "(this.type='text')"
            },
            {},
            {}
          )}</div> <div class="mb-6 flex gap-2 justify-center">${validate_component(GradientButton, "GradientButton").$$render($$result, { color: "green" }, {}, {
            default: () => {
              return `Confirm`;
            }
          })} ${validate_component(GradientButton, "GradientButton").$$render($$result, { color: "green" }, {}, {
            default: () => {
              return `Cancel`;
            }
          })}</div></form>`;
        }
      }
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Edit or Delete Class",
        autoclose: true,
        open: EditClassModal
      },
      {
        open: ($$value) => {
          EditClassModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="mb-6">${validate_component(Label, "Label").$$render(
            $$result,
            {
              for: "class",
              class: "block mb-2 font-bold"
            },
            {},
            {
              default: () => {
                return `Select a class`;
              }
            }
          )} <select id="class" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">${each(data.classes_only_table, (c) => {
            return `<option${add_attribute("value", c, 0)}>${escape(c.name)}</option>`;
          })}</select></div> <hr> <form><div class="mb-6"><div class="flex justify-between items-end">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Class Name`;
            }
          })} <button type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">${validate_component(TrashBinOutline, "TrashBinOutline").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button></div> ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "name",
              type: "text",
              value: editClass.name,
              required: true
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Handler ID`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "handler_id",
              type: "number",
              value: editClass.handler_id
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Batch ID`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "batch_id",
              type: "number",
              value: editClass.batch_id
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Description`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "description",
              type: "text",
              value: editClass.description
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Schedule`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "schedule",
              type: "text",
              value: editClass.schedule
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Date Created`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "description",
              type: "text",
              value: editClass.created,
              onfocus: "(this.type='date')",
              onblur: "(this.type='text')"
            },
            {},
            {}
          )}</div> <div class="mb-6 flex gap-2 justify-center">${validate_component(GradientButton, "GradientButton").$$render(
            $$result,
            {
              type: "submit",
              class: "button-style",
              color: "green"
            },
            {},
            {
              default: () => {
                return `Confirm`;
              }
            }
          )} ${validate_component(GradientButton, "GradientButton").$$render($$result, { color: "green" }, {}, {
            default: () => {
              return `Cancel`;
            }
          })}</div></form>`;
        }
      }
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      { title: "Add Batch", open: AddBatchModal },
      {
        open: ($$value) => {
          AddBatchModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<form action="?/createBatch" method="POST"><div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Batch Name`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "name",
              type: "text",
              placeholder: "Enter batch name (eg, 2023-2024 A).",
              required: true
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Description`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "description",
              type: "text",
              placeholder: "Enter description (eg, 1st semester, began July)."
            },
            {},
            {}
          )}</div> <div class="flex gap-5 justify-center">${validate_component(Button, "Button").$$render(
            $$result,
            {
              type: "submit",
              class: "w-full",
              disabled: loading
            },
            {},
            {
              default: () => {
                return `Confirm`;
              }
            }
          )} ${validate_component(Button, "Button").$$render(
            $$result,
            {
              type: "button",
              class: "bg-red-700 hover:bg-red-800",
              disabled: loading
            },
            {},
            {
              default: () => {
                return `Cancel`;
              }
            }
          )}</div></form>`;
        }
      }
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      { title: "Add Class", open: AddClassModal },
      {
        open: ($$value) => {
          AddClassModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<form action="?/createClass" method="POST"><div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Class Name`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "name",
              type: "text",
              placeholder: "Enter class name(eg, String Theory 101 - Section 1).",
              required: true
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Handler ID`;
            }
          })} ${validate_component(Select, "Select").$$render(
            $$result,
            {
              items: handlersItem,
              name: "handler_id",
              type: "number",
              placeholder: "Select handler ID of the class",
              required: true
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Batch ID`;
            }
          })} ${validate_component(Select, "Select").$$render(
            $$result,
            {
              items: batchesItem,
              name: "batch_id",
              type: "number",
              placeholder: "Select block ID of the class",
              required: true
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Description`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "description",
              type: "text",
              placeholder: "Enter description"
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Schedule`;
            }
          })} ${validate_component(Select, "Select").$$render(
            $$result,
            {
              items: [{ value: "AM", name: "AM" }, { value: "PM", name: "PM" }],
              placeholder: "Select schedule of the class",
              name: "schedule",
              type: "text",
              required: true
            },
            {},
            {}
          )}</div> <div class="flex gap-5 justify-center">${validate_component(Button, "Button").$$render(
            $$result,
            {
              type: "submit",
              class: "w-full",
              disabled: loading
            },
            {},
            {
              default: () => {
                return `Confirm`;
              }
            }
          )} ${validate_component(Button, "Button").$$render(
            $$result,
            {
              type: "button",
              class: "bg-red-700 hover:bg-red-800",
              disabled: loading
            },
            {},
            {
              default: () => {
                return `Cancel`;
              }
            }
          )}</div></form>`;
        }
      }
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Edit Child Details",
        autoclose: true,
        open: EditChildModal
      },
      {
        open: ($$value) => {
          EditChildModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<form><div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Batch Name`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              disabled: "true",
              type: "text",
              value: editChild.batch_name,
              required: true
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Class Name`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              disabled: "true",
              type: "text",
              value: editChild.class_name
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Handler`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              disabled: "true",
              type: "text",
              value: editChild.handler_firstname + " " + editChild.handler_lastname
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Child Name`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              type: "text",
              value: editChild.child_name
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Child Birthdate`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "description",
              type: "text",
              value: formatDate(editChild.child_birthdate),
              onfocus: "(this.type='date')",
              onblur: "(this.type='text')"
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Child Tracking ID`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "schedule",
              type: "text",
              value: editChild.child_trackingid
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Date Created`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "schedule",
              type: "text",
              value: formatDate(editChild.child_created),
              onfocus: "(this.type='date')",
              onblur: "(this.type='text')"
            },
            {},
            {}
          )}</div> <div class="mb-6 flex gap-2 justify-center">${validate_component(GradientButton, "GradientButton").$$render(
            $$result,
            {
              type: "submit",
              class: "button-style",
              color: "green"
            },
            {},
            {
              default: () => {
                return `Confirm`;
              }
            }
          )} ${validate_component(GradientButton, "GradientButton").$$render($$result, { color: "green" }, {}, {
            default: () => {
              return `Cancel`;
            }
          })}</div></form>`;
        }
      }
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      { title: "Add Child", open: AddChildModal },
      {
        open: ($$value) => {
          AddChildModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<form action="?/addChild" method="POST"><div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Name`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "name",
              type: "text",
              placeholder: "Child Name",
              required: true
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Birthdate`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "birthdate",
              type: "date",
              placeholder: "Child Birthdate"
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Tracking ID`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "tracking_id",
              type: "number",
              placeholder: "Child Tracking ID"
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Class ID`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "class_id",
              type: "text",
              placeholder: "Class ID"
            },
            {},
            {}
          )}</div> <div class="mb-6 flex gap-2 justify-center">${validate_component(GradientButton, "GradientButton").$$render(
            $$result,
            {
              type: "submit",
              class: "button-style",
              color: "green"
            },
            {},
            {
              default: () => {
                return `Confirm`;
              }
            }
          )} ${validate_component(GradientButton, "GradientButton").$$render($$result, { color: "green" }, {}, {
            default: () => {
              return `Cancel`;
            }
          })}</div></form>`;
        }
      }
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Delete this row from database?",
        autoclose: true,
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
          return `<div class="flex gap-5 justify-center">${validate_component(GradientButton, "GradientButton").$$render($$result, { color: "green" }, {}, {
            default: () => {
              return `Confirm`;
            }
          })} ${validate_component(GradientButton, "GradientButton").$$render($$result, { color: "green" }, {}, {
            default: () => {
              return `Cancel`;
            }
          })}</div>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-DG0-ldM1.js.map
