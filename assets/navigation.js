const navigation = document.querySelector('[aria-label="Main navigation"]');
const toggle = navigation.querySelector(".nav-toggle");
const links = navigation.querySelector("#navigation-links");
const mobile = window.matchMedia("(max-width: 768px)");

function setExpanded(expanded) {
  toggle.setAttribute("aria-expanded", String(expanded));
  toggle.setAttribute("aria-label", expanded ? "Close navigation" : "Open navigation");
  links.hidden = mobile.matches && !expanded;
}

function syncViewport() {
  toggle.hidden = !mobile.matches;
  setExpanded(false);
}

toggle.addEventListener("click", () => {
  setExpanded(toggle.getAttribute("aria-expanded") !== "true");
});

links.addEventListener("click", (event) => {
  if (event.target.closest("a") && mobile.matches) setExpanded(false);
});

navigation.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobile.matches &&
      toggle.getAttribute("aria-expanded") === "true") {
    setExpanded(false);
    toggle.focus();
  }
});

mobile.addEventListener("change", syncViewport);
syncViewport();
