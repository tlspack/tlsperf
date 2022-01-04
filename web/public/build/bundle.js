var app=function(){"use strict";function t(){}const n=t=>t;function e(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(e)}function c(t){return"function"==typeof t}function i(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function l(n,e,o){n.$$.on_destroy.push(function(n,...e){if(null==n)return t;const o=n.subscribe(...e);return o.unsubscribe?()=>o.unsubscribe():o}(e,o))}const s="undefined"!=typeof window;let u=s?()=>window.performance.now():()=>Date.now(),a=s?t=>requestAnimationFrame(t):t;const d=new Set;function f(t){d.forEach((n=>{n.c(t)||(d.delete(n),n.f())})),0!==d.size&&a(f)}function p(t){let n;return 0===d.size&&a(f),{promise:new Promise((e=>{d.add(n={c:t,f:e})})),abort(){d.delete(n)}}}function m(t,n){t.appendChild(n)}function h(t){if(!t)return document;const n=t.getRootNode?t.getRootNode():t.ownerDocument;return n&&n.host?n:t.ownerDocument}function g(t){const n=w("style");return function(t,n){m(t.head||t,n)}(h(t),n),n}function $(t,n,e){t.insertBefore(n,e||null)}function v(t){t.parentNode.removeChild(t)}function b(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function w(t){return document.createElement(t)}function x(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function k(t){return document.createTextNode(t)}function y(){return k(" ")}function _(){return k("")}function N(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function E(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function C(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function M(t,n,e,o){t.style.setProperty(n,e,o?"important":"")}function T(t,n,e){t.classList[e?"add":"remove"](n)}const F=new Set;let L,S=0;function j(t,n,e,o,r,c,i,l=0){const s=16.666/o;let u="{\n";for(let t=0;t<=1;t+=s){const o=n+(e-n)*c(t);u+=100*t+`%{${i(o,1-o)}}\n`}const a=u+`100% {${i(e,1-e)}}\n}`,d=`__svelte_${function(t){let n=5381,e=t.length;for(;e--;)n=(n<<5)-n^t.charCodeAt(e);return n>>>0}(a)}_${l}`,f=h(t);F.add(f);const p=f.__svelte_stylesheet||(f.__svelte_stylesheet=g(t).sheet),m=f.__svelte_rules||(f.__svelte_rules={});m[d]||(m[d]=!0,p.insertRule(`@keyframes ${d} ${a}`,p.cssRules.length));const $=t.style.animation||"";return t.style.animation=`${$?`${$}, `:""}${d} ${o}ms linear ${r}ms 1 both`,S+=1,d}function I(t,n){const e=(t.style.animation||"").split(", "),o=e.filter(n?t=>t.indexOf(n)<0:t=>-1===t.indexOf("__svelte")),r=e.length-o.length;r&&(t.style.animation=o.join(", "),S-=r,S||a((()=>{S||(F.forEach((t=>{const n=t.__svelte_stylesheet;let e=n.cssRules.length;for(;e--;)n.deleteRule(e);t.__svelte_rules={}})),F.clear())})))}function P(t){L=t}function A(){if(!L)throw new Error("Function called outside component initialization");return L}const B=[],z=[],R=[],O=[],D=Promise.resolve();let H=!1;function q(t){R.push(t)}const W=new Set;let X,Y=0;function G(){const t=L;do{for(;Y<B.length;){const t=B[Y];Y++,P(t),J(t.$$)}for(P(null),B.length=0,Y=0;z.length;)z.pop()();for(let t=0;t<R.length;t+=1){const n=R[t];W.has(n)||(W.add(n),n())}R.length=0}while(B.length);for(;O.length;)O.pop()();H=!1,W.clear(),P(t)}function J(t){if(null!==t.fragment){t.update(),r(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(q)}}function K(){return X||(X=Promise.resolve(),X.then((()=>{X=null}))),X}function Q(t,n,e){t.dispatchEvent(function(t,n,e=!1){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,e,!1,n),o}(`${n?"intro":"outro"}${e}`))}const U=new Set;let V;function Z(){V={r:0,c:[],p:V}}function tt(){V.r||r(V.c),V=V.p}function nt(t,n){t&&t.i&&(U.delete(t),t.i(n))}function et(t,n,e,o){if(t&&t.o){if(U.has(t))return;U.add(t),V.c.push((()=>{U.delete(t),o&&(e&&t.d(1),o())})),t.o(n)}}const ot={duration:0};function rt(e,o,i,l){let s=o(e,i),a=l?0:1,d=null,f=null,m=null;function h(){m&&I(e,m)}function g(t,n){const e=t.b-a;return n*=Math.abs(e),{a:a,b:t.b,d:e,duration:n,start:t.start,end:t.start+n,group:t.group}}function $(o){const{delay:c=0,duration:i=300,easing:l=n,tick:$=t,css:v}=s||ot,b={start:u()+c,b:o};o||(b.group=V,V.r+=1),d||f?f=b:(v&&(h(),m=j(e,a,o,i,c,l,v)),o&&$(0,1),d=g(b,i),q((()=>Q(e,o,"start"))),p((t=>{if(f&&t>f.start&&(d=g(f,i),f=null,Q(e,d.b,"start"),v&&(h(),m=j(e,a,d.b,d.duration,0,l,s.css))),d)if(t>=d.end)$(a=d.b,1-a),Q(e,d.b,"end"),f||(d.b?h():--d.group.r||r(d.group.c)),d=null;else if(t>=d.start){const n=t-d.start;a=d.a+d.d*l(n/d.duration),$(a,1-a)}return!(!d&&!f)})))}return{run(t){c(s)?K().then((()=>{s=s(),$(t)})):$(t)},end(){h(),d=f=null}}}function ct(t,n){const e=n.token={};function o(t,o,r,c){if(n.token!==e)return;n.resolved=c;let i=n.ctx;void 0!==r&&(i=i.slice(),i[r]=c);const l=t&&(n.current=t)(i);let s=!1;n.block&&(n.blocks?n.blocks.forEach(((t,e)=>{e!==o&&t&&(Z(),et(t,1,1,(()=>{n.blocks[e]===t&&(n.blocks[e]=null)})),tt())})):n.block.d(1),l.c(),nt(l,1),l.m(n.mount(),n.anchor),s=!0),n.block=l,n.blocks&&(n.blocks[o]=l),s&&G()}if((r=t)&&"object"==typeof r&&"function"==typeof r.then){const e=A();if(t.then((t=>{P(e),o(n.then,1,n.value,t),P(null)}),(t=>{if(P(e),o(n.catch,2,n.error,t),P(null),!n.hasCatch)throw t})),n.current!==n.pending)return o(n.pending,0),!0}else{if(n.current!==n.then)return o(n.then,1,n.value,t),!0;n.resolved=t}var r}function it(t,n,e){const o=n.slice(),{resolved:r}=t;t.current===t.then&&(o[t.value]=r),t.current===t.catch&&(o[t.error]=r),t.block.p(o,e)}function lt(t){t&&t.c()}function st(t,n,o,i){const{fragment:l,on_mount:s,on_destroy:u,after_update:a}=t.$$;l&&l.m(n,o),i||q((()=>{const n=s.map(e).filter(c);u?u.push(...n):r(n),t.$$.on_mount=[]})),a.forEach(q)}function ut(t,n){const e=t.$$;null!==e.fragment&&(r(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function at(t,n){-1===t.$$.dirty[0]&&(B.push(t),H||(H=!0,D.then(G)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function dt(n,e,c,i,l,s,u,a=[-1]){const d=L;P(n);const f=n.$$={fragment:null,ctx:null,props:s,update:t,not_equal:l,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(d?d.$$.context:[])),callbacks:o(),dirty:a,skip_bound:!1,root:e.target||d.$$.root};u&&u(f.root);let p=!1;if(f.ctx=c?c(n,e.props||{},((t,e,...o)=>{const r=o.length?o[0]:e;return f.ctx&&l(f.ctx[t],f.ctx[t]=r)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](r),p&&at(n,t)),e})):[],f.update(),p=!0,r(f.before_update),f.fragment=!!i&&i(f.ctx),e.target){if(e.hydrate){const t=function(t){return Array.from(t.childNodes)}(e.target);f.fragment&&f.fragment.l(t),t.forEach(v)}else f.fragment&&f.fragment.c();e.intro&&nt(n.$$.fragment),st(n,e.target,e.anchor,e.customElement),G()}P(d)}class ft{$destroy(){ut(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function pt(n){let e,o,c,i,l,s,u,a,d;return{c(){e=w("nav"),o=w("div"),c=w("a"),c.textContent="TLS Perf ",i=y(),l=w("a"),l.innerHTML='<span aria-hidden="true"></span> \n\t\t\t<span aria-hidden="true"></span> \n\t\t\t<span aria-hidden="true"></span>',s=y(),u=w("div"),u.innerHTML='<div class="navbar-start"></div> \n\n\t\t<div class="navbar-end"><div class="navbar-item"><div class="buttons"><button class="button is-light is-small is-outlined">Sign in</button> \n\t\t\t\t\t<button class="button is-light is-small is-outlined">Sign up</button></div></div></div>',E(c,"class","navbar-item"),E(c,"href","https://www.tlspack.com"),E(l,"role","button"),E(l,"class","navbar-burger"),E(l,"aria-label","menu"),E(l,"aria-expanded","false"),E(l,"data-target","navbarTopMenu"),E(o,"class","navbar-brand"),E(u,"id","navbarTopMenu"),E(u,"class","navbar-menu"),T(u,"is-active",n[0]),E(e,"class","navbar is-dark is-spaced has-shadow"),E(e,"role","navigation"),E(e,"aria-label","main navigation")},m(t,r){$(t,e,r),m(e,o),m(o,c),m(o,i),m(o,l),m(e,s),m(e,u),a||(d=[N(window,"resize",n[1]),N(l,"click",n[2])],a=!0)},p(t,[n]){1&n&&T(u,"is-active",t[0])},i:t,o:t,d(t){t&&v(e),a=!1,r(d)}}}function mt(t,n,e){let o=!1;return[o,()=>e(0,o=!1),()=>e(0,o=!o)]}class ht extends ft{constructor(t){super(),dt(this,t,mt,pt,i,{})}}function gt(t){const n=t-1;return n*n*n+1}function $t(t,{delay:n=0,duration:e=400,easing:o=gt,x:r=0,y:c=0,opacity:i=0}={}){const l=getComputedStyle(t),s=+l.opacity,u="none"===l.transform?"":l.transform,a=s*(1-i);return{delay:n,duration:e,easing:o,css:(t,n)=>`\n\t\t\ttransform: ${u} translate(${(1-t)*r}px, ${(1-t)*c}px);\n\t\t\topacity: ${s-a*n}`}}function vt(t,{delay:n=0,duration:e=400,easing:o=gt}={}){const r=getComputedStyle(t),c=+r.opacity,i=parseFloat(r.height),l=parseFloat(r.paddingTop),s=parseFloat(r.paddingBottom),u=parseFloat(r.marginTop),a=parseFloat(r.marginBottom),d=parseFloat(r.borderTopWidth),f=parseFloat(r.borderBottomWidth);return{delay:n,duration:e,easing:o,css:t=>`overflow: hidden;opacity: ${Math.min(20*t,1)*c};height: ${t*i}px;padding-top: ${t*l}px;padding-bottom: ${t*s}px;margin-top: ${t*u}px;margin-bottom: ${t*a}px;border-top-width: ${t*d}px;border-bottom-width: ${t*f}px;`}}function bt(n){let e,o;return{c(){e=x("svg"),o=x("polyline"),E(o,"points","9 18 15 12 9 6"),E(e,"xmlns","http://www.w3.org/2000/svg"),E(e,"width","24"),E(e,"height","24"),E(e,"viewBox","0 0 24 24"),E(e,"fill","none"),E(e,"stroke","currentColor"),E(e,"stroke-width","2"),E(e,"stroke-linecap","round"),E(e,"stroke-linejoin","round"),E(e,"class","feather feather-chevron-right")},m(t,n){$(t,e,n),m(e,o)},p:t,i:t,o:t,d(t){t&&v(e)}}}class wt extends ft{constructor(t){super(),dt(this,t,null,bt,i,{})}}function xt(n){let e,o;return{c(){e=x("svg"),o=x("polyline"),E(o,"points","6 9 12 15 18 9"),E(e,"xmlns","http://www.w3.org/2000/svg"),E(e,"width","24"),E(e,"height","24"),E(e,"viewBox","0 0 24 24"),E(e,"fill","none"),E(e,"stroke","currentColor"),E(e,"stroke-width","2"),E(e,"stroke-linecap","round"),E(e,"stroke-linejoin","round"),E(e,"class","feather feather-chevron-down")},m(t,n){$(t,e,n),m(e,o)},p:t,i:t,o:t,d(t){t&&v(e)}}}class kt extends ft{constructor(t){super(),dt(this,t,null,xt,i,{})}}function yt(n){let e,o;return{c(){e=x("svg"),o=x("rect"),E(o,"x","5"),E(o,"y","8"),E(o,"width","8"),E(o,"height","8"),E(o,"fill","grey"),E(e,"xmlns","http://www.w3.org/2000/svg"),E(e,"width","24"),E(e,"height","24"),E(e,"viewBox","0 0 24 24"),E(e,"fill","none"),E(e,"stroke","currentColor"),E(e,"stroke-width","2"),E(e,"stroke-linecap","round"),E(e,"stroke-linejoin","round"),E(e,"class","feather feather-chevron-right")},m(t,n){$(t,e,n),m(e,o)},p:t,i:t,o:t,d(t){t&&v(e)}}}class _t extends ft{constructor(t){super(),dt(this,t,null,yt,i,{})}}function Nt(t){const n=n=>{!t||t.contains(n.target)||n.defaultPrevented||t.dispatchEvent(new CustomEvent("click_outside",t))};return document.addEventListener("click",n,!0),document.addEventListener("contextmenu",n,!0),{destroy(){document.removeEventListener("click",n,!0),document.removeEventListener("contextmenu",n,!0)}}}const Et=[];const Ct=function(n,e=t){let o;const r=new Set;function c(t){if(i(n,t)&&(n=t,o)){const t=!Et.length;for(const t of r)t[1](),Et.push(t,n);if(t){for(let t=0;t<Et.length;t+=2)Et[t][0](Et[t+1]);Et.length=0}}}return{set:c,update:function(t){c(t(n))},subscribe:function(i,l=t){const s=[i,l];return r.add(s),1===r.size&&(o=e(c)||t),i(n),()=>{r.delete(s),0===r.size&&(o(),o=null)}}}}("");function Mt(t,n,e){const o=t.slice();return o[9]=n[e],o}function Tt(t,n,e){const o=t.slice();return o[12]=n[e],o}function Ft(n){let e,o;return e=new _t({}),{c(){lt(e.$$.fragment)},m(t,n){st(e,t,n),o=!0},p:t,i(t){o||(nt(e.$$.fragment,t),o=!0)},o(t){et(e.$$.fragment,t),o=!1},d(t){ut(e,t)}}}function Lt(t){let n,e,o,r;const c=[jt,St],i=[];function l(t,n){return t[0].expanded?1:0}return n=l(t),e=i[n]=c[n](t),{c(){e.c(),o=_()},m(t,e){i[n].m(t,e),$(t,o,e),r=!0},p(t,r){let s=n;n=l(t),n!==s&&(Z(),et(i[s],1,1,(()=>{i[s]=null})),tt(),e=i[n],e||(e=i[n]=c[n](t),e.c()),nt(e,1),e.m(o.parentNode,o))},i(t){r||(nt(e),r=!0)},o(t){et(e),r=!1},d(t){i[n].d(t),t&&v(o)}}}function St(t){let n,e;return n=new kt({}),{c(){lt(n.$$.fragment)},m(t,o){st(n,t,o),e=!0},i(t){e||(nt(n.$$.fragment,t),e=!0)},o(t){et(n.$$.fragment,t),e=!1},d(t){ut(n,t)}}}function jt(t){let n,e;return n=new wt({}),{c(){lt(n.$$.fragment)},m(t,o){st(n,t,o),e=!0},i(t){e||(nt(n.$$.fragment,t),e=!0)},o(t){et(n.$$.fragment,t),e=!1},d(t){ut(n,t)}}}function It(e){let o,r,i,l,s=e[0].MenuItems,a=[];for(let t=0;t<s.length;t+=1)a[t]=Pt(Tt(e,s,t));return{c(){o=w("div"),r=w("div"),i=w("div");for(let t=0;t<a.length;t+=1)a[t].c();E(i,"class","dropdown-content"),E(r,"class","dropdown-menu"),E(r,"id","dropdown-menu"),E(r,"role","menu"),E(o,"class","dropdown is-active"),M(o,"position","fixed"),M(o,"left",e[2]+"px"),M(o,"top",e[3]+"px")},m(t,n){$(t,o,n),m(o,r),m(r,i);for(let t=0;t<a.length;t+=1)a[t].m(i,null)},p(t,n){if(1&n){let e;for(s=t[0].MenuItems,e=0;e<s.length;e+=1){const o=Tt(t,s,e);a[e]?a[e].p(o,n):(a[e]=Pt(o),a[e].c(),a[e].m(i,null))}for(;e<a.length;e+=1)a[e].d(1);a.length=s.length}4&n&&M(o,"left",t[2]+"px"),8&n&&M(o,"top",t[3]+"px")},i(e){l||q((()=>{l=function(e,o,r){let i,l,s=o(e,r),a=!1,d=0;function f(){i&&I(e,i)}function m(){const{delay:o=0,duration:r=300,easing:c=n,tick:m=t,css:h}=s||ot;h&&(i=j(e,0,1,r,o,c,h,d++)),m(0,1);const g=u()+o,$=g+r;l&&l.abort(),a=!0,q((()=>Q(e,!0,"start"))),l=p((t=>{if(a){if(t>=$)return m(1,0),Q(e,!0,"end"),f(),a=!1;if(t>=g){const n=c((t-g)/r);m(n,1-n)}}return a}))}let h=!1;return{start(){h||(h=!0,I(e),c(s)?(s=s(),K().then(m)):m())},invalidate(){h=!1},end(){a&&(f(),a=!1)}}}(o,$t,{y:100,duration:500}),l.start()}))},o:t,d(t){t&&v(o),b(a,t)}}}function Pt(t){let n,e,o,r=t[12]+"";return{c(){n=w("a"),e=k(r),o=y(),E(n,"href","#"),E(n,"class","dropdown-item")},m(t,r){$(t,n,r),m(n,e),m(n,o)},p(t,n){1&n&&r!==(r=t[12]+"")&&C(e,r)},d(t){t&&v(n)}}}function At(t){let n,e,o=t[0].children,r=[];for(let n=0;n<o.length;n+=1)r[n]=Bt(Mt(t,o,n));const c=t=>et(r[t],1,1,(()=>{r[t]=null}));return{c(){for(let t=0;t<r.length;t+=1)r[t].c();n=_()},m(t,o){for(let n=0;n<r.length;n+=1)r[n].m(t,o);$(t,n,o),e=!0},p(t,e){if(3&e){let i;for(o=t[0].children,i=0;i<o.length;i+=1){const c=Mt(t,o,i);r[i]?(r[i].p(c,e),nt(r[i],1)):(r[i]=Bt(c),r[i].c(),nt(r[i],1),r[i].m(n.parentNode,n))}for(Z(),i=o.length;i<r.length;i+=1)c(i);tt()}},i(t){if(!e){for(let t=0;t<o.length;t+=1)nt(r[t]);e=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)et(r[t]);e=!1},d(t){b(r,t),t&&v(n)}}}function Bt(t){let n,e;return n=new Ot({props:{node:t[9],level:t[1]+1}}),{c(){lt(n.$$.fragment)},m(t,o){st(n,t,o),e=!0},p(t,e){const o={};1&e&&(o.node=t[9]),2&e&&(o.level=t[1]+1),n.$set(o)},i(t){e||(nt(n.$$.fragment,t),e=!0)},o(t){et(n.$$.fragment,t),e=!1},d(t){ut(n,t)}}}function zt(n){let e,o,i,l,s,u,a,d,f,p,h,g,b=n[0].Name+"";const x=[Lt,Ft],F=[];function L(t,n){return t[0].children?0:1}o=L(n),i=F[o]=x[o](n);let S=n[4]&&n[0].MenuItems&&It(n),j=n[0].expanded&&n[0].children&&At(n);return{c(){e=w("li"),i.c(),l=y(),s=k(b),a=y(),S&&S.c(),d=y(),j&&j.c(),f=_(),M(e,"padding-left",1*n[1]+"rem"),E(e,"class","svelte-6gvmi1"),T(e,"selected",n[5]==n[0].Name)},m(r,i){var u,v;$(r,e,i),F[o].m(e,null),m(e,l),m(e,s),$(r,a,i),S&&S.m(r,i),$(r,d,i),j&&j.m(r,i),$(r,f,i),p=!0,h||(g=[(v=Nt.call(null,e),v&&c(v.destroy)?v.destroy:t),N(e,"click",n[6]),N(e,"contextmenu",(u=n[7],function(t){return t.preventDefault(),u.call(this,t)})),N(e,"click_outside",n[8])],h=!0)},p(t,[n]){let r=o;o=L(t),o===r?F[o].p(t,n):(Z(),et(F[r],1,1,(()=>{F[r]=null})),tt(),i=F[o],i?i.p(t,n):(i=F[o]=x[o](t),i.c()),nt(i,1),i.m(e,l)),(!p||1&n)&&b!==(b=t[0].Name+"")&&C(s,b),(!p||2&n)&&M(e,"padding-left",1*t[1]+"rem"),33&n&&T(e,"selected",t[5]==t[0].Name),t[4]&&t[0].MenuItems?S?(S.p(t,n),17&n&&nt(S,1)):(S=It(t),S.c(),nt(S,1),S.m(d.parentNode,d)):S&&(S.d(1),S=null),t[0].expanded&&t[0].children?j?(j.p(t,n),1&n&&nt(j,1)):(j=At(t),j.c(),nt(j,1),j.m(f.parentNode,f)):j&&(Z(),et(j,1,1,(()=>{j=null})),tt())},i(t){p||(nt(i),q((()=>{u||(u=rt(e,vt,{},!0)),u.run(1)})),nt(S),nt(j),p=!0)},o(t){et(i),u||(u=rt(e,vt,{},!1)),u.run(0),et(j),p=!1},d(t){t&&v(e),F[o].d(),t&&u&&u.end(),t&&v(a),S&&S.d(t),t&&v(d),j&&j.d(t),t&&v(f),h=!1,r(g)}}}function Rt(t,n,e){let o;l(t,Ct,(t=>e(5,o=t)));let r,c,i,{node:s}=n,{level:u=2}=n;return t.$$set=t=>{"node"in t&&e(0,s=t.node),"level"in t&&e(1,u=t.level)},[s,u,r,c,i,o,function(t){Ct.update((t=>s.Name)),e(0,s.expanded=!s.expanded,s),e(4,i=!1)},function(t){Ct.update((t=>s.Name)),e(4,i=!i),e(2,r=t.clientX),e(3,c=t.clientY)},function(t){e(4,i=!1)}]}class Ot extends ft{constructor(t){super(),dt(this,t,Rt,zt,i,{node:0,level:1})}}function Dt(n){return{c:t,m:t,p:t,i:t,o:t,d:t}}function Ht(n){let e,o,r;return o=new Ot({props:{node:n[8]}}),{c(){e=w("ul"),lt(o.$$.fragment),E(e,"class","svelte-10itb23")},m(t,n){$(t,e,n),st(o,e,null),r=!0},p:t,i(t){r||(nt(o.$$.fragment,t),r=!0)},o(t){et(o.$$.fragment,t),r=!1},d(t){t&&v(e),ut(o)}}}function qt(n){let e;return{c(){e=w("p"),e.textContent="Nodes waiting ..."},m(t,n){$(t,e,n)},p:t,i:t,o:t,d(t){t&&v(e)}}}function Wt(n){return{c:t,m:t,p:t,i:t,o:t,d:t}}function Xt(n){let e,o,r;return o=new Ot({props:{node:n[7]}}),{c(){e=w("ul"),lt(o.$$.fragment),E(e,"class","svelte-10itb23")},m(t,n){$(t,e,n),st(o,e,null),r=!0},p:t,i(t){r||(nt(o.$$.fragment,t),r=!0)},o(t){et(o.$$.fragment,t),r=!1},d(t){t&&v(e),ut(o)}}}function Yt(n){let e;return{c(){e=w("p"),e.textContent="Profiles waiting ..."},m(t,n){$(t,e,n)},p:t,i:t,o:t,d(t){t&&v(e)}}}function Gt(t){let n,e,o,r,c,i={ctx:t,current:null,token:null,hasCatch:!1,pending:qt,then:Ht,catch:Dt,value:8,blocks:[,,,]};ct(t[0],i);let l={ctx:t,current:null,token:null,hasCatch:!1,pending:Yt,then:Xt,catch:Wt,value:7,blocks:[,,,]};return ct(t[1],l),{c(){n=w("div"),e=w("br"),o=y(),i.block.c(),r=y(),l.block.c(),E(n,"class","sidebar svelte-10itb23")},m(t,s){$(t,n,s),m(n,e),m(n,o),i.block.m(n,i.anchor=null),i.mount=()=>n,i.anchor=r,m(n,r),l.block.m(n,l.anchor=null),l.mount=()=>n,l.anchor=null,c=!0},p(n,[e]){it(i,t=n,e),it(l,t,e)},i(t){c||(nt(i.block),nt(l.block),c=!0)},o(t){for(let t=0;t<3;t+=1){et(i.blocks[t])}for(let t=0;t<3;t+=1){et(l.blocks[t])}c=!1},d(t){t&&v(n),i.block.d(),i.token=null,i=null,l.block.d(),l.token=null,l=null}}}function Jt(t){let n=["New Node ...","Add Folder ..."],e=["New Profile ...","Add Folder ..."],o=["Clone Profile ..."];return[async function(){const t=await fetch("/api/nodes"),e={Name:"Traffic Nodes",expanded:!1,MenuItems:["Error!"],children:[]};if(t.ok){const o=await t.json();e.MenuItems=n;for(const t of o)e.children.push({Name:t.Name,MenuItems:[]})}return e}(),async function(){const t=await fetch("/api/profiles"),n={Name:"Traffic Profiles",expanded:!1,MenuItems:["Error!"],children:[]};if(t.ok){const r=await t.json();n.MenuItems=e;for(const t of r)n.children.push({Name:t.Name,MenuItems:o})}return n}()]}class Kt extends ft{constructor(t){super(),dt(this,t,Jt,Gt,i,{})}}function Qt(n){let e,o,r,c,i,l,s,u;return e=new ht({}),i=new Kt({}),{c(){lt(e.$$.fragment),o=y(),r=w("div"),c=w("div"),lt(i.$$.fragment),l=y(),s=w("div"),s.innerHTML='<div class="container">sidebar-contnet</div>',E(c,"class","column is-one-fifth"),E(s,"class","column"),E(r,"class","columns")},m(t,n){st(e,t,n),$(t,o,n),$(t,r,n),m(r,c),st(i,c,null),m(r,l),m(r,s),u=!0},p:t,i(t){u||(nt(e.$$.fragment,t),nt(i.$$.fragment,t),u=!0)},o(t){et(e.$$.fragment,t),et(i.$$.fragment,t),u=!1},d(t){ut(e,t),t&&v(o),t&&v(r),ut(i)}}}return new class extends ft{constructor(t){super(),dt(this,t,null,Qt,i,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
