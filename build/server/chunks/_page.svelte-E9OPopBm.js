import { c as create_ssr_component, v as validate_component, d as each, e as escape, j as compute_rest_props, l as getContext, b as add_attribute, g as spread, h as escape_object, k as escape_attribute_value, u as compute_slots } from './ssr-C5koH-x7.js';
import { B as Button } from './Button-DPoC_1Mm.js';
import { G as GradientButton } from './GradientButton-DPhfIyDU.js';
import { C as Card } from './Card-BPOAXPC5.js';
import { L as Label } from './Label-9_yY5ooj.js';
import { I as Input } from './Input-C11sq5ya.js';
import { M as MultiSelect } from './MultiSelect-B9tTplZ5.js';
import { t as twMerge } from './bundle-mjs-BLGuyV0D.js';
import { W as Wrapper } from './Wrapper-Cnx--s0z.js';
import { T as Tabs, a as TabItem } from './Tabs-XTQ4UVlN.js';
import { C as ChevronLeftOutline } from './ChevronLeftOutline-BJ0KeBW-.js';
import './client-BUusD8wq.js';
import './Frame-Cc0rpiY0.js';
import './Badge-A7W5D_Oh.js';
import './index3-CazeuJOF.js';
import './index4-XrsG0yEK.js';
import './exports-BGi7-Rnc.js';

