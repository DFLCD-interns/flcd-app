import{s as E,e as p,c as _,b as S,f as l,l as b,i as c,a as v,o as O,g as x,t as T,d as q}from"../chunks/scheduler.DOp8wpeX.js";import{S as I,i as R,c as w,a as k,m as C,t as L,b as B,d as y}from"../chunks/index.DWy7Bods.js";import{B as P}from"../chunks/Button.BXa4MMB8.js";import{C as V}from"../chunks/Card.B-RoMR1e.js";import{C as j}from"../chunks/ChevronLeftOutline.Dk26zTC0.js";function F(i){let t;return{c(){t=T("Log out")},l(a){t=q(a,"Log out")},m(a,o){c(a,t,o)},d(a){a&&l(t)}}}function z(i){let t,a,o;return t=new j({}),{c(){w(t.$$.fragment),a=T("Back")},l(n){k(t.$$.fragment,n),a=q(n,"Back")},m(n,r){C(t,n,r),c(n,a,r),o=!0},i(n){o||(L(t.$$.fragment,n),o=!0)},o(n){B(t.$$.fragment,n),o=!1},d(n){n&&l(a),y(t,n)}}}function A(i){let t,a='<h4 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Log out</h4>',o,n,r,f,D="Do you want to log out?",d,$,m,h,u,g;return m=new P({props:{color:"red",class:"w-full",type:"submit",$$slots:{default:[F]},$$scope:{ctx:i}}}),u=new P({props:{color:"alternative",$$slots:{default:[z]},$$scope:{ctx:i}}}),u.$on("click",i[1]),{c(){t=p("div"),t.innerHTML=a,o=v(),n=p("hr"),r=v(),f=p("p"),f.textContent=D,d=v(),$=p("form"),w(m.$$.fragment),h=v(),w(u.$$.fragment),this.h()},l(e){t=_(e,"DIV",{class:!0,"data-svelte-h":!0}),O(t)!=="svelte-1nd6dx7"&&(t.innerHTML=a),o=x(e),n=_(e,"HR",{}),r=x(e),f=_(e,"P",{"data-svelte-h":!0}),O(f)!=="svelte-77qa54"&&(f.textContent=D),d=x(e),$=_(e,"FORM",{method:!0,action:!0});var s=S($);k(m.$$.fragment,s),s.forEach(l),h=x(e),k(u.$$.fragment,e),this.h()},h(){b(t,"class","flex items-center gap-4 mb-5"),b($,"method","POST"),b($,"action","?/logout")},m(e,s){c(e,t,s),c(e,o,s),c(e,n,s),c(e,r,s),c(e,f,s),c(e,d,s),c(e,$,s),C(m,$,null),c(e,h,s),C(u,e,s),g=!0},p(e,s){const H={};s&4&&(H.$$scope={dirty:s,ctx:e}),m.$set(H);const M={};s&4&&(M.$$scope={dirty:s,ctx:e}),u.$set(M)},i(e){g||(L(m.$$.fragment,e),L(u.$$.fragment,e),g=!0)},o(e){B(m.$$.fragment,e),B(u.$$.fragment,e),g=!1},d(e){e&&(l(t),l(o),l(n),l(r),l(f),l(d),l($),l(h)),y(m),y(u,e)}}}function G(i){let t,a,o;return a=new V({props:{class:"gap-3",$$slots:{default:[A]},$$scope:{ctx:i}}}),{c(){t=p("div"),w(a.$$.fragment),this.h()},l(n){t=_(n,"DIV",{class:!0});var r=S(t);k(a.$$.fragment,r),r.forEach(l),this.h()},h(){b(t,"class","flex px-10 py-10 w-full h-auto justify-center")},m(n,r){c(n,t,r),C(a,t,null),o=!0},p(n,[r]){const f={};r&4&&(f.$$scope={dirty:r,ctx:n}),a.$set(f)},i(n){o||(L(a.$$.fragment,n),o=!0)},o(n){B(a.$$.fragment,n),o=!1},d(n){n&&l(t),y(a)}}}function J(i){function t(){window.history.back()}return[t,()=>{t()}]}class X extends I{constructor(t){super(),R(this,t,J,G,E,{})}}export{X as component};