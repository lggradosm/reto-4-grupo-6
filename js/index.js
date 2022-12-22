const $ = (id) => document.getElementById(id);
const $menu_trigger = $("menu-trigger");
const $menu = $("menu");
const $menu_close = $("close-menu");
const addEvents = () => {
  $menu_trigger.addEventListener("click", () => {
    $menu.classList.add("active");
  });
  $menu_close.addEventListener("click", () => {
    $menu.classList.remove("active");
  });
};

const documentReady = () => {
  addEvents();
};

document.addEventListener("DOMContentLoaded", documentReady);