const Textarea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "value",
    "wrappedClass",
    "unWrappedClass",
    "innerWrappedClass",
    "headerClass",
    "footerClass"
  ]);
  let $$slots = compute_slots(slots);
  const background = getContext("background");
  let { value = void 0 } = $$props;
  let { wrappedClass = "block w-full text-sm border-0 px-0 bg-inherit dark:bg-inherit focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50" } = $$props;
  let { unWrappedClass = "p-2.5 text-sm focus:ring-primary-500 border-gray-300 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50" } = $$props;
  let { innerWrappedClass = "py-2 px-4 bg-white dark:bg-gray-800" } = $$props;
  let { headerClass = "" } = $$props;
  let { footerClass = "" } = $$props;
  let wrapped;
  let wrapperClass;
  let textareaClass;
  const headerCls = (header) => twMerge(
    header ? "border-b" : "border-t",
    "py-2 px-3 border-gray-200",
    background ? "dark:border-gray-500" : "dark:border-gray-600",
    header ? headerClass : footerClass
  );
  let innerWrapperClass;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.wrappedClass === void 0 && $$bindings.wrappedClass && wrappedClass !== void 0) $$bindings.wrappedClass(wrappedClass);
  if ($$props.unWrappedClass === void 0 && $$bindings.unWrappedClass && unWrappedClass !== void 0) $$bindings.unWrappedClass(unWrappedClass);
  if ($$props.innerWrappedClass === void 0 && $$bindings.innerWrappedClass && innerWrappedClass !== void 0) $$bindings.innerWrappedClass(innerWrappedClass);
  if ($$props.headerClass === void 0 && $$bindings.headerClass && headerClass !== void 0) $$bindings.headerClass(headerClass);
  if ($$props.footerClass === void 0 && $$bindings.footerClass && footerClass !== void 0) $$bindings.footerClass(footerClass);
  wrapped = $$slots.header || $$slots.footer;
  wrapperClass = twMerge(
    "w-full rounded-lg bg-gray-50",
    background ? "dark:bg-gray-600" : "dark:bg-gray-700",
    "text-gray-900 dark:placeholder-gray-400 dark:text-white",
    "border border-gray-200",
    background ? "dark:border-gray-500" : "dark:border-gray-600",
    $$props.class
  );
  textareaClass = wrapped ? wrappedClass : twMerge(wrapperClass, unWrappedClass);
  innerWrapperClass = twMerge(innerWrappedClass, $$slots.footer ? "" : "rounded-b-lg", $$slots.header ? "" : "rounded-t-lg");
  return `${validate_component(Wrapper, "Wrapper").$$render($$result, { show: wrapped, class: wrapperClass }, {}, {
    default: () => {
      return `${$$slots.header ? `<div${add_attribute("class", headerCls(true), 0)}>${slots.header ? slots.header({}) : ``}</div>` : ``} ${validate_component(Wrapper, "Wrapper").$$render($$result, { show: wrapped, class: innerWrapperClass }, {}, {
        default: () => {
          return `<textarea${spread(
            [
              escape_object($$restProps),
              {
                class: escape_attribute_value(textareaClass)
              }
            ],
            {}
          )}>${escape(value || "")}</textarea>`;
        }
      })} ${$$slots.footer ? `<div${add_attribute("class", headerCls(false), 0)}>${slots.footer ? slots.footer({}) : ``}</div>` : ``}`;
    }
  })} `;
});
const BuildingSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "building solid" } = $$props;
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2V5a1 1 0 0 1-1-1Zm5 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1Zm-5 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Zm-3 4a2 2 0 0 0-2 2v3h2v-3h2v3h2v-3a2 2 0 0 0-2-2h-2Z" clip-rule="evenodd"></path></svg>` : `<svg${spread(
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2V5a1 1 0 0 1-1-1Zm5 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1Zm-5 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Zm-3 4a2 2 0 0 0-2 2v3h2v-3h2v3h2v-3a2 2 0 0 0-2-2h-2Z" clip-rule="evenodd"></path></svg>`} `;
});
const ComputerSpeakerSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "computer speaker solid" } = $$props;
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M12 8a1 1 0 0 0-1 1v10H9a1 1 0 1 0 0 2h11a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-8Zm4 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M5 3a2 2 0 0 0-2 2v6h6V9a3 3 0 0 1 3-3h8c.35 0 .687.06 1 .17V5a2 2 0 0 0-2-2H5Zm4 10H3v2a2 2 0 0 0 2 2h4v-4Z" clip-rule="evenodd"></path></svg>` : `<svg${spread(
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M12 8a1 1 0 0 0-1 1v10H9a1 1 0 1 0 0 2h11a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-8Zm4 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M5 3a2 2 0 0 0-2 2v6h6V9a3 3 0 0 1 3-3h8c.35 0 .687.06 1 .17V5a2 2 0 0 0-2-2H5Zm4 10H3v2a2 2 0 0 0 2 2h4v-4Z" clip-rule="evenodd"></path></svg>`} `;
});
const css = {
  code: ".input-container.svelte-11vu0uz{position:relative;width:100%}.input-desc.svelte-11vu0uz{position:absolute;right:26px;top:50%;transform:translateY(-50%);padding:0 5px;font-size:0.9em;color:grey;pointer-events:none}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\r\\n    /** @type {import('./$types').PageData} */\\r\\n\\texport let data;\\r\\n    import { onMount } from 'svelte';\\r\\n    import { browser } from \\"$app/environment\\";\\r\\n    import { Button, Card, GradientButton, Input, Label, MultiSelect, Select, Textarea, Tabs, TabItem, } from \\"flowbite-svelte\\";\\r\\n    import { BuildingSolid, ChevronLeftOutline, ComputerSpeakerSolid } from \\"flowbite-svelte-icons\\";\\r\\n    import { enhance } from '$app/forms';\\r\\n\\r\\n    let equipmentTypes = data.equipmentTypes;\\r\\n    let venues = data.venues;\\r\\n    let selectedEq = [];\\r\\n    let selectedVenue = [];\\r\\n    let promised_start_time = \\"\\";\\r\\n    let promised_end_time = \\"\\";\\r\\n\\r\\n    let currentDateTime;\\r\\n    onMount(() => {\\r\\n      const now = new Date();\\r\\n      currentDateTime = now.toISOString().slice(0, 16); // Get the current date and time in the correct format\\r\\n    });\\r\\n\\r\\n    let today = new Date();\\r\\n    let minDate;\\r\\n    today.setDate(today.getDate() + 3); // Calculate the date 3 days from today\\r\\n    minDate = today.toISOString().split('T')[0]; // Format the date to \`YYYY-MM-DD\`\\r\\n\\r\\n    // Add a 'value' & 'name' property to each object in the array (for Svelte each behavior)\\r\\n    equipmentTypes = equipmentTypes.map((item) => ({ ...item, value: item.type, name: item.type }));\\r\\n    venues = venues.map((item) => ({ ...item, value: item.id, name: item.name }));\\r\\n\\r\\n    // Function to ensure promised_end_time is always after promised_start_time\\r\\n    $: promised_end_time_min = promised_start_time || currentDateTime;\\r\\n\\r\\n    $: isFLCD = data?.current_user?.access_level == 5;\\r\\n<\/script>\\r\\n\\r\\n<div class=\\"px-10 py-10\\">\\r\\n    <div class=\\"flex items-center gap-4 mb-5\\">\\r\\n        <Button\\r\\n            color=\\"alternative\\"\\r\\n            href=\\"/dashboard\\"\\r\\n            class=\\"w-auto p-0\\"><ChevronLeftOutline size=\\"xl\\" /></Button\\r\\n        >\\r\\n        <h4\\r\\n            class=\\"text-2xl font-bold tracking-tight text-gray-900 dark:text-white\\"\\r\\n        >\\r\\n            Request Form\\r\\n        </h4>\\r\\n    </div>\\r\\n    <Tabs tabStyle=\\"pill\\">\\r\\n        <TabItem open>\\r\\n            <span slot=\\"title\\" class=\\"flex gap-2\\"><ComputerSpeakerSolid/>Equipment</span>\\r\\n            <Card class=\\"max-w-full\\">\\r\\n                <form class=\\"flex flex-col space-y-6\\" method=\\"POST\\" action=\\"?/submitEquipmentRequest\\" \\r\\n                use:enhance={() => {return async ({result}) => { alert(result.data?.body?.message); }}}>\\r\\n                    <h3\\r\\n                        class=\\"text-xl font-medium text-gray-900 dark:text-white\\"\\r\\n                    >\\r\\n                        Borrowing Equipment\\r\\n                    </h3>\\r\\n                    <hr />\\r\\n                    <Label class=\\"space-y-2\\">\\r\\n                        <span>Equipment</span>\\r\\n                        <MultiSelect\\r\\n                        tabindex=0\\r\\n                            name=\\"selectedEq\\"\\r\\n                            class=\\"mt-2\\"\\r\\n                            items={equipmentTypes}\\r\\n                            bind:value={selectedEq}\\r\\n                            required\\r\\n                        />\\r\\n                    </Label>\\r\\n                    <div class=\\"grid gap-6 mb-6 md:grid-cols-4\\">\\r\\n                        {#each selectedEq as eq}\\r\\n                            <Label>\\r\\n                                <span>Quantity of {equipmentTypes.find((x) => x.value == eq).name}</span>\\r\\n                                <div class=\\"input-container\\">\\r\\n                                  <Input \\r\\n                                    type=\\"number\\" \\r\\n                                    name={eq} \\r\\n                                    min=\\"1\\" \\r\\n                                    max={equipmentTypes.find((x) => x.value == eq).count} \\r\\n                                    required \\r\\n                                  />\\r\\n                                  <span class=\\"input-desc\\">out of {equipmentTypes.find((x) => x.value == eq).count}</span>\\r\\n                                </div>\\r\\n                            </Label>\\r\\n                        {/each}\\r\\n                    </div>\\r\\n                    <hr />\\r\\n                    <div class=\\"grid gap-6 mb-6 md:grid-cols-2\\">\\r\\n                        <Label class=\\"space-y-2\\">\\r\\n                            <span>Borrow Time</span>\\r\\n                            <Input\\r\\n                                type=\\"datetime-local\\"\\r\\n                                name=\\"promised_start_time\\"\\r\\n                                bind:value={promised_start_time}\\r\\n                                min={currentDateTime}\\r\\n                                required\\r\\n                            />\\r\\n                        </Label>\\r\\n                        <Label class=\\"space-y-2\\">\\r\\n                            <span>Return Time</span>\\r\\n                            <Input\\r\\n                                type=\\"datetime-local\\"\\r\\n                                name=\\"promised_end_time\\"\\r\\n                                bind:value={promised_end_time}\\r\\n                                min={promised_end_time_min}\\r\\n                                required\\r\\n                            />\\r\\n                        </Label>\\r\\n                        <Label class=\\"space-y-2\\">\\r\\n                            <span>Location of Equipment Usage</span>\\r\\n                            <Input type=\\"text\\" name=\\"location\\" required />\\r\\n                        </Label>\\r\\n                        <Label class=\\"space-y-2\\">\\r\\n                            <span>Purpose</span>\\r\\n                            <Textarea\\r\\n                                rows=\\"1\\"\\r\\n                                type=\\"text\\"\\r\\n                                name=\\"purpose\\"\\r\\n                                required\\r\\n                            />\\r\\n                        </Label>\\r\\n                        <Label class=\\"space-y-2\\">\\r\\n                            <span>Email of Coordinating FLCD Teacher</span>\\r\\n                            <div class=\\"input-container\\">\\r\\n                                <Input \\r\\n                                    disabled={!isFLCD}\\r\\n                                    type=\\"text\\" \\r\\n                                    name=\\"instructor_email\\" \\r\\n                                    required\\r\\n                                />\\r\\n                                <span class=\\"input-desc\\">@up.edu.ph</span>\\r\\n                            </div>\\r\\n                        </Label>\\r\\n                        <Label class=\\"space-y-2\\">\\r\\n                            <span>Affiliation (for non-FLCD students)</span>\\r\\n                            <Input \\r\\n                                disabled={isFLCD}\\r\\n                                type=\\"text\\" \\r\\n                                name=\\"affiliation\\" \\r\\n                                required />\\r\\n                        </Label>\\r\\n                    </div>\\r\\n                    <GradientButton shadow color=\\"green\\" type=\\"submit\\" style=\\"margin-top: 40px; margin-bottom: 20px; padding: 13px;\\">\\r\\n                        Submit Request\\r\\n                    </GradientButton>\\r\\n                </form>\\r\\n            </Card>\\r\\n        </TabItem>\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n        <TabItem>\\r\\n            <span slot=\\"title\\" class=\\"flex gap-2\\"><BuildingSolid/>Venue</span>\\r\\n            <Card class=\\"max-w-full\\">\\r\\n                <form class=\\"flex flex-col space-y-6\\" action=\\"?/submitVenueRequest\\" method=\\"post\\"\\r\\n                use:enhance={() => {return async ({result}) => { alert(result.data?.body?.message); }}}>\\r\\n                    <h3 class=\\"text-xl font-medium text-gray-900 dark:text-white\\">Venue Reservation</h3>\\r\\n                    <hr />\\r\\n                    <div>\\r\\n                        <Label class=\\"space-y-2\\">\\r\\n                            <span>Room/Area Requesting</span>\\r\\n                            <MultiSelect\\r\\n                            tabindex=0\\r\\n                                name=\\"selectedVenue\\"\\r\\n                                class=\\"mt-2\\"\\r\\n                                items={venues}\\r\\n                                bind:value={selectedVenue}\\r\\n                                required\\r\\n                            />\\r\\n                        </Label>\\r\\n                    </div>\\r\\n                    <hr />\\r\\n                    <div class=\\"grid gap-6 mb-6 md:grid-cols-2\\">\\r\\n                        <Label class=\\"space-y-2\\">\\r\\n                            <span>Purpose/Activity</span>\\r\\n                            <Input type=\\"text\\" name=\\"purpose\\" required />\\r\\n                        </Label>\\r\\n                        <Label class=\\"space-y-2\\">\\r\\n                            <span>Use Date</span>\\r\\n                            <Input type=\\"date\\" name=\\"date_needed\\" min={minDate} required />\\r\\n                        </Label>\\r\\n                        <Label class=\\"space-y-2\\">\\r\\n                            <span>Activity Start Time</span>\\r\\n                            <Input type=\\"time\\" name=\\"start_time\\" required />\\r\\n                        </Label>\\r\\n                        <Label class=\\"space-y-2\\">\\r\\n                            <span>Activity End Time</span>\\r\\n                            <Input type=\\"time\\" name=\\"end_time\\" required />\\r\\n                        </Label>\\r\\n                        <Label class=\\"space-y-2\\">\\r\\n                            <span>Email of Coordinating FLCD Teacher</span>\\r\\n                            <div class=\\"input-container\\">\\r\\n                                <Input \\r\\n                                    disabled={!isFLCD}\\r\\n                                    type=\\"text\\" \\r\\n                                    name=\\"instructor_email\\" \\r\\n                                    required\\r\\n                                />\\r\\n                                <span class=\\"input-desc\\">@up.edu.ph</span>\\r\\n                            </div>\\r\\n                        </Label>\\r\\n                        <Label class=\\"space-y-2\\">\\r\\n                            <span>Affiliation (for non-FLCD students)</span>\\r\\n                            <Input \\r\\n                                disabled={isFLCD}\\r\\n                                type=\\"text\\" \\r\\n                                name=\\"affiliation\\" \\r\\n                                required />\\r\\n                        </Label>\\r\\n                    </div>\\r\\n                    <GradientButton shadow color=\\"green\\" type=\\"submit\\" style=\\"margin-top: 40px; margin-bottom: 20px; padding: 13px;\\">\\r\\n                        Submit Request\\r\\n                    </GradientButton>\\r\\n                </form>\\r\\n            </Card>            \\r\\n        </TabItem>\\r\\n    </Tabs>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n    .input-container {\\r\\n      position: relative;\\r\\n      width: 100%;\\r\\n    }\\r\\n  \\r\\n    .input-desc {\\r\\n      position: absolute;\\r\\n      right: 26px;\\r\\n      top: 50%;\\r\\n      transform: translateY(-50%);\\r\\n      padding: 0 5px;\\r\\n      font-size: 0.9em;\\r\\n      color: grey;\\r\\n      pointer-events: none;\\r\\n    }\\r\\n  </style>\\r\\n"],"names":[],"mappings":"AAkOI,+BAAiB,CACf,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IACT,CAEA,0BAAY,CACV,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,OAAO,CAAE,CAAC,CAAC,GAAG,CACd,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,IAAI,CACX,cAAc,CAAE,IAClB"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let promised_end_time_min;
  let isFLCD;
  let { data } = $$props;
  let equipmentTypes = data.equipmentTypes;
  let venues = data.venues;
  let selectedEq = [];
  let selectedVenue = [];
  let promised_start_time = "";
  let promised_end_time = "";
  let currentDateTime;
  let today = /* @__PURE__ */ new Date();
  let minDate;
  today.setDate(today.getDate() + 3);
  minDate = today.toISOString().split("T")[0];
  equipmentTypes = equipmentTypes.map((item) => ({
    ...item,
    value: item.type,
    name: item.type
  }));
  venues = venues.map((item) => ({ ...item, value: item.id, name: item.name }));
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    promised_end_time_min = promised_start_time || currentDateTime;
    isFLCD = data?.current_user?.access_level == 5;
    $$rendered = `<div class="px-10 py-10"><div class="flex items-center gap-4 mb-5">${validate_component(Button, "Button").$$render(
      $$result,
      {
        color: "alternative",
        href: "/dashboard",
        class: "w-auto p-0"
      },
      {},
      {
        default: () => {
          return `${validate_component(ChevronLeftOutline, "ChevronLeftOutline").$$render($$result, { size: "xl" }, {}, {})}`;
        }
      }
    )} <h4 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" data-svelte-h="svelte-v86yvn">Request Form</h4></div> ${validate_component(Tabs, "Tabs").$$render($$result, { tabStyle: "pill" }, {}, {
      default: () => {
        return `${validate_component(TabItem, "TabItem").$$render($$result, { open: true }, {}, {
          title: () => {
            return `<span slot="title" class="flex gap-2">${validate_component(ComputerSpeakerSolid, "ComputerSpeakerSolid").$$render($$result, {}, {}, {})}Equipment</span>`;
          },
          default: () => {
            return `${validate_component(Card, "Card").$$render($$result, { class: "max-w-full" }, {}, {
              default: () => {
                return `<form class="flex flex-col space-y-6" method="POST" action="?/submitEquipmentRequest"><h3 class="text-xl font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-17upm59">Borrowing Equipment</h3> <hr> ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
                  default: () => {
                    return `<span data-svelte-h="svelte-1udexfy">Equipment</span> ${validate_component(MultiSelect, "MultiSelect").$$render(
                      $$result,
                      {
                        tabindex: "0",
                        name: "selectedEq",
                        class: "mt-2",
                        items: equipmentTypes,
                        required: true,
                        value: selectedEq
                      },
                      {
                        value: ($$value) => {
                          selectedEq = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}`;
                  }
                })} <div class="grid gap-6 mb-6 md:grid-cols-4">${each(selectedEq, (eq) => {
                  return `${validate_component(Label, "Label").$$render($$result, {}, {}, {
                    default: () => {
                      return `<span>Quantity of ${escape(equipmentTypes.find((x) => x.value == eq).name)}</span> <div class="input-container svelte-11vu0uz">${validate_component(Input, "Input").$$render(
                        $$result,
                        {
                          type: "number",
                          name: eq,
                          min: "1",
                          max: equipmentTypes.find((x) => x.value == eq).count,
                          required: true
                        },
                        {},
                        {}
                      )} <span class="input-desc svelte-11vu0uz">out of ${escape(equipmentTypes.find((x) => x.value == eq).count)}</span></div> `;
                    }
                  })}`;
                })}</div> <hr> <div class="grid gap-6 mb-6 md:grid-cols-2">${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
                  default: () => {
                    return `<span data-svelte-h="svelte-wewp98">Borrow Time</span> ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        type: "datetime-local",
                        name: "promised_start_time",
                        min: currentDateTime,
                        required: true,
                        value: promised_start_time
                      },
                      {
                        value: ($$value) => {
                          promised_start_time = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}`;
                  }
                })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
                  default: () => {
                    return `<span data-svelte-h="svelte-1ss30av">Return Time</span> ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        type: "datetime-local",
                        name: "promised_end_time",
                        min: promised_end_time_min,
                        required: true,
                        value: promised_end_time
                      },
                      {
                        value: ($$value) => {
                          promised_end_time = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}`;
                  }
                })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
                  default: () => {
                    return `<span data-svelte-h="svelte-1azniav">Location of Equipment Usage</span> ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        type: "text",
                        name: "location",
                        required: true
                      },
                      {},
                      {}
                    )}`;
                  }
                })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
                  default: () => {
                    return `<span data-svelte-h="svelte-b6d4hk">Purpose</span> ${validate_component(Textarea, "Textarea").$$render(
                      $$result,
                      {
                        rows: "1",
                        type: "text",
                        name: "purpose",
                        required: true
                      },
                      {},
                      {}
                    )}`;
                  }
                })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
                  default: () => {
                    return `<span data-svelte-h="svelte-1ns82tj">Email of Coordinating FLCD Teacher</span> <div class="input-container svelte-11vu0uz">${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        disabled: !isFLCD,
                        type: "text",
                        name: "instructor_email",
                        required: true
                      },
                      {},
                      {}
                    )} <span class="input-desc svelte-11vu0uz" data-svelte-h="svelte-mhh3xa">@up.edu.ph</span></div>`;
                  }
                })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
                  default: () => {
                    return `<span data-svelte-h="svelte-6zx4a7">Affiliation (for non-FLCD students)</span> ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        disabled: isFLCD,
                        type: "text",
                        name: "affiliation",
                        required: true
                      },
                      {},
                      {}
                    )}`;
                  }
                })}</div> ${validate_component(GradientButton, "GradientButton").$$render(
                  $$result,
                  {
                    shadow: true,
                    color: "green",
                    type: "submit",
                    style: "margin-top: 40px; margin-bottom: 20px; padding: 13px;"
                  },
                  {},
                  {
                    default: () => {
                      return `Submit Request`;
                    }
                  }
                )}</form>`;
              }
            })}`;
          }
        })} ${validate_component(TabItem, "TabItem").$$render($$result, {}, {}, {
          title: () => {
            return `<span slot="title" class="flex gap-2">${validate_component(BuildingSolid, "BuildingSolid").$$render($$result, {}, {}, {})}Venue</span>`;
          },
          default: () => {
            return `${validate_component(Card, "Card").$$render($$result, { class: "max-w-full" }, {}, {
              default: () => {
                return `<form class="flex flex-col space-y-6" action="?/submitVenueRequest" method="post"><h3 class="text-xl font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-14tz6md">Venue Reservation</h3> <hr> <div>${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
                  default: () => {
                    return `<span data-svelte-h="svelte-3f8ttq">Room/Area Requesting</span> ${validate_component(MultiSelect, "MultiSelect").$$render(
                      $$result,
                      {
                        tabindex: "0",
                        name: "selectedVenue",
                        class: "mt-2",
                        items: venues,
                        required: true,
                        value: selectedVenue
                      },
                      {
                        value: ($$value) => {
                          selectedVenue = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}`;
                  }
                })}</div> <hr> <div class="grid gap-6 mb-6 md:grid-cols-2">${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
                  default: () => {
                    return `<span data-svelte-h="svelte-1gi2gyw">Purpose/Activity</span> ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        type: "text",
                        name: "purpose",
                        required: true
                      },
                      {},
                      {}
                    )}`;
                  }
                })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
                  default: () => {
                    return `<span data-svelte-h="svelte-1guoov7">Use Date</span> ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        type: "date",
                        name: "date_needed",
                        min: minDate,
                        required: true
                      },
                      {},
                      {}
                    )}`;
                  }
                })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
                  default: () => {
                    return `<span data-svelte-h="svelte-8tj5xc">Activity Start Time</span> ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        type: "time",
                        name: "start_time",
                        required: true
                      },
                      {},
                      {}
                    )}`;
                  }
                })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
                  default: () => {
                    return `<span data-svelte-h="svelte-yh4pn5">Activity End Time</span> ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        type: "time",
                        name: "end_time",
                        required: true
                      },
                      {},
                      {}
                    )}`;
                  }
                })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
                  default: () => {
                    return `<span data-svelte-h="svelte-1ns82tj">Email of Coordinating FLCD Teacher</span> <div class="input-container svelte-11vu0uz">${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        disabled: !isFLCD,
                        type: "text",
                        name: "instructor_email",
                        required: true
                      },
                      {},
                      {}
                    )} <span class="input-desc svelte-11vu0uz" data-svelte-h="svelte-mhh3xa">@up.edu.ph</span></div>`;
                  }
                })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
                  default: () => {
                    return `<span data-svelte-h="svelte-6zx4a7">Affiliation (for non-FLCD students)</span> ${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        disabled: isFLCD,
                        type: "text",
                        name: "affiliation",
                        required: true
                      },
                      {},
                      {}
                    )}`;
                  }
                })}</div> ${validate_component(GradientButton, "GradientButton").$$render(
                  $$result,
                  {
                    shadow: true,
                    color: "green",
                    type: "submit",
                    style: "margin-top: 40px; margin-bottom: 20px; padding: 13px;"
                  },
                  {},
                  {
                    default: () => {
                      return `Submit Request`;
                    }
                  }
                )}</form>`;
              }
            })}`;
          }
        })}`;
      }
    })} </div>`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-E9OPopBm.js.map
