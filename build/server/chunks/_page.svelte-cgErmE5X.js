import { c as create_ssr_component } from './ssr-D-0G9OQq.js';

const css = {
  code: ".button-style.svelte-1vhlx55{border-radius:20px;padding:10px 20px;background-color:#007BFF;color:white;border:none;cursor:pointer}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["# Batch Creation\\r\\n<form action=\\"?/createBatch\\" method=\\"POST\\">\\r\\n  <label>\\r\\n    Batch Name:\\r\\n    <input name=\\"name\\" type=\\"text\\" placeholder=\\"(eg, 2023-2024 A)\\" required />\\r\\n  </label>\\r\\n\\r\\n  <label>\\r\\n    Description:\\r\\n    <input name=\\"description\\" type=\\"text\\" placeholder=\\"(eg, 1st semester, began July)\\" />\\r\\n  </label>\\r\\n\\r\\n  <button type=\\"submit\\" class=\\"button-style\\">Create Batch</button>\\r\\n</form>\\r\\n\\r\\n# Class Creation\\r\\n<form action=\\"?/createClass\\" method=\\"POST\\">\\r\\n  <label>\\r\\n    Class Name:\\r\\n    <input name=\\"name\\" type=\\"text\\" placeholder=\\"(eg, String Theory 101 - Section 1)\\" required />\\r\\n  </label>\\r\\n  \\r\\n  <label>\\r\\n    Handler ID:\\r\\n    <input name=\\"handler_id\\" type=\\"number\\" placeholder=\\"(eg, 12)\\" />\\r\\n  </label>\\r\\n  <label>\\r\\n\\r\\n    Batch ID:\\r\\n    <input name=\\"batch_id\\" type=\\"number\\" placeholder=\\"(eg, 4)\\" />\\r\\n  </label>\\r\\n  \\r\\n  <label>\\r\\n    Description:\\r\\n    <input name=\\"description\\" type=\\"text\\" placeholder=\\"(eg, Section 1)\\" size=\\"lg\\" />\\r\\n  </label>\\r\\n  \\r\\n  <label>\\r\\n    Schedule:\\r\\n    <input name=\\"schedule\\" type=\\"text\\" placeholder=\\"\\" size=\\"lg\\" />\\r\\n  </label>\\r\\n\\r\\n  <button type=\\"submit\\" class=\\"button-style\\">Create Class</button>\\r\\n</form>\\r\\n\\r\\n<style>\\r\\n  .button-style {\\r\\n    border-radius: 20px;\\r\\n    padding: 10px 20px;\\r\\n    background-color: #007BFF;\\r\\n    color: white;\\r\\n    border: none;\\r\\n    cursor: pointer;\\r\\n  }\\r\\n</style>"],"names":[],"mappings":"AA8CE,4BAAc,CACZ,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,OACV"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `# Batch Creation
<form action="?/createBatch" method="POST" data-svelte-h="svelte-l9itwt"><label>Batch Name:
    <input name="name" type="text" placeholder="(eg, 2023-2024 A)" required></label> <label>Description:
    <input name="description" type="text" placeholder="(eg, 1st semester, began July)"></label> <button type="submit" class="button-style svelte-1vhlx55">Create Batch</button></form>

# Class Creation
<form action="?/createClass" method="POST" data-svelte-h="svelte-1b6fbl9"><label>Class Name:
    <input name="name" type="text" placeholder="(eg, String Theory 101 - Section 1)" required></label> <label>Handler ID:
    <input name="handler_id" type="number" placeholder="(eg, 12)"></label> <label>Batch ID:
    <input name="batch_id" type="number" placeholder="(eg, 4)"></label> <label>Description:
    <input name="description" type="text" placeholder="(eg, Section 1)" size="lg"></label> <label>Schedule:
    <input name="schedule" type="text" placeholder="" size="lg"></label> <button type="submit" class="button-style svelte-1vhlx55">Create Class</button> </form>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-cgErmE5X.js.map
