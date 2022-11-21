import { API_KEY } from "./apiConfig.js";

export const getResponse = async (route, page = 1) => {
  const API = `https://api.themoviedb.org/3/movie/${route}?api_key=${API_KEY}&language=en-US&page=${page}`;

  const request = await fetch(API);

  const data = await request.json();

  return data;
};

export const getResponseBySort = async (sort, page = 1) => {
  const API = `https://api.themoviedb.org/3/discover/movie?sort_by=${sort}&api_key=${API_KEY}&page=${page}`;

  const request = await fetch(API);

  const data = await request.json();

  return data;
};
