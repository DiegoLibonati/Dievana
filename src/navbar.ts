// Navbar

const btnMobileNavbar = document.querySelector(
  ".btnNavbarMobile"
) as HTMLElement;
const headerContainerNav = document.querySelector(
  ".header_container_nav"
) as HTMLElement;
const headerContainerNavList = document.querySelector(
  ".header_container_nav_list"
) as HTMLUListElement;
const headerContainerLogo = document.querySelector(
  ".header_container_logo"
) as HTMLDivElement;

const manageMobileNavbar = (): void => {
  headerContainerNavList.classList.toggle("activeNavbar");

  if (headerContainerNavList.classList.contains("activeNavbar")) {
    headerContainerNav.style.backgroundColor = "#181A31";
    headerContainerLogo.style.backgroundColor = "#181A31";
    return;
  }

  headerContainerLogo.style.backgroundColor = "";
  return;
};

btnMobileNavbar.addEventListener("click", manageMobileNavbar);
