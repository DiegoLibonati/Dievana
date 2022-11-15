// Navbar

const btnMobileNavbar = document.querySelector(".btnNavbarMobile");
const headerContainerNav = document.querySelector(".header_container_nav");
const headerContainerNavList = document.querySelector(
  ".header_container_nav_list"
);
const headerContainerLogo = document.querySelector(".header_container_logo");

const manageMobileNavbar = () => {
  headerContainerNavList.classList.toggle("activeNavbar");

  if (headerContainerNavList.classList.contains("activeNavbar")) {
    headerContainerNav.style.backgroundColor = "#181A31";
    headerContainerLogo.style.backgroundColor = "#181A31";
  } else {
    headerContainerLogo.style.backgroundColor = "";
  }
};

btnMobileNavbar.addEventListener("click", manageMobileNavbar);
