import { getResponseBySort } from "../api/getResponse.js";
import { IMG_PATH } from "../api/apiConfig.js";
import { getGenreMovie } from "../api/getGenres.js";

const moviesContainerListMovies = document.querySelector(
  ".movies_container_list_movies"
);

let page = 1;

const loadMovies = async (page) => {
  const fragment = document.createDocumentFragment();

  let moviesArray = await getResponseBySort("popularity.desc", page);
  moviesArray = moviesArray["results"];

  const createHtmlMovie = async (
    imageLink,
    title,
    genreId,
    releaseDate,
    description
  ) => {
    const genre = await getGenreMovie(genreId);
    const releaseYear = releaseDate.split("-")[0];
    return `
    <img
    src="${IMG_PATH + imageLink}"
    alt="${title}"
    />

    <div class="movies_container_list_movies_movie_description">
    <h2>${title}</h2>
    <h3>${releaseYear}</h3>
    <h4>SINOPSIS</h4>
    <p>
        ${description}
    </p>
    <h5>${genre["name"]}</h5>
    </div>
    `;
  };

  moviesArray.forEach(async (movie) => {
    const { poster_path, title, genre_ids, release_date, overview } = movie;
    const genreId = genre_ids[0];
    const div = document.createElement("div");
    div.setAttribute("class", "movies_container_list_movies_movie");
    createHtmlMovie(poster_path, title, genreId, release_date, overview).then(
      (res) => (div.innerHTML = res)
    );

    fragment.appendChild(div);
  });

  moviesContainerListMovies.appendChild(fragment);
};

loadMovies(page);

// Pagination

const btnsPagination = document.querySelectorAll(".btnPagination");

btnsPagination.forEach((btnPagination) => {
  btnPagination.addEventListener("click", async (e) => {
    const idBtnPagination = e.target.id;

    if (idBtnPagination === "btnPaginationRight") {
      if (page >= 500) {
        page = 1;
      } else {
        page++;
      }
      moviesContainerListMovies.innerHTML = "";

      loadMovies(page);
    } else {
      if (page <= 1) {
        page = 500;
      } else {
        page--;
      }

      moviesContainerListMovies.innerHTML = "";

      loadMovies(page);
    }
  });
});
