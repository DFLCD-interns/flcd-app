import { c as create_ssr_component, v as validate_component, e as escape, d as each, b as add_attribute, j as compute_rest_props, l as getContext, g as spread, k as escape_attribute_value, h as escape_object, u as compute_slots } from './ssr-C5koH-x7.js';
import { f as fade } from './index3-CazeuJOF.js';
import { F as Frame } from './Frame-Cc0rpiY0.js';
import { t as twMerge } from './bundle-mjs-BLGuyV0D.js';
import { G as GradientButton, C as CloseButton } from './GradientButton-DPhfIyDU.js';
import { B as Button } from './Button-DPoC_1Mm.js';
import { C as Card } from './Card-BPOAXPC5.js';
import { L as Label } from './Label-9_yY5ooj.js';
import { I as Input } from './Input-C11sq5ya.js';
import { S as Select } from './Select-CldvkKb8.js';
import { T as Tabs, a as TabItem } from './Tabs-XTQ4UVlN.js';
import { C as ChevronLeftOutline } from './ChevronLeftOutline-BJ0KeBW-.js';
import { T as TrashBinSolid } from './TrashBinSolid-B9a6AepA.js';
import './Wrapper-Cnx--s0z.js';
import './index4-XrsG0yEK.js';

const TransitionFrame = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["transition", "params", "open"]);
  let { transition = fade } = $$props;
  let { params = {} } = $$props;
  let { open = true } = $$props;
  function close(ev) {
    if (ev?.stopPropagation) ev.stopPropagation();
    open = false;
  }
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.params === void 0 && $$bindings.params && params !== void 0) $$bindings.params(params);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Frame, "Frame").$$render(
      $$result,
      Object.assign({}, { transition }, { params }, $$restProps, { open }),
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({ close }) : ``}`;
        }
      }
    )} `;
  } while (!$$settled);
  return $$rendered;
});
const Alert = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["dismissable", "defaultClass"]);
  let $$slots = compute_slots(slots);
  let { dismissable = false } = $$props;
  let { defaultClass = "p-4 gap-3 text-sm" } = $$props;
  let divClass;
  if ($$props.dismissable === void 0 && $$bindings.dismissable && dismissable !== void 0) $$bindings.dismissable(dismissable);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0) $$bindings.defaultClass(defaultClass);
  divClass = twMerge(defaultClass, ($$slots.icon || dismissable) && "flex items-center", $$props.class);
  return `${validate_component(TransitionFrame, "TransitionFrame").$$render($$result, Object.assign({}, { dismissable }, { color: "primary" }, { role: "alert" }, { rounded: true }, $$restProps, { class: divClass }), {}, {
    default: ({ close }) => {
      return `${$$slots.icon ? `${slots.icon ? slots.icon({}) : ``}` : ``} ${$$slots.icon || dismissable ? `<div>${slots.default ? slots.default({}) : ``}</div>` : `${slots.default ? slots.default({}) : ``}`} ${dismissable ? `${slots["close-button"] ? slots["close-button"]({ close }) : ` ${validate_component(CloseButton, "CloseButton").$$render(
        $$result,
        {
          class: "ms-auto -me-1.5 -my-1.5 dark:hover:bg-gray-700",
          color: $$restProps.color
        },
        {},
        {}
      )} `}` : ``}`;
    }
  })} `;
});
const colorClasses = {
  primary: "text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600",
  secondary: "text-secondary-600 focus:ring-secondary-500 dark:focus:ring-secondary-600",
  red: "text-red-600 focus:ring-red-500 dark:focus:ring-red-600",
  green: "text-green-600 focus:ring-green-500 dark:focus:ring-green-600",
  purple: "text-purple-600 focus:ring-purple-500 dark:focus:ring-purple-600",
  teal: "text-teal-600 focus:ring-teal-500 dark:focus:ring-teal-600",
  yellow: "text-yellow-400 focus:ring-yellow-500 dark:focus:ring-yellow-600",
  orange: "text-orange-500 focus:ring-orange-500 dark:focus:ring-orange-600",
  blue: "text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600"
};
const labelClass = (inline, extraClass) => twMerge(inline ? "inline-flex" : "flex", "items-center", extraClass);
const inputClass = (custom, color, rounded, tinted, spacing, extraClass) => twMerge(
  "w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2",
  spacing,
  tinted ? "dark:bg-gray-600 dark:border-gray-500" : "dark:bg-gray-700 dark:border-gray-600",
  custom && "sr-only peer",
  rounded,
  colorClasses[color],
  extraClass
);
const Radio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["color", "custom", "inline", "group", "value", "spacing"]);
  let $$slots = compute_slots(slots);
  let { color = "primary" } = $$props;
  let { custom = false } = $$props;
  let { inline = false } = $$props;
  let { group = void 0 } = $$props;
  let { value = "" } = $$props;
  let { spacing = $$slots.default ? "me-2" : "" } = $$props;
  let background = getContext("background");
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.custom === void 0 && $$bindings.custom && custom !== void 0) $$bindings.custom(custom);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0) $$bindings.inline(inline);
  if ($$props.group === void 0 && $$bindings.group && group !== void 0) $$bindings.group(group);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0) $$bindings.spacing(spacing);
  return `${validate_component(Label, "Label").$$render(
    $$result,
    {
      class: labelClass(inline, $$props.class),
      show: $$slots.default
    },
    {},
    {
      default: () => {
        return `<input${spread(
          [
            { type: "radio" },
            { value: escape_attribute_value(value) },
            escape_object($$restProps),
            {
              class: escape_attribute_value(inputClass(custom, color, false, background, spacing, $$slots.default || $$props.class))
            }
          ],
          {}
        )}${value === group ? add_attribute("checked", true, 1) : ""}> ${slots.default ? slots.default({}) : ``}`;
      }
    }
  )} `;
});
const AddressBookSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "address book solid" } = $$props;
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1Z" clip-rule="evenodd"></path></svg>` : `<svg${spread(
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1Z" clip-rule="evenodd"></path></svg>`} `;
});
const css = {
  code: ".input-container.svelte-11vu0uz{position:relative;width:100%}.input-desc.svelte-11vu0uz{position:absolute;right:26px;top:50%;transform:translateY(-50%);padding:0 5px;font-size:0.9em;color:grey;pointer-events:none}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\r\\n    \\r\\n    /** @type {import(\'./$types\').PageData} */\\r\\n\\t//export let data;\\r\\n    //import amclassesdata from \\"../../../lib/amclassesdata.json\\";\\r\\n    //import pmclassesdata from \\"../../../lib/pmclassesdata.json\\";\\r\\n    import { browser } from \\"$app/environment\\";\\r\\n    import { Button, ButtonGroup, Card, GradientButton, Input, Label, MultiSelect, Select, Textarea, Tabs, TabItem, Radio, Alert, InputAddon } from \\"flowbite-svelte\\";\\r\\n    import { AddressBookOutline, AddressBookSolid, ArrowLeftOutline, BuildingSolid, CheckCircleSolid, ChevronLeftOutline, ComputerSpeakerSolid, MoonSolid, SunSolid, TrashBinSolid, UserAddSolid, } from \\"flowbite-svelte-icons\\";\\r\\n    \\r\\n    function navBack() {\\r\\n        if (browser) window.history.back();\\r\\n    }\\r\\n\\r\\n    export let data;\\r\\n    let amclasses = data.amclasses;\\r\\n    let pmclasses = data.pmclasses;\\r\\n    \\r\\n    // function printStuff(){\\r\\n    //     console.log(dateTimeRows)\\r\\n    // }\\r\\n    let requesterSection = \\"\\"\\r\\n    let dateTimeRows = [{ date: \'\', time: \'\', available: false}];\\r\\n    function addRow() {\\r\\n        dateTimeRows = [...dateTimeRows, { date: \'\', time: \'\',  available: false}];\\r\\n    }\\r\\n    function deleteRow(index) {\\r\\n        dateTimeRows = dateTimeRows.filter((_, i) => i !== index);\\r\\n    }\\r\\n    let classtime = \\"\\"\\r\\n    $: classlist = ((classtime == \\"AM\\") ? amclasses : pmclasses)\\r\\n    let selectedClass = \\"\\"\\r\\n    let sections = [\\r\\n        {\\r\\n            name: \\"FLCD 123\\",\\r\\n            value: \\"FLCD123\\"\\r\\n        },\\r\\n        {\\r\\n            name: \\"FLCD 101\\",\\r\\n            value: \\"FLCD101\\"\\r\\n        },\\r\\n        {\\r\\n            name: \\"FLCD 195\\",\\r\\n            value: \\"FLCD195\\"\\r\\n        },\\r\\n    ]\\r\\n    let amslots = [\\r\\n        {\\r\\n            name: \\"8:00 - 9:00\\",\\r\\n            value: \\"8-9\\"\\r\\n        },\\r\\n        {\\r\\n            name: \\"9:00 - 10:00\\",\\r\\n            value: \\"9-10\\"\\r\\n        },\\r\\n        {\\r\\n            name: \\"10:00 - 11:00\\",\\r\\n            value: \\"10-11\\"\\r\\n        }\\r\\n    ]\\r\\n    let pmslots = [\\r\\n        {\\r\\n            name: \\"1:00 - 2:00\\",\\r\\n            value: \\"1-2\\"\\r\\n        },\\r\\n        {\\r\\n            name: \\"2:00 - 3:00\\",\\r\\n            value: \\"2-3\\"\\r\\n        },\\r\\n        {\\r\\n            name: \\"3:00 - 4:00\\",\\r\\n            value: \\"3-4\\"\\r\\n        }\\r\\n    ]\\r\\n    \\r\\n    let unavailable = []\\r\\n    data.unavailable.map(slot => {unavailable.push(`${slot.class_id} ${slot.observe_date} ${slot.timeslot}`)})\\r\\n    function isSlotAvailable(section, date, time) {\\r\\n        // console.log(dateTimeRows)\\r\\n        return !unavailable.includes(`${section} ${date} ${time}`);\\r\\n        \\r\\n    }\\r\\n    function updateAvailability(index, date, time) {\\r\\n        dateTimeRows[index].available = isSlotAvailable(selectedClass, date, time);\\r\\n    }\\r\\n    function updateAll(){\\r\\n        dateTimeRows.map(dtr => {dtr.available = isSlotAvailable(selectedClass, dtr.date, dtr.time)})\\r\\n        dateTimeRows = dateTimeRows;\\r\\n    }\\r\\n    function reset(){\\r\\n        selectedClass = \\"\\";\\r\\n        dateTimeRows.map(dtr => {dtr.available = false; dtr.time = \\"\\"; dtr.date = \\"\\"})\\r\\n        dateTimeRows = dateTimeRows;\\r\\n    }\\r\\n    $: canRequest = dateTimeRows.length >= 1 && dateTimeRows.every(row => (row.available && row.time != \\"\\" && row.date != \\"\\"));\\r\\n\\r\\n    const date = new Date();\\r\\n\\r\\n    let day = (date.getDate() < 10 ? `0${date.getDate()}`: date.getDate());\\r\\n    let month = (date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}`: date.getMonth() + 1);\\r\\n    let year = date.getFullYear();\\r\\n    let currentDate = `${year}-${month}-${day}`;\\r\\n    // console.log(currentDate)\\r\\n<\/script>\\r\\n\\r\\n<div class=\\"px-10 py-10\\">\\r\\n    <!--header-->\\r\\n    <div class=\\"flex items-center gap-4 mb-5\\">\\r\\n        <Button\\r\\n            on:click={() => {\\r\\n                navBack();\\r\\n            }}\\r\\n            color=\\"alternative\\"\\r\\n            class=\\"w-auto p-0\\"><ChevronLeftOutline size=\\"xl\\" /></Button\\r\\n        >\\r\\n        <h5\\r\\n            class=\\"text-2xl font-bold tracking-tight text-gray-900 dark:text-white\\"\\r\\n        >\\r\\n            Request Form\\r\\n        </h5>\\r\\n    </div>\\r\\n    <Tabs tabStyle=\\"pill\\">\\r\\n        <TabItem open>\\r\\n            <span slot=\\"title\\" class=\\"flex gap-2\\"><AddressBookSolid/>Observation</span>\\r\\n            <Card class=\\"max-w-full\\">\\r\\n                <form class=\\"flex flex-col space-y-6\\" action=\\"?/createObservationRequest\\" method=\\"POST\\">\\r\\n                    <h3\\r\\n                        class=\\"text-xl font-medium text-gray-900 dark:text-white\\"\\r\\n                    >\\r\\n                        Observation Request\\r\\n                    </h3>\\r\\n                    <hr />\\r\\n                    <div class=\\"grid gap-6 mb-6 md:grid-cols-2\\">\\r\\n                        <Label class=\\"space-y-2\\">\\r\\n                            <span>Email of Coordinating FLCD Teacher</span>\\r\\n                            <div class=\\"input-container\\">\\r\\n                                <Input \\r\\n                                    disabled={false}\\r\\n                                    type=\\"text\\" \\r\\n                                    name=\\"instructor_email\\" \\r\\n                                    required\\r\\n                                />\\r\\n                                <span class=\\"input-desc\\">@up.edu.ph</span>\\r\\n                            </div>\\r\\n                        </Label>\\r\\n                        <Label class=\\"space-y-2\\">\\r\\n                            <span>Your section</span>\\r\\n                            <Select class=\\"mt-2\\" name=\\"requesterSection\\" items={sections} bind:value={requesterSection} required/>\\r\\n                        </Label>\\r\\n                        <Label class=\\"space-y-2\\">\\r\\n                            <span>Class time to be observed</span>\\r\\n                            <ul class=\\"items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600 h-min\\">\\r\\n                                <li class=\\"w-full\\"><Radio value=\\"AM\\" name=\\"classTime\\" class=\\"p-3\\" bind:group={classtime} on:change={()=>{reset()}}>AM</Radio></li>\\r\\n                                <li class=\\"w-full\\"><Radio value=\\"PM\\"name=\\"classTime\\" class=\\"p-3\\" bind:group={classtime} on:change={()=>{reset()}}>PM</Radio></li>\\r\\n                              </ul>\\r\\n                        </Label>\\r\\n                        {#key classtime}\\r\\n                        <Label class=\\"space-y-2\\">\\r\\n                            <span color=\\"black\\">{classtime} Class</span>\\r\\n                            <Select \\r\\n                                class=\\"mt-2\\"\\r\\n                                disabled={(classtime == \\"\\")}\\r\\n                                required\\r\\n                                name=\\"class_id\\"\\r\\n                                bind:value={selectedClass}\\r\\n                                on:change={(e) => updateAll()}>\\r\\n                                {#each classlist as section}\\r\\n                                        <option value={section.id}> {section.name}</option>\\r\\n                                    {/each}\\r\\n                                \\r\\n                                </Select>\\r\\n                                \\r\\n                        </Label>\\r\\n                        {/key}\\r\\n                        </div>\\r\\n                        <hr>\\r\\n                        \\r\\n                        {#each dateTimeRows as row, index}\\r\\n                        <div>\\r\\n                            <div class=\\"flex justify-end\\">\\r\\n                                <Button class=\\"block !p-2 mb-2 align-self-end\\" color=\\"red\\" size=\\"sm\\" outline on:click={() => deleteRow(index)}><TrashBinSolid/></Button>\\r\\n                            </div>\\r\\n                        \\r\\n                        <div class=\\"grid gap-6 mb-6 md:grid-cols-2\\">\\r\\n                            \\r\\n                        {#key classtime}\\r\\n                        <Label class=\\"space-y-2\\">\\r\\n                            <span>Date of Observation</span>\\r\\n                            \\r\\n                            <Input type=\\"date\\" bind:value={row.date} name=\\"selectedDate\\" disabled={(classtime == \\"\\")} min={currentDate} required on:change={(e) => updateAvailability(index, e.target.value, row.time)}></Input>\\r\\n                        </Label>\\r\\n                            \\r\\n                            \\r\\n                            <Label class=\\"space-y-2\\">\\r\\n                                <span color=\\"black\\">{classtime} Timeslot</span>\\r\\n                                <Select\\r\\n                                    class=\\"mt-2\\"\\r\\n                                    items={(classtime == \\"AM\\" ? amslots : pmslots)}\\r\\n                                    disabled={(classtime == \\"\\")}\\r\\n                                    required\\r\\n                                    name=\\"selectedSlot\\"\\r\\n                                    bind:value={row.time}\\r\\n                                    on:change={(e) => updateAvailability(index, row.date, e.target.value)}/>\\r\\n                            </Label>\\r\\n                        {/key}\\r\\n                        <div class=\\"md:col-span-2\\">\\r\\n                            {#key row, classtime}\\r\\n                            {#if row.date != \'\' && row.time != \'\'}\\r\\n                                {#if row.available}\\r\\n                                    <Alert border color=\\"green\\" dismissable>\\r\\n                                        <span class=\\"font-medium\\">Slot is available.</span>\\r\\n                                        You may request this slot!\\r\\n                                    </Alert>\\r\\n                                    {:else}\\r\\n                                    <Alert border color=\\"red\\" dismissable>\\r\\n                                        <span class=\\"font-medium\\">Slot is unavailable.</span>\\r\\n                                        Please try another timeslot.\\r\\n                                    </Alert>\\r\\n                                {/if}\\r\\n                                {:else}\\r\\n                                <Alert border color=\\"yellow\\" dismissable>\\r\\n                                    <span class=\\"font-medium\\">Please answer the above fields to be able to request.</span>\\r\\n                                </Alert>\\r\\n                            {/if}\\r\\n                            {/key}\\r\\n                        </div>\\r\\n                    </div>\\r\\n                    \\r\\n                    </div>\\r\\n                    <hr>\\r\\n                    \\r\\n                    {/each}\\r\\n                    <Button size=\\"sm\\" class=\\"md:col-span-2\\" on:click={addRow}>Add Slot ({dateTimeRows.length})</Button>\\r\\n\\r\\n                    <p>selected:</p>\\r\\n                    <ul>\\r\\n                        {#each dateTimeRows as dtr}<li>{dtr.date} : {dtr.time} {classtime} {#if !(dtr.available)}(unavailable){/if}</li> {/each}\\r\\n                    </ul>\\r\\n                    <!-- <Button on:click={()=>{printStuff()}}>check</Button> -->\\r\\n                    <GradientButton shadow color=\\"green\\"  type=\\"submit\\" disabled={!canRequest}>\\r\\n                        Request\\r\\n                    </GradientButton>\\r\\n                </form>\\r\\n            </Card>\\r\\n        </TabItem>\\r\\n    </Tabs>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n    .input-container {\\r\\n      position: relative;\\r\\n      width: 100%;\\r\\n    }\\r\\n  \\r\\n    .input-desc {\\r\\n      position: absolute;\\r\\n      right: 26px;\\r\\n      top: 50%;\\r\\n      transform: translateY(-50%);\\r\\n      padding: 0 5px;\\r\\n      font-size: 0.9em;\\r\\n      color: grey;\\r\\n      pointer-events: none;\\r\\n    }\\r\\n  </style>\\r\\n"],"names":[],"mappings":"AAyPI,+BAAiB,CACf,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IACT,CAEA,0BAAY,CACV,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,OAAO,CAAE,CAAC,CAAC,GAAG,CACd,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,IAAI,CACX,cAAc,CAAE,IAClB"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classlist;
  let canRequest;
  let { data } = $$props;
  let amclasses = data.amclasses;
  let pmclasses = data.pmclasses;
  let requesterSection = "";
  let dateTimeRows = [{ date: "", time: "", available: false }];
  let classtime = "";
  let selectedClass = "";
  let sections = [
    { name: "FLCD 123", value: "FLCD123" },
    { name: "FLCD 101", value: "FLCD101" },
    { name: "FLCD 195", value: "FLCD195" }
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
  let unavailable = [];
  data.unavailable.map((slot) => {
    unavailable.push(`${slot.class_id} ${slot.observe_date} ${slot.timeslot}`);
  });
  const date = /* @__PURE__ */ new Date();
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    classlist = classtime == "AM" ? amclasses : pmclasses;
    canRequest = dateTimeRows.length >= 1 && dateTimeRows.every((row) => row.available && row.time != "" && row.date != "");
    $$rendered = `<div class="px-10 py-10"> <div class="flex items-center gap-4 mb-5">${validate_component(Button, "Button").$$render(
      $$result,
      {
        color: "alternative",
        class: "w-auto p-0"
      },
      {},
      {
        default: () => {
          return `${validate_component(ChevronLeftOutline, "ChevronLeftOutline").$$render($$result, { size: "xl" }, {}, {})}`;
        }
      }
    )} <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" data-svelte-h="svelte-1iay22r">Request Form</h5></div> ${validate_component(Tabs, "Tabs").$$render($$result, { tabStyle: "pill" }, {}, {
      default: () => {
        return `${validate_component(TabItem, "TabItem").$$render($$result, { open: true }, {}, {
          title: () => {
            return `<span slot="title" class="flex gap-2">${validate_component(AddressBookSolid, "AddressBookSolid").$$render($$result, {}, {}, {})}Observation</span>`;
          },
          default: () => {
            return `${validate_component(Card, "Card").$$render($$result, { class: "max-w-full" }, {}, {
              default: () => {
                return `<form class="flex flex-col space-y-6" action="?/createObservationRequest" method="POST"><h3 class="text-xl font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-gd5gc1">Observation Request</h3> <hr> <div class="grid gap-6 mb-6 md:grid-cols-2">${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
                  default: () => {
                    return `<span data-svelte-h="svelte-1ns82tj">Email of Coordinating FLCD Teacher</span> <div class="input-container svelte-11vu0uz">${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        disabled: false,
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
                    return `<span data-svelte-h="svelte-1m1gc6i">Your section</span> ${validate_component(Select, "Select").$$render(
                      $$result,
                      {
                        class: "mt-2",
                        name: "requesterSection",
                        items: sections,
                        required: true,
                        value: requesterSection
                      },
                      {
                        value: ($$value) => {
                          requesterSection = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}`;
                  }
                })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
                  default: () => {
                    return `<span data-svelte-h="svelte-1a4uhgt">Class time to be observed</span> <ul class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600 h-min"><li class="w-full">${validate_component(Radio, "Radio").$$render(
                      $$result,
                      {
                        value: "AM",
                        name: "classTime",
                        class: "p-3",
                        group: classtime
                      },
                      {
                        group: ($$value) => {
                          classtime = $$value;
                          $$settled = false;
                        }
                      },
                      {
                        default: () => {
                          return `AM`;
                        }
                      }
                    )}</li> <li class="w-full">${validate_component(Radio, "Radio").$$render(
                      $$result,
                      {
                        value: "PM",
                        name: "classTime",
                        class: "p-3",
                        group: classtime
                      },
                      {
                        group: ($$value) => {
                          classtime = $$value;
                          $$settled = false;
                        }
                      },
                      {
                        default: () => {
                          return `PM`;
                        }
                      }
                    )}</li></ul>`;
                  }
                })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
                  default: () => {
                    return `<span color="black">${escape(classtime)} Class</span> ${validate_component(Select, "Select").$$render(
                      $$result,
                      {
                        class: "mt-2",
                        disabled: classtime == "",
                        required: true,
                        name: "class_id",
                        value: selectedClass
                      },
                      {
                        value: ($$value) => {
                          selectedClass = $$value;
                          $$settled = false;
                        }
                      },
                      {
                        default: () => {
                          return `${each(classlist, (section) => {
                            return `<option${add_attribute("value", section.id, 0)}>${escape(section.name)}</option>`;
                          })}`;
                        }
                      }
                    )}`;
                  }
                })}</div> <hr> ${each(dateTimeRows, (row, index) => {
                  return `<div><div class="flex justify-end">${validate_component(Button, "Button").$$render(
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
                  )}</div> <div class="grid gap-6 mb-6 md:grid-cols-2">${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
                    default: () => {
                      return `<span data-svelte-h="svelte-2iqozj">Date of Observation</span> ${validate_component(Input, "Input").$$render(
                        $$result,
                        {
                          type: "date",
                          name: "selectedDate",
                          disabled: classtime == "",
                          min: currentDate,
                          required: true,
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
                      return `<span color="black">${escape(classtime)} Timeslot</span> ${validate_component(Select, "Select").$$render(
                        $$result,
                        {
                          class: "mt-2",
                          items: classtime == "AM" ? amslots : pmslots,
                          disabled: classtime == "",
                          required: true,
                          name: "selectedSlot",
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
                  })} <div class="md:col-span-2">${row.date != "" && row.time != "" ? `${row.available ? `${validate_component(Alert, "Alert").$$render(
                    $$result,
                    {
                      border: true,
                      color: "green",
                      dismissable: true
                    },
                    {},
                    {
                      default: () => {
                        return `<span class="font-medium" data-svelte-h="svelte-1dkvq8h">Slot is available.</span>
                                        You may request this slot!
                                    `;
                      }
                    }
                  )}` : `${validate_component(Alert, "Alert").$$render(
                    $$result,
                    {
                      border: true,
                      color: "red",
                      dismissable: true
                    },
                    {},
                    {
                      default: () => {
                        return `<span class="font-medium" data-svelte-h="svelte-ditjie">Slot is unavailable.</span>
                                        Please try another timeslot.
                                    `;
                      }
                    }
                  )}`}` : `${validate_component(Alert, "Alert").$$render(
                    $$result,
                    {
                      border: true,
                      color: "yellow",
                      dismissable: true
                    },
                    {},
                    {
                      default: () => {
                        return `<span class="font-medium" data-svelte-h="svelte-129wdtx">Please answer the above fields to be able to request.</span> `;
                      }
                    }
                  )}`}</div> </div></div> <hr>`;
                })} ${validate_component(Button, "Button").$$render($$result, { size: "sm", class: "md:col-span-2" }, {}, {
                  default: () => {
                    return `Add Slot (${escape(dateTimeRows.length)})`;
                  }
                })} <p data-svelte-h="svelte-1jipaqp">selected:</p> <ul>${each(dateTimeRows, (dtr) => {
                  return `<li>${escape(dtr.date)} : ${escape(dtr.time)} ${escape(classtime)} ${!dtr.available ? `(unavailable)` : ``}</li>`;
                })}</ul>  ${validate_component(GradientButton, "GradientButton").$$render(
                  $$result,
                  {
                    shadow: true,
                    color: "green",
                    type: "submit",
                    disabled: !canRequest
                  },
                  {},
                  {
                    default: () => {
                      return `Request`;
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
//# sourceMappingURL=_page.svelte-Ga-i0BqQ.js.map
