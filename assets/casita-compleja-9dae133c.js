import{P as y}from"./pg-event-320a5ad1.js";class S{constructor(e,t){this.expectedWord=e,this.availableChars=t}binaryStringToChar(e){const t=parseInt(e,2);return this.availableChars[t]}getBitsNeeded(){return Math.ceil(Math.log2(this.availableChars.length))}binaryStringToWord(e){const t=this.getBitsNeeded(),r=[];for(let s=0;s<e.length;s+=t){const n=e.slice(s,s+t);r.push(this.binaryStringToChar(n))}return r.join("")}wordToBinaryString(e){const t=this.getBitsNeeded(),r=[];for(const s of e){const n=s,i=this.availableChars.indexOf(n).toString(2).padStart(t,"0");r.push(i)}return r.join("")}getBinaryStringFromSelects(e){const t=e.querySelectorAll(".binary-select__select"),r=this.getBitsNeeded(),s=[];for(let n=0;n<t.length;n+=r){const a=[];for(let i=0;i<r;i++)a.push(t[n+i].value);s.push(a)}return s}updatePreviews(e,t){const r=e.querySelectorAll(".binary-select__char-preview"),s=t.flat().join(""),n=this.binaryStringToWord(s);r.forEach((a,i)=>{a.textContent=n[i]})}generateBinarySelects(e,t){this.expectedWord.split("").map(s=>{const n=document.createElement("div");n.classList.add("binary-select__char");const a=this.getBitsNeeded();for(let l=0;l<a;l++){const o=document.createElement("select");o.classList.add("binary-select__select"),["0","1"].forEach(h=>{const g=document.createElement("option");g.value=h,g.text=h,o.appendChild(g)}),o.addEventListener("change",h=>{this.updatePreviews(e,this.getBinaryStringFromSelects(e)),t(this.getBinaryStringFromSelects(e))}),n.appendChild(o)}e.appendChild(n);const i=document.createElement("p");i.classList.add("binary-select__char-preview"),n.appendChild(i),this.updatePreviews(e,this.getBinaryStringFromSelects(e))})}setBinarySelects(e,t){const r=e.querySelectorAll(".binary-select__select");for(let s=0;s<t.length;s++){const n=t[s];for(let a=0;a<n.length;a++)r[s*n.length+a].value=n[a]}}}const u=c=>{var n;const e=["?","A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];c=c.toUpperCase();const t=document.getElementById("casita"),r=new y,s=new S(c,e);if(s.generateBinarySelects(t,a=>{const i=t.querySelectorAll(".binary-select__char-preview"),l=a.flat().join(""),o=s.binaryStringToWord(l);o!==c?r.postToPg({event:"FAILURE",message:"¡Oh no! Esa no es la palabra correcta. Inténtalo de nuevo.",reasons:[],state:JSON.stringify({selectors:l})}):r.postToPg({event:"SUCCESS",message:"Bien hecho! Has encontrado la letra correcta.",reasons:[],state:JSON.stringify({selectors:l})}),i.forEach((d,h)=>{const p=o[h]===c[h]?"✅":"❌";d.textContent.includes(p)||(d.textContent=d.textContent.replace(/[✅❌]/g,"")+p)})}),r.getValues(),(n=r.data.state)!=null&&n.selectors){const a=r.data.state.selectors.match(/.{1,2}/g);s.setBinarySelects(t,a)}};export{u as C};
