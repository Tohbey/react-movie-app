import { useRef } from "react";
import { useAppState } from "../context/hook";
import { useAxios } from "../services/axios";
import {
  getMovieCredits,
  getMovieDetails,
  getRecommendatedMovies,
} from "../services/movie";

export type MovieDetail = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  genres: string[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // ISO date string
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type MovieCardProps = {
  movieDetail: MovieDetail;
};

export default function MovieCard({ movieDetail }: MovieCardProps) {
  console.log(movieDetail);
  const { appContants } = useAppState();
  const axiosInstance = useAxios();
  const hostRef = useRef<HTMLDivElement | null>(null);

  console.log("Base URL:", appContants?.BASE_URL_MOVIE);

  // Construct the full image URL
  const posterUrl = appContants?.IMAGE_BASE_URL
    ? `${appContants.IMAGE_BASE_URL}${movieDetail.poster_path}`
    : movieDetail.poster_path;

  const onSelectMovie = async (id: number) => {
    console.log("Selected Movie: ", id);
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
    <>
      <div
        ref={hostRef}
        className="movie-card"
        onClick={() => onSelectMovie(movieDetail.id)}
      >
        <img src={posterUrl} alt={movieDetail.title} className="movie-poster" />

        <div className="movie-rating">
          {movieDetail.vote_average.toFixed(2)}
        </div>
        <div className="movie-overlay"></div>

        <div className="movie-info">
          <div className="movie-title">{movieDetail.title}</div>
          <div className="movie-year">{movieDetail.release_date}</div>
        </div>
      </div>
    </>
  );
}
