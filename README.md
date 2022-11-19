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

### ./carousel.js

In the function `slideCarouselTrack()` of the file `carousel.js` it will collect the id of the button of the carousel that was clicked. In the same also in the variable `carouselTrackTransformTranslateX` we take the position in which is the Translate X of CSS. Then we will make validations on this variable to know what to do with the carousel if to send it to the initial position `X = 0` or to the final position `X = -7060`. Or simply if it does not reach the limits add `250px` or subtract them to the variable `carouselTrackTransformTranslateX`.

```
const slideCarouselTrack = (e) => {
  const idBtnCarousel = e.target.id;

  const carouselTrackTransformTranslateX = parseInt(
    window
      .getComputedStyle(carouselContainerTrack)
      .getPropertyValue("transform")
      .split(",")[4]
  );

  if (carouselTrackTransformTranslateX >= -100) {
    carouselContainerTrack.style.transition = "transform 0s";
    carouselContainerTrack.style.transform = `translateX(-7060px)`;
    return;
  }

  if (carouselTrackTransformTranslateX < -7060) {
    carouselContainerTrack.style.transition = "transform 0s";
    carouselContainerTrack.style.transform = `translateX(-300px)`;
    return;
  }

  if (idBtnCarousel === "btnCarouselLeft") {
    carouselContainerTrack.style.transition = "transform .5s";
    carouselContainerTrack.style.transform = `translateX(${
      carouselTrackTransformTranslateX - 250
    }px)`;
    return;
  }

  carouselContainerTrack.style.transition = "transform .5s";
  carouselContainerTrack.style.transform = `translateX(${
    carouselTrackTransformTranslateX + 250
  }px)`;
};
```
