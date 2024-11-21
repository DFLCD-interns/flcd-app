import{aj as mt}from"./scheduler.DOp8wpeX.js";import{w as bt}from"./index.DELnobZO.js";new URL("sveltekit-internal://");function he(t,n){return t==="/"||n==="ignore"?t:n==="never"?t.endsWith("/")?t.slice(0,-1):t:n==="always"&&!t.endsWith("/")?t+"/":t}function pe(t){return t.split("%25").map(decodeURI).join("%25")}function ge(t){for(const n in t)t[n]=decodeURIComponent(t[n]);return t}function dt({href:t}){return t.split("#")[0]}const me=["href","pathname","search","toString","toJSON"];function _e(t,n,e){const a=new URL(t);Object.defineProperty(a,"searchParams",{value:new Proxy(a.searchParams,{get(r,o){if(o==="get"||o==="getAll"||o==="has")return s=>(e(s),r[o](s));n();const i=Reflect.get(r,o);return typeof i=="function"?i.bind(r):i}}),enumerable:!0,configurable:!0});for(const r of me)Object.defineProperty(a,r,{get(){return n(),t[r]},enumerable:!0,configurable:!0});return a}const ye="/__data.json",we=".html__data.json";function ve(t){return t.endsWith(".html")?t.replace(/\.html$/,we):t.replace(/\/$/,"")+ye}function be(...t){let n=5381;for(const e of t)if(typeof e=="string"){let a=e.length;for(;a;)n=n*33^e.charCodeAt(--a)}else if(ArrayBuffer.isView(e)){const a=new Uint8Array(e.buffer,e.byteOffset,e.byteLength);let r=a.length;for(;r;)n=n*33^a[--r]}else throw new TypeError("value must be a string or TypedArray");return(n>>>0).toString(36)}function ke(t){const n=atob(t),e=new Uint8Array(n.length);for(let a=0;a<n.length;a++)e[a]=n.charCodeAt(a);return e.buffer}const Gt=window.fetch;window.fetch=(t,n)=>((t instanceof Request?t.method:(n==null?void 0:n.method)||"GET")!=="GET"&&M.delete(kt(t)),Gt(t,n));const M=new Map;function Ee(t,n){const e=kt(t,n),a=document.querySelector(e);if(a!=null&&a.textContent){let{body:r,...o}=JSON.parse(a.textContent);const i=a.getAttribute("data-ttl");return i&&M.set(e,{body:r,init:o,ttl:1e3*Number(i)}),a.getAttribute("data-b64")!==null&&(r=ke(r)),Promise.resolve(new Response(r,o))}return window.fetch(t,n)}function Ae(t,n,e){if(M.size>0){const a=kt(t,e),r=M.get(a);if(r){if(performance.now()<r.ttl&&["default","force-cache","only-if-cached",void 0].includes(e==null?void 0:e.cache))return new Response(r.body,r.init);M.delete(a)}}return window.fetch(n,e)}function kt(t,n){let a=`script[data-sveltekit-fetched][data-url=${JSON.stringify(t instanceof Request?t.url:t)}]`;if(n!=null&&n.headers||n!=null&&n.body){const r=[];n.headers&&r.push([...new Headers(n.headers)].join(",")),n.body&&(typeof n.body=="string"||ArrayBuffer.isView(n.body))&&r.push(n.body),a+=`[data-hash="${be(...r)}"]`}return a}const Se=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function Re(t){const n=[];return{pattern:t==="/"?/^\/$/:new RegExp(`^${Le(t).map(a=>{const r=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(a);if(r)return n.push({name:r[1],matcher:r[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const o=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(a);if(o)return n.push({name:o[1],matcher:o[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!a)return;const i=a.split(/\[(.+?)\](?!\])/);return"/"+i.map((c,f)=>{if(f%2){if(c.startsWith("x+"))return ht(String.fromCharCode(parseInt(c.slice(2),16)));if(c.startsWith("u+"))return ht(String.fromCharCode(...c.slice(2).split("-").map(l=>parseInt(l,16))));const u=Se.exec(c),[,h,g,d,_]=u;return n.push({name:d,matcher:_,optional:!!h,rest:!!g,chained:g?f===1&&i[0]==="":!1}),g?"(.*?)":h?"([^/]*)?":"([^/]+?)"}return ht(c)}).join("")}).join("")}/?$`),params:n}}function Ie(t){return!/^\([^)]+\)$/.test(t)}function Le(t){return t.slice(1).split("/").filter(Ie)}function Pe(t,n,e){const a={},r=t.slice(1),o=r.filter(s=>s!==void 0);let i=0;for(let s=0;s<n.length;s+=1){const c=n[s];let f=r[s-i];if(c.chained&&c.rest&&i&&(f=r.slice(s-i,s+1).filter(u=>u).join("/"),i=0),f===void 0){c.rest&&(a[c.name]="");continue}if(!c.matcher||e[c.matcher](f)){a[c.name]=f;const u=n[s+1],h=r[s+1];u&&!u.rest&&u.optional&&h&&c.chained&&(i=0),!u&&!h&&Object.keys(a).length===o.length&&(i=0);continue}if(c.optional&&c.chained){i++;continue}return}if(!i)return a}function ht(t){return t.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function Te({nodes:t,server_loads:n,dictionary:e,matchers:a}){const r=new Set(n);return Object.entries(e).map(([s,[c,f,u]])=>{const{pattern:h,params:g}=Re(s),d={id:s,exec:_=>{const l=h.exec(_);if(l)return Pe(l,g,a)},errors:[1,...u||[]].map(_=>t[_]),layouts:[0,...f||[]].map(i),leaf:o(c)};return d.errors.length=d.layouts.length=Math.max(d.errors.length,d.layouts.length),d});function o(s){const c=s<0;return c&&(s=~s),[c,t[s]]}function i(s){return s===void 0?s:[r.has(s),t[s]]}}function Mt(t,n=JSON.parse){try{return n(sessionStorage[t])}catch{}}function xt(t,n,e=JSON.stringify){const a=e(n);try{sessionStorage[t]=a}catch{}}var Ft;const P=((Ft=globalThis.__sveltekit_1b48g5v)==null?void 0:Ft.base)??"";var qt;const Ue=((qt=globalThis.__sveltekit_1b48g5v)==null?void 0:qt.assets)??P,xe="1732058387707",Ht="sveltekit:snapshot",Bt="sveltekit:scroll",Kt="sveltekit:states",Ne="sveltekit:pageurl",D="sveltekit:history",B="sveltekit:navigation",X={tap:1,hover:2,viewport:3,eager:4,off:-1,false:-1},W=location.origin;function Jt(t){if(t instanceof URL)return t;let n=document.baseURI;if(!n){const e=document.getElementsByTagName("base");n=e.length?e[0].href:document.URL}return new URL(t,n)}function Et(){return{x:pageXOffset,y:pageYOffset}}function j(t,n){return t.getAttribute(`data-sveltekit-${n}`)}const Nt={...X,"":X.hover};function Yt(t){let n=t.assignedSlot??t.parentNode;return(n==null?void 0:n.nodeType)===11&&(n=n.host),n}function Wt(t,n){for(;t&&t!==n;){if(t.nodeName.toUpperCase()==="A"&&t.hasAttribute("href"))return t;t=Yt(t)}}function _t(t,n){let e;try{e=new URL(t instanceof SVGAElement?t.href.baseVal:t.href,document.baseURI)}catch{}const a=t instanceof SVGAElement?t.target.baseVal:t.target,r=!e||!!a||at(e,n)||(t.getAttribute("rel")||"").split(/\s+/).includes("external"),o=(e==null?void 0:e.origin)===W&&t.hasAttribute("download");return{url:e,external:r,target:a,download:o}}function Z(t){let n=null,e=null,a=null,r=null,o=null,i=null,s=t;for(;s&&s!==document.documentElement;)a===null&&(a=j(s,"preload-code")),r===null&&(r=j(s,"preload-data")),n===null&&(n=j(s,"keepfocus")),e===null&&(e=j(s,"noscroll")),o===null&&(o=j(s,"reload")),i===null&&(i=j(s,"replacestate")),s=Yt(s);function c(f){switch(f){case"":case"true":return!0;case"off":case"false":return!1;default:return}}return{preload_code:Nt[a??"off"],preload_data:Nt[r??"off"],keepfocus:c(n),noscroll:c(e),reload:c(o),replace_state:c(i)}}function Ot(t){const n=bt(t);let e=!0;function a(){e=!0,n.update(i=>i)}function r(i){e=!1,n.set(i)}function o(i){let s;return n.subscribe(c=>{(s===void 0||e&&c!==s)&&i(s=c)})}return{notify:a,set:r,subscribe:o}}function Oe(){const{set:t,subscribe:n}=bt(!1);let e;async function a(){clearTimeout(e);try{const r=await fetch(`${Ue}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!r.ok)return!1;const i=(await r.json()).version!==xe;return i&&(t(!0),clearTimeout(e)),i}catch{return!1}}return{subscribe:n,check:a}}function at(t,n){return t.origin!==W||!t.pathname.startsWith(n)}const je=-1,$e=-2,De=-3,Ce=-4,Ve=-5,Fe=-6;function an(t,n){return zt(JSON.parse(t),n)}function zt(t,n){if(typeof t=="number")return r(t,!0);if(!Array.isArray(t)||t.length===0)throw new Error("Invalid input");const e=t,a=Array(e.length);function r(o,i=!1){if(o===je)return;if(o===De)return NaN;if(o===Ce)return 1/0;if(o===Ve)return-1/0;if(o===Fe)return-0;if(i)throw new Error("Invalid input");if(o in a)return a[o];const s=e[o];if(!s||typeof s!="object")a[o]=s;else if(Array.isArray(s))if(typeof s[0]=="string"){const c=s[0],f=n==null?void 0:n[c];if(f)return a[o]=f(r(s[1]));switch(c){case"Date":a[o]=new Date(s[1]);break;case"Set":const u=new Set;a[o]=u;for(let d=1;d<s.length;d+=1)u.add(r(s[d]));break;case"Map":const h=new Map;a[o]=h;for(let d=1;d<s.length;d+=2)h.set(r(s[d]),r(s[d+1]));break;case"RegExp":a[o]=new RegExp(s[1],s[2]);break;case"Object":a[o]=Object(s[1]);break;case"BigInt":a[o]=BigInt(s[1]);break;case"null":const g=Object.create(null);a[o]=g;for(let d=1;d<s.length;d+=2)g[s[d]]=r(s[d+1]);break;default:throw new Error(`Unknown type ${c}`)}}else{const c=new Array(s.length);a[o]=c;for(let f=0;f<s.length;f+=1){const u=s[f];u!==$e&&(c[f]=r(u))}}else{const c={};a[o]=c;for(const f in s){const u=s[f];c[f]=r(u)}}return a[o]}return r(0)}const Xt=new Set(["load","prerender","csr","ssr","trailingSlash","config"]);[...Xt];const qe=new Set([...Xt]);[...qe];function Ge(t){return t.filter(n=>n!=null)}class rt{constructor(n,e){this.status=n,typeof e=="string"?this.body={message:e}:e?this.body=e:this.body={message:`Error: ${n}`}}toString(){return JSON.stringify(this.body)}}class Zt{constructor(n,e){this.status=n,this.location=e}}class At extends Error{constructor(n,e,a){super(a),this.status=n,this.text=e}}const Me="x-sveltekit-invalidated",He="x-sveltekit-trailing-slash";function Q(t){return t instanceof rt||t instanceof At?t.status:500}function Be(t){return t instanceof At?t.text:"Internal Error"}const O=Mt(Bt)??{},K=Mt(Ht)??{},U={url:Ot({}),page:Ot({}),navigating:bt(null),updated:Oe()};function St(t){O[t]=Et()}function Ke(t,n){let e=t+1;for(;O[e];)delete O[e],e+=1;for(e=n+1;K[e];)delete K[e],e+=1}function V(t){return location.href=t.href,new Promise(()=>{})}function jt(){}let ot,yt,tt,T,wt,q;const Qt=[],et=[];let I=null;const te=[],Je=[];let $=[],y={branch:[],error:null,url:null},Rt=!1,nt=!1,$t=!0,J=!1,G=!1,ee=!1,st=!1,N,A,L,S,F;const H=new Set;let pt;async function rn(t,n,e){var r,o;document.URL!==location.href&&(location.href=location.href),q=t,ot=Te(t),T=document.documentElement,wt=n,yt=t.nodes[0],tt=t.nodes[1],yt(),tt(),A=(r=history.state)==null?void 0:r[D],L=(o=history.state)==null?void 0:o[B],A||(A=L=Date.now(),history.replaceState({...history.state,[D]:A,[B]:L},""));const a=O[A];a&&(history.scrollRestoration="manual",scrollTo(a.x,a.y)),e?await tn(wt,e):Ze(location.href,{replaceState:!0}),Qe()}async function Ye(){if(await(pt||(pt=Promise.resolve())),!pt)return;pt=null;const t=lt(y.url,!0);I=null;const n=F={},e=t&&await Pt(t);if(!(!e||n!==F)){if(e.type==="redirect")return it(new URL(e.location,y.url).href,{},1,n);e.props.page&&(S=e.props.page),y=e.state,ne(),N.$set(e.props)}}function ne(){Qt.length=0,st=!1}function ae(t){et.some(n=>n==null?void 0:n.snapshot)&&(K[t]=et.map(n=>{var e;return(e=n==null?void 0:n.snapshot)==null?void 0:e.capture()}))}function re(t){var n;(n=K[t])==null||n.forEach((e,a)=>{var r,o;(o=(r=et[a])==null?void 0:r.snapshot)==null||o.restore(e)})}function Dt(){St(A),xt(Bt,O),ae(L),xt(Ht,K)}async function it(t,n,e,a){return z({type:"goto",url:Jt(t),keepfocus:n.keepFocus,noscroll:n.noScroll,replace_state:n.replaceState,state:n.state,redirect_count:e,nav_token:a,accept:()=>{n.invalidateAll&&(st=!0)}})}async function We(t){if(t.id!==(I==null?void 0:I.id)){const n={};H.add(n),I={id:t.id,token:n,promise:Pt({...t,preload:n}).then(e=>(H.delete(n),e.type==="loaded"&&e.state.error&&(I=null),e))}}return I.promise}async function gt(t){const n=ot.find(e=>e.exec(ie(t)));n&&await Promise.all([...n.layouts,n.leaf].map(e=>e==null?void 0:e[1]()))}function oe(t,n,e){var o;y=t.state;const a=document.querySelector("style[data-sveltekit]");a&&a.remove(),S=t.props.page,N=new q.root({target:n,props:{...t.props,stores:U,components:et},hydrate:e}),re(L);const r={from:null,to:{params:y.params,route:{id:((o=y.route)==null?void 0:o.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter",complete:Promise.resolve()};$.forEach(i=>i(r)),nt=!0}function Y({url:t,params:n,branch:e,status:a,error:r,route:o,form:i}){let s="never";if(P&&(t.pathname===P||t.pathname===P+"/"))s="always";else for(const d of e)(d==null?void 0:d.slash)!==void 0&&(s=d.slash);t.pathname=he(t.pathname,s),t.search=t.search;const c={type:"loaded",state:{url:t,params:n,branch:e,error:r,route:o},props:{constructors:Ge(e).map(d=>d.node.component),page:S}};i!==void 0&&(c.props.form=i);let f={},u=!S,h=0;for(let d=0;d<Math.max(e.length,y.branch.length);d+=1){const _=e[d],l=y.branch[d];(_==null?void 0:_.data)!==(l==null?void 0:l.data)&&(u=!0),_&&(f={...f,..._.data},u&&(c.props[`data_${h}`]=f),h+=1)}return(!y.url||t.href!==y.url.href||y.error!==r||i!==void 0&&i!==S.form||u)&&(c.props.page={error:r,params:n,route:{id:(o==null?void 0:o.id)??null},state:{},status:a,url:new URL(t),form:i??null,data:u?f:S.data}),c}async function It({loader:t,parent:n,url:e,params:a,route:r,server_data_node:o}){var u,h,g;let i=null,s=!0;const c={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1,search_params:new Set},f=await t();if((u=f.universal)!=null&&u.load){let d=function(...l){for(const m of l){const{href:b}=new URL(m,e);c.dependencies.add(b)}};const _={route:new Proxy(r,{get:(l,m)=>(s&&(c.route=!0),l[m])}),params:new Proxy(a,{get:(l,m)=>(s&&c.params.add(m),l[m])}),data:(o==null?void 0:o.data)??null,url:_e(e,()=>{s&&(c.url=!0)},l=>{s&&c.search_params.add(l)}),async fetch(l,m){let b;l instanceof Request?(b=l.url,m={body:l.method==="GET"||l.method==="HEAD"?void 0:await l.blob(),cache:l.cache,credentials:l.credentials,headers:l.headers,integrity:l.integrity,keepalive:l.keepalive,method:l.method,mode:l.mode,redirect:l.redirect,referrer:l.referrer,referrerPolicy:l.referrerPolicy,signal:l.signal,...m}):b=l;const R=new URL(b,e);return s&&d(R.href),R.origin===e.origin&&(b=R.href.slice(e.origin.length)),nt?Ae(b,R.href,m):Ee(b,m)},setHeaders:()=>{},depends:d,parent(){return s&&(c.parent=!0),n()},untrack(l){s=!1;try{return l()}finally{s=!0}}};i=await f.universal.load.call(null,_)??null}return{node:f,loader:t,server:o,universal:(h=f.universal)!=null&&h.load?{type:"data",data:i,uses:c}:null,data:i??(o==null?void 0:o.data)??null,slash:((g=f.universal)==null?void 0:g.trailingSlash)??(o==null?void 0:o.slash)}}function Ct(t,n,e,a,r,o){if(st)return!0;if(!r)return!1;if(r.parent&&t||r.route&&n||r.url&&e)return!0;for(const i of r.search_params)if(a.has(i))return!0;for(const i of r.params)if(o[i]!==y.params[i])return!0;for(const i of r.dependencies)if(Qt.some(s=>s(new URL(i))))return!0;return!1}function Lt(t,n){return(t==null?void 0:t.type)==="data"?t:(t==null?void 0:t.type)==="skip"?n??null:null}function ze(t,n){if(!t)return new Set(n.searchParams.keys());const e=new Set([...t.searchParams.keys(),...n.searchParams.keys()]);for(const a of e){const r=t.searchParams.getAll(a),o=n.searchParams.getAll(a);r.every(i=>o.includes(i))&&o.every(i=>r.includes(i))&&e.delete(a)}return e}function Vt({error:t,url:n,route:e,params:a}){return{type:"loaded",state:{error:t,url:n,route:e,params:a,branch:[]},props:{page:S,constructors:[]}}}async function Pt({id:t,invalidating:n,url:e,params:a,route:r,preload:o}){if((I==null?void 0:I.id)===t)return H.delete(I.token),I.promise;const{errors:i,layouts:s,leaf:c}=r,f=[...s,c];i.forEach(p=>p==null?void 0:p().catch(()=>{})),f.forEach(p=>p==null?void 0:p[1]().catch(()=>{}));let u=null;const h=y.url?t!==y.url.pathname+y.url.search:!1,g=y.route?r.id!==y.route.id:!1,d=ze(y.url,e);let _=!1;const l=f.map((p,v)=>{var x;const k=y.branch[v],E=!!(p!=null&&p[0])&&((k==null?void 0:k.loader)!==p[1]||Ct(_,g,h,d,(x=k.server)==null?void 0:x.uses,a));return E&&(_=!0),E});if(l.some(Boolean)){try{u=await fe(e,l)}catch(p){const v=await C(p,{url:e,params:a,route:{id:t}});return H.has(o)?Vt({error:v,url:e,params:a,route:r}):ct({status:Q(p),error:v,url:e,route:r})}if(u.type==="redirect")return u}const m=u==null?void 0:u.nodes;let b=!1;const R=f.map(async(p,v)=>{var ft;if(!p)return;const k=y.branch[v],E=m==null?void 0:m[v];if((!E||E.type==="skip")&&p[1]===(k==null?void 0:k.loader)&&!Ct(b,g,h,d,(ft=k.universal)==null?void 0:ft.uses,a))return k;if(b=!0,(E==null?void 0:E.type)==="error")throw E;return It({loader:p[1],url:e,params:a,route:r,parent:async()=>{var Ut;const Tt={};for(let ut=0;ut<v;ut+=1)Object.assign(Tt,(Ut=await R[ut])==null?void 0:Ut.data);return Tt},server_data_node:Lt(E===void 0&&p[0]?{type:"skip"}:E??null,p[0]?k==null?void 0:k.server:void 0)})});for(const p of R)p.catch(()=>{});const w=[];for(let p=0;p<f.length;p+=1)if(f[p])try{w.push(await R[p])}catch(v){if(v instanceof Zt)return{type:"redirect",location:v.location};if(H.has(o))return Vt({error:await C(v,{params:a,url:e,route:{id:r.id}}),url:e,params:a,route:r});let k=Q(v),E;if(m!=null&&m.includes(v))k=v.status??k,E=v.error;else if(v instanceof rt)E=v.body;else{if(await U.updated.check())return await V(e);E=await C(v,{params:a,url:e,route:{id:r.id}})}const x=await se(p,w,i);return x?Y({url:e,params:a,branch:w.slice(0,x.idx).concat(x.node),status:k,error:E,route:r}):await le(e,{id:r.id},E,k)}else w.push(void 0);return Y({url:e,params:a,branch:w,status:200,error:null,route:r,form:n?void 0:null})}async function se(t,n,e){for(;t--;)if(e[t]){let a=t;for(;!n[a];)a-=1;try{return{idx:a+1,node:{node:await e[t](),loader:e[t],data:{},server:null,universal:null}}}catch{continue}}}async function ct({status:t,error:n,url:e,route:a}){const r={};let o=null;if(q.server_loads[0]===0)try{const f=await fe(e,[!0]);if(f.type!=="data"||f.nodes[0]&&f.nodes[0].type!=="data")throw 0;o=f.nodes[0]??null}catch{(e.origin!==W||e.pathname!==location.pathname||Rt)&&await V(e)}const s=await It({loader:yt,url:e,params:r,route:a,parent:()=>Promise.resolve({}),server_data_node:Lt(o)}),c={node:await tt(),loader:tt,universal:null,server:null,data:null};return Y({url:e,params:r,branch:[s,c],status:t,error:n,route:null})}function lt(t,n){if(!t||at(t,P))return;let e;try{e=q.hooks.reroute({url:new URL(t)})??t.pathname}catch{return}const a=ie(e);for(const r of ot){const o=r.exec(a);if(o)return{id:t.pathname+t.search,invalidating:n,route:r,params:ge(o),url:t}}}function ie(t){return pe(t.slice(P.length)||"/")}function ce({url:t,type:n,intent:e,delta:a}){let r=!1;const o=de(y,e,t,n);a!==void 0&&(o.navigation.delta=a);const i={...o.navigation,cancel:()=>{r=!0,o.reject(new Error("navigation cancelled"))}};return J||te.forEach(s=>s(i)),r?null:o}async function z({type:t,url:n,popped:e,keepfocus:a,noscroll:r,replace_state:o,state:i={},redirect_count:s=0,nav_token:c={},accept:f=jt,block:u=jt}){const h=lt(n,!1),g=ce({url:n,type:t,delta:e==null?void 0:e.delta,intent:h});if(!g){u();return}const d=A,_=L;f(),J=!0,nt&&U.navigating.set(g.navigation),F=c;let l=h&&await Pt(h);if(!l){if(at(n,P))return await V(n);l=await le(n,{id:null},await C(new At(404,"Not Found",`Not found: ${n.pathname}`),{url:n,params:{},route:{id:null}}),404)}if(n=(h==null?void 0:h.url)||n,F!==c)return g.reject(new Error("navigation aborted")),!1;if(l.type==="redirect")if(s>=20)l=await ct({status:500,error:await C(new Error("Redirect loop"),{url:n,params:{},route:{id:null}}),url:n,route:{id:null}});else return it(new URL(l.location,n).href,{},s+1,c),!1;else l.props.page.status>=400&&await U.updated.check()&&await V(n);if(ne(),St(d),ae(_),l.props.page.url.pathname!==n.pathname&&(n.pathname=l.props.page.url.pathname),i=e?e.state:i,!e){const w=o?0:1,p={[D]:A+=w,[B]:L+=w,[Kt]:i};(o?history.replaceState:history.pushState).call(history,p,"",n),o||Ke(A,L)}if(I=null,l.props.page.state=i,nt){y=l.state,l.props.page&&(l.props.page.url=n);const w=(await Promise.all(Je.map(p=>p(g.navigation)))).filter(p=>typeof p=="function");if(w.length>0){let p=function(){$=$.filter(v=>!w.includes(v))};w.push(p),$.push(...w)}N.$set(l.props),ee=!0}else oe(l,wt,!1);const{activeElement:m}=document;await mt();const b=e?e.scroll:r?Et():null;if($t){const w=n.hash&&document.getElementById(decodeURIComponent(n.hash.slice(1)));b?scrollTo(b.x,b.y):w?w.scrollIntoView():scrollTo(0,0)}const R=document.activeElement!==m&&document.activeElement!==document.body;!a&&!R&&vt(),$t=!0,l.props.page&&(S=l.props.page),J=!1,t==="popstate"&&re(L),g.fulfil(void 0),$.forEach(w=>w(g.navigation)),U.navigating.set(null)}async function le(t,n,e,a){return t.origin===W&&t.pathname===location.pathname&&!Rt?await ct({status:a,error:e,url:t,route:n}):await V(t)}function Xe(){let t;T.addEventListener("mousemove",o=>{const i=o.target;clearTimeout(t),t=setTimeout(()=>{a(i,2)},20)});function n(o){a(o.composedPath()[0],1)}T.addEventListener("mousedown",n),T.addEventListener("touchstart",n,{passive:!0});const e=new IntersectionObserver(o=>{for(const i of o)i.isIntersecting&&(gt(i.target.href),e.unobserve(i.target))},{threshold:0});function a(o,i){const s=Wt(o,T);if(!s)return;const{url:c,external:f,download:u}=_t(s,P);if(f||u)return;const h=Z(s);if(!h.reload)if(i<=h.preload_data){const g=lt(c,!1);g&&We(g)}else i<=h.preload_code&&gt(c.pathname)}function r(){e.disconnect();for(const o of T.querySelectorAll("a")){const{url:i,external:s,download:c}=_t(o,P);if(s||c)continue;const f=Z(o);f.reload||(f.preload_code===X.viewport&&e.observe(o),f.preload_code===X.eager&&gt(i.pathname))}}$.push(r),r()}function C(t,n){if(t instanceof rt)return t.body;const e=Q(t),a=Be(t);return q.hooks.handleError({error:t,event:n,status:e,message:a})??{message:a}}function Ze(t,n={}){return t=Jt(t),t.origin!==W?Promise.reject(new Error("goto: invalid URL")):it(t,n,0)}function on(){return st=!0,Ye()}async function sn(t){if(t.type==="error"){const n=new URL(location.href),{branch:e,route:a}=y;if(!a)return;const r=await se(y.branch.length,e,a.errors);if(r){const o=Y({url:n,params:y.params,branch:e.slice(0,r.idx).concat(r.node),status:t.status??500,error:t.error,route:a});y=o.state,N.$set(o.props),mt().then(vt)}}else t.type==="redirect"?it(t.location,{invalidateAll:!0},0):(N.$set({form:null,page:{...S,form:t.data,status:t.status}}),await mt(),N.$set({form:t.data}),t.type==="success"&&vt())}function Qe(){var n;history.scrollRestoration="manual",addEventListener("beforeunload",e=>{let a=!1;if(Dt(),!J){const r=de(y,void 0,null,"leave"),o={...r.navigation,cancel:()=>{a=!0,r.reject(new Error("navigation cancelled"))}};te.forEach(i=>i(o))}a?(e.preventDefault(),e.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Dt()}),(n=navigator.connection)!=null&&n.saveData||Xe(),T.addEventListener("click",async e=>{var g;if(e.button||e.which!==1||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.defaultPrevented)return;const a=Wt(e.composedPath()[0],T);if(!a)return;const{url:r,external:o,target:i,download:s}=_t(a,P);if(!r)return;if(i==="_parent"||i==="_top"){if(window.parent!==window)return}else if(i&&i!=="_self")return;const c=Z(a);if(!(a instanceof SVGAElement)&&r.protocol!==location.protocol&&!(r.protocol==="https:"||r.protocol==="http:")||s)return;if(o||c.reload){ce({url:r,type:"link"})?J=!0:e.preventDefault();return}const[u,h]=r.href.split("#");if(h!==void 0&&u===dt(location)){const[,d]=y.url.href.split("#");if(d===h){e.preventDefault(),h===""||h==="top"&&a.ownerDocument.getElementById("top")===null?window.scrollTo({top:0}):(g=a.ownerDocument.getElementById(h))==null||g.scrollIntoView();return}if(G=!0,St(A),t(r),!c.replace_state)return;G=!1}e.preventDefault(),await new Promise(d=>{requestAnimationFrame(()=>{setTimeout(d,0)}),setTimeout(d,100)}),z({type:"link",url:r,keepfocus:c.keepfocus,noscroll:c.noscroll,replace_state:c.replace_state??r.href===location.href})}),T.addEventListener("submit",e=>{if(e.defaultPrevented)return;const a=HTMLFormElement.prototype.cloneNode.call(e.target),r=e.submitter;if(((r==null?void 0:r.formMethod)||a.method)!=="get")return;const i=new URL((r==null?void 0:r.hasAttribute("formaction"))&&(r==null?void 0:r.formAction)||a.action);if(at(i,P))return;const s=e.target,c=Z(s);if(c.reload)return;e.preventDefault(),e.stopPropagation();const f=new FormData(s),u=r==null?void 0:r.getAttribute("name");u&&f.append(u,(r==null?void 0:r.getAttribute("value"))??""),i.search=new URLSearchParams(f).toString(),z({type:"form",url:i,keepfocus:c.keepfocus,noscroll:c.noscroll,replace_state:c.replace_state??i.href===location.href})}),addEventListener("popstate",async e=>{var a;if((a=e.state)!=null&&a[D]){const r=e.state[D];if(F={},r===A)return;const o=O[r],i=e.state[Kt]??{},s=new URL(e.state[Ne]??location.href),c=e.state[B],f=dt(location)===dt(y.url);if(c===L&&(ee||f)){t(s),O[A]=Et(),o&&scrollTo(o.x,o.y),i!==S.state&&(S={...S,state:i},N.$set({page:S})),A=r;return}const h=r-A;await z({type:"popstate",url:s,popped:{state:i,scroll:o,delta:h},accept:()=>{A=r,L=c},block:()=>{history.go(-h)},nav_token:F})}else if(!G){const r=new URL(location.href);t(r)}}),addEventListener("hashchange",()=>{G&&(G=!1,history.replaceState({...history.state,[D]:++A,[B]:L},"",location.href))});for(const e of document.querySelectorAll("link"))e.rel==="icon"&&(e.href=e.href);addEventListener("pageshow",e=>{e.persisted&&U.navigating.set(null)});function t(e){y.url=e,U.page.set({...S,url:e}),U.page.notify()}}async function tn(t,{status:n=200,error:e,node_ids:a,params:r,route:o,data:i,form:s}){Rt=!0;const c=new URL(location.href);({params:r={},route:o={id:null}}=lt(c,!1)||{});let f;try{const u=a.map(async(d,_)=>{const l=i[_];return l!=null&&l.uses&&(l.uses=ue(l.uses)),It({loader:q.nodes[d],url:c,params:r,route:o,parent:async()=>{const m={};for(let b=0;b<_;b+=1)Object.assign(m,(await u[b]).data);return m},server_data_node:Lt(l)})}),h=await Promise.all(u),g=ot.find(({id:d})=>d===o.id);if(g){const d=g.layouts;for(let _=0;_<d.length;_++)d[_]||h.splice(_,0,void 0)}f=Y({url:c,params:r,branch:h,status:n,error:e,form:s,route:g??null})}catch(u){if(u instanceof Zt){await V(new URL(u.location,location.href));return}f=await ct({status:Q(u),error:await C(u,{url:c,params:r,route:o}),url:c,route:o})}f.props.page&&(f.props.page.state={}),oe(f,t,!0)}async function fe(t,n){var r;const e=new URL(t);e.pathname=ve(t.pathname),t.pathname.endsWith("/")&&e.searchParams.append(He,"1"),e.searchParams.append(Me,n.map(o=>o?"1":"0").join(""));const a=await Gt(e.href);if(!a.ok){let o;throw(r=a.headers.get("content-type"))!=null&&r.includes("application/json")?o=await a.json():a.status===404?o="Not Found":a.status===500&&(o="Internal Error"),new rt(a.status,o)}return new Promise(async o=>{var h;const i=new Map,s=a.body.getReader(),c=new TextDecoder;function f(g){return zt(g,{Promise:d=>new Promise((_,l)=>{i.set(d,{fulfil:_,reject:l})})})}let u="";for(;;){const{done:g,value:d}=await s.read();if(g&&!u)break;for(u+=!d&&u?`
`:c.decode(d,{stream:!0});;){const _=u.indexOf(`
`);if(_===-1)break;const l=JSON.parse(u.slice(0,_));if(u=u.slice(_+1),l.type==="redirect")return o(l);if(l.type==="data")(h=l.nodes)==null||h.forEach(m=>{(m==null?void 0:m.type)==="data"&&(m.uses=ue(m.uses),m.data=f(m.data))}),o(l);else if(l.type==="chunk"){const{id:m,data:b,error:R}=l,w=i.get(m);i.delete(m),R?w.reject(f(R)):w.fulfil(f(b))}}}})}function ue(t){return{dependencies:new Set((t==null?void 0:t.dependencies)??[]),params:new Set((t==null?void 0:t.params)??[]),parent:!!(t!=null&&t.parent),route:!!(t!=null&&t.route),url:!!(t!=null&&t.url),search_params:new Set((t==null?void 0:t.search_params)??[])}}function vt(){const t=document.querySelector("[autofocus]");if(t)t.focus();else{const n=document.body,e=n.getAttribute("tabindex");n.tabIndex=-1,n.focus({preventScroll:!0,focusVisible:!1}),e!==null?n.setAttribute("tabindex",e):n.removeAttribute("tabindex");const a=getSelection();if(a&&a.type!=="None"){const r=[];for(let o=0;o<a.rangeCount;o+=1)r.push(a.getRangeAt(o));setTimeout(()=>{if(a.rangeCount===r.length){for(let o=0;o<a.rangeCount;o+=1){const i=r[o],s=a.getRangeAt(o);if(i.commonAncestorContainer!==s.commonAncestorContainer||i.startContainer!==s.startContainer||i.endContainer!==s.endContainer||i.startOffset!==s.startOffset||i.endOffset!==s.endOffset)return}a.removeAllRanges()}})}}}function de(t,n,e,a){var c,f;let r,o;const i=new Promise((u,h)=>{r=u,o=h});return i.catch(()=>{}),{navigation:{from:{params:t.params,route:{id:((c=t.route)==null?void 0:c.id)??null},url:t.url},to:e&&{params:(n==null?void 0:n.params)??null,route:{id:((f=n==null?void 0:n.route)==null?void 0:f.id)??null},url:e},willUnload:!n,type:a,complete:i},fulfil:r,reject:o}}export{sn as a,rn as b,on as i,an as p,U as s};
