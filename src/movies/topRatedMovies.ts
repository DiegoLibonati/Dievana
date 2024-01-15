import { getResponse } from "../api/getResponse.ts";
import { IMG_PATH } from "../api/apiConfig.ts";
import { getGenreMovie } from "../api/getGenres.ts";

const moviesContainerListGrid = document.querySelector(
  ".movies_container_list_grid"
) as HTMLElement;

const fragment: DocumentFragment = document.createDocumentFragment();

const topRatedArray = await getResponse("top_rated", 1);

const createHtmlTopRatedMovies = async (
  imageLink: string,
  title: string,
  genreId: number,
  releaseDate: string
) => {
  const genre = await getGenreMovie(genreId);
  const releaseYear = releaseDate.split("-")[0];
  return `
    <img
    src="${IMG_PATH + imageLink}"
    alt="${title}"
    />
    <div class="movies_container_list_grid_movie_background"></div>
    <div class="movies_container_list_grid_movie_description">
    <h3>${title}</h3>
    <h4>${genre.name}</h4>
    <h5>${releaseYear}</h5>
    </div>
 `;
};

topRatedArray.results.forEach(async (topRatedMovie) => {
  const { poster_path, title, genre_ids, release_date } = topRatedMovie;
  const genreId = genre_ids[0];
  const div = document.createElement("div");
  div.setAttribute("class", "movies_container_list_grid_movie");
  createHtmlTopRatedMovies(poster_path, title, genreId, release_date).then(
    (res) => (div.innerHTML = res)
  );

  fragment.appendChild(div);
});

moviesContainerListGrid.appendChild(fragment);
