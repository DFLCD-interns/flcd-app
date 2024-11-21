import { c as create_ssr_component, v as validate_component, d as each, e as escape, b as add_attribute } from './ssr-D-0G9OQq.js';
import { B as Button } from './Button-Dk4SyiMB.js';
import { G as GradientButton } from './GradientButton-ClcQ1Dti.js';
import { L as Label } from './Label-YZOSSFZ8.js';
import { I as Input } from './Input-DIWB2hTs.js';
import { M as MultiSelect } from './MultiSelect-CxENl1o9.js';
import { S as Search } from './Search-DDQ6kMLb.js';
import { T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell, f as TrashBinOutline, M as Modal } from './TrashBinOutline-CP3XjY4w.js';
import { C as CheckOutline, a as CloseOutline } from './CloseOutline-CyXhTIPR.js';
import { C as ChevronSortOutline, E as EditOutline } from './EditOutline-bWJ0OTUv.js';
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
  const optionsDate = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
    // AM/PM format
  };
  const formattedDate = date.toLocaleDateString("en-US", optionsDate);
  const formattedTime = date.toLocaleTimeString("en-US", optionsTime);
  return `${formattedDate} at ${formattedTime}`;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let users = data.user;
  data.current_user.access_level;
  let tableHead = [];
  if (users != null) {
    tableHead = Object.keys(users[0]);
  }
  let DeleteModal = false;
  let EditModal = false;
  let editUser;
  let editingRowIndex = -1;
  let eq;
  users.forEach((item) => {
    item.dateString = formatDate(item.created);
  });
  let searchQuery = "";
  let selectedType = [];
  let type = data.userTypes.map((item) => ({
    value: item.description,
    name: item.description
  }));
  let loading = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    users = data.user.filter((item) => selectedType.length === 0 || selectedType.includes(item.description)).filter((item) => searchQuery === "" || Object.values(item).some((value) => (
      // Search all string fields
      typeof value === "string" && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )));
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
    )}</div> <div class="flex gap-2 pb-2 w-full"><span class="flex text-gray-700 gap-1 pr-1 items-center">${validate_component(FilterSolid, "FilterSolid").$$render($$result, {}, {}, {})}Filter:</span> ${validate_component(MultiSelect, "MultiSelect").$$render(
      $$result,
      {
        class: "w-full bg-white text-gray-400 text-sm",
        placeholder: "select admin type",
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
    )}</div> <hr></div> <div class="flex items-center justify-between pb-5" data-svelte-h="svelte-adq85q"><p class="font-semibold text-xl text-gray-700">Users Database</p></div> <div class="pb-5">${users != null ? `${validate_component(Table, "Table").$$render($$result, { shadow: true }, {}, {
      default: () => {
        return `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
          default: () => {
            return `${each(tableHead, (head) => {
              return `${head != "dateString" ? `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                default: () => {
                  return `<button type="button" class="flex cursor-pointer">${escape(head)} ${validate_component(ChevronSortOutline, "ChevronSortOutline").$$render($$result, { size: "sm" }, {}, {})}</button> `;
                }
              })}` : ``}`;
            })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {})}`;
          }
        })} ${validate_component(TableBody, "TableBody").$$render($$result, { tableBodyClass: "divide-y" }, {}, {
          default: () => {
            return `${each(users, (user) => {
              return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${editingRowIndex === user.id ? `${validate_component(Input, "Input").$$render(
                        $$result,
                        { type: "text", value: editUser.id },
                        {
                          value: ($$value) => {
                            editUser.id = $$value;
                            $$settled = false;
                          }
                        },
                        {}
                      )}` : `${escape(user.id)}`} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${editingRowIndex === user.id ? `${validate_component(Input, "Input").$$render(
                        $$result,
                        { type: "text", value: editUser.first_name },
                        {
                          value: ($$value) => {
                            editUser.first_name = $$value;
                            $$settled = false;
                          }
                        },
                        {}
                      )}` : `${escape(user.first_name)}`} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${editingRowIndex === user.id ? `${validate_component(Input, "Input").$$render(
                        $$result,
                        { type: "text", value: editUser.last_name },
                        {
                          value: ($$value) => {
                            editUser.last_name = $$value;
                            $$settled = false;
                          }
                        },
                        {}
                      )}` : `${escape(user.last_name)}`} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${editingRowIndex === user.id ? `${validate_component(Input, "Input").$$render(
                        $$result,
                        { type: "text", value: editUser.email },
                        {
                          value: ($$value) => {
                            editUser.email = $$value;
                            $$settled = false;
                          }
                        },
                        {}
                      )}` : `${escape(user.email)}`} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${editingRowIndex === user.id ? `${validate_component(Input, "Input").$$render(
                        $$result,
                        { type: "text", value: editUser.phone },
                        {
                          value: ($$value) => {
                            editUser.phone = $$value;
                            $$settled = false;
                          }
                        },
                        {}
                      )}` : `${escape(user.phone)}`} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${editingRowIndex === user.id ? `${validate_component(Input, "Input").$$render(
                        $$result,
                        {
                          type: "text",
                          value: editUser.student_number
                        },
                        {
                          value: ($$value) => {
                            editUser.student_number = $$value;
                            $$settled = false;
                          }
                        },
                        {}
                      )}` : `${escape(user.student_number)}`} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${editingRowIndex === user.id ? `${validate_component(Input, "Input").$$render(
                        $$result,
                        { type: "text", value: editUser.course },
                        {
                          value: ($$value) => {
                            editUser.course = $$value;
                            $$settled = false;
                          }
                        },
                        {}
                      )}` : `${escape(user.course)}`} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${editingRowIndex === user.id ? `${validate_component(Input, "Input").$$render(
                        $$result,
                        { type: "text", value: editUser.department },
                        {
                          value: ($$value) => {
                            editUser.department = $$value;
                            $$settled = false;
                          }
                        },
                        {}
                      )}` : `${escape(user.department)}`} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${editingRowIndex === user.id ? `${validate_component(Input, "Input").$$render(
                        $$result,
                        {
                          type: "text",
                          value: editUser.access_level
                        },
                        {
                          value: ($$value) => {
                            editUser.access_level = $$value;
                            $$settled = false;
                          }
                        },
                        {}
                      )}` : `${escape(user?.access_level)}`} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(user.description)} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(formatDate(user.created))} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${editingRowIndex === user.id ? `<form method="POST" action="?/editUser"><input type="hidden" name="id"${add_attribute("value", editUser.id, 0)}> <input type="hidden" name="first_name"${add_attribute("value", editUser.first_name, 0)}> <input type="hidden" name="old_first_name"${add_attribute("value", user.first_name, 0)}> <input type="hidden" name="last_name"${add_attribute("value", editUser.last_name, 0)}> <input type="hidden" name="old_last_name"${add_attribute("value", user.last_name, 0)}> <input type="hidden" name="email"${add_attribute("value", editUser.email, 0)}> <input type="hidden" name="old_email"${add_attribute("value", user.email, 0)}> <input type="hidden" name="phone"${add_attribute("value", editUser.phone, 0)}> <input type="hidden" name="old_phone"${add_attribute("value", user.phone, 0)}> <input type="hidden" name="student_number"${add_attribute("value", editUser.student_number, 0)}> <input type="hidden" name="old_student_number"${add_attribute("value", user.student_number, 0)}> <input type="hidden" name="course"${add_attribute("value", editUser.course, 0)}> <input type="hidden" name="old_course"${add_attribute("value", user.course, 0)}> <input type="hidden" name="department"${add_attribute("value", editUser.department, 0)}> <input type="hidden" name="old_department"${add_attribute("value", user.department, 0)}> <input type="hidden" name="access_level"${add_attribute("value", editUser.access_level, 0)}> <input type="hidden" name="old_access_level"${add_attribute("value", user.access_level, 0)}> <button type="submit" ${""} class="mr-2">${validate_component(CheckOutline, "CheckOutline").$$render($$result, { class: "text-green-600 mr-2" }, {}, {})}</button> <button ${""}>${validate_component(CloseOutline, "CloseOutline").$$render($$result, { class: "text-red-600" }, {}, {})}</button> </form>` : `<button>${validate_component(EditOutline, "EditOutline").$$render($$result, { class: "text-green-700 mr-2" }, {}, {})}</button> <button>${validate_component(TrashBinOutline, "TrashBinOutline").$$render($$result, { class: "text-red-700" }, {}, {})}</button>`} `;
                    }
                  })} `;
                }
              })}`;
            })}`;
          }
        })}`;
      }
    })}` : `<p class="content-center text-gray-500" data-svelte-h="svelte-t7stkl">No blocked slots yet</p>`}</div></div> ${validate_component(Modal, "Modal").$$render(
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
          return `<div class="text-center"><h3 class="mb-1 text-lg font-bold text-gray-800 dark:text-gray-400" data-svelte-h="svelte-1xco9b5">Delete equipment from database?</h3> <p class="mb-6 text-sm" data-svelte-h="svelte-1oy4k5y">You are about to delete this entry. This cannot be undone.</p> <p class="text-gray-800">First name: <span style="font-weight: 600;">${escape(eq.first_name)}</span></p> <p class="text-gray-800">Last name: <span style="font-weight: 600;">${escape(eq.last_name)}</span></p> <p class="text-gray-800">Email: <span style="font-weight: 600;">${escape(eq.email)}</span></p> <p class="text-gray-800">Phone: <span style="font-weight: 600;">${escape(eq.phone)}</span></p> <p class="text-gray-800">Student number: <span style="font-weight: 600;">${escape(eq.student_number)}</span></p> <p class="text-gray-800">Course: <span style="font-weight: 600;">${escape(eq.course)}</span></p> <p class="text-gray-800">Department: <span style="font-weight: 600;">${escape(eq.department)}</span></p> <p class="text-gray-800">Access level: <span style="font-weight: 600;">${escape(eq.access_level)}</span></p> <p class="mb-6 text-gray-800">Description: <span style="font-weight: 600;">${escape(eq.description)}</span></p> <form method="POST" action="?/deleteUser"><input type="hidden" name="id"${add_attribute("value", eq.id, 0)}> <div class="flex mb-1 gap-1 justify-center">${validate_component(Button, "Button").$$render(
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
        title: "Edit User Details",
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
          return `${escape(console.log(editUser))} <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `First Name`;
            }
          })} ${validate_component(Input, "Input").$$render($$result, { value: editUser.first_name }, {}, {})}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Last Name`;
            }
          })} ${validate_component(Input, "Input").$$render($$result, { value: editUser.last_name }, {}, {})}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Email`;
            }
          })} ${validate_component(Input, "Input").$$render($$result, { value: editUser.email }, {}, {})}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Phone`;
            }
          })} ${validate_component(Input, "Input").$$render($$result, { value: editUser.phone }, {}, {})}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Student Number`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              value: editUser.student_number,
              disabled: "true"
            },
            {},
            {}
          )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Course`;
            }
          })} ${validate_component(Input, "Input").$$render($$result, { value: editUser.course }, {}, {})}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Department`;
            }
          })} ${validate_component(Input, "Input").$$render($$result, { value: editUser.department }, {}, {})}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Access Level`;
            }
          })} ${validate_component(Input, "Input").$$render($$result, { value: editUser.access_level }, {}, {})}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Access Level Description`;
            }
          })} ${validate_component(Input, "Input").$$render($$result, { value: editUser.description }, {}, {})}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Date Created`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "schedule",
              type: "text",
              value: editUser.created,
              onfocus: "(this.type='date')",
              onblur: "(this.type='text')"
            },
            {},
            {}
          )}</div> <div class="mb-6 flex gap-5 justify-center">${validate_component(GradientButton, "GradientButton").$$render($$result, { color: "green" }, {}, {
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
//# sourceMappingURL=_page.svelte-CGJ3Q8_t.js.map
