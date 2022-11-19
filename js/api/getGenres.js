import { API_KEY } from "./apiConfig.js";

export const getGenres = async () => {
  const API = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

  const request = await fetch(API);

  const data = await request.json();

  return data;
};

export const getGenreMovie = async (genreId) => {
  let genres = await getGenres();

  genres = genres["genres"];

  const genre = genres.filter((genre) => genre.id === genreId)[0];

  return genre;
};
