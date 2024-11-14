import{Y as g,Z as b}from"./scheduler.DARHZdcz.js";function v(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1}function h(t){const o=t-1;return o*o*o+1}function w(t){const o=Math.cos(t*Math.PI*.5);return Math.abs(o)<1e-14?1:1-o}function F(t,{delay:o=0,duration:c=400,easing:p=v,amount:i=5,opacity:n=0}={}){const d=getComputedStyle(t),s=+d.opacity,l=d.filter==="none"?"":d.filter,a=s*(1-n),[r,$]=g(i);return{delay:o,duration:c,easing:p,css:(y,u)=>`opacity: ${s-a*u}; filter: ${l} blur(${u*r}${$});`}}function C(t,{delay:o=0,duration:c=400,easing:p=b}={}){const i=+getComputedStyle(t).opacity;return{delay:o,duration:c,easing:p,css:n=>`opacity: ${n*i}`}}function M(t,{delay:o=0,duration:c=400,easing:p=h,x:i=0,y:n=0,opacity:d=0}={}){const s=getComputedStyle(t),l=+s.opacity,a=s.transform==="none"?"":s.transform,r=l*(1-d),[$,y]=g(i),[u,f]=g(n);return{delay:o,duration:c,easing:p,css:(_,m)=>`
			transform: ${a} translate(${(1-_)*$}${y}, ${(1-_)*u}${f});
			opacity: ${l-r*m}`}}function S(t,{delay:o=0,duration:c=400,easing:p=h,axis:i="y"}={}){const n=getComputedStyle(t),d=+n.opacity,s=i==="y"?"height":"width",l=parseFloat(n[s]),a=i==="y"?["top","bottom"]:["left","right"],r=a.map(e=>`${e[0].toUpperCase()}${e.slice(1)}`),$=parseFloat(n[`padding${r[0]}`]),y=parseFloat(n[`padding${r[1]}`]),u=parseFloat(n[`margin${r[0]}`]),f=parseFloat(n[`margin${r[1]}`]),_=parseFloat(n[`border${r[0]}Width`]),m=parseFloat(n[`border${r[1]}Width`]);return{delay:o,duration:c,easing:p,css:e=>`overflow: hidden;opacity: ${Math.min(e*20,1)*d};${s}: ${e*l}px;padding-${a[0]}: ${e*$}px;padding-${a[1]}: ${e*y}px;margin-${a[0]}: ${e*u}px;margin-${a[1]}: ${e*f}px;border-${a[0]}-width: ${e*_}px;border-${a[1]}-width: ${e*m}px;`}}export{M as a,F as b,w as c,C as f,S as s};
