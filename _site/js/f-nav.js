customElements.define(
  "f-nav",
  class customElement extends HTMLElement {
    static get observedAttributes() {
      return [];
    }
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = String.raw`
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
    `;

      const nav = this.shadowRoot.querySelector("nav");
      const navBtn = this.shadowRoot.querySelector("button");
      const lis = [...this.shadowRoot.querySelectorAll("ol li")];

      // f-nav click handler
      navBtn.addEventListener("click", e => {
        const state = nav.dataset.state;
        state == "close"
          ? (nav.dataset.state = "open")
          : (nav.dataset.state = "close");
        if (e.clientX == 0 && e.clientY == 0) {
          nav.querySelector("[aria-current]").focus();
        }

        lis.forEach(li => li.firstElementChild.removeAttribute("tabindex"));

        nav.querySelector(":scope > ol").onclick = e => {
          const { target } = e;
          if (target.tagName === "A") {
            console.log(target);
            e.preventDefault();
            this.dispatchEvent(
              new CustomEvent("f-nav:routing", {
                detail: {
                  pathname: e.target.pathname,
                  href: e.target.href,
                },
                bubbles: true,
                composed: true,
              })
            );
            nav.querySelectorAll(":scope > ol a").forEach(a => {
              a.removeAttribute("aria-current");
            });
            target.setAttribute("aria-current", "page");
          }
        };
      });
      this.shadowRoot.getElementById("overlay").onclick = e => {
        nav.dataset.state = "close";
      };

      // mobile - desktop layout
      this.style.alignSelf = "end";
      this.style.gridRow = "1";
      this.style.gridColumn = "2";
      const mqs = "(min-width: 768px)";
      if (window.matchMedia(mqs).matches) {
        nav.classList.add("desktop");
        this.style.gridColumn = "1";
        this.style.alignSelf = "start";
      }
      window.matchMedia(mqs).addEventListener("change", e => {
        if (e.matches) {
          nav.classList.add("desktop");
          this.style.gridColumn = "1";
          this.style.alignSelf = "start";
        } else {
          nav.classList.remove("desktop");
          this.style.gridColumn = "2";
          this.style.alignSelf = "end";
        }
      });

      // aria current = page
      const current = lis => {
        lis
          .find(li => li.firstElementChild.pathname == location.pathname)
          .firstElementChild.setAttribute("aria-current", "page");
      };
      current(lis);

      // close f-nav when router fires event
      document.addEventListener("f-nav:done", e => {
        if (e.detail.outside) {
          lis.forEach(li =>
            li.firstElementChild.removeAttribute("aria-current")
          );
          current(lis);
        }
        setTimeout(() => {
          nav.dataset.state = "close";
          nav.querySelector("button").focus();
          lis.forEach(li =>
            li.firstElementChild.setAttribute("tabindex", "-1")
          );
        }, 150);
      });
    }
    connectedCallback() {}
    diconnectedCallback() {}
    attributeChangedCallback(name, oldValue, newValue) {
      console.log(newValue);
    }
  }
);
