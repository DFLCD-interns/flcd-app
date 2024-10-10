import { c as create_ssr_component, v as validate_component, j as compute_rest_props, b as add_attribute, g as spread, k as escape_attribute_value, h as escape_object, a as subscribe, e as escape, l as getContext } from './ssr-C5koH-x7.js';
import { t as twMerge } from './bundle-mjs-BLGuyV0D.js';
import { p as page } from './stores-BkJFkPQd.js';
import { E as ExclamationCircleOutline } from './ExclamationCircleOutline-Tv8T1aYn.js';
import './client-BUusD8wq.js';
import './exports-BGi7-Rnc.js';

function sineIn(t) {
  const v = Math.cos(t * Math.PI * 0.5);
  if (Math.abs(v) < 1e-14) return 1;
  else return 1 - v;
}
const Drawer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "activateClickOutside",
    "hidden",
    "position",
    "leftOffset",
    "rightOffset",
    "topOffset",
    "bottomOffset",
    "width",
    "backdrop",
    "bgColor",
    "bgOpacity",
    "placement",
    "id",
    "divClass",
    "transitionParams",
    "transitionType"
  ]);
  let { activateClickOutside = true } = $$props;
  let { hidden = true } = $$props;
  let { position = "fixed" } = $$props;
  let { leftOffset = "inset-y-0 start-0" } = $$props;
  let { rightOffset = "inset-y-0 end-0" } = $$props;
  let { topOffset = "inset-x-0 top-0" } = $$props;
  let { bottomOffset = "inset-x-0 bottom-0" } = $$props;
  let { width = "w-80" } = $$props;
  let { backdrop = true } = $$props;
  let { bgColor = "bg-gray-900" } = $$props;
  let { bgOpacity = "bg-opacity-75" } = $$props;
  let { placement = "left" } = $$props;
  let { id = "drawer-example" } = $$props;
  let { divClass = "overflow-y-auto z-50 p-4 bg-white dark:bg-gray-800" } = $$props;
  let { transitionParams = {} } = $$props;
  let { transitionType = "fly" } = $$props;
  const placements = {
    left: leftOffset,
    right: rightOffset,
    top: topOffset,
    bottom: bottomOffset
  };
  let backdropDivClass = twMerge("fixed top-0 start-0 z-50 w-full h-full", backdrop && bgColor, backdrop && bgOpacity);
  if ($$props.activateClickOutside === void 0 && $$bindings.activateClickOutside && activateClickOutside !== void 0) $$bindings.activateClickOutside(activateClickOutside);
  if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0) $$bindings.hidden(hidden);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0) $$bindings.position(position);
  if ($$props.leftOffset === void 0 && $$bindings.leftOffset && leftOffset !== void 0) $$bindings.leftOffset(leftOffset);
  if ($$props.rightOffset === void 0 && $$bindings.rightOffset && rightOffset !== void 0) $$bindings.rightOffset(rightOffset);
  if ($$props.topOffset === void 0 && $$bindings.topOffset && topOffset !== void 0) $$bindings.topOffset(topOffset);
  if ($$props.bottomOffset === void 0 && $$bindings.bottomOffset && bottomOffset !== void 0) $$bindings.bottomOffset(bottomOffset);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
  if ($$props.backdrop === void 0 && $$bindings.backdrop && backdrop !== void 0) $$bindings.backdrop(backdrop);
  if ($$props.bgColor === void 0 && $$bindings.bgColor && bgColor !== void 0) $$bindings.bgColor(bgColor);
  if ($$props.bgOpacity === void 0 && $$bindings.bgOpacity && bgOpacity !== void 0) $$bindings.bgOpacity(bgOpacity);
  if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0) $$bindings.placement(placement);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0) $$bindings.divClass(divClass);
  if ($$props.transitionParams === void 0 && $$bindings.transitionParams && transitionParams !== void 0) $$bindings.transitionParams(transitionParams);
  if ($$props.transitionType === void 0 && $$bindings.transitionType && transitionType !== void 0) $$bindings.transitionType(transitionType);
  return `${!hidden ? `${backdrop && activateClickOutside ? `<div role="presentation"${add_attribute("class", backdropDivClass, 0)}></div>` : `${backdrop && !activateClickOutside ? `<div role="presentation"${add_attribute("class", backdropDivClass, 0)}></div>` : ``}`} <div${spread(
    [
      { id: escape_attribute_value(id) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(divClass, width, position, placements[placement], $$props.class))
      },
      { tabindex: "-1" },
      {
        "aria-controls": escape_attribute_value(id)
      },
      {
        "aria-labelledby": escape_attribute_value(id)
      }
    ],
    {}
  )}>${slots.default ? slots.default({ hidden }) : ``}</div>` : ``} `;
});
const GridSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "grid solid" } = $$props;
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M4.857 3A1.857 1.857 0 0 0 3 4.857v4.286C3 10.169 3.831 11 4.857 11h4.286A1.857 1.857 0 0 0 11 9.143V4.857A1.857 1.857 0 0 0 9.143 3H4.857Zm10 0A1.857 1.857 0 0 0 13 4.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 9.143V4.857A1.857 1.857 0 0 0 19.143 3h-4.286Zm-10 10A1.857 1.857 0 0 0 3 14.857v4.286C3 20.169 3.831 21 4.857 21h4.286A1.857 1.857 0 0 0 11 19.143v-4.286A1.857 1.857 0 0 0 9.143 13H4.857Zm10 0A1.857 1.857 0 0 0 13 14.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 19.143v-4.286A1.857 1.857 0 0 0 19.143 13h-4.286Z" clip-rule="evenodd"></path></svg>` : `<svg${spread(
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M4.857 3A1.857 1.857 0 0 0 3 4.857v4.286C3 10.169 3.831 11 4.857 11h4.286A1.857 1.857 0 0 0 11 9.143V4.857A1.857 1.857 0 0 0 9.143 3H4.857Zm10 0A1.857 1.857 0 0 0 13 4.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 9.143V4.857A1.857 1.857 0 0 0 19.143 3h-4.286Zm-10 10A1.857 1.857 0 0 0 3 14.857v4.286C3 20.169 3.831 21 4.857 21h4.286A1.857 1.857 0 0 0 11 19.143v-4.286A1.857 1.857 0 0 0 9.143 13H4.857Zm10 0A1.857 1.857 0 0 0 13 14.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 19.143v-4.286A1.857 1.857 0 0 0 19.143 13h-4.286Z" clip-rule="evenodd"></path></svg>`} `;
});
const Admin_sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentPath;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let userData = {
    firstName: data?.current_user?.first_name,
    lastName: data?.current_user?.last_name,
    userType: data?.user_access_level_label.charAt(0).toUpperCase() + data.user_access_level_label.slice(1)
    // first letter capitalized
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  currentPath = $page.url.pathname;
  $$unsubscribe_page();
  return `<div class="h-screen flex flex-col justify-between"><div> <a href="/dashboard" data-svelte-h="svelte-1gakbew"><div class="-mx-6 px-6 py-4 flex items-center border-b border-gray-200"><svg width="368" height="73" viewBox="0 0 368 73" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M351.584 43.1176C360.65 38.1485 364.157 26.4822 359.416 17.0601C354.675 7.63803 343.483 4.02818 334.416 8.99728C325.35 13.9664 321.843 25.6327 326.584 35.0548C331.325 44.4769 342.517 48.0867 351.584 43.1176Z" fill="#A01F23"></path><path d="M334.556 21.7893C335.428 20.5474 336.717 19.7816 338.185 19.616C339.296 19.4918 340.327 19.7402 341.299 20.3611C341.794 20.6716 342.231 21.0649 342.647 21.5409C342.945 20.9821 343.302 20.4853 343.718 20.0713C344.531 19.2434 345.503 18.7673 346.594 18.6431C348.061 18.4775 349.489 18.9329 350.6 19.9471C351.691 20.9407 352.385 22.3896 352.563 24.0248C352.742 25.7014 352.305 27.3159 351.195 29.096C350.203 30.6898 348.696 32.3457 346.951 34.2914C346.356 34.9537 345.681 35.6989 344.987 36.4854C344.809 36.6924 344.551 36.8373 344.273 36.858C343.996 36.8994 343.738 36.8166 343.5 36.651C342.647 36.03 341.834 35.4505 341.12 34.9537C339.018 33.4634 337.193 32.1801 335.884 30.8554C334.417 29.3858 333.663 27.8955 333.485 26.2189C333.326 24.5837 333.703 23.0106 334.556 21.7893Z" fill="white"></path><path d="M22.656 28.04H36.111C39.351 28.04 42.216 28.685 44.706 29.975C47.226 31.265 49.176 33.065 50.556 35.375C51.966 37.685 52.671 40.325 52.671 43.295C52.671 46.415 51.981 49.16 50.601 51.53C49.251 53.9 47.316 55.745 44.796 57.065C42.306 58.355 39.411 59 36.111 59H22.656V28.04ZM35.661 50.9C37.911 50.9 39.621 50.195 40.791 48.785C41.991 47.345 42.591 45.485 42.591 43.205C42.591 41.045 42.006 39.335 40.836 38.075C39.696 36.785 37.971 36.14 35.661 36.14H32.601V50.9H35.661ZM57.0212 28.04H78.3512V34.88H66.6962V41.135H77.4962V46.805H66.6962V59H57.0212V28.04ZM82.6853 28.04H92.4053V52.16H103.16V59H82.6853V28.04ZM120.688 59.72C117.688 59.72 114.958 59.015 112.498 57.605C110.068 56.165 108.133 54.215 106.693 51.755C105.283 49.265 104.578 46.52 104.578 43.52C104.578 40.46 105.268 37.7 106.648 35.24C108.028 32.78 109.918 30.86 112.318 29.48C114.718 28.07 117.418 27.365 120.418 27.365C122.038 27.365 123.628 27.56 125.188 27.95C126.748 28.34 128.083 28.895 129.193 29.615L127.978 36.59C125.818 35.78 123.868 35.375 122.128 35.375C119.728 35.375 117.883 36.08 116.593 37.49C115.303 38.87 114.658 40.865 114.658 43.475C114.658 46.025 115.333 48.02 116.683 49.46C118.063 50.87 119.968 51.575 122.398 51.575C123.328 51.575 124.198 51.485 125.008 51.305C125.818 51.125 126.808 50.795 127.978 50.315L129.238 57.425C126.628 58.955 123.778 59.72 120.688 59.72ZM133.266 28.04H146.721C149.961 28.04 152.826 28.685 155.316 29.975C157.836 31.265 159.786 33.065 161.166 35.375C162.576 37.685 163.281 40.325 163.281 43.295C163.281 46.415 162.591 49.16 161.211 51.53C159.861 53.9 157.926 55.745 155.406 57.065C152.916 58.355 150.021 59 146.721 59H133.266V28.04ZM146.271 50.9C148.521 50.9 150.231 50.195 151.401 48.785C152.601 47.345 153.201 45.485 153.201 43.205C153.201 41.045 152.616 39.335 151.446 38.075C150.306 36.785 148.581 36.14 146.271 36.14H143.211V50.9H146.271Z" fill="#323232"></path><path d="M180.667 44.8438L182.285 44.8906C182.816 44.9062 184.519 44.9141 187.394 44.9141C190.269 44.9141 192.152 44.6797 193.042 44.2109C193.933 43.7422 194.378 43.0312 194.378 42.0781C194.378 41.125 193.839 40.2812 192.761 39.5469C191.683 38.8125 190.488 38.4453 189.175 38.4453C186.878 38.4453 184.988 39.0312 183.503 40.2031C182.019 41.375 181.074 42.9219 180.667 44.8438ZM196.394 51.6172C197.769 51.6172 198.457 52.2344 198.457 53.4688C198.457 54.0312 198.238 54.6641 197.8 55.3672C197.378 56.0547 196.753 56.6953 195.925 57.2891C193.988 58.6641 191.449 59.3516 188.308 59.3516C185.183 59.3516 182.472 58.2969 180.175 56.1875C179.035 55.1406 178.121 53.8516 177.433 52.3203C176.746 50.7891 176.402 49.1094 176.402 47.2812C176.402 43.7188 177.574 40.7422 179.917 38.3516C182.261 35.9453 185.214 34.7422 188.777 34.7422C191.746 34.7422 194.097 35.4688 195.832 36.9219C197.582 38.3594 198.457 40.1328 198.457 42.2422C198.457 44.3516 197.605 45.9297 195.902 46.9766C194.199 48.0078 190.964 48.5234 186.199 48.5234C184.933 48.5234 183.058 48.4766 180.574 48.3828C180.855 50.8047 181.792 52.625 183.386 53.8438C184.98 55.0469 186.644 55.6484 188.378 55.6484C190.113 55.6484 191.48 55.4609 192.48 55.0859C193.496 54.6953 194.222 54.0234 194.66 53.0703C195.113 52.1016 195.691 51.6172 196.394 51.6172ZM204.764 25.976H215.132V51.704H226.604V59H204.764V25.976ZM240.48 59.384C238.4 59.384 236.448 58.84 234.624 57.752C232.832 56.632 231.392 55.128 230.304 53.24C229.216 51.32 228.672 49.192 228.672 46.856C228.672 44.552 229.216 42.472 230.304 40.616C231.392 38.728 232.848 37.256 234.672 36.2C236.496 35.144 238.432 34.616 240.48 34.616C242.144 34.616 243.68 35.08 245.088 36.008C246.528 36.936 247.616 38.328 248.352 40.184V34.616H258.432V59H248.352V54.536C246.752 57.768 244.128 59.384 240.48 59.384ZM243.6 51.8C244.88 51.8 245.968 51.352 246.864 50.456C247.792 49.528 248.288 48.44 248.352 47.192V46.808C248.288 45.528 247.776 44.44 246.816 43.544C245.888 42.648 244.816 42.2 243.6 42.2C242.256 42.2 241.104 42.68 240.144 43.64C239.216 44.568 238.752 45.688 238.752 47C238.752 48.344 239.232 49.48 240.192 50.408C241.152 51.336 242.288 51.8 243.6 51.8ZM273.902 59.384C271.822 59.384 269.87 58.84 268.046 57.752C266.254 56.632 264.814 55.128 263.726 53.24C262.638 51.32 262.094 49.192 262.094 46.856C262.094 44.552 262.638 42.472 263.726 40.616C264.814 38.728 266.27 37.256 268.094 36.2C269.918 35.144 271.854 34.616 273.902 34.616C275.566 34.616 277.102 35.08 278.51 36.008C279.95 36.936 281.038 38.328 281.774 40.184V34.616H291.854V59H281.774V54.536C280.174 57.768 277.55 59.384 273.902 59.384ZM277.022 51.8C278.302 51.8 279.39 51.352 280.286 50.456C281.214 49.528 281.71 48.44 281.774 47.192V46.808C281.71 45.528 281.198 44.44 280.238 43.544C279.31 42.648 278.238 42.2 277.022 42.2C275.678 42.2 274.526 42.68 273.566 43.64C272.638 44.568 272.174 45.688 272.174 47C272.174 48.344 272.654 49.48 273.614 50.408C274.574 51.336 275.71 51.8 277.022 51.8ZM296.716 35.288H306.364V40.184C308.22 36.472 311.164 34.616 315.196 34.616C318.268 34.616 320.668 35.72 322.396 37.928C324.156 40.104 325.036 43.128 325.036 47V59H314.956V45.992C314.956 44.616 314.652 43.56 314.044 42.824C313.468 42.088 312.652 41.72 311.596 41.72C310.828 41.72 310.076 41.976 309.34 42.488C308.604 42.968 307.996 43.672 307.516 44.6C307.068 45.528 306.844 46.584 306.844 47.768V59H296.716V35.288Z" fill="#287C41"></path></svg></div></a>  <div class="mt-9 flex items-center ml-2"><div class="flex-shrink-0 rounded-full bg-gray-300 text-gray-600 font-semibold text-xl w-10 h-10 flex items-center justify-center">${escape(userData.firstName.charAt(0).toUpperCase())}${escape(userData.lastName.charAt(0).toUpperCase())}</div> <div class="ml-2 text-left"><h5 class="text-lg font-semibold text-gray-600 leading-tight">${escape(userData.firstName)} ${escape(userData.lastName)}</h5> <span class="text-gray-400">${escape(userData.userType)}</span></div></div>  <ul class="space-y-2 mt-8"><li><a href="/dashboard" aria-label="requests" class="${"relative px-4 py-3 flex items-center space-x-4 rounded-xl " + escape(
    currentPath === "/dashboard" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-200 hover:text-gray-900",
    true
  )}">${validate_component(GridSolid, "GridSolid").$$render($$result, { class: "text-gray-600" }, {}, {})} <span class="font-medium -mr-1" data-svelte-h="svelte-1d94axc">Dashboard</span></a></li> <li><button class="w-full px-4 py-3 flex justify-between items-center space-x-4 rounded-xl text-gray-600 hover:bg-gray-200 hover:text-gray-900" data-svelte-h="svelte-1saqkkf"><div class="gap-2 flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path class="fill-current text-gray-600" fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd"></path><path class="fill-current text-gray-300" d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg> <span class="font-medium">Databases</span></div> <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"></path></svg></button> <div class="${["mt-2 space-y-2", ""].join(" ").trim()}" data-svelte-h="svelte-1a8t9vc"><ul class="space-y-2"><li><a href="/dashboard/databases/classes" class="flex items-center w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg pl-12 group">Classes</a></li> <li><a href="/dashboard/databases/equipments" class="flex items-center w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg pl-12 group">Equipments</a></li> <li><a href="/dashboard/databases/users" class="flex items-center w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg pl-12 group">Users</a></li> <li><a href="/dashboard/databases/venues" class="flex items-center w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg pl-12 group">Venues</a></li> <li><a href="/dashboard/databases/schedules" class="flex items-center w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg pl-12 group">Schedules</a></li></ul></div></li></ul></div>  <div class="px-6 -mx-6 pt-2 pb-2 flex justify-between items-center border-t" data-svelte-h="svelte-1qtih60"><button class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> <a href="/logout" class="group-hover:text-gray-700"><span class="group-hover:text-gray-700">Log out</span></a></button></div></div>`;
});
const Non_admin_sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentPath;
  let isUnverified;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let userData = {
    firstName: data?.current_user?.first_name,
    lastName: data?.current_user?.last_name,
    userType: data?.user_access_level_label.charAt(0).toUpperCase() + data.user_access_level_label.slice(1)
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  currentPath = $page.url.pathname;
  isUnverified = data?.current_user?.student_number == null;
  $$unsubscribe_page();
  return `<div class="h-screen flex flex-col justify-between"><div> <a href="/dashboard" data-svelte-h="svelte-1gakbew"><div class="-mx-6 px-6 py-4 flex items-center border-b border-gray-200"><svg width="368" height="73" viewBox="0 0 368 73" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M351.584 43.1176C360.65 38.1485 364.157 26.4822 359.416 17.0601C354.675 7.63803 343.483 4.02818 334.416 8.99728C325.35 13.9664 321.843 25.6327 326.584 35.0548C331.325 44.4769 342.517 48.0867 351.584 43.1176Z" fill="#A01F23"></path><path d="M334.556 21.7893C335.428 20.5474 336.717 19.7816 338.185 19.616C339.296 19.4918 340.327 19.7402 341.299 20.3611C341.794 20.6716 342.231 21.0649 342.647 21.5409C342.945 20.9821 343.302 20.4853 343.718 20.0713C344.531 19.2434 345.503 18.7673 346.594 18.6431C348.061 18.4775 349.489 18.9329 350.6 19.9471C351.691 20.9407 352.385 22.3896 352.563 24.0248C352.742 25.7014 352.305 27.3159 351.195 29.096C350.203 30.6898 348.696 32.3457 346.951 34.2914C346.356 34.9537 345.681 35.6989 344.987 36.4854C344.809 36.6924 344.551 36.8373 344.273 36.858C343.996 36.8994 343.738 36.8166 343.5 36.651C342.647 36.03 341.834 35.4505 341.12 34.9537C339.018 33.4634 337.193 32.1801 335.884 30.8554C334.417 29.3858 333.663 27.8955 333.485 26.2189C333.326 24.5837 333.703 23.0106 334.556 21.7893Z" fill="white"></path><path d="M22.656 28.04H36.111C39.351 28.04 42.216 28.685 44.706 29.975C47.226 31.265 49.176 33.065 50.556 35.375C51.966 37.685 52.671 40.325 52.671 43.295C52.671 46.415 51.981 49.16 50.601 51.53C49.251 53.9 47.316 55.745 44.796 57.065C42.306 58.355 39.411 59 36.111 59H22.656V28.04ZM35.661 50.9C37.911 50.9 39.621 50.195 40.791 48.785C41.991 47.345 42.591 45.485 42.591 43.205C42.591 41.045 42.006 39.335 40.836 38.075C39.696 36.785 37.971 36.14 35.661 36.14H32.601V50.9H35.661ZM57.0212 28.04H78.3512V34.88H66.6962V41.135H77.4962V46.805H66.6962V59H57.0212V28.04ZM82.6853 28.04H92.4053V52.16H103.16V59H82.6853V28.04ZM120.688 59.72C117.688 59.72 114.958 59.015 112.498 57.605C110.068 56.165 108.133 54.215 106.693 51.755C105.283 49.265 104.578 46.52 104.578 43.52C104.578 40.46 105.268 37.7 106.648 35.24C108.028 32.78 109.918 30.86 112.318 29.48C114.718 28.07 117.418 27.365 120.418 27.365C122.038 27.365 123.628 27.56 125.188 27.95C126.748 28.34 128.083 28.895 129.193 29.615L127.978 36.59C125.818 35.78 123.868 35.375 122.128 35.375C119.728 35.375 117.883 36.08 116.593 37.49C115.303 38.87 114.658 40.865 114.658 43.475C114.658 46.025 115.333 48.02 116.683 49.46C118.063 50.87 119.968 51.575 122.398 51.575C123.328 51.575 124.198 51.485 125.008 51.305C125.818 51.125 126.808 50.795 127.978 50.315L129.238 57.425C126.628 58.955 123.778 59.72 120.688 59.72ZM133.266 28.04H146.721C149.961 28.04 152.826 28.685 155.316 29.975C157.836 31.265 159.786 33.065 161.166 35.375C162.576 37.685 163.281 40.325 163.281 43.295C163.281 46.415 162.591 49.16 161.211 51.53C159.861 53.9 157.926 55.745 155.406 57.065C152.916 58.355 150.021 59 146.721 59H133.266V28.04ZM146.271 50.9C148.521 50.9 150.231 50.195 151.401 48.785C152.601 47.345 153.201 45.485 153.201 43.205C153.201 41.045 152.616 39.335 151.446 38.075C150.306 36.785 148.581 36.14 146.271 36.14H143.211V50.9H146.271Z" fill="#323232"></path><path d="M180.667 44.8438L182.285 44.8906C182.816 44.9062 184.519 44.9141 187.394 44.9141C190.269 44.9141 192.152 44.6797 193.042 44.2109C193.933 43.7422 194.378 43.0312 194.378 42.0781C194.378 41.125 193.839 40.2812 192.761 39.5469C191.683 38.8125 190.488 38.4453 189.175 38.4453C186.878 38.4453 184.988 39.0312 183.503 40.2031C182.019 41.375 181.074 42.9219 180.667 44.8438ZM196.394 51.6172C197.769 51.6172 198.457 52.2344 198.457 53.4688C198.457 54.0312 198.238 54.6641 197.8 55.3672C197.378 56.0547 196.753 56.6953 195.925 57.2891C193.988 58.6641 191.449 59.3516 188.308 59.3516C185.183 59.3516 182.472 58.2969 180.175 56.1875C179.035 55.1406 178.121 53.8516 177.433 52.3203C176.746 50.7891 176.402 49.1094 176.402 47.2812C176.402 43.7188 177.574 40.7422 179.917 38.3516C182.261 35.9453 185.214 34.7422 188.777 34.7422C191.746 34.7422 194.097 35.4688 195.832 36.9219C197.582 38.3594 198.457 40.1328 198.457 42.2422C198.457 44.3516 197.605 45.9297 195.902 46.9766C194.199 48.0078 190.964 48.5234 186.199 48.5234C184.933 48.5234 183.058 48.4766 180.574 48.3828C180.855 50.8047 181.792 52.625 183.386 53.8438C184.98 55.0469 186.644 55.6484 188.378 55.6484C190.113 55.6484 191.48 55.4609 192.48 55.0859C193.496 54.6953 194.222 54.0234 194.66 53.0703C195.113 52.1016 195.691 51.6172 196.394 51.6172ZM204.764 25.976H215.132V51.704H226.604V59H204.764V25.976ZM240.48 59.384C238.4 59.384 236.448 58.84 234.624 57.752C232.832 56.632 231.392 55.128 230.304 53.24C229.216 51.32 228.672 49.192 228.672 46.856C228.672 44.552 229.216 42.472 230.304 40.616C231.392 38.728 232.848 37.256 234.672 36.2C236.496 35.144 238.432 34.616 240.48 34.616C242.144 34.616 243.68 35.08 245.088 36.008C246.528 36.936 247.616 38.328 248.352 40.184V34.616H258.432V59H248.352V54.536C246.752 57.768 244.128 59.384 240.48 59.384ZM243.6 51.8C244.88 51.8 245.968 51.352 246.864 50.456C247.792 49.528 248.288 48.44 248.352 47.192V46.808C248.288 45.528 247.776 44.44 246.816 43.544C245.888 42.648 244.816 42.2 243.6 42.2C242.256 42.2 241.104 42.68 240.144 43.64C239.216 44.568 238.752 45.688 238.752 47C238.752 48.344 239.232 49.48 240.192 50.408C241.152 51.336 242.288 51.8 243.6 51.8ZM273.902 59.384C271.822 59.384 269.87 58.84 268.046 57.752C266.254 56.632 264.814 55.128 263.726 53.24C262.638 51.32 262.094 49.192 262.094 46.856C262.094 44.552 262.638 42.472 263.726 40.616C264.814 38.728 266.27 37.256 268.094 36.2C269.918 35.144 271.854 34.616 273.902 34.616C275.566 34.616 277.102 35.08 278.51 36.008C279.95 36.936 281.038 38.328 281.774 40.184V34.616H291.854V59H281.774V54.536C280.174 57.768 277.55 59.384 273.902 59.384ZM277.022 51.8C278.302 51.8 279.39 51.352 280.286 50.456C281.214 49.528 281.71 48.44 281.774 47.192V46.808C281.71 45.528 281.198 44.44 280.238 43.544C279.31 42.648 278.238 42.2 277.022 42.2C275.678 42.2 274.526 42.68 273.566 43.64C272.638 44.568 272.174 45.688 272.174 47C272.174 48.344 272.654 49.48 273.614 50.408C274.574 51.336 275.71 51.8 277.022 51.8ZM296.716 35.288H306.364V40.184C308.22 36.472 311.164 34.616 315.196 34.616C318.268 34.616 320.668 35.72 322.396 37.928C324.156 40.104 325.036 43.128 325.036 47V59H314.956V45.992C314.956 44.616 314.652 43.56 314.044 42.824C313.468 42.088 312.652 41.72 311.596 41.72C310.828 41.72 310.076 41.976 309.34 42.488C308.604 42.968 307.996 43.672 307.516 44.6C307.068 45.528 306.844 46.584 306.844 47.768V59H296.716V35.288Z" fill="#287C41"></path></svg></div></a>  <div class="mt-9 flex items-center ml-2"><div class="flex-shrink-0 rounded-full bg-gray-300 text-gray-600 font-semibold text-xl w-10 h-10 flex items-center justify-center">${escape(userData.firstName.charAt(0).toUpperCase())}${escape(userData.lastName.charAt(0).toUpperCase())}</div> <div class="ml-2 text-left"><h5 class="text-lg font-semibold text-gray-600 leading-tight">${escape(userData.firstName)} ${escape(userData.lastName)}</h5> ${isUnverified ? `<span class="text-gray-400" data-svelte-h="svelte-1k14uc6">Unverified Faculty</span>` : `<span class="text-gray-400">${escape(userData.userType)}</span>`}</div></div> ${isUnverified ? `<p class="text-xs flex items-center mt-4">${validate_component(ExclamationCircleOutline, "ExclamationCircleOutline").$$render(
    $$result,
    {
      class: "mr-2 text-orange-400 inline-block"
    },
    {},
    {}
  )} 
                Please wait for FLCD to verify your account before you get admin access.</p>` : ``}  <ul class="space-y-2 mt-8"><li><a href="/dashboard" aria-label="requests" class="${"relative px-4 py-3 flex items-center space-x-4 rounded-xl " + escape(
    currentPath === "/dashboard" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-200 hover:text-gray-900",
    true
  )}">${validate_component(GridSolid, "GridSolid").$$render($$result, { class: "text-gray-600" }, {}, {})} <span class="font-medium -mr-1" data-svelte-h="svelte-1d94axc">Dashboard</span></a></li> <li><button class="w-full px-4 py-3 flex justify-between items-center space-x-4 rounded-xl text-gray-600 hover:bg-gray-200 hover:text-gray-900" data-svelte-h="svelte-rd44wn"><div class="gap-2 flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path class="fill-current text-gray-600" fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd"></path><path class="fill-current text-gray-300" d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg> <span class="font-medium">Request Forms</span></div> <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"></path></svg></button> <div class="${["mt-2 space-y-2", "hidden"].join(" ").trim()}"><ul class="space-y-2"><li data-svelte-h="svelte-1up5ohl"><a href="/dashboard/requests-form" class="flex items-center w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg pl-12 group">Equipments or Venues</a></li> ${userData.userType != "Guest" ? `<li data-svelte-h="svelte-y2dead"><a href="/dashboard/observation-form" class="flex items-center w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg pl-12 group">Observation</a></li>` : ``}</ul></div></li></ul></div>  <div class="px-6 -mx-6 pt-2 pb-2 flex justify-between items-center border-t" data-svelte-h="svelte-1qtih60"><button class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> <a href="/logout" class="group-hover:text-gray-700"><span class="group-hover:text-gray-700">Log out</span></a></button></div></div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let hidden1 = true;
  let transitionParams = { x: -320, duration: 200, easing: sineIn };
  let isAdmin = data?.current_user?.access_level < 5;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<aside class="hidden lg:block fixed z-10 top-0 pb-3 px-6 w-full justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">${isAdmin ? `${validate_component(Admin_sidebar, "AdminSidebar").$$render($$result, { data }, {}, {})}` : `${validate_component(Non_admin_sidebar, "NonAdminSidebar").$$render($$result, { data }, {}, {})}`}</aside> ${validate_component(Drawer, "Drawer").$$render(
      $$result,
      {
        transitionType: "fly",
        transitionParams,
        id: "sidebar1",
        class: "justify-between",
        hidden: hidden1
      },
      {
        hidden: ($$value) => {
          hidden1 = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${isAdmin ? `${validate_component(Admin_sidebar, "AdminSidebar").$$render($$result, { data }, {}, {})}` : `${validate_component(Non_admin_sidebar, "NonAdminSidebar").$$render($$result, { data }, {}, {})}`}`;
        }
      }
    )}  <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]"><div class="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5 lg:hidden"><div class="px-6 flex items-center justify-between space-x-4 2xl:container">  <button class="w-12 h-16 -mr-2 border-r lg:hidden" data-svelte-h="svelte-b3jq5h"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button>     </div></div>  ${slots.default ? slots.default({}) : ``}</div>`;
  } while (!$$settled);
  return $$rendered;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-Dfq_mg9C.js.map
