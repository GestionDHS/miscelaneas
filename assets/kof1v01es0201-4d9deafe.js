import"./modulepreload-polyfill-ec808ebb.js";import{D as e}from"./drag-2d9cc0e2.js";import"./pg-event-f7ab3da9.js";new e({base:{element:document.querySelector(".base-options"),items:[{element:document.getElementById("telefono"),expectedCategory:"contiene-computadoras"},{element:document.getElementById("avion"),expectedCategory:"no-contiene-computadoras"},{element:document.getElementById("ventilador"),expectedCategory:"no-contiene-computadoras"},{element:document.getElementById("lampara"),expectedCategory:"no-contiene-computadoras"},{element:document.getElementById("atornilladora"),expectedCategory:"no-contiene-computadoras"},{element:document.getElementById("microondas"),expectedCategory:"no-contiene-computadoras"},{element:document.getElementById("dron"),expectedCategory:"no-contiene-computadoras"},{element:document.getElementById("consola"),expectedCategory:"contiene-computadoras"}]},categories:[{name:"contiene-computadoras",element:document.getElementById("contiene-computadoras")},{name:"no-contiene-computadoras",element:document.getElementById("no-contiene-computadoras")}],verifyButton:document.querySelector("validate-button"),messages:{onFail:"Recuerda que algunos objetos NO necesitan de una computadora para funcionar.",onSuccess:"Todos los objetos fueron clasificados correctamente."}});
