# Movies-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

## Description

Reworking project...

## Technologies used

1. Javascript
2. CSS3
3. HTML5

## Galery

Reworking project...

## Portfolio Link

Reworking project...

## Video

Reworking project...

## Documentation

### ./navbar.js

The `manageMobileNavbar()` function is part of the `navbar.js` configuration. This function will allow to add or remove the `activeNavbar` class that allows to open and close this navbar in its mobile version. Also if `headerContainerNavList` contains this class, a background will be added to the `headerContainerNav` and `headerContainerLogo` containers to be able to differentiate the content and when they do not have it, the background will be removed:

Translated with www.DeepL.com/Translator (free version)

```
const manageMobileNavbar = () => {
  headerContainerNavList.classList.toggle("activeNavbar");

  if (headerContainerNavList.classList.contains("activeNavbar")) {
    headerContainerNav.style.backgroundColor = "#181A31";
    headerContainerLogo.style.backgroundColor = "#181A31";
  } else {
    headerContainerLogo.style.backgroundColor = "";
  }
};
```
