class p{constructor(){this.data={type:"house-type",event:0,message:"",id:"",state:""}}getValues(){const s=document.location.href.split("?");if(s.length<2)return;const n=s[1].split("&");for(const a of n){if(a.length<2)continue;const e=a.split("=");if(!(e.length<2))switch(e[0]){case ID:this.data[ID]=e[1];break}}}onSuccessEvent(t){this.data.event="SUCCESS",this.data.message=t,window.top.postMessage(this.data,"*")}onFailEvent(t){this.data.event="FAILURE",this.data.message=t,window.top.postMessage(this.data,"*")}sendState(t){this.data.event="STATE",this.data.state=t,window.top.postMessage(this.data,"*")}}class u{constructor(t,s){this.expectedWord=t,this.availableChars=s}binaryStringToChar(t){const s=parseInt(t,2);return this.availableChars[s]}getBitsNeeded(){return Math.ceil(Math.log2(this.availableChars.length))}binaryStringToWord(t){const s=this.getBitsNeeded(),n=[];for(let a=0;a<t.length;a+=s){const e=t.slice(a,a+s);n.push(this.binaryStringToChar(e))}return n.join("")}wordToBinaryString(t){const s=this.getBitsNeeded(),n=[];for(const a of t){const e=a,r=this.availableChars.indexOf(e).toString(2).padStart(s,"0");n.push(r)}return n.join("")}getBinaryStringFromSelects(t){const s=t.querySelectorAll(".binary-select__select"),n=this.getBitsNeeded(),a=[];for(let e=0;e<s.length;e+=n){const i=[];for(let r=0;r<n;r++)i.push(s[e+r].value);a.push(i)}return a}updatePreviews(t,s){const n=t.querySelectorAll(".binary-select__char-preview"),a=s.flat().join(""),e=this.binaryStringToWord(a);n.forEach((i,r)=>{i.textContent=e[r]})}generateBinarySelects(t,s){this.expectedWord.split("").map(a=>{const e=document.createElement("div");e.classList.add("binary-select__char");const i=this.getBitsNeeded();for(let h=0;h<i;h++){const o=document.createElement("select");o.classList.add("binary-select__select"),["0","1"].forEach(d=>{const l=document.createElement("option");l.value=d,l.text=d,o.appendChild(l)}),o.addEventListener("change",d=>{this.updatePreviews(t,this.getBinaryStringFromSelects(t)),s(this.getBinaryStringFromSelects(t))}),e.appendChild(o)}t.appendChild(e);const r=document.createElement("p");r.classList.add("binary-select__char-preview"),e.appendChild(r),this.updatePreviews(t,this.getBinaryStringFromSelects(t))})}setBinarySelects(t,s){const n=t.querySelectorAll(".binary-select__select");for(let a=0;a<s.length;a++){const e=s[a];for(let i=0;i<e.length;i++)n[a*e.length+i].value=e[i]}}}const S=c=>{const t=["?","A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];c=c.toUpperCase();const s=document.getElementById("casita"),n=new p,a=new u(c,t);if(a.generateBinarySelects(s,e=>{const i=s.querySelectorAll(".binary-select__char-preview"),r=e.flat().join(""),h=a.binaryStringToWord(r);h!==c?n.onFailEvent("¡Oh no! Esa no es la palabra correcta. Inténtalo de nuevo."):n.onSuccessEvent("¡Bien hecho! Has encontrado la palabra correcta."),i.forEach((o,g)=>{const l=h[g]===c[g]?"✅":"❌";o.textContent.includes(l)||(o.textContent=o.textContent.replace(/[✅❌]/g,"")+l)}),n.sendState(r)}),n.getValues(),n.data.state){const e=n.data.state.match(/.{1,2}/g);a.setBinarySelects(s,e)}};export{S as C};
