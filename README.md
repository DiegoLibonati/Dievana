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

I made a movie website. On this page we can see the 5 movies that are trending and also see the most popular and highest rated movies on the `Home` page. On the `Movies` page we can see 20 movies per page sorted by popularity, the pagination are two arrows to go back and one to go forward. Depending on which arrow is touched we will go to the next page or to the previous one.

## Technologies used

1. Javascript
2. CSS3
3. HTML5

## Galery

![Movies-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/movies2-0.jpg)

![Movies-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/movies2-1.jpg)

![Movies-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/movies2-2.jpg)

![Movies-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/movies2-3.jpg)

![Movies-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/movies2-4.jpg)

## Portfolio Link

`https://diegolibonati.github.io/DiegoLibonatiWeb/#/projects?q=Movies%20Page`

## Video

https://user-images.githubusercontent.com/99032604/203444247-0dfb2480-1667-41ad-817c-2899bf0dfd24.mp4

## Documentation

### ./js/navbar.js

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

### ./js/carousel.js

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

### ./js/api/apiConfig.js

In this file we are going to obtain all the configuration variables to make the requests to the Internet API that we use.

### ./js/api/getGenres.js

In `getGenres()` we will get all the available genres in the API with their respective `id` and their `name`:

```
export const getGenres = async () => {
  const API = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

  const request = await fetch(API);

  const data = await request.json();

  return data;
};
```

In `getGenreMovie()` we will get the specific genre of the movie we are looking for through an ID that we pass as a parameter:

```
export const getGenreMovie = async (genreId) => {
  let genres = await getGenres();

  genres = genres["genres"];

  const genre = genres.filter((genre) => genre.id === genreId)[0];

  return genre;
};
```

### ./js/api/getResponse.js

In `getResponse()` we are going to obtain the movies of the specific section that we passed by `route` in parameters, in addition we will be able to pass it in which page we are through `page` that by default is 1:

```
export const getResponse = async (route, page = 1) => {
  const API = `https://api.themoviedb.org/3/movie/${route}?api_key=${API_KEY}&language=en-US&page=${page}`;

  const request = await fetch(API);

  const data = await request.json();

  return data;
};
```

In `getResponseBySort()` we are going to obtain all the movies through a filter that we will apply in the search, this filter we will pass it through the `sort` parameter, in addition we will be able to look for in that page we want that it brings us these results with `page`:

```
export const getResponseBySort = async (sort, page = 1) => {
  const API = `https://api.themoviedb.org/3/discover/movie?sort_by=${sort}&api_key=${API_KEY}&page=${page}`;

  const request = await fetch(API);

  const data = await request.json();

  return data;
};
```

### ./js/movies/carouselMovies.js | ./js/movies/topRatedMovies.js | ./js/movies/trendsMovies.js

In these files we are going to create a fragment where we are going to load the HTML that you want to add to the element that we bring from HTML with `QuerySelector`. After adding all the elements to the `Fragment` we are going to add it to the element that we bring from HTML.

One example:

```
const moviesContainerListGrid = document.querySelector(
  ".movies_container_list_grid"
);

const fragment = document.createDocumentFragment();

let topRatedArray = await getResponse("top_rated", "1");
topRatedArray = topRatedArray["results"];

const createHtmlTopRatedMovies = async (
  imageLink,
  title,
  genreId,
  releaseDate
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
    <h4>${genre["name"]}</h4>
    <h5>${releaseYear}</h5>
    </div>
 `;
};

topRatedArray.forEach(async (topRatedMovie) => {
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
```

### ./js/movies/loadMoviesOnMoviesPage.js

With the `loadMovies()` function we are going to create a fragment and obtain through the response of `getResponseBySort()` all the movies with the filter applied in the page we want. In addition we are going to create for each movie that is in the response its respective HTML to dump it in the document fragment, once created all the movies we will add that fragment to the HTML to render:

```
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
```
