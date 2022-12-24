export const navbar = () => {
  const $ = (id) => document.getElementById(id);
  const $menu_trigger = $("menu-trigger");
  const $menu = $("menu");
  const $menu_close = $("close-menu");
  $menu_trigger.addEventListener("click", () => {
    $menu.classList.add("active");
  });
  $menu_close.addEventListener("click", () => {
    $menu.classList.remove("active");
  });
};
