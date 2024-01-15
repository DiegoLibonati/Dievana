import { Genres, Genre } from "../entities/vite-env.d";
import { API_KEY } from "./apiConfig.ts";

export const getGenres = async (): Promise<Genres> => {
  const API = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

  const request = await fetch(API);

  const data: Genres = await request.json();

  return data;
};

export const getGenreMovie = async (genreId: number): Promise<Genre> => {
  const genres: Genres = await getGenres();

  const genre = genres["genres"].filter((genre) => genre.id === genreId)[0];

  return genre;
};
