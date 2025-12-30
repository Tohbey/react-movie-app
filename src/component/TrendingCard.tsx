import { useRef } from "react";
import { useAppState } from "../context/hook";
import { useAxios } from "../services/axios";
import {
  getMovieDetails,
  getRecommendatedMovies,
  getMovieCredits,
} from "../services/movie";
import {
  getTvShowDetails,
  getRecommendatedTvShows,
  getTvShowCredits,
} from "../services/tvShow";

type TrendingDetail = {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  rank: number;

  title?: string;
  original_title?: string;
  release_date?: string;
  video?: boolean;

  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];

  original_language: string;
  overview: string;
  poster_path: string;
  media_type: "movie" | "tv";
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
};

type trendingProps = {
  trendingDetail: TrendingDetail;
};

export default function TrendingCard({ trendingDetail }: trendingProps) {
  console.log(trendingDetail);
  const { appContants } = useAppState();
  const axiosInstance = useAxios();
  const hostRef = useRef<HTMLDivElement | null>(null);

  console.log("Base URL:", appContants?.BASE_URL_MOVIE);

  const posterUrl = appContants?.IMAGE_BASE_URL
    ? `${appContants.IMAGE_BASE_URL}${trendingDetail.poster_path}`
    : trendingDetail.poster_path;

  const onSelect = async (id: number, showType: string) => {
    if (showType == "movie") {
      onSelectMovie(id);
    } else {
      onSelectTvShows(id);
    }
  };

  const onSelectTvShows = async (id: number) => {
    console.log("Selected Show: ", id);

    const tvShowDetail = await getTvShowDetails(axiosInstance, {
      tvShowId: id,
    });

    const recommendedTvShows = await getRecommendatedTvShows(axiosInstance, {
      tvShowId: id,
      pageNumber: 1,
    });

    const tvShowsCredits = await getTvShowCredits(axiosInstance, {
      tvShowId: id,
      seasonNumber: 1,
    });

    hostRef.current?.dispatchEvent(
      new CustomEvent("selectedTvShows", {
        detail: {
          tvShowDetail: tvShowDetail.data,
          recommendedTvShows: recommendedTvShows.data,
          tvShowsCredits: tvShowsCredits.data,
        },
        bubbles: true,
        composed: true,
      })
    );
  };

  const onSelectMovie = async (id: number) => {
    console.log("Selected Movie: ", id);
    const movieDetail = await getMovieDetails(axiosInstance, { movieId: id });
    const recommendedMovies = await getRecommendatedMovies(axiosInstance, {
      movieId: id,
      pageNumber: 1,
    });
    const movieCredits = await getMovieCredits(axiosInstance, { movieId: id });
    console.log(movieDetail);
    hostRef.current?.dispatchEvent(
      new CustomEvent("selectedMovie", {
        detail: {
          movieDetail: movieDetail.data,
          recommendedMovies: recommendedMovies.data,
          movieCredits: movieCredits.data,
        },
        bubbles: true,
        composed: true,
      })
    );
  };

  return (
    <div
      ref={hostRef}
      className="content-card"
      onClick={() => onSelect(trendingDetail.id, trendingDetail.media_type)}
    >
      <img
        src={posterUrl}
        alt={trendingDetail.name || trendingDetail.title}
        className="content-poster"
      />
      <div className="trending-rank">{trendingDetail.rank}</div>
      <div className="content-rating">
        {trendingDetail.vote_average.toFixed(2)}
      </div>
      <div className="content-type">{trendingDetail.media_type}</div>
      <div className="content-info">
        <div className="content-title">
          {trendingDetail.title || trendingDetail.name}
        </div>
        <div className="content-year">
          {trendingDetail?.release_date?.split("-")[0] ||
            trendingDetail?.first_air_date?.split("-")[0]}
        </div>
      </div>
    </div>
  );
}
