const carouselContainerTrack = document.querySelector(
  ".carousel_container_track"
) as HTMLElement;
const btnsCarousel = document.querySelectorAll(".btnCarousel") as NodeList;

const slideCarouselTrack = (e: Event) => {
  const target = e.target as HTMLElement;
  const idBtnCarousel = target.id;

  const carouselTrackTransformTranslateX: number = parseInt(
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

btnsCarousel.forEach((btnCarousel) => {
  btnCarousel.addEventListener("click", (e) => slideCarouselTrack(e));
});
