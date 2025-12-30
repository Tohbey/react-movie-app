import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { MovieDetails } from "../types/movie";
import type { MovieCredits, MovieDetailList } from "../types/movieList";
import { useAppState } from "../context/hook";

type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  movieDetail: MovieDetails;
  recommendations: MovieDetailList;
  movieCredits: MovieCredits;
};

export default function Modal({
  isOpen,
  onClose,
  movieDetail,
  recommendations,
  movieCredits,
}: ModalProps) {
  const { appContants } = useAppState();
  const USDollarFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  });

  console.log("Image Base URL:", appContants?.BACKDROP_IMAGE_URL);

  const handleClose = () => {
    const event = new CustomEvent("modal-close", {
      bubbles: true,
      composed: true,
    });

    const modalElement = document.querySelector("web-app-movie-modal");
    if (modalElement) {
      modalElement.dispatchEvent(event);
    }

    if (onClose && typeof onClose === "function") {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return createPortal(
    <div className={`modal ${isOpen ? "active" : "hidden"}`} id="movieModal">
      <div className="modal-content">
        <button
          className="close-modal"
          onClick={() => {
            handleClose();
          }}
        >
          ×
        </button>

        <div className="modal-hero">
          <img
            id="modalBackdrop"
            src={`${appContants?.BACKDROP_IMAGE_URL}/${movieDetail?.backdrop_path}`}
            alt="Movie backdrop"
            className="modal-backdrop"
          />
          <div className="modal-hero-overlay">
            <h2 className="modal-title" id="modalTitle">
              {movieDetail?.title}
            </h2>
            <div className="modal-meta" id="modalMeta">
              <span className="rating">
                {movieDetail?.vote_average.toFixed(2)}
              </span>
              <span>{movieDetail?.release_date}</span>
              <span>{movieDetail?.runtime} mins</span>
              <span>
                Directed by{" "}
                {movieCredits?.crew
                  ?.filter((crew) => crew.job === "Director")
                  .map((crew) => crew.name)
                  .join(", ")}
              </span>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="action-buttons">
            <button className="modal-btn modal-btn-primary">▶ Watch Now</button>
            <button className="modal-btn modal-btn-secondary">
              + Add to Watchlist
            </button>
            <button className="modal-btn modal-btn-secondary">
              ♥ Favorite
            </button>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Overview</h3>
            <p className="modal-description" id="modalDescription">
              {movieDetail?.overview}
            </p>
            <div className="genre-tags" id="modalGenres">
              {movieDetail?.genres.map((genre) => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-stats" id="modalStats">
            <div className="stat-item">
              <div className="stat-value">
                {movieDetail?.vote_average.toFixed(2)}
              </div>
              <div className="stat-label">Rating</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {USDollarFormatter.format(movieDetail?.budget)}
              </div>
              <div className="stat-label">Budget</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {USDollarFormatter.format(movieDetail?.revenue)}
              </div>
              <div className="stat-label">Revenue</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {movieDetail?.release_date.split("-")[0]}
              </div>
              <div className="stat-label">Release Year</div>
            </div>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Cast</h3>
            <div className="cast-grid" id="modalCast">
              {movieCredits?.cast.slice(0, 14).map((cast) => (
                <div key={cast.credit_id} className="cast-member">
                  <img
                    src={
                      cast.profile_path
                        ? `${appContants?.IMAGE_BASE_URL}/${cast.profile_path}`
                        : "/placeholder-profile.png"
                    }
                    alt={cast.name}
                    className="cast-photo"
                  />
                  <div className="cast-name">{cast.name}</div>
                  <div className="cast-character">{cast.character}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">You May Also Like</h3>
            <div className="recommendations-grid" id="modalRecommendations">
              {recommendations?.results.slice(0, 12).map((movie) => (
                <div key={movie.id} className="recommendation-card">
                  <img
                    src={`${appContants?.IMAGE_BASE_URL}/${movie.poster_path}`}
                    alt={movie.title}
                    className="recommendation-poster"
                  />
                  <div className="recommendation-info">
                    <div className="recommendation-title">{movie.title}</div>
                    <div className="recommendation-rating">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
