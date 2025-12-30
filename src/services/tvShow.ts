import type { AxiosInstance } from "axios";
import type { TvShow, TvShowDetailList } from "../types/tvShow";

export const getTvShowDetails = async (
  axios: AxiosInstance,
  { tvShowId }: { tvShowId?: number }
) => {
  const response = axios.get<TvShow>("/tv/" + tvShowId + "?language=en-US");

  return response;
};

export const getRecommendatedTvShows = async (
  axios: AxiosInstance,
  { tvShowId, pageNumber }: { tvShowId?: number; pageNumber?: number }
) => {
  const response = axios.get<TvShowDetailList>(
    "/tv/" + tvShowId + "/recommendations?language=en-US&page=" + pageNumber
  );

  return response;
};

export const getTvShowCredits = async (
  axios: AxiosInstance,
  { tvShowId, seasonNumber }: { tvShowId?: number; seasonNumber: number }
) => {
  const response = axios.get<TvShowDetailList>(
    "/tv/" + tvShowId + "/season/" + seasonNumber + "/credits?language=en-US"
  );

  return response;
};
