export const navbar = () => {
  const $ = (id) => document.getElementById(id);
  const $menu_trigger = $("menu-trigger");
  const $menu = $("menu");
  const $menu_close = $("close-menu");
  const $body = document.querySelector("body");

  let cartOpen = false;

  $menu_trigger.addEventListener("click", () => {
    cartOpen = !cartOpen;
    $body.style.overflow = "hidden";
    $menu.classList.add("active");
  });
  $menu_close.addEventListener("click", () => {
    cartOpen = !cartOpen;
    $body.style.overflow = "auto";
    $menu.classList.remove("active");
  });
};
