import"./modulepreload-polyfill-ec808ebb.js";import{D as e}from"./drag-2d9cc0e2.js";import"./pg-event-f7ab3da9.js";new e({base:{element:document.querySelector(".base-options"),items:[{element:document.getElementById("microfono"),expectedCategory:"entrada-informacion"},{element:document.getElementById("camara"),expectedCategory:"entrada-informacion"},{element:document.getElementById("monitor"),expectedCategory:"salida-informacion"},{element:document.getElementById("parlante"),expectedCategory:"salida-informacion"},{element:document.getElementById("teclado"),expectedCategory:"entrada-informacion"},{element:document.getElementById("mouse"),expectedCategory:"entrada-informacion"}]},categories:[{name:"entrada-informacion",element:document.getElementById("entrada-informacion")},{name:"salida-informacion",element:document.getElementById("salida-informacion")}],verifyButton:document.querySelector(".button"),messages:{onFail:"Algunos objetos no están en la categoría que corresponde.",onSuccess:"Todos los objetos están en la categoría que corresponde."}});
