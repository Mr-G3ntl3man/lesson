(()=>{"use strict";(e=>{const t=document.querySelector("#timer-hours"),o=document.querySelector("#timer-minutes"),a=document.querySelector("#timer-seconds");t.textContent="00",o.textContent="00",a.textContent="00";const r=e=>e<10?`0${e}`:e,n=()=>{const e=new Date("10 july 2021").getTime(),t=(new Date).getTime(),o=(e-t)/1e3,a=Math.floor(o%60),r=Math.floor(o/60%60);return{timeRemaining:o,hours:Math.floor(o/60/60),minutes:r,seconds:a,dateStop:e,dateNow:t}},s=setInterval((()=>n().timeRemaining<0?clearInterval(s):(t.textContent=r(n().hours),o.textContent=r(n().minutes),void(a.textContent=r(n().seconds)))),0)})(),(()=>{const e=document.querySelector("main"),t=document.querySelector("menu");let o=-10;const a=()=>{o++;const r=requestAnimationFrame(a),n=t.getBoundingClientRect(),s=e.getBoundingClientRect();s.right<768?cancelAnimationFrame(r):n.right<s.right?(t.style.transform=`translateX(${10*o}%)`,t.classList.add("active")):cancelAnimationFrame(r)},r=()=>{o--;const e=requestAnimationFrame(r),a=t.getBoundingClientRect();a.left>-a.width?(t.style.transform=`translateX(${10*o}%)`,t.classList.remove("active")):cancelAnimationFrame(e)};document.body.addEventListener("click",(e=>{e.target.closest(".menu")&&a(),e.target.closest("menu")||e.target.closest(".menu")||r(),e.target.classList.contains("close-btn")&&r(),e.target.closest("menu ul>li>a")&&r()}))})(),(()=>{const e=document.querySelector(".popup"),t=document.querySelectorAll(".popup-btn"),o=document.querySelector(".popup-content");let a=0,r=-20;const n=()=>{a+=.1;const t=requestAnimationFrame(n);a<=1?e.style.opacity=a:cancelAnimationFrame(t)},s=()=>{a-=.1;const t=requestAnimationFrame(s);a>=0?e.style.opacity=a:cancelAnimationFrame(t)},c=()=>{r++;const e=requestAnimationFrame(c);0>=r?o.style.transform=`translate(-50px,${5*r}%)`:cancelAnimationFrame(e)},l=()=>{r--;const e=requestAnimationFrame(l);-30<=r?o.style.transform=`translate(-50px,${5*r}%)`:cancelAnimationFrame(e)};t.forEach((t=>t.addEventListener("click",(()=>{e.style.display="block",e.style.opacity="1",o.style.transform="translate(-50px,0)",document.body.clientWidth>768&&(e.style.opacity="0",o.style.transform="translate(-50px,-150%)",n(),setTimeout((()=>c()),200))})))),e.addEventListener("click",(t=>{const o=t.target.closest(".popup-content");t.target.classList.contains("popup-close")&&(document.body.clientWidth<768?e.style.display="none":(l(),setTimeout((()=>s()),400),setTimeout((()=>e.style.display="none"),500))),o||(document.body.clientWidth<768?e.style.display="none":(l(),setTimeout((()=>s()),400),setTimeout((()=>e.style.display="none"),500)))})),document.addEventListener("submit",(()=>{document.body.clientWidth<768?e.style.display="none":(l(),setTimeout((()=>s()),400),setTimeout((()=>e.style.display="none"),500))}))})(),(()=>{const e=document.querySelector("a");e.addEventListener("click",(t=>((e,t)=>{t.preventDefault();const o=e.href.split("#")[1];document.querySelector(`#${o}`).scrollIntoView({behavior:"smooth",block:"start"})})(e,t)))})(),(()=>{const e=document.querySelector(".service-header"),t=e.querySelectorAll(".service-header-tab"),o=document.querySelectorAll(".service-tab");e.addEventListener("click",(e=>{const a=e.target.closest(".service-header-tab");a&&t.forEach(((e,r)=>{e===a&&(e=>{o.forEach(((a,r)=>{e===r?(t[r].classList.add("active"),o[r].classList.remove("d-none")):(t[r].classList.remove("active"),o[r].classList.add("d-none"))}))})(r)}))}))})(),(()=>{const e=document.querySelectorAll(".portfolio-item"),t=document.querySelector(".portfolio-content"),o=document.querySelector(".portfolio-dots");let a,r=0;e.length&&o.insertAdjacentHTML("beforeend","<li class='dot dot-active'></li>");for(let t=0;t<e.length-1;t++)o.insertAdjacentHTML("beforeend","<li class='dot'></li>");const n=document.querySelectorAll(".dot"),s=(e,t,o)=>e[t].classList.remove(o),c=(e,t,o)=>e[t].classList.add(o),l=()=>{s(e,r,"portfolio-item-active"),s(n,r,"dot-active"),r++,r>=e.length&&(r=0),c(e,r,"portfolio-item-active"),c(n,r,"dot-active")},i=(e=3e3)=>a=setInterval(l,e);t.addEventListener("click",(t=>{t.preventDefault(),t.target.matches(".portfolio-btn, .dot")&&(s(e,r,"portfolio-item-active"),s(n,r,"dot-active"),t.target.matches("#arrow-right")&&r++,t.target.matches("#arrow-left")&&r--,t.target.matches(".dot")&&n.forEach(((e,o)=>{e===t.target&&(r=o)})),r>=e.length&&(r=0),r<0&&(r=e.length-1),c(e,r,"portfolio-item-active"),c(n,r,"dot-active"))})),t.addEventListener("mouseover",(e=>{(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&clearInterval(a)})),t.addEventListener("mouseout",(e=>{(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&i()})),i()})(),document.querySelectorAll(".command .container .row img").forEach((e=>{e.dataset.prevImg=e.src,e.addEventListener("mouseenter",(e=>{e.target.src=e.target.dataset.img})),e.addEventListener("mouseleave",(e=>{e.target.src=e.target.dataset.prevImg}))})),(()=>{const e=document.querySelectorAll('[type="email"]'),t=document.querySelector("#form1 button"),o=document.querySelector("#form2 button"),a=document.querySelector("#form3 button");e.forEach((e=>e.setAttribute("required",""))),document.querySelector("#form2-message").setAttribute("required","");const r=(e,t)=>{e.style.cssText="\tborder: 1px solid green;box-shadow: 0 0 10px green;",t&&t.removeAttribute("disabled")},n=(e,t)=>{e.style.cssText="border: 1px solid red;box-shadow: 0 0 10px red;\t",t&&t.setAttribute("disabled","disabled")},s=(e,t,o)=>{e.closest(t)&&(e.matches('[type="tel"]')&&(e.value=e.value.replace(/[^\d+]/g,""),e.reportValidity(),/^\+\d{11}$/.test(e.value)||/^[78]\d{10}$/.test(e.value)?(r(e,o),e.setCustomValidity("")):(n(e,o),e.setCustomValidity("Ошибка! Поле должно начинаться с (+,7,8) и быть не длинее 11 или 12 символов"))),e.matches('[name="user_message"]')&&(e.value=e.value.replace(/[^а-яё0-9 ,.!?]/gi,""),""===e.value.trim()?n(e,o):/^[а-яё0-9,.!? ]+$/i.test(e.value)?r(e,o):n(e,o)),e.matches('[type="email"]')&&(e.value=e.value.replace(/[^a-z0-9@!_~'-.*]/gi,""),e.reportValidity(),/^\w+@\w+\.\w{2,3}$/.test(e.value)?(r(e,o),e.setCustomValidity("")):(n(e,o),e.setCustomValidity("Формат почты qwe@qwe.qwe"))),e.matches('[name="user_name"]')&&(e.value=e.value.replace(/[^а-яё ]/gi,""),/^[а-яё ]{2,}[а-яё ]?/i.test(e.value)?r(e,o):n(e,o)))};document.addEventListener("input",(e=>{const c=e.target;c.matches("input.calc-item")&&(c.value=c.value.replace(/[^\d]/g,""),/^\d+$/.test(c.value)?r(c):n(c)),s(c,"#form1",t),s(c,"#form2",o),s(c,"#form3",a)})),document.querySelectorAll("input").forEach((e=>{e.addEventListener("blur",(e=>{const t=e.target;if(t.matches('[type="email"]')&&(t.value=t.value.replace(/-+/g,"-")),t.matches('[name="user_message"]')&&(t.value=t.value.replace(/^\s+|\s+$/g,""),t.value=t.value.replace(/\s+/g," ")),t.matches('[name="user_name"]')){let e="";t.value.split(" ").forEach((t=>e+=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase()+" ")),t.value=e,t.value=t.value.replace(/^\s+|\s+$/g,""),t.value=t.value.replace(/\s+/g," ")}}))}))})(),((e=100)=>{const t=document.querySelector(".calc-block"),o=document.querySelector(".calc-type"),a=document.querySelector(".calc-square"),r=document.querySelector(".calc-day"),n=document.querySelector("#total"),s=document.querySelector(".calc-count");t.addEventListener("input",(t=>{(t.target.matches("select")||t.target.matches("input"))&&(()=>{const t=o.value,c=a.value;let l=0,i=1,u=1,m=0;r.value&&r.value<5?u*=2:r.value&&r.value<10&&(u*=1.5),s.value>1&&(i+=(s.value-1)/10),t&&c&&(l=e*t*c*i);const d=()=>{const e=Math.ceil((l+1)/2e3);m+=50*e;const t=requestAnimationFrame(d);m<=l?n.textContent=Math.ceil(m):cancelAnimationFrame(t)};d()})()}))})(),(()=>{const e=document.createElement("div"),t={};document.addEventListener("submit",(o=>(o=>{o.preventDefault(),document.querySelectorAll("form input").forEach((e=>e.style.cssText="box-shadow: transparent; border: none;")),e.insertAdjacentHTML("afterbegin",'<img src="images/preloader.gif" >'),new FormData(o.target).forEach(((e,o)=>t[o]=e)),(e=>fetch("./server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}))(t).then((t=>{if(200!==t.status)throw new Error("Status not 200");e.textContent="Запрос отправлен",setTimeout((()=>e.textContent=""),2e3)})).catch((()=>{e.textContent="Ошибка",setTimeout((()=>e.textContent=""),2e3)})),e.style.color="#fff",o.target.appendChild(e),o.target.querySelectorAll("input").forEach((e=>e.value=""))})(o)))})()})();