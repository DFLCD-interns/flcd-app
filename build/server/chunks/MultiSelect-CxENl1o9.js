import { c as create_ssr_component, q as compute_rest_props, w as createEventDispatcher, g as spread, h as escape_object, t as escape_attribute_value, d as each, b as add_attribute, e as escape, v as validate_component } from './ssr-D-0G9OQq.js';
import { B as Badge } from './Badge-8btJzlS_.js';
import { C as CloseButton } from './GradientButton-ClcQ1Dti.js';
import { t as twMerge } from './bundle-mjs-BLGuyV0D.js';

const multiSelectClass = "relative border border-gray-300 flex items-center rounded-lg gap-2 dark:border-gray-600 focus-within:ring-1 focus-within:border-primary-500 ring-primary-500 dark:focus-within:border-primary-500 dark:ring-primary-500 focus-visible:outline-none";
const MultiSelect = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectItems;
  let $$restProps = compute_rest_props($$props, ["items", "value", "size", "dropdownClass", "placeholder"]);
  const dispatcher = createEventDispatcher();
  let { items = [] } = $$props;
  let { value = [] } = $$props;
  let { size = "md" } = $$props;
  let { dropdownClass = "" } = $$props;
  let { placeholder = "" } = $$props;
  const sizes = {
    sm: "px-2 py-1 min-h-[2.4rem]",
    md: "px-3 py-1 min-h-[2.7rem]",
    lg: "px-4 py-2 min-h-[3.2rem]"
  };
  const clearThisOption = (select) => {
    if (value.includes(select.value)) {
      value = value.filter((o) => o !== select.value);
      dispatcher("change");
    }
  };
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.dropdownClass === void 0 && $$bindings.dropdownClass && dropdownClass !== void 0) $$bindings.dropdownClass(dropdownClass);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  selectItems = items.filter((x) => value.includes(x.value));
  twMerge("absolute z-50 p-3 flex flex-col gap-1 max-h-64 bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 start-0 top-[calc(100%+1rem)] rounded-lg cursor-pointer overflow-y-scroll w-full", dropdownClass);
  return ` <select${spread(
    [
      escape_object($$restProps),
      { value: escape_attribute_value(value) },
      { hidden: true },
      { multiple: true }
    ],
    {}
  )}>${each(items, ({ value: value2, name }) => {
    return `<option${add_attribute("value", value2, 0)}>${escape(name)}</option>`;
  })}</select>  <div tabindex="0" role="listbox"${add_attribute("class", twMerge(multiSelectClass, sizes[size], $$props.class), 0)}>${!selectItems.length ? `<span class="text-gray-400">${escape(placeholder)}</span>` : ``} <span class="flex gap-2 flex-wrap">${selectItems.length ? `${each(selectItems, (item) => {
    return `${slots.default ? slots.default({ item, clear: () => clearThisOption(item) }) : ` ${validate_component(Badge, "Badge").$$render(
      $$result,
      {
        color: "dark",
        large: size === "lg",
        dismissable: true,
        params: { duration: 100 }
      },
      {},
      {
        default: () => {
          return `${escape(item.name)} `;
        }
      }
    )} `}`;
  })}` : ``}</span> <div class="flex ms-auto gap-2 items-center">${selectItems.length ? `${validate_component(CloseButton, "CloseButton").$$render(
    $$result,
    {
      size,
      color: "none",
      class: "p-0 focus:ring-gray-400 dark:text-white"
    },
    {},
    {}
  )}` : ``} <div class="w-[1px] bg-gray-300 dark:bg-gray-600"></div> <svg class="cursor-pointer h-3 w-3 ms-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${add_attribute("d", "m9 1-4 4-4-4", 0)}></path></svg></div> ${``}</div> `;
});

export { MultiSelect as M };
//# sourceMappingURL=MultiSelect-CxENl1o9.js.map
