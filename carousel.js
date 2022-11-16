const carouselContainerTrack = document.querySelector(
  ".carousel_container_track"
);
const btnsCarousel = document.querySelectorAll(".btnCarousel");

const slideCarouselTrack = (e) => {
  const idBtnCarousel = e.target.id;

  const carouselTrackTransformTranslateX = parseInt(
    window
      .getComputedStyle(carouselContainerTrack)
      .getPropertyValue("transform")
      .split(",")[4]
  );

  if (carouselTrackTransformTranslateX >= 0) {
    carouselContainerTrack.style.transition = "transform 0s";
    carouselContainerTrack.style.transform = `translateX(-7750px)`;
    return;
  }

  if (carouselTrackTransformTranslateX < -7750) {
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

btnsCarousel.forEach((btnCarousel) => {
  btnCarousel.addEventListener("click", (e) => slideCarouselTrack(e));
});
