(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const i="id";class c{constructor(){this.data={type:"blockly-type",id:""}}getValues(){const r=document.location.href.split("?");if(r.length<2)return;const s=r[1].split("&");for(const e of s){if(e.length<2)continue;const t=e.split("=");if(!(t.length<2))switch(t[0]){case i:this.data[i]=t[1];break}}}postToPg(o){o.type=this.data.type,o.id=this.data.id,console.log("postToPg",o),window.top.postMessage(o,"*")}}export{c as P};
