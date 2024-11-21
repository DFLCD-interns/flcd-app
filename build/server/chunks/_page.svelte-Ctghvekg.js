import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape, d as each, q as compute_rest_props, p as getContext, g as spread, t as escape_attribute_value, h as escape_object, b as add_attribute } from './ssr-D-0G9OQq.js';
import { M as MultiSelect } from './MultiSelect-CxENl1o9.js';
import { S as Search } from './Search-DDQ6kMLb.js';
import { S as Select } from './Select-cnLI2Umv.js';
import { F as FilterSolid } from './FilterSolid-D3Otlual.js';
import { B as Badge } from './Badge-8btJzlS_.js';
import { G as GradientButton } from './GradientButton-ClcQ1Dti.js';
import { C as Card } from './Card-DdcJifEe.js';
import './client-BUusD8wq.js';
import { p as postgresTimeToReadable, s as statusColors } from './index2-Syvgp6rr.js';
import { parse } from 'date-fns';
import { t as twMerge } from './bundle-mjs-BLGuyV0D.js';
import './Toaster.svelte_svelte_type_style_lang-CeBUoKk3.js';
import { p as page } from './stores-DKWMPfYb.js';
import './Wrapper-DxnNrkYf.js';
import './Button-Dk4SyiMB.js';
import './Input-DIWB2hTs.js';
import './index4-DJfRHyEc.js';
import './Frame-72CUdra3.js';
import './exports-BGi7-Rnc.js';
import './index3-BwhTgwjd.js';

const ArrowRightOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "arrow right outline" } = $$props;
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M19 12H5m14 0-4 4m4-4-4-4"></path></svg>` : `<svg${spread(
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M19 12H5m14 0-4 4m4-4-4-4"></path></svg>`} `;
});
const Requests_card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { info } = $$props;
  let { data } = $$props;
  let { form } = $$props;
  const isAdmin = data?.current_user?.access_level < 5;
  if ($$props.info === void 0 && $$bindings.info && info !== void 0) $$bindings.info(info);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  return `${validate_component(Card, "Card").$$render($$result, { class: "w-full max-w-full" }, {}, {
    default: () => {
      return `<div class="flex items-center justify-between"><div class="mb-2"><h5 class="text-xl font-semibold text-black">${escape(info.type)}: ${escape(info.name)}</h5> <p class="mt-2 text-gray-400">for ${escape(info.table.includes("equipment") || info.table.includes("venue") ? postgresTimeToReadable(info.date) : info.date)}</p> ${validate_component(Badge, "Badge").$$render(
        $$result,
        {
          class: "mt-2",
          large: true,
          border: true,
          color: info?.status === "approved" ? statusColors.approved : info.status === "declined" ? statusColors.declined : statusColors.pending
        },
        {},
        {
          default: () => {
            return `${escape(info?.status?.charAt(0).toUpperCase() + info?.status?.slice(1))}`;
          }
        }
      )} <p class="text-xs mt-2 text-gray-400">Request created on ${escape(postgresTimeToReadable(info.created))}</p></div> <div class="flex grid mr-4">${validate_component(GradientButton, "GradientButton").$$render(
        $$result,
        {
          class: isAdmin ? "" : "mb-1",
          color: "green",
          href: "/dashboard/request-details/" + info.table + "-" + info.id
        },
        {},
        {
          default: () => {
            return `View`;
          }
        }
      )} ${!isAdmin ? `<form action="?/deleteRequest" method="POST"${add_attribute("this", form, 0)}><input hidden="true" id="request_table_name" name="request_table_name"> <input hidden="true" id="request_id" name="request_id"> ${validate_component(GradientButton, "GradientButton").$$render($$result, { color: "red", type: "submit" }, {}, {
        default: () => {
          return `Delete`;
        }
      })}</form>` : ``}</div></div>`;
    }
  })}`;
});
const Admin_view = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  let selectedType = ["Equipment Request", "Venue Request", "Class Observation Request"];
  let type = [
    {
      value: "Equipment Request",
      name: "equipment"
    },
    { value: "Venue Request", name: "venue" },
    {
      value: "Class Observation Request",
      name: "observation"
    }
  ];
  let selectedSort = "";
  let sort = [
    {
      value: "newest to oldest",
      name: "created: newest to oldest"
    },
    {
      value: "oldest to newest",
      name: "created: oldest to newest"
    },
    {
      value: "most urgent to least urgent",
      name: "needed: most urgent to least urgent"
    },
    {
      value: "least urgent to most urgent",
      name: "needed: least urgent to most urgent"
    }
  ];
  let availableRequests = data.requestsInfo.filter((req) => {
    const idIdx = req.approvalsInfo.userIDs.findIndex((id) => data.current_user.access_level === 3 ? id == null : id === data.current_user.user_id);
    const approvedIdx = req.approvalsInfo.statuses.findLastIndex((status) => status === "approved");
    return idIdx <= approvedIdx + 1;
  });
  let displayRequests;
  let searchQuery = "";
  function parseDateTime(dateTimeStr, type2) {
    let parsedDate = "";
    if (type2 == "Class Observation Request") {
      return dateTimeStr;
    } else {
      parsedDate = parse(dateTimeStr.toString().replace(/\sat\s/, " ").replace(/\s+/g, " ").trim(), "MMMM d, yyyy hh:mm a", /* @__PURE__ */ new Date());
    }
    return parsedDate;
  }
  let pendingRequests, otherRequests;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        let filteredRequests = availableRequests.filter((item) => selectedType.includes(item.type)).map(
          (request) => ({
            ...request,
            parsedDate: parseDateTime(request.date, request.type),
            // Parse date_needed
            createdDate: new Date(request.created)
            // Parse created date
          })
        ).filter((item) => searchQuery === "" || // If searchQuery is empty, include all
        Object.values(item).some((value) => typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())));
        displayRequests = filteredRequests.sort((a, b) => {
          if (selectedSort === "newest to oldest") {
            return b.createdDate - a.createdDate;
          } else if (selectedSort === "oldest to newest") {
            return a.createdDate - b.createdDate;
          } else if (selectedSort === "least urgent to most urgent") {
            return b.parsedDate - a.parsedDate;
          } else if (selectedSort === "most urgent to least urgent") {
            return a.parsedDate - b.parsedDate;
          } else {
            return 0;
          }
        });
        pendingRequests = [];
        otherRequests = [];
        displayRequests?.forEach((req) => {
          if (req.status.includes(data.user_access_level_label)) pendingRequests.push(req);
          else otherRequests.push(req);
        });
      }
    }
    $$rendered = `<div class="space-y-3 px-10 py-10 w-full min-h-screen"><form class="gap-2 w-full pb-5"><div class="flex gap-2 w-full items-start pb-2">${validate_component(Search, "Search").$$render(
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
        placeholder: "select type",
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
    )} ${validate_component(Select, "Select").$$render(
      $$result,
      {
        class: "w-full bg-white text-gray-400 text-sm",
        placeholder: "sort by",
        items: sort,
        value: selectedSort
      },
      {
        value: ($$value) => {
          selectedSort = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <hr></form> <div class="flex items-center justify-between pb-0"><h1 class="font-semibold text-xl text-gray-700">${escape("Pending Requests")}</h1> <button class="flex text-gray-500">${`<svg class="h-5 w-5 text-gray-500" width="24" height="24" viewBox="2 -2 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><polyline points="12 8 12 12 14 14"></polyline><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"></path></svg>
        View Requests History`}</button></div> ${pendingRequests.length != 0 && data.requestsInfo != void 0 ? `<div class="space-y-3">${`${each(pendingRequests, (info) => {
      return `${validate_component(Requests_card, "RequestsCard").$$render($$result, { info, data, form }, {}, {})}`;
    })}`}</div>` : `<p class="text-gray-500 text-center mt-5">${escape(
      "No Pending Requests"
    )}</p>`}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const Non_admin_view = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  const pendingRequests = [];
  data.requestsInfo?.forEach((req) => {
    if (req.status.includes("pending") && (req.table.includes("equipment") && !req.actual_date_end || req.actual_date_end > /* @__PURE__ */ new Date())) pendingRequests.push(req);
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  return `<div class="px-10 py-10"><h5 class="mb-7 text-3xl font-bold tracking-tight text-gray-900 dark:text-white" data-svelte-h="svelte-og4z7e">Request Forms</h5> <div class="flex flex-wrap w-full mb-12 align-center justify-center"> <div class="sm:w-1/3 w-full mb-2 sm:mb-0 px-3 flex"> ${validate_component(Card, "Card").$$render(
    $$result,
    {
      class: "relative w-full max-w-full h-full"
    },
    {},
    {
      default: () => {
        return ` <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" data-svelte-h="svelte-178d10o">Equipment</h5> <p class="mb-3 text-sm text-gray-700 dark:text-gray-400 leading-tight" data-svelte-h="svelte-fuim3y">Borrow the department&#39;s equipment. Printing available for FLCD students.</p> <div class="flex sm:flex-row flex-col sm:justify-end relative"><div class="sm:absolute sm:left-[-10px] sm:bottom-[-25px] mb-[-3px] sm:mb-0" data-svelte-h="svelte-dpbfr1"><img src="/1.png" alt="Description" class="object-cover" style="width: 9.5rem; height: 9.5rem;"></div> ${validate_component(GradientButton, "GradientButton").$$render(
          $$result,
          {
            color: "green",
            shadow: true,
            href: "/dashboard/equipment-requests",
            class: "sm:mt-16 mt-0 sm:mb-4 ml-auto w-fit align-self-end"
          },
          {},
          {
            default: () => {
              return `Borrow ${validate_component(ArrowRightOutline, "ArrowRightOutline").$$render($$result, { class: "w-6 h-6 ms-2 text-white" }, {}, {})}`;
            }
          }
        )}</div>`;
      }
    }
  )}</div>  <div class="sm:w-1/3 w-full mb-2 sm:mb-0 px-3 flex"> ${validate_component(Card, "Card").$$render(
    $$result,
    {
      class: "relative w-full max-w-full h-full"
    },
    {},
    {
      default: () => {
        return ` <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" data-svelte-h="svelte-nyd1jq">Venues</h5> <p class="mb-3 text-sm text-gray-700 dark:text-gray-400 leading-tight" data-svelte-h="svelte-s938n7">Reserve rooms in the UPCDC Building for your activities &amp; events.</p> <div class="flex sm:flex-row flex-col sm:justify-end relative"><div class="sm:absolute sm:left-[-10px] sm:bottom-[-25px] mb-[-1px] sm:mb-0" data-svelte-h="svelte-11y1yc2"><img src="/2.png" alt="Description" class="object-cover" style="width: 9.5rem; height: 9.5rem;"></div> ${validate_component(GradientButton, "GradientButton").$$render(
          $$result,
          {
            color: "green",
            shadow: true,
            href: "/dashboard/venue-requests",
            class: "sm:mt-16 mt-0 sm:mb-4 ml-auto w-fit align-self-end"
          },
          {},
          {
            default: () => {
              return `Reserve ${validate_component(ArrowRightOutline, "ArrowRightOutline").$$render($$result, { class: "w-6 h-6 ms-2 text-white" }, {}, {})}`;
            }
          }
        )}</div>`;
      }
    }
  )}</div>  ${data.current_user.access_level != 7 ? `<div class="sm:w-1/3 w-full mb-2 sm:mb-0 px-3 flex"> ${validate_component(Card, "Card").$$render(
    $$result,
    {
      class: "relative w-full max-w-full h-full"
    },
    {},
    {
      default: () => {
        return ` <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" data-svelte-h="svelte-v16fo9">Observations</h5> <p class="mb-3 text-sm text-gray-700 dark:text-gray-400 leading-tight" data-svelte-h="svelte-76nfsr">Book an available class observation schedule for your research.</p> <div class="flex sm:flex-row flex-col sm:justify-end relative"><div class="sm:absolute sm:left-0 sm:bottom-[-25px] mb-[-13px] ml-2 sm:mb-0" data-svelte-h="svelte-ke0h8a"><img src="/3.png" alt="Description" class="object-cover" style="width: 9.5rem; height: 9.5rem;"></div> ${validate_component(GradientButton, "GradientButton").$$render(
          $$result,
          {
            color: "green",
            shadow: true,
            href: "/dashboard/observation-form",
            class: "sm:mt-16 mt-0 sm:mb-4 ml-auto w-fit align-self-end"
          },
          {},
          {
            default: () => {
              return `Book ${validate_component(ArrowRightOutline, "ArrowRightOutline").$$render($$result, { class: "w-6 h-6 ms-2 text-white" }, {}, {})}`;
            }
          }
        )}</div>`;
      }
    }
  )}</div>` : ``}</div> ${data.current_user.access_level != 7 ? `<div class="flex items-center justify-between pb-3"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${escape("Your Pending Requests")}</h5> <button class="text-gray-500 flex">${`<svg class="h-5 w-5 text-gray-500" width="24" height="24" viewBox="2 -2 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><polyline points="12 8 12 12 14 14"></polyline><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"></path></svg>
          View Requests History`}</button></div> ${pendingRequests.length > 0 && data.requestsInfo != void 0 ? `<div class="space-y-3">${`${each(pendingRequests, (info) => {
    return `${validate_component(Requests_card, "RequestsCard").$$render($$result, { info, data, form }, {}, {})}`;
  })}`}</div>` : `<p class="text-gray-500 text-center mt-5">${escape(
    "No Pending Requests"
  )}</p>`}` : ``}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { data } = $$props;
  let { form } = $$props;
  let isAdmin = data?.current_user?.access_level < 5;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  $$unsubscribe_page();
  return `${isAdmin ? `${validate_component(Admin_view, "AdminView").$$render($$result, { data, form }, {}, {})}` : `${validate_component(Non_admin_view, "NonAdminView").$$render($$result, { data, form }, {}, {})}`}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-Ctghvekg.js.map
