import"./modulepreload-polyfill-ec808ebb.js";import{D as a}from"./drag-e8c344da.js";import{P as c}from"./pg-event-f7ab3da9.js";const d=new c;window.onload=()=>{d.getValues();const o=new a({base:{element:document.querySelector(".base-options"),items:[{element:document.getElementById("telefono"),expectedCategory:"contiene-computadoras"},{element:document.getElementById("avion"),expectedCategory:"no-contiene-computadoras"},{element:document.getElementById("ventilador"),expectedCategory:"no-contiene-computadoras"},{element:document.getElementById("lampara"),expectedCategory:"no-contiene-computadoras"},{element:document.getElementById("atornilladora"),expectedCategory:"no-contiene-computadoras"},{element:document.getElementById("microondas"),expectedCategory:"no-contiene-computadoras"},{element:document.getElementById("dron"),expectedCategory:"no-contiene-computadoras"},{element:document.getElementById("consola"),expectedCategory:"contiene-computadoras"}]},categories:[{name:"contiene-computadoras",element:document.getElementById("contiene-computadoras")},{name:"no-contiene-computadoras",element:document.getElementById("no-contiene-computadoras")}],verifyButton:document.querySelector(".button"),messages:{onFail:"There are objects that don't need a computer to work.",onSuccess:"All objects are placed in the correct category."}});window.addEventListener("message",function(n){var t;const e=JSON.parse((t=n.data)==null?void 0:t.data);e!=null&&e.base?o.loadState(e):console.log("No saved state found. Starting with default configuration.")})};
