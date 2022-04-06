const h=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(e){if(e.ep)return;e.ep=!0;const n=a(e);fetch(e.href,n)}};h();customElements.define("f-nav",class extends HTMLElement{static get observedAttributes(){return[]}constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=String.raw`
    <style>
        *{
          box-sizing:border-box;
          margin:0;
          padding:0;
        }
        a{
          color: currentColor;
          transition: all 75ms ease-out;
          position: relative;
        }
        a[href^="/"]{
          text-decoration: none;
        }
        a::after{
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0%;
          background-color: hsl(var(--col-primary));
          z-index: -1;
          transition: height 125ms;
        }
        a[aria-current="page"]::after{
          height: 100%; 
          
        }
        a:hover{
          font-variation-settings: "wght" 500;
        }
        #f-nav {
        position: relative;
        z-index: 10;
        height: 2rem;
        padding-bottom: 1rem;
        border-radius: 0.25rem;
        max-width: max-content;
        box-sizing: content-box;
        background-color: hsl(var(--col-wht) / 0.95);
        box-shadow: 0 0 8px 0 hsl(var(--col-blk) / 0.2);
    }

        #f-nav > button {
        color: currentColor;
        cursor: pointer;
        height: 100%;
        background: transparent;
        border-style: none;
        padding: 0.5rem;
        box-sizing: content-box;
        opacity: 1;
        transform: translateX(0%);
        transition-property: opacity, transform;
        transition-duration: 50ms, 75ms;
        transition-delay: 50ms, 75ms;
        transition-timing-function: ease-out, var(--transition-timing-mud);
    }
        #f-nav[data-state="open"] > button {
        transition-duration: 0ms;
        transition-delay: 0ms;
        opacity: 0;
        transform: translateX(-5%);
    }
        #f-nav > ol {
        list-style:none;
        position: absolute;
        /* top */
        bottom: 0;
        /* left */
        right: 0;
        pointer-events: none;
        opacity: 0;
        /* -10% */
        transform: translateY(10%);

        background-color: hsl(var(--col-wht));

        box-shadow: 0 0 24px 0 hsl(var(--col-blk) / 0.1);

        border-right-style: solid;
        border-bottom-style: solid;
        border-color: hsl(var(--col-blk) / 0.2);
        border-width: 0px;
        border-radius: 0.25rem;

        transition-property: opacity, transform, border-width;
        transition-duration: 50ms, 175ms, 75ms;
        transition-timing-function: ease-out, var(--transition-timing-mud), var(--transition-timing-mud);
        transition-delay: 0ms, 0ms, 75ms;

        padding: 0.5rem;
    }
        #f-nav.desktop > ol{
        top: 0;
        bottom: unset;
        right: unset;
        left: 0;
        transform: translateY(-10%);
        }
        #f-nav[data-state="open"] > ol {
        pointer-events: all;
        opacity: 1;
        transform: translateY(0%);

        border-width: 2px;
    }
        #overlay {
        transition: 100ms;
    }
        #f-nav[data-state="open"] + #overlay {
        opacity: 0.9;
        pointer-events: fill;
    }
        #overlay {
        pointer-events: none;
        z-index: 2;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background-color: hsl(var(--col-wht));
    }

    </style>
    <nav
        id="f-nav"
        data-state="close">
        <button tabindex="0">
            <svg
            width="100%"
            height="100%"
            viewBox="0 0 20 80"
            preserveAspectRatio="xMidYMin"
            fill="currentColor"
            >
            <circle cx="10" cy="10" r="8" />
            <circle cx="10" cy="40" r="8" />
            <circle cx="10" cy="70" r="8" />
            </svg>
        </button>

        <ol class="list-none bg-white rounded-sm shadow-black/10 shadow-lg">
            <li>
            <a tabindex="-1" href="/">home</a>
            </li>
            <li>
            <a tabindex="-1" href="/work/">work</a>
            </li>
            <li>
            <a tabindex="-1" href="/about/">about</a>
            </li>
        </ol>
    </nav>
    <div id="overlay"></div>
    `;const t=this.shadowRoot.querySelector("nav"),a=this.shadowRoot.querySelector("button"),o=[...this.shadowRoot.querySelectorAll("ol li")];a.addEventListener("click",i=>{t.dataset.state=="close"?t.dataset.state="open":t.dataset.state="close",i.clientX==0&&i.clientY==0&&t.querySelector("[aria-current]").focus(),o.forEach(l=>l.firstElementChild.removeAttribute("tabindex")),t.querySelector(":scope > ol").onclick=l=>{const{target:c}=l;c.tagName==="A"&&(console.log(c),l.preventDefault(),this.dispatchEvent(new CustomEvent("f-nav:routing",{detail:{pathname:l.target.pathname,href:l.target.href},bubbles:!0,composed:!0})),t.querySelectorAll(":scope > ol a").forEach(m=>{m.removeAttribute("aria-current")}),c.setAttribute("aria-current","page"))}}),this.shadowRoot.getElementById("overlay").onclick=i=>{t.dataset.state="close"},this.style.alignSelf="end",this.style.gridRow="1",this.style.gridColumn="2";const e="(min-width: 768px)";window.matchMedia(e).matches&&(t.classList.add("desktop"),this.style.gridColumn="1",this.style.alignSelf="start"),window.matchMedia(e).addEventListener("change",i=>{i.matches?(t.classList.add("desktop"),this.style.gridColumn="1",this.style.alignSelf="start"):(t.classList.remove("desktop"),this.style.gridColumn="2",this.style.alignSelf="end")});const n=i=>{i.find(s=>s.firstElementChild.pathname==location.pathname).firstElementChild.setAttribute("aria-current","page")};n(o),document.addEventListener("f-nav:done",i=>{i.detail.outside&&(o.forEach(s=>s.firstElementChild.removeAttribute("aria-current")),n(o)),setTimeout(()=>{t.dataset.state="close",t.querySelector("button").focus(),o.forEach(s=>s.firstElementChild.setAttribute("tabindex","-1"))},150)})}connectedCallback(){}diconnectedCallback(){}attributeChangedCallback(t,a,o){console.log(o)}});var p=(...r)=>r.reduce((a,o)=>o.length>a.length?o:a).map((a,o)=>r.map(e=>e[Math.min(o,e.length-1)]));const f=async r=>{const t=await fetch(r),a=new DOMParser().parseFromString(await t.text(),"text/html");return{page:a,title:a.querySelector("title").innerHTML}},g=r=>Array.from(r.querySelectorAll("[router\\:page]")).map(t=>({elm:t,val:t.getAttribute("router:page")})),b=async r=>{const[t,a]=[r,document].map(g),o=p(t,a);for(const[e,n]of o)if(e.val!==n.val)return[e,n];return[null,null]},d=async(r,t=!1,a=0,o=!0)=>{const{pathname:e,href:n}=r,i=await f(n),[s,l]=await b(i.page);o&&(history.replaceState({scrollTop:l.elm.scrollTop},null,location.pathname),history.pushState(null,null,e)),l.elm.parentElement.append(s.elm),setTimeout(()=>{s.elm.scroll({top:a})},1),l.elm.classList.add("slideOut"),s.elm.classList.add("slideIn");const c=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--page-transition-duration").replace("ms",""));setTimeout(()=>{l.elm.remove(),s.elm.classList.remove("slideIn"),document.documentElement.classList.remove("time-out")},c),document.documentElement.setAttribute("router:current-page",e),document.querySelector("title").innerHTML=i.title,document.dispatchEvent(new CustomEvent("f-nav:done",{detail:{outside:t},bubbles:!0}))},u=async r=>{let{target:t,detail:a}=r;a.pathname?d(r.detail):t.tagName==="A"&&t.origin===location.origin&&t.pathname!==location.pathname&&(r.preventDefault(),d(t,!0))};document.addEventListener("f-nav:routing",u);document.addEventListener("click",u);onpopstate=r=>{var t;d(location,!0,((t=r.state)==null?void 0:t.scrollTop)||0,!1)};
