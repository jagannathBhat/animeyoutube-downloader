(this.webpackJsonpundefined=this.webpackJsonpundefined||[]).push([[0],{58:function(e,t,n){e.exports=n(86)},82:function(e,t,n){},86:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(9),i=n.n(o),c=n(14),l=n(22),s=n.n(l),u=n(28),m=(n(64),n(29)),p=n.n(m),d=n(121),f=n(122),g=n(123),h=n(119),b=n(124),v=n(125),w=n(120),E=n(53),k=(n(82),n(116)),j=n(35),x=Object(k.a)((function(e){return{buttonProgress:{color:j.a[500],position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12},form:{alignItems:"start",display:"flex",flexDirection:"column",marginTop:e.spacing(4),"& > *":{marginTop:e.spacing(2)}},img:{maxWidth:240,width:"84%"},linkList:{display:"flex",flexDirection:"column",marginTop:e.spacing(3)},main:{margin:e.spacing(3)+"px 0px"},root:{borderRadius:"0px",flex:1,padding:e.spacing(2)},rootBig:{padding:e.spacing(6)},title:{fontWeight:"lighter",textAlign:"left"},wrapper:{display:"inline-block",position:"relative"}}})),O=function(e){var t=e.no,n=e.url,o=x(),i=function(){var e=Object(u.a)(s.a.mark((function e(){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return S(!0),e.prev=1,e.next=4,p.a.post("/link",{no:t,url:n},{headers:{"Content-Type":"application/json"}});case 4:a=e.sent,k(a.data.links),S(!1),e.next=14;break;case 9:e.prev=9,e.t0=e.catch(1),console.error(e.t0),f(!0),S(!1);case 14:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(){return e.apply(this,arguments)}}(),l=Object(a.useState)(!1),m=Object(c.a)(l,2),d=m[0],f=m[1],g=Object(a.useState)(null),b=Object(c.a)(g,2),E=b[0],k=b[1],j=Object(a.useState)(!1),O=Object(c.a)(j,2),y=O[0],S=O[1];return r.a.createElement("div",null,r.a.createElement(h.a,{component:"p",variant:"h6"},"Episode ",t),E?E.map((function(e,t){return r.a.createElement("a",{href:e,key:t,target:"_blank",rel:"noopener noreferrer"},r.a.createElement(v.a,null,"Link ",t+1))})):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:o.wrapper},r.a.createElement(v.a,{disabled:y,onClick:i},"Get Links"),y&&r.a.createElement(w.a,{size:24,className:o.buttonProgress})),d&&r.a.createElement(h.a,{component:"span"},"Couldn't fetch links")))},y=Object(E.a)({palette:{type:"dark"}}),S=function(){var e=x(),t=function(){var e=Object(u.a)(s.a.mark((function e(t){var n,a,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),R(!0),""!==i){e.next=6;break}return W({name:"No URL entered",links:[]}),R(!1),e.abrupt("return");case 6:return e.prev=6,j(n=[]),W(null),e.next=12,p.a.post("/info",{url:i},{headers:{"Content-Type":"application/json"}});case 12:for(a=e.sent,W(a.data),r=a.data.start;r<=a.data.end;r++)n.push(r);j(n),e.next=22;break;case 18:e.prev=18,e.t0=e.catch(6),console.error(e.t0),W({name:"Generation Failed",episodes:[]});case 22:R(!1);case 23:case"end":return e.stop()}}),e,null,[[6,18]])})));return function(t){return e.apply(this,arguments)}}(),n=Object(a.useState)(""),o=Object(c.a)(n,2),i=o[0],l=o[1],m=Object(a.useState)([]),E=Object(c.a)(m,2),k=E[0],j=E[1],S=Object(a.useState)(null),N=Object(c.a)(S,2),L=N[0],W=N[1],T=Object(a.useState)(!1),C=Object(c.a)(T,2),A=C[0],R=C[1];return r.a.createElement(d.a,{theme:y},r.a.createElement(f.a,{elevation:0,className:Object(g.a)("(min-width:720px)")?e.root+" "+e.rootBig:e.root},r.a.createElement("header",null,r.a.createElement(h.a,{variant:Object(g.a)("(min-width:720px)")?"h1":"h3",className:e.title},"AnimeYoutube",r.a.createElement("br",null),"Downloader"),r.a.createElement("form",{className:e.form,onSubmit:t},r.a.createElement(b.a,{autoFocus:!0,helperText:"Enter URL of anime from animeyoutube.com or www1.kiss-anime.website",onChange:function(e){var t=e.target.value;return l(t)},placeholder:"URL of anime",value:i}),r.a.createElement("div",{className:e.wrapper},r.a.createElement(v.a,{disabled:A,type:"submit"},"Start"),A&&r.a.createElement(w.a,{size:24,className:e.buttonProgress})))),r.a.createElement("main",{className:e.main},null!==L?r.a.createElement(r.a.Fragment,null,L.img?r.a.createElement("img",{alt:L.name+" poster",className:e.img,src:L.img}):r.a.createElement(r.a.Fragment,null),r.a.createElement(h.a,{component:"h2",variant:"h4"},L.name)):r.a.createElement(r.a.Fragment,null),r.a.createElement("div",{className:e.linkList},k.map((function(e){return r.a.createElement(O,{key:e,no:e,url:i})}))))))},N=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function L(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(S,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");N?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):L(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):L(t,e)}))}}()}},[[58,1,2]]]);
//# sourceMappingURL=main.9f6b3d20.chunk.js.map