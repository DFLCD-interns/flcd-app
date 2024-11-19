import { c as create_ssr_component, v as validate_component, d as each, e as escape, b as add_attribute } from './ssr-D-0G9OQq.js';
import { B as Button } from './Button-Dk4SyiMB.js';
import { G as GradientButton } from './GradientButton-ClcQ1Dti.js';
import { L as Label } from './Label-YZOSSFZ8.js';
import { I as Input } from './Input-DIWB2hTs.js';
import { M as MultiSelect } from './MultiSelect-CxENl1o9.js';
import { S as Search } from './Search-DDQ6kMLb.js';
import { S as Select } from './Select-cnLI2Umv.js';
import { T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell, f as TrashBinOutline, M as Modal } from './TrashBinOutline-CP3XjY4w.js';
import { C as CheckOutline, a as CloseOutline } from './CloseOutline-CyXhTIPR.js';
import { C as ChevronSortOutline, E as EditOutline } from './EditOutline-bWJ0OTUv.js';
import { C as CirclePlusSolid } from './CirclePlusSolid-BFyfqb9c.js';
import { D as DownloadSolid } from './DownloadSolid-CvxlaeZi.js';
import { F as FilterSolid } from './FilterSolid-D3Otlual.js';
import './client-BUusD8wq.js';
import './Toaster.svelte_svelte_type_style_lang-CeBUoKk3.js';
import './bundle-mjs-BLGuyV0D.js';
import './Wrapper-DxnNrkYf.js';
import './Badge-8btJzlS_.js';
import './index4-DJfRHyEc.js';
import './Frame-72CUdra3.js';
import './exports-BGi7-Rnc.js';
import './index3-BwhTgwjd.js';

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
  let isOther;
  let { data } = $$props;
  let access_level = data.current_user.access_level;
  let equipmentTypes = data.equipmentTypes;
  let equipments = data.equipments;
  let tableHead = [];
  if (equipments != null) {
    tableHead = Object.keys(equipments[0]);
  }
  const headerNames = {
    name: "Name",
    type: "Type",
    location: "Location",
    status: "Status",
    notes: "Notes",
    date_registered: "Date Registered"
  };
  equipmentTypes = equipmentTypes.map((item) => ({
    ...item,
    value: item.type,
    name: item.type
  }));
  equipmentTypes.push({
    type: "Other...",
    value: "other",
    name: "Other..."
  });
  let addedEquipmentType = "";
  let DeleteModal = false;
  let AddModal = false;
  let editEquipment;
  let editingRowIndex = -1;
  let eq;
  equipments.forEach((item) => {
    item.dateString = formatDate(item.date_registered);
  });
  let searchQuery = "";
  let selectedType = [];
  let type = data.equipmentTypes.map((item) => ({ value: item.type, name: item.type }));
  let selectedStatus = [];
  const status = [
    { value: "available", name: "available" },
    { value: "in use", name: "in use" },
    { value: "in repair", name: "in repair" }
  ];
  let loading = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    isOther = addedEquipmentType == "other";
    equipments = data.equipments.filter((item) => selectedType.length === 0 || selectedType.includes(item.type)).filter((item) => selectedStatus.length === 0 || selectedStatus.includes(item.status)).filter((item) => searchQuery === "" || Object.values(item).some((value) => (
      // Search all string fields
      typeof value === "string" && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )));
    $$rendered = `<div class="p-4 md:p-10"><div class="gap-2 w-full pb-5"><div class="flex flex-col md:flex-row gap-2 w-full items-start pb-2">${validate_component(Search, "Search").$$render(
      $$result,
      { size: "md", value: searchQuery },
      {
        value: ($$value) => {
          searchQuery = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-row md:flex-row gap-2 pb-2 w-full"><span class="flex text-gray-700 gap-1 pr-1 items-center text-sm">${validate_component(FilterSolid, "FilterSolid").$$render($$result, {}, {}, {})}Filter:</span> ${validate_component(MultiSelect, "MultiSelect").$$render(
      $$result,
      {
        class: "w-full md:w-1/2 bg-white text-gray-400 text-sm",
        placeholder: "Type",
        items: type,
        value: selectedType
      },
      {
        value: ($$value) => {
          selectedType = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(MultiSelect, "MultiSelect").$$render(
      $$result,
      {
        class: "w-full md:w-1/2 bg-white text-gray-400 text-sm",
        placeholder: "Status",
        items: status,
        value: selectedStatus
      },
      {
        value: ($$value) => {
          selectedStatus = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <hr></div> <div class="flex flex-col md:flex-row items-center justify-between pb-5"><p class="font-semibold text-xl text-gray-700" data-svelte-h="svelte-j3suo1">Equipments Database</p> <div class="flex flex-row md:flex-row gap-2 mt-2 md:mt-0">${validate_component(GradientButton, "GradientButton").$$render(
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
    )} ${access_level != 4 ? `${validate_component(GradientButton, "GradientButton").$$render(
      $$result,
      {
        color: "green",
        class: "inline-flex text-center gap-2"
      },
      {},
      {
        default: () => {
          return `${validate_component(CirclePlusSolid, "CirclePlusSolid").$$render($$result, {}, {}, {})}Add Equipment`;
        }
      }
    )}` : ``}</div></div> <div class="pb-5">${equipments != null ? `${validate_component(Table, "Table").$$render($$result, { shadow: true }, {}, {
      default: () => {
        return `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
          default: () => {
            return `${each(tableHead, (head) => {
              return `${head != "dateString" && head != "id" ? ` ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                default: () => {
                  return `<button type="button" class="flex cursor-pointer">${escape(headerNames[head] || head)} ${validate_component(ChevronSortOutline, "ChevronSortOutline").$$render($$result, { size: "sm" }, {}, {})}</button> `;
                }
              })}` : ``}`;
            })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {})}`;
          }
        })} ${validate_component(TableBody, "TableBody").$$render($$result, { tableBodyClass: "divide-y" }, {}, {
          default: () => {
            return `${each(equipments, (equipment) => {
              return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${editingRowIndex === equipment.id ? `${validate_component(Input, "Input").$$render(
                        $$result,
                        { type: "text", value: editEquipment.name },
                        {
                          value: ($$value) => {
                            editEquipment.name = $$value;
                            $$settled = false;
                          }
                        },
                        {}
                      )}` : `${escape(equipment.name)}`} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${editingRowIndex === equipment.id ? `${validate_component(Select, "Select").$$render(
                        $$result,
                        {
                          items: equipmentTypes,
                          disabled: loading,
                          value: editEquipment.type
                        },
                        {
                          value: ($$value) => {
                            editEquipment.type = $$value;
                            $$settled = false;
                          }
                        },
                        {}
                      )}` : `${escape(equipment.type)}`} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${editingRowIndex === equipment.id ? `${validate_component(Input, "Input").$$render(
                        $$result,
                        {
                          type: "text",
                          value: editEquipment.location
                        },
                        {
                          value: ($$value) => {
                            editEquipment.location = $$value;
                            $$settled = false;
                          }
                        },
                        {}
                      )}` : `${escape(equipment.location)}`} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${editingRowIndex === equipment.id ? `${validate_component(Select, "Select").$$render(
                        $$result,
                        {
                          items: status,
                          disabled: loading,
                          value: editEquipment.status
                        },
                        {
                          value: ($$value) => {
                            editEquipment.status = $$value;
                            $$settled = false;
                          }
                        },
                        {}
                      )}` : `${escape(equipment.status)}`} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${editingRowIndex === equipment.id ? `${validate_component(Input, "Input").$$render(
                        $$result,
                        { type: "text", value: editEquipment.notes },
                        {
                          value: ($$value) => {
                            editEquipment.notes = $$value;
                            $$settled = false;
                          }
                        },
                        {}
                      )}` : `${escape(equipment.notes)}`} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(formatDate(equipment.date_registered).toString())}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${editingRowIndex === equipment.id ? `<form method="POST" action="?/editEquipment"><input type="hidden" name="id"${add_attribute("value", editEquipment.id, 0)}> <input type="hidden" name="name"${add_attribute("value", editEquipment.name, 0)}> <input type="hidden" name="old_name"${add_attribute("value", equipment.name, 0)}> <input type="hidden" name="type"${add_attribute("value", editEquipment.type, 0)}> <input type="hidden" name="old_type"${add_attribute("value", equipment.type, 0)}> <input type="hidden" name="location"${add_attribute("value", editEquipment.location, 0)}> <input type="hidden" name="old_location"${add_attribute("value", equipment.location, 0)}> <input type="hidden" name="status"${add_attribute("value", editEquipment.status, 0)}> <input type="hidden" name="old_status"${add_attribute("value", equipment.status, 0)}> <input type="hidden" name="notes"${add_attribute("value", editEquipment.notes, 0)}> <input type="hidden" name="old_notes"${add_attribute("value", equipment.notes, 0)}> <button type="submit" ${""} class="mr-2">${validate_component(CheckOutline, "CheckOutline").$$render($$result, { class: "text-green-600 mr-2" }, {}, {})}</button> <button ${""}>${validate_component(CloseOutline, "CloseOutline").$$render($$result, { class: "text-red-600" }, {}, {})}</button> </form>` : `<button>${validate_component(EditOutline, "EditOutline").$$render($$result, { class: "text-green-700 mr-2" }, {}, {})}</button> <button>${validate_component(TrashBinOutline, "TrashBinOutline").$$render($$result, { class: "text-red-700" }, {}, {})}</button>`} `;
                    }
                  })} `;
                }
              })}`;
            })}`;
          }
        })}`;
      }
    })}` : `<p class="content-center text-gray-500" data-svelte-h="svelte-4pu5gn">No equipments in database</p>`}</div></div> ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        size: "xs",
        outsideclose: true,
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
          return `<div class="text-center"><h3 class="mb-1 text-lg font-bold text-gray-800 dark:text-gray-400" data-svelte-h="svelte-1xco9b5">Delete equipment from database?</h3> <p class="mb-6 text-sm" data-svelte-h="svelte-1oy4k5y">You are about to delete this entry. This cannot be undone.</p> <p class="text-gray-800">Name: <span style="font-weight: 600;">${escape(eq.name)}</span></p> <p class="text-gray-800">Type: <span style="font-weight: 600;">${escape(eq.type)}</span></p> <p class="text-gray-800">Location: <span style="font-weight: 600;">${escape(eq.location)}</span></p> <p class="mb-6 text-gray-800">Notes: <span style="font-weight: 600;">${escape(eq.notes)}</span></p> <form method="POST" action="?/deleteEquipment"><input type="hidden" name="id"${add_attribute("value", eq.id, 0)}> <div class="flex mb-1 gap-1 justify-center">${validate_component(Button, "Button").$$render(
            $$result,
            {
              type: "submit",
              disabled: loading,
              color: "red",
              class: "me-2"
            },
            {},
            {
              default: () => {
                return `${validate_component(TrashBinOutline, "TrashBinOutline").$$render($$result, { class: "text-white mr-1" }, {}, {})}Delete`;
              }
            }
          )} ${validate_component(Button, "Button").$$render($$result, { color: "alternative", disabled: loading }, {}, {
            default: () => {
              return `Cancel`;
            }
          })}</div></form></div>`;
        }
      }
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Add Equipment",
        outsideclose: true,
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
          return `<form class="space-y-5 mb-2" method="POST" action="?/addEquipment"><div class="mb-3">${validate_component(Label, "Label").$$render($$result, { class: "block mb-1" }, {}, {
            default: () => {
              return `Name`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "name",
              type: "text",
              id: "name",
              placeholder: "Enter the model/brand or any descriptive name for the equipment.",
              disabled: loading,
              required: true
            },
            {},
            {}
          )}</div> <div class="mb-3">${validate_component(Label, "Label").$$render($$result, { class: "block mb-1" }, {}, {
            default: () => {
              return `Type`;
            }
          })} ${validate_component(Select, "Select").$$render(
            $$result,
            {
              name: "type",
              id: "type",
              items: equipmentTypes,
              disabled: loading,
              required: true,
              value: addedEquipmentType
            },
            {
              value: ($$value) => {
                addedEquipmentType = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div> <div class="mb-3">${isOther ? `${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
            default: () => {
              return `<span data-svelte-h="svelte-hsq4hg">New Equipment Type</span> ${validate_component(Input, "Input").$$render(
                $$result,
                {
                  disabled: !isOther,
                  type: "text",
                  name: "new_type",
                  placeholder: "Enter new equipment type.",
                  required: true
                },
                {},
                {}
              )}`;
            }
          })}` : ``}</div> <div class="mb-3">${validate_component(Label, "Label").$$render($$result, { class: "block mb-1" }, {}, {
            default: () => {
              return `Location`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "location",
              type: "text",
              id: "location",
              placeholder: "Enter the specific location/room of the equipment within the facility.",
              disabled: loading,
              required: true
            },
            {},
            {}
          )}</div> <div class="mb-3">${validate_component(Label, "Label").$$render($$result, { class: "block mb-1" }, {}, {
            default: () => {
              return `Notes`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "notes",
              type: "text",
              id: "notes",
              placeholder: "Enter addtl. comments about the equipment. Can be empty.",
              disabled: loading
            },
            {},
            {}
          )}</div> <hr> <div class="flex gap-5 justify-center">${validate_component(Button, "Button").$$render(
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
              color: "alternative",
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
    )}`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-DWShG8Lc.js.map
