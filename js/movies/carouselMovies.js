import { getResponse } from "../api/getResponse.js";
import { IMG_PATH } from "../api/apiConfig.js";

const carouselContainerTrack = document.querySelector(
  ".carousel_container_track"
);

const fragment = document.createDocumentFragment();

const upcomingArray = await getResponse("upcoming", "1");
const upcomingMovies = upcomingArray["results"].slice(0, 18);

const createHtmlUpcomingMovie = async (imageLink, title, releaseDate) => {
  const releaseYear = releaseDate.split("-")[0];
  return `
    <img
        src="${IMG_PATH + imageLink}"
        alt="${title}"
    />
    <div class="carousel_container_tack_slide_background"></div>
    <h2>${title}</h2>
    <h3>${releaseYear}</h3>
 `;
};

upcomingMovies.forEach(async (upcomingMovie, index) => {
  const { poster_path, title, release_date } = upcomingMovie;

  const div = document.createElement("div");
  div.setAttribute("class", "carousel_container_track_slide");
  createHtmlUpcomingMovie(poster_path, title, release_date).then(
    (res) => (div.innerHTML = res)
  );

  fragment.appendChild(div);
});

carouselContainerTrack.appendChild(fragment);
