import{s as y,t as u,e as h,d as b,c as d,o as f,l as i,i as s,n as c,f as o}from"../chunks/scheduler.DOp8wpeX.js";import{S as C,i as _}from"../chunks/index.DWy7Bods.js";function g(x){let a,t,m=`<label>Batch Name:
    <input name="name" type="text" placeholder="(eg, 2023-2024 A)" required=""/></label> <label>Description:
    <input name="description" type="text" placeholder="(eg, 1st semester, began July)"/></label> <button type="submit" class="button-style svelte-1vhlx55">Create Batch</button>`,n,l,p=`<label>Class Name:
    <input name="name" type="text" placeholder="(eg, String Theory 101 - Section 1)" required=""/></label> <label>Handler ID:
    <input name="handler_id" type="number" placeholder="(eg, 12)"/></label> <label>Batch ID:
    <input name="batch_id" type="number" placeholder="(eg, 4)"/></label> <label>Description:
    <input name="description" type="text" placeholder="(eg, Section 1)" size="lg"/></label> <label>Schedule:
    <input name="schedule" type="text" placeholder="" size="lg"/></label> <button type="submit" class="button-style svelte-1vhlx55">Create Class</button>`;return{c(){a=u(`# Batch Creation\r
`),t=h("form"),t.innerHTML=m,n=u(`\r
\r
# Class Creation\r
`),l=h("form"),l.innerHTML=p,this.h()},l(e){a=b(e,`# Batch Creation\r
`),t=d(e,"FORM",{action:!0,method:!0,"data-svelte-h":!0}),f(t)!=="svelte-l9itwt"&&(t.innerHTML=m),n=b(e,`\r
\r
# Class Creation\r
`),l=d(e,"FORM",{action:!0,method:!0,"data-svelte-h":!0}),f(l)!=="svelte-1b6fbl9"&&(l.innerHTML=p),this.h()},h(){i(t,"action","?/createBatch"),i(t,"method","POST"),i(l,"action","?/createClass"),i(l,"method","POST")},m(e,r){s(e,a,r),s(e,t,r),s(e,n,r),s(e,l,r)},p:c,i:c,o:c,d(e){e&&(o(a),o(t),o(n),o(l))}}}class T extends C{constructor(a){super(),_(this,a,null,g,y,{})}}export{T as component};
