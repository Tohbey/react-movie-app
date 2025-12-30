import { useRef } from "react";
import { useAppState } from "../context/hook";
import { useAxios } from "../services/axios";
import {
  getRecommendatedTvShows,
  getTvShowCredits,
  getTvShowDetails,
} from "../services/tvShow";

export type ShowsDetail = {
  adult: boolean;
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

type ShowCardProps = {
  showDetail: ShowsDetail;
};

export default function SeriesCard({ showDetail }: ShowCardProps) {
  console.log(showDetail);
  const { appContants } = useAppState();
  const axiosInstance = useAxios();
  const hostRef = useRef<HTMLDivElement | null>(null);

  console.log("Base URL:", appContants?.BASE_URL_MOVIE);

  const posterUrl = appContants?.IMAGE_BASE_URL
    ? `${appContants.IMAGE_BASE_URL}${showDetail.poster_path}`
    : showDetail.poster_path;

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
  return (
    <div
      ref={hostRef}
      className="show-card"
      onClick={() => onSelectTvShows(showDetail.id)}
    >
      <img src={posterUrl} alt={showDetail.name} className="show-poster" />
      <div className="show-rating">{showDetail.vote_average.toFixed(2)}</div>
      <div className="show-status">Airing</div>
      <div className="show-info">
        <div className="show-title">{showDetail.name}</div>
        <div className="show-meta">
          <span>{showDetail.first_air_date.split("-")[0]}</span>
          <span>5 seaons</span>
        </div>
      </div>
    </div>
  );
}
