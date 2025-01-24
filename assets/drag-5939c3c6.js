import{P as a}from"./pg-event-f7ab3da9.js";class p{constructor(t){if(!t.base||!t.base.element||!t.categories||!t.verifyButton)throw new Error("Invalid configuration: base, categories, and verifyButton are required.");this.base=t.base,this.categories=t.categories,this.onChange=t.onChange,this.messages=t.messages,t.verifyButton.addEventListener("click",()=>this.validateItems()),document.querySelector(".reset-button").addEventListener("click",()=>this.resetActivity()),this.initDraggableItems(),this.initCategories(),this.initBase(),this.pgEvent=new a}initDraggableItems(){this.base.items.forEach(t=>{if(!t.element){console.error("Invalid item element",t);return}t.element.setAttribute("draggable",!0),t.element.classList.add("item"),t.element.addEventListener("dragstart",e=>{e.dataTransfer.setData("text/plain",t.element.id)})})}initCategories(){this.categories.forEach(t=>{if(!t.element){console.error("Invalid category element",t);return}t.element.addEventListener("dragover",e=>{e.preventDefault()}),t.element.addEventListener("drop",e=>{e.preventDefault();const n=e.dataTransfer.getData("text/plain");if(!n){console.error("No data received on drop event");return}const o=document.querySelector(`#${n}`);o?(t.element.appendChild(o),this.updateState()):console.warn("Dragged element not found.")})})}initBase(){this.base.element.addEventListener("dragover",t=>{t.preventDefault()}),this.base.element.addEventListener("drop",t=>{t.preventDefault();const e=t.dataTransfer.getData("text/plain");if(!e){console.error("No data received on drop event");return}const n=document.querySelector(`#${e}`);n?(this.base.element.appendChild(n),this.updateState()):console.warn("Dragged element not found.")})}validateItems(){const t=new a;t.getValues();const e=this.getState();t.postToPg({event:this.areItemsCorrect()?"SUCCESS":"FAILURE",message:this.areItemsCorrect()?this.messages.onSuccess:this.messages.onFail,reasons:[],state:JSON.stringify(e)})}resetActivity(){const t={base:this.base.items.map(n=>n.element.id),categories:this.categories.map(n=>({name:n.name,items:[]}))};this.categories.forEach(n=>{Array.from(n.element.querySelectorAll(".item")).forEach(o=>{this.base.element.appendChild(o)})}),this.loadState(t);const e=new a;e.getValues(),e.postToPg({event:"FAILURE",message:"Activity reset to the initial state.",reasons:[],state:JSON.stringify(t)})}areItemsCorrect(){let t=!0;return this.categories.forEach(e=>{Array.from(e.element.querySelectorAll(".item")).forEach(n=>{const o=this.base.items.find(s=>s.element===n);(!o||o.expectedCategory!==e.name)&&(t=!1)})}),Array.from(this.base.element.querySelectorAll(".item")).forEach(e=>{const n=this.base.items.find(o=>o.element===e);(!n||n.expectedCategory!=="base")&&(t=!1)}),t}updateState(){const t=Array.from(this.base.element.querySelectorAll(".item")),e=this.categories.map(n=>({name:n.name,items:Array.from(n.element.querySelectorAll(".item"))}));this.onChange&&this.onChange(t,e)}getState(){const t=Array.from(this.base.element.querySelectorAll(".item")),e=this.categories.map(n=>({name:n.name,items:Array.from(n.element.querySelectorAll(".item")).map(o=>o.id)}));return{base:t.map(n=>n.id),categories:e}}loadState(t){this.categories.forEach(e=>{Array.from(e.element.querySelectorAll(".item")).forEach(n=>{this.base.element.appendChild(n)})}),this.categories.forEach(e=>{const n=e.element.querySelector(".drop-zone-title");e.element.innerHTML="",n&&e.element.appendChild(n)}),t.base.forEach(e=>{const n=document.getElementById(e);n?this.base.element.appendChild(n):console.warn(`Item with ID "${e}" not found in the DOM.`)}),t.categories.forEach(e=>{const n=this.categories.find(o=>o.name===e.name);n?e.items.forEach(o=>{const s=document.getElementById(o);s?n.element.appendChild(s):console.warn(`Item with ID "${o}" not found for category "${e.name}".`)}):console.warn(`Category "${e.name}" not found.`)})}}class f{constructor(t){this.categories=t.categories,this.expectations=t.expectations,this.connectorColor=t.connector.color||"#000000",this.connectorWidth=t.connector.width||2,this.connectorRadius=t.connector.radius||5,this.onChange=t.onChange,this.connectorsContainer=t.connector.container,this.messages=t.messages,this.connectorsContainer.innerHTML="",this.relations={},this.connectorIdCounter=0,this.initItems(),this.setupDraggableItems(),this.pgEvent=new a,this.pgEvent.getValues(),this.pgEvent.data.state&&this.loadState(JSON.parse(this.pgEvent.data.state)),this.verifyButton=t.verifyButton,this.verifyButton.addEventListener("click",()=>this.validateConnections())}initItems(){this.categories.forEach(t=>{t.items.forEach(e=>{e.element&&e.element.addEventListener("mousedown",n=>this.onItemDragStart(n,e))})})}setupDraggableItems(){this.connector=null,this.startItem=null,document.addEventListener("mousemove",t=>{if(this.connector){const e=t.clientX,n=t.clientY;this.updateConnectorPosition(e,n)}}),document.addEventListener("mouseup",()=>{this.connector&&this.finalizeConnector()})}onItemDragStart(t,e){t.preventDefault(),this.startItem=e;const n=t.clientX,o=t.clientY;this.connector=document.createElement("div");const s=`connector-${this.connectorIdCounter++}`;this.connector.id=s,this.connector.style.position="absolute",this.connector.style.left=`${n}px`,this.connector.style.top=`${o}px`,this.connector.style.width=`${this.connectorWidth}px`,this.connector.style.height=`${this.connectorWidth}px`,this.connector.style.backgroundColor=this.connectorColor,this.connector.style.borderRadius=`${this.connectorRadius}px`,this.connector.style.cursor="pointer",this.connector.style.pointerEvents="auto",this.connector.dataset.relationKey=`${this.startItem.name}-${s}`,this.connector.startX=n,this.connector.startY=o,this.connector.addEventListener("click",i=>{i.stopPropagation(),this.removeConnectorAndRelation(s)}),this.connectorsContainer.appendChild(this.connector)}updateConnectorPosition(t,e){if(!this.connector)return;const n=this.connector.startX,o=this.connector.startY,s=t-n,i=e-o,r=Math.atan2(i,s)*180/Math.PI;this.connector.style.width=`${Math.abs(s)}px`,this.connector.style.height="4px",this.connector.style.transform=`rotate(${r}deg)`,this.connector.style.transformOrigin="0% 50%",this.connector.style.left=`${n}px`,this.connector.style.top=`${o}px`}finalizeConnector(){const t=document.elementFromPoint(event.clientX,event.clientY);if(!t||!this.isItemInCategories(t)||t===this.startItem.element){this.connectorsContainer.removeChild(this.connector),this.connector=null,this.startItem=null;return}const e=this.startItem.name,n=t.dataset.name;Object.keys(this.relations).forEach(o=>{const s=this.relations[o];(s.start.name===e||s.target.name===e||s.start.name===n||s.target.name===n)&&this.removeConnectorAndRelation(s.connector.id)}),this.relations[this.connectorIdCounter]={connector:this.connector,start:this.startItem,target:this.categories.flatMap(o=>o.items).find(o=>o.element===t)},Object.keys(this.relations).forEach(o=>{const s=this.relations[o];s.target.name===n&&o!==this.connectorIdCounter.toString()&&this.removeConnectorAndRelation(s.connector.id)}),this.onChange&&this.onChange(this.relations),this.connector=null,this.startItem=null}removeConnectorAndRelation(t){const e=document.getElementById(t);if(e){e.parentElement.removeChild(e);for(const n in this.relations){const o=this.relations[n];if(o.connector&&o.connector.id===t){delete this.relations[n];break}}this.onChange&&this.onChange(this.relations)}}isItemInCategories(t){return this.categories.some(e=>e.items.some(n=>n.element===t))}validateConnections(){if(Object.keys(this.relations).length===0){console.log("Some connections are incorrect.");return}let t=!0;const e=new Set;for(const o in this.relations){const s=this.relations[o];if(!this.expectations.find(r=>{const c=r[0]===s.start.name&&r[1]===s.target.name||r[0]===s.target.name&&r[1]===s.start.name;return c&&e.add(r),c})){t=!1;break}}e.size!==this.expectations.length&&(t=!1),new a().postToPg({event:t?"SUCCESS":"FAILURE",message:t?this.messages.onSuccess:this.messages.onFail,reasons:[],state:JSON.stringify(this.getState())})}getState(){return Object.keys(this.relations).map(t=>{const e=this.relations[t];return{start:e.start.name,target:e.target.name,connectorId:e.connector.id}})}loadState(t){t.forEach(e=>{const n=this.categories.flatMap(s=>s.items).find(s=>s.name===e.start),o=this.categories.flatMap(s=>s.items).find(s=>s.name===e.target);if(n&&o){const s=document.createElement("div");s.id=e.connectorId,s.style.position="absolute",s.style.backgroundColor=this.connectorColor,s.style.width=`${this.connectorWidth}px`,s.style.height=`${this.connectorWidth}px`,s.style.borderRadius=`${this.connectorRadius}px`,s.style.cursor="pointer",s.style.pointerEvents="auto",this.connectorsContainer.appendChild(s),this.relations[e.connectorId]={connector:s,start:n,target:o},this.updateConnectorPositionForLoadedState(s,n.element,o.element)}})}updateConnectorPositionForLoadedState(t,e,n){const o=e.getBoundingClientRect(),s=n.getBoundingClientRect(),i=o.left+o.width/2,r=o.top+o.height/2,c=s.left+s.width/2,m=s.top+s.height/2,l=c-i,d=m-r,g=Math.atan2(d,l)*180/Math.PI;t.style.width=`${Math.abs(l)}px`,t.style.height="4px",t.style.transform=`rotate(${g}deg)`,t.style.transformOrigin="0% 50%",t.style.left=`${i}px`,t.style.top=`${r}px`}}export{p as D,f as a};
