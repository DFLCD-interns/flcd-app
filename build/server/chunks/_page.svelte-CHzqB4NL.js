import { c as create_ssr_component, v as validate_component } from './ssr-C5koH-x7.js';
import { B as Button } from './Button-DPoC_1Mm.js';
import { C as Card } from './Card-BPOAXPC5.js';
import './bundle-mjs-BLGuyV0D.js';
import './Frame-Cc0rpiY0.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { equipmentTable = data.equipmentTable } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.equipmentTable === void 0 && $$bindings.equipmentTable && equipmentTable !== void 0) $$bindings.equipmentTable(equipmentTable);
  return `<div class="p-2 grid grid-cols-2 gap-3">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="p-2 grid grid-cols-2 gap-3">${validate_component(Button, "Button").$$render($$result, {}, {}, {
        default: () => {
          return `Download Equipment`;
        }
      })} ${validate_component(Button, "Button").$$render($$result, {}, {}, {
        default: () => {
          return `Download Classes`;
        }
      })} ${validate_component(Button, "Button").$$render($$result, {}, {}, {
        default: () => {
          return `Download Venues`;
        }
      })}</div>`;
    }
  })}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CHzqB4NL.js.map
