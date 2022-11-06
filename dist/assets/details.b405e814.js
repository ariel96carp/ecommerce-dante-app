import{s as I}from"./script.83c20f37.js";import{c as E}from"./createProductCard.fe2af935.js";window.addEventListener("DOMContentLoaded",()=>{const p=JSON.parse(sessionStorage.getItem("products")),l=new URLSearchParams(window.location.search).get("id"),m=p.products.find(e=>e.id===l),f=({products:e})=>{const a=document.getElementById("products"),t=document.createDocumentFragment();e.slice(0,4).forEach(r=>{const c=E(r);t.appendChild(c)}),a.appendChild(t)},S=(e,a)=>{const t=document.createElement("div");t.className="grid lg:grid-cols-[repeat(2,1fr)] content-center gap-12 h-full sm:w-[80%] mx-auto";const r=document.getElementById("product-details").content,c=r.querySelector(".image");c.src=e.url;const s=r.querySelectorAll(".alt-image");s[0].src=e.url;const d=r.querySelector(".description");d.textContent=e.description;const o=r.querySelector(".name");o.textContent=e.name;const i=r.querySelector(".price");i.textContent=`$${e.price.toFixed(2)}`;const n=r.cloneNode(!0);t.appendChild(n),a.appendChild(t)},g=document.getElementById("details-section");m?S(m,g):g.insertAdjacentHTML("beforeend",`${l!==""?`<p>The article "${l}" was not found.</p>`:"<p>The searched article was not found.</p>"}`),f(p);const y=document.getElementsByClassName("alt-image");for(let e of y)e.addEventListener("click",a=>{const t=document.getElementById("main-image");t.src=a.target.src});const u=document.getElementById("details-form");u&&u.addEventListener("submit",e=>{const a=JSON.parse(sessionStorage.getItem("products"));e.preventDefault();const t=e.target,r=parseInt(t.size.value),c=parseInt(t.quantity.value),s=Object.defineProperties(m,{size:{value:r,writable:!0,enumerable:!0},quantity:{value:c,writable:!0,enumerable:!0}}),d=Object.entries(a).map(([o,i])=>{switch(!0){case o==="sales":return i.find(n=>n.id===s.id&&n.size===s.size)?[o,i.map(n=>n.id!==s.id||n.id===s.id&&n.size!==s.size?n:{...n,quantity:n.quantity+s.quantity})]:[o,i.concat(s)];default:return[o,i]}});I(Object.fromEntries(d)),sessionStorage.setItem("products",JSON.stringify(Object.fromEntries(d))),u.reset()})});
