import"./modulepreload-polyfill-ec808ebb.js";import{a as e}from"./drag-8e9bb6f4.js";import"./pg-event-f7ab3da9.js";new e({categories:[{name:"antiguo",element:document.querySelector(".left"),items:[{name:"Reloj Antiguo",element:document.getElementById("reloj-antiguo")},{name:"Carro de madera",element:document.getElementById("carro-madera")},{name:"Mano",element:document.getElementById("mano")}]},{name:"moderno",element:document.querySelector(".right"),items:[{name:"Auto moderno",element:document.getElementById("auto-moderno")},{name:"Smartphone",element:document.getElementById("smartphone")},{name:"Timbre",element:document.getElementById("timbre")}]}],expectations:[["Reloj Antiguo","Smartphone"],["Carro de madera","Auto moderno"],["Mano","Timbre"]],connector:{container:document.getElementById("connectorsContainer"),color:"#8383fd",radius:10},verifyButton:document.querySelector(".validate-button"),messages:{onSuccess:"Todas las conexiones son correctas.",onFail:"Revisa las conexiones. Algunas son incorrectas."}});
