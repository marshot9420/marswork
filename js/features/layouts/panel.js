export function controlMenuPanel() {
  const menuButton = document.querySelector(".header-action");
  const headerMenu = document.querySelector(".header-menu");

  if (!menuButton || !headerMenu) return;

  menuButton.addEventListener("click", () => {
    menuButton.classList.toggle("is-active");
    headerMenu.classList.toggle("is-open");
  });

  document.addEventListener("click", (event) => {
    if (
      !headerMenu.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      menuButton.classList.remove("is-active");
      headerMenu.classList.remove("is-open");
    }
  });
}
