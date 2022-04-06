const nav = document.querySelector("#site-nav");
const navBtn = nav.querySelector(":scope > button");
navBtn.addEventListener("click", e => {
  const state = nav.dataset.state;
  state == "close"
    ? (nav.dataset.state = "open")
    : (nav.dataset.state = "close");
  nav.querySelector(":scope > ul").onclick = e => {
    const { target } = e;
    if (target.tagName === "A" && target.origin === location.origin) {
      nav.querySelectorAll(":scope > ul a").forEach(a => {
        a.removeAttribute("aria-current");
      });
      target.setAttribute("aria-current", "page");
    }
  };
});

document.getElementById("overlay").onclick = e => {
  nav.dataset.state = "close";
};
