import"./modulepreload-polyfill-ec808ebb.js";import{F as l}from"./casita-compleja-9702ecc0.js";import"./pg-event-f7ab3da9.js";window.onload=()=>{l({housesAmount:4,container:document.getElementById("casita"),preview:document.getElementById("preview"),onHouseChange:c=>{c.forEach(e=>{console.log(e);const r=document.querySelectorAll(".char-preview")[e.index-1],o=e.htmlElement;let n=o.querySelector("div.index-container"),i=o.querySelector("div.index-container > b");n||(n=document.createElement("div"),n.classList.add("index-container"),o.appendChild(n)),i||(i=document.createElement("b"),n.appendChild(i)),i.innerHTML=e.index;let t=r.querySelector("div.index-container"),d=r.querySelector("div.index-container > b");t||(t=document.createElement("div"),t.classList.add("index-container"),r.appendChild(t)),d||(d=document.createElement("b"),t.appendChild(d)),d.innerHTML=e.index})}})};
