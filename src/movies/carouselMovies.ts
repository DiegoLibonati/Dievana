import { getResponse } from "../api/getResponse.ts";
import { IMG_PATH } from "../api/apiConfig.ts";
import { Movies } from "../entities/vite-env.d";

const carouselContainerTrack = document.querySelector(
  ".carousel_container_track"
) as HTMLElement;

const fragment: DocumentFragment = document.createDocumentFragment();

const upcomingArray: Movies = await getResponse("upcoming", 1);
const upcomingMovies = upcomingArray.results.slice(0, 18);

const createHtmlUpcomingMovie = async (
  imageLink: string,
  title: string,
  releaseDate: string
): Promise<string> => {
  const releaseYear: string = releaseDate.split("-")[0];
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

upcomingMovies.forEach(async (upcomingMovie) => {
  const { poster_path, title, release_date } = upcomingMovie;

  const div = document.createElement("div");
  div.setAttribute("class", "carousel_container_track_slide");
  createHtmlUpcomingMovie(poster_path, title, release_date).then(
    (res) => (div.innerHTML = res)
  );

  fragment.appendChild(div);
});

carouselContainerTrack.appendChild(fragment);
