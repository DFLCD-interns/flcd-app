import { c as create_ssr_component, v as validate_component, d as each, e as escape } from './ssr-D-0G9OQq.js';
import { G as GradientButton } from './GradientButton-ClcQ1Dti.js';
import { L as Label } from './Label-YZOSSFZ8.js';
import { I as Input } from './Input-DIWB2hTs.js';
import { S as Search } from './Search-DDQ6kMLb.js';
import { T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell, f as TrashBinOutline, M as Modal } from './TrashBinOutline-CP3XjY4w.js';
import { C as ChevronSortOutline, E as EditOutline } from './EditOutline-bWJ0OTUv.js';
import { C as CirclePlusSolid } from './CirclePlusSolid-BFyfqb9c.js';
import { D as DownloadSolid } from './DownloadSolid-CvxlaeZi.js';
import './bundle-mjs-BLGuyV0D.js';
import './Button-Dk4SyiMB.js';
import './Wrapper-DxnNrkYf.js';
import './Frame-72CUdra3.js';

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
  let access_level = data.current_user.access_level;
  let venues = data.venues;
  let tableHead = [];
  if (venues.length != null) {
    tableHead = Object.keys(venues[0]);
  }
  let venueName = "venue";
  let EditModal = false;
  let DeleteModal = false;
  let AddModal = false;
  let editVenue;
  venues.forEach((item) => {
    item.dateString = formatDate(item.date_registered);
  });
  let searchQuery = "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    venues = data.venues.filter((item) => searchQuery === "" || Object.values(item).some((value) => (
      // Search all string fields
      typeof value === "string" && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )));
    $$rendered = `<div class="p-10"><form class="flex gap-2 pb-5">${validate_component(Search, "Search").$$render(
      $$result,
      { size: "md", value: searchQuery },
      {
        value: ($$value) => {
          searchQuery = $$value;
          $$settled = false;
        }
      },
      {}
    )}</form> <div class="flex items-center justify-between pb-5"><p class="font-semibold text-xl text-gray-700" data-svelte-h="svelte-1qz9ku6">Venues Database</p> <div class="flex gap-2">${validate_component(GradientButton, "GradientButton").$$render(
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
          return `${validate_component(CirclePlusSolid, "CirclePlusSolid").$$render($$result, {}, {}, {})}Add Venue`;
        }
      }
    )}` : ``}</div></div> <div class="pb-5">${venues != null ? `${validate_component(Table, "Table").$$render($$result, { shadow: true }, {}, {
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
            return `${each(venues, (venue) => {
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
                      return `${escape(venue.id)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(venue.name)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(venue.description)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(formatDate(venue.date_registered))}`;
                    }
                  })} `;
                }
              })}`;
            })}`;
          }
        })}`;
      }
    })}` : `<p class="content-center text-gray-700" data-svelte-h="svelte-gltm6q">No venues in database</p>`}</div></div> ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Edit Venue Details",
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
          return `<div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Name`;
            }
          })} ${validate_component(Input, "Input").$$render($$result, { value: editVenue.name }, {}, {})}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Description`;
            }
          })} ${validate_component(Input, "Input").$$render($$result, { value: editVenue.description }, {}, {})}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Date Created`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              value: editVenue.created,
              onfocus: "(this.type='date')"
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
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Delete " + venueName + " from database?",
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
      { title: "Add Venue", open: AddModal },
      {
        open: ($$value) => {
          AddModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<form action="?/addVenue" method="POST"><div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Name`;
            }
          })} ${validate_component(Input, "Input").$$render($$result, { name: "name", placeholder: "Venue name" }, {}, {})}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { class: "block mb-2" }, {}, {
            default: () => {
              return `Description`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "description",
              placeholder: "Venue type"
            },
            {},
            {}
          )}</div> <div class="mb-6 flex gap-5 justify-center">${validate_component(GradientButton, "GradientButton").$$render($$result, { type: "submit", color: "green" }, {}, {
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
    )}`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CfI__5z9.js.map
