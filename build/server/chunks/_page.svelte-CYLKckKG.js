import { c as create_ssr_component, v as validate_component } from './ssr-C5koH-x7.js';
import { B as Button } from './Button-DPoC_1Mm.js';
import { C as Card } from './Card-BPOAXPC5.js';
import { C as ChevronLeftOutline } from './ChevronLeftOutline-BJ0KeBW-.js';
import './bundle-mjs-BLGuyV0D.js';
import './Frame-Cc0rpiY0.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex px-10 py-10 w-full h-auto justify-center">${validate_component(Card, "Card").$$render($$result, { class: "gap-3" }, {}, {
    default: () => {
      return `<div class="flex items-center gap-4 mb-5" data-svelte-h="svelte-1nd6dx7"><h4 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Log out</h4></div> <hr> <p data-svelte-h="svelte-77qa54">Do you want to log out?</p> <form method="POST" action="?/logout">${validate_component(Button, "Button").$$render(
        $$result,
        {
          color: "red",
          class: "w-full",
          type: "submit"
        },
        {},
        {
          default: () => {
            return `Log out`;
          }
        }
      )}</form> ${validate_component(Button, "Button").$$render($$result, { color: "alternative" }, {}, {
        default: () => {
          return `${validate_component(ChevronLeftOutline, "ChevronLeftOutline").$$render($$result, {}, {}, {})}Back`;
        }
      })}`;
    }
  })}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CYLKckKG.js.map
