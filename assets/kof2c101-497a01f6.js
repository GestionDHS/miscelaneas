import"./modulepreload-polyfill-ec808ebb.js";import{D as b}from"./drag-5c13b114.js";import{P as y}from"./pg-event-f7ab3da9.js";const u=[];function x(e,o){const t={operationName:"AddBlockProgress",query:`
          mutation AddBlockProgress($courseId: String!, $topicId: String!, $blocks: [ProgressBlockInput!]!) {
            addBlockProgress(course_id:$courseId, topic_id:$topicId, blocks:$blocks) {
              blockType
              completed
            }
          }
        `,variables:{courseId:"1ffb7b19-e853-4c39-a38a-de1b00c84280",topicId:"9a954bf7-2d1d-4c89-a10a-2920a07e479e",blocks:[{block_id:"4698a76a-ad1d-47b3-922a-491749246ae0",block_type:"exercise",exercise_iframe_payload:{exercise_status:e,last_sending:JSON.stringify(o)}}]}};return fetch("/graphql",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(n=>n.json()).then(console.log).catch(console.error)}function c(e,o){const t=document.getElementById(e),n=t.cloneNode(!0);t.replaceWith(n);const s=i=>{i.preventDefault(),i.stopImmediatePropagation(),o(n,i)};return n.addEventListener("click",s,!0),n.addEventListener("click",s,!1),n}const m=[{id:"draggable-forma",label:"Forma"},{id:"draggable-posicion",label:"Posición"},{id:"draggable-medida",label:"Medida"},{id:"draggable-direccion",label:"Dirección"},{id:"draggable-color",label:"Color"}],r=[{description:"Estás intentando cambiar tu nombre de usuario en un videojuego…",interface:`
      <div style="padding: 20px;">
        <button style="
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          width: 140px; height: 40px; font-size: 30px;
          background:#ddd; color:#000 !important; border:none; border-radius:5px;
        ">guardar</button>
      </div>
    `,expected:["draggable-forma","draggable-medida"],hint:"Pensá cuando vas a una página web…"},{description:"Querés registrarte en un juego en línea…",interface:`
      <div style="padding:0">
        <div style="display:inline-block;position:relative;width:430px;height:214px;background:black;clip-path:polygon(55% 0%,100% 50%,50% 100%,0% 50%);transform:rotate(23deg);">
          <input placeholder="Escribe tu nombre" type="text" style="
            clip-path:inherit;border:2px solid #ccc;padding:5px;position:absolute;
            top:2px;left:2px;width:426px;height:210px;">
        </div>
      </div>
    `,expected:["draggable-medida","draggable-direccion","draggable-forma"],hint:"Pensá en cuando te estás registrando…"},{description:"Estás tratando de leer un artículo en Wikipedia…",interface:`
      <div style="padding:20px;">
        <p style="width:300px;font-size:8px;transform:rotate(-5deg);line-height:1.2;margin:0 auto;">
          ¡Estamos viendo los principios del diseño con Digital House Schools!…
        </p>
      </div>
    `,expected:["draggable-direccion","draggable-medida"],hint:"Si tuvieras que leer un libro entero…"},{description:"Estás tratando de leer un libro en Internet…",interface:`
      <div style="padding:20px;">
        <div style="position:relative;width:200px;height:50px;margin:0 auto;">
          <button style="padding:10px !important;margin:5px;">Siguiente</button>
          <button style="padding:10px !important;margin:5px;">Atrás</button>
        </div>
      </div>
    `,expected:["draggable-posicion"],hint:"Si tenés que seguir hacia adelante en una página…"},{description:"Querés arrancar a jugar un juego y el único botón…",interface:`
      <div style="padding:20px;">
        <button style="background:#fffca9;color:white;padding:10px 20px;border:none;border-radius:5px;font-size:16px;">Ejecutar</button>
      </div>
    `,expected:["draggable-color"],hint:"Si tenés que apretar este botón…"}];let l=0;function h(){const e=document.getElementById("bank-container");e.innerHTML="",m.forEach(o=>{const t=document.createElement("div");t.className="draggable",t.id=o.id,t.textContent=o.label,e.appendChild(t)})}function f(){const e=document.getElementById("drop-zone"),o=document.getElementById("bank-container");e.querySelectorAll(".draggable").forEach(t=>{t.querySelectorAll(".icon").forEach(n=>n.remove()),o.appendChild(t)}),document.getElementById("verification-message").textContent="",document.getElementById("verify-button").disabled=!1}function p(e){l=e,document.getElementById("example-description").innerHTML=r[e].description,document.getElementById("example-interface").innerHTML=r[e].interface,document.getElementById("drop-zone").innerHTML="<h2>Errores Detectados</h2>",h(),new b({base:{element:document.getElementById("bank-container"),items:m.map(o=>({element:document.getElementById(o.id),expectedCategory:r[e].expected.includes(o.id)?"drop":"bank"}))},categories:[{name:"drop",element:document.getElementById("drop-zone")}],verifyButton:document.getElementById("verify-button"),messages:{onSuccess:"¡Felicidades! Todas las respuestas son correctas.",onFail:"Algunas respuestas no son correctas, revisá el error y presioná 'Reiniciar'.",onReset:"Actividad reiniciada."}})}function E(){const e={base:[],categories:[{name:"drop",items:Array.from(document.getElementById("drop-zone").querySelectorAll(".draggable")).map(n=>n.id)}]};u.push(e);const o=new Set(r[l].expected),t=Array.from(document.getElementById("drop-zone").querySelectorAll(".draggable"));t.forEach((n,s)=>setTimeout(()=>{const i=o.has(n.id),a=document.createElement("span");a.className=i?"icon correct":"icon incorrect",a.textContent=i?"✓":"✗",n.appendChild(a)},s*500)),setTimeout(()=>{const n=document.getElementById("verification-message"),s=new Set(t.map(d=>d.id)),i=t.filter(d=>o.has(d.id)).length;let a="";if(t.length?s.size===o.size&&i===o.size?a="¡Felicidades! Todas las respuestas son correctas.":i?i===t.length?a="Todas las respuestas depositadas son correctas, pero faltan una o más.":a="Hay varias respuestas correctas, pero una o más no lo están.":a="¡Reintentá! Si necesitás ayuda, presioná 'Pista'.":a="No se han depositado respuestas.",n.textContent=a,a.startsWith("¡Felicidades!")&&l===r.length-1&&x("SUCCESS",u),a.startsWith("¡Felicidades!")){n.appendChild(document.createElement("br"));const d=document.createElement("button");l<r.length-1?(d.id="next-example",d.textContent="Siguiente ejemplo",n.appendChild(d),c("next-example",()=>{const g=l+1;localStorage.setItem("currentExampleIndex",g),p(g)})):(d.id="play-again",d.textContent="Jugar de nuevo",n.appendChild(d),c("play-again",()=>{localStorage.setItem("currentExampleIndex",0),p(0)}))}},t.length*500+300)}window.onload=()=>{new y().getValues();const e=parseInt(localStorage.getItem("currentExampleIndex")||"0",10);p(e>=0&&e<r.length?e:0),c("verify-button",()=>E()),c("reset-button",()=>{localStorage.setItem("currentExampleIndex",0),f(),p(0)}),document.getElementById("hint-button").addEventListener("click",()=>document.getElementById("hint-modal").style.display="flex"),document.getElementById("hint-ok-button").addEventListener("click",()=>document.getElementById("hint-modal").style.display="none"),document.getElementById("instructions-button").addEventListener("click",()=>document.getElementById("instructions-modal").style.display="flex"),document.getElementById("instructions-ok-button").addEventListener("click",()=>document.getElementById("instructions-modal").style.display="none"),document.getElementById("instructions-modal").style.display="flex"};
