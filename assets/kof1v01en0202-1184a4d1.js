import"./modulepreload-polyfill-ec808ebb.js";import{D as e}from"./drag-8e9bb6f4.js";import"./pg-event-f7ab3da9.js";new e({base:{element:document.querySelector(".options"),items:[{element:document.getElementById("item-1"),expectedCategory:"Output"},{element:document.getElementById("item-2"),expectedCategory:"Input"},{element:document.getElementById("item-3"),expectedCategory:"Processing"},{element:document.getElementById("item-4"),expectedCategory:"Input"},{element:document.getElementById("item-5"),expectedCategory:"Output"},{element:document.getElementById("item-6"),expectedCategory:"Processing"}]},categories:[{name:"Input",element:document.getElementById("drop-box-1")},{name:"Processing",element:document.getElementById("drop-box-2")},{name:"Output",element:document.getElementById("drop-box-3")}],verifyButton:document.getElementById("executeButton"),messages:{onSuccess:"All items are correctly placed.",onFail:"Some items are incorrectly placed."}});
