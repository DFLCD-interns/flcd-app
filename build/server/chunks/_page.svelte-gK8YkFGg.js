import { c as create_ssr_component, v as validate_component, d as each, e as escape } from './ssr-C5koH-x7.js';
import { G as GradientButton } from './GradientButton-DPhfIyDU.js';
import { L as Label } from './Label-9_yY5ooj.js';
import { I as Input } from './Input-C11sq5ya.js';
import { M as MultiSelect } from './MultiSelect-B9tTplZ5.js';
import { S as Search } from './Search-CQ97XOSU.js';
import { T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell, f as TrashBinOutline, M as Modal } from './TrashBinOutline-B1DbWK73.js';
import { C as ChevronSortOutline, E as EditOutline } from './EditOutline-DKv1LLUI.js';
import { F as FilterSolid } from './FilterSolid-DYonCRCa.js';
import './bundle-mjs-BLGuyV0D.js';
import './Button-DPoC_1Mm.js';
import './Wrapper-Cnx--s0z.js';
import './Badge-A7W5D_Oh.js';
import './index3-CazeuJOF.js';
import './Frame-Cc0rpiY0.js';

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
  let access_level = data.current_user.access_level;
  let tableHead = [];
  if (users != null) {
    tableHead = Object.keys(users[0]);
  }
  let userName;
  let DeleteModal = false;
  let EditModal = false;
  let editUser;
  users.forEach((item) => {
    item.dateString = formatDate(item.created);
  });
  let searchQuery = "";
  let selectedType = [];
  let type = data.userTypes.map((item) => ({
    value: item.description,
    name: item.description
  }));
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
            return `${access_level != 4 ? `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {})} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {})}` : ``} ${each(tableHead, (head) => {
              return `${head != "dateString" ? `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                default: () => {
                  return `<button type="button" class="flex cursor-pointer">${escape(head)} ${validate_component(ChevronSortOutline, "ChevronSortOutline").$$render($$result, { size: "sm" }, {}, {})}</button> `;
                }
              })}` : ``}`;
            })}`;
          }
        })} ${validate_component(TableBody, "TableBody").$$render($$result, { tableBodyClass: "divide-y" }, {}, {
          default: () => {
            return `${each(users, (user) => {
              return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                default: () => {
                  return `${access_level != 4 ? `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `<button>${validate_component(EditOutline, "EditOutline").$$render($$result, { class: "text-green-600" }, {}, {})}</button> `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `<button>${validate_component(TrashBinOutline, "TrashBinOutline").$$render($$result, { class: "text-green-600" }, {}, {})}</button> `;
                    }
                  })}` : ``} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(user.id)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(user.first_name)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(user.last_name)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(user.email)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(user.phone)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(user.student_number)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(user.course)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(user.department)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(Input, "Input").$$render(
                        $$result,
                        {
                          type: "number",
                          min: "1",
                          max: "5",
                          value: user?.access_level
                        },
                        {},
                        {}
                      )}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(user.description)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(formatDate(user.created))}`;
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
        title: "Delete " + userName + " from database?",
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
//# sourceMappingURL=_page.svelte-gK8YkFGg.js.map
