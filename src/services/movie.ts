import type { AxiosInstance } from "axios";
import type { MovieDetails } from "../types/movie";
import type { MovieCredits, MovieDetailList } from "../types/movieList";

export const getMovieDetails = async (
  axios: AxiosInstance,
  { movieId }: { movieId?: number }
) => {
  const response = axios.get<MovieDetails>(
    "/movie/" + movieId + "?language=en-US"
  );

  return response;
};

export const getRecommendatedMovies = async (
  axios: AxiosInstance,
  { movieId, pageNumber }: { movieId?: number; pageNumber?: number }
) => {
  const response = axios.get<MovieDetailList>(
    "/movie/" + movieId + "/recommendations?language=en-US&page=" + pageNumber
  );

  return response;
};

export const getMovieCredits = async (
  axios: AxiosInstance,
  { movieId }: { movieId?: number }
) => {
  const response = axios.get<MovieCredits>(
    "/movie/" + movieId + "/credits?language=en-US"
  );

  return response;
};
