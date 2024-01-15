import { Movies } from "../entities/vite-env.d";
import { API_KEY } from "./apiConfig.ts";

export const getResponse = async (
  route: string,
  page: number = 1
): Promise<Movies> => {
  const API = `https://api.themoviedb.org/3/movie/${route}?api_key=${API_KEY}&language=en-US&page=${page}`;

  const request = await fetch(API);

  const data: Movies = await request.json();

  return data;
};

export const getResponseBySort = async (
  sort: string,
  page: number = 1
): Promise<Movies> => {
  const API = `https://api.themoviedb.org/3/discover/movie?sort_by=${sort}&api_key=${API_KEY}&page=${page}`;

  const request = await fetch(API);

  const data: Movies = await request.json();

  return data;
};
