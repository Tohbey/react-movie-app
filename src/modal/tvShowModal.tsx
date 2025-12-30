import { useEffect } from "react";
import { useAppState } from "../context/hook";
import type { TvShow, TvShowDetailList } from "../types/tvShow";
import { createPortal } from "react-dom";
import type { MovieCredits } from "../types/movieList";

type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  tvShowDetail: TvShow;
  recommendations: TvShowDetailList;
  movieCredits: MovieCredits;
};

export default function TvShowModal({
  isOpen,
  onClose,
  tvShowDetail,
  recommendations,
  movieCredits,
}: ModalProps) {
  const { appContants } = useAppState();

  console.log("Image Base URL:", appContants?.BACKDROP_IMAGE_URL);

  const handleClose = () => {
    const event = new CustomEvent("modal-close", {
      bubbles: true,
      composed: true,
    });

    const modalElement = document.querySelector("web-app-tvshow-modal");
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
    <div className={`modal ${isOpen ? "active" : "hidden"}`} id="showModal">
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
            src={`${appContants?.BACKDROP_IMAGE_URL}/${tvShowDetail?.backdrop_path}`}
            alt="Show backdrop"
            className="modal-backdrop"
          />
          <div className="modal-hero-overlay">
            <h2 className="modal-title" id="modalTitle">
              {tvShowDetail?.name}
            </h2>
            <div className="modal-meta" id="modalMeta">
              <span className="rating">
                {tvShowDetail?.vote_average.toFixed(2)}
              </span>
              <span>
                {tvShowDetail?.first_air_date.split("-")[0]}-
                {tvShowDetail?.last_air_date.split("-")[0]}
              </span>
              <span>
                ${tvShowDetail?.number_of_seasons} Season$
                {tvShowDetail?.number_of_seasons > 1 ? "s" : ""}
              </span>
              <span>{tvShowDetail?.number_of_episodes} Episodes</span>
              <span>HBO</span>
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
              {tvShowDetail?.overview}
            </p>
            <div className="genre-tags" id="modalGenres">
              {tvShowDetail?.genres.map((genre) => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-stats" id="modalStats">
            <div className="stat-item">
              <div className="stat-value">
                {tvShowDetail?.vote_average.toFixed(2)}
              </div>
              <div className="stat-label">Rating</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {tvShowDetail?.number_of_seasons}
              </div>
              <div className="stat-label">Seasons</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {tvShowDetail?.number_of_episodes}
              </div>
              <div className="stat-label">Episodes</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{tvShowDetail?.status}</div>
              <div className="stat-label">Status</div>
            </div>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Seasons</h3>
            <div className="seasons-list" id="modalSeasons">
              {tvShowDetail?.seasons.map((season) => (
                <div key={season.id} className="season-item">
                  <img
                    src={`${appContants?.IMAGE_BASE_URL}/${season.poster_path}`}
                    alt={season.season_number.toString()}
                    className="season-poster"
                  />
                  <div className="season-content">
                    <div className="season-header">
                      <div className="season-title">
                        Season {season.season_number}
                      </div>
                      <div className="season-year">
                        {season.air_date?.slice(0, 4)} • {season.episode_count}{" "}
                        Episodes
                      </div>
                    </div>

                    <div className="season-info">
                      {season.overview || "No overview available."}
                    </div>
                  </div>
                </div>
              ))}
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
            <h3 className="modal-section-title">Similar Shows</h3>
            <div className="recommendations-grid" id="modalRecommendations">
              {recommendations?.results.slice(0, 12).map((movie) => (
                <div key={movie.id} className="recommendation-card">
                  <img
                    src={`${appContants?.IMAGE_BASE_URL}/${movie.poster_path}`}
                    alt={movie.name}
                    className="recommendation-poster"
                  />
                  <div className="recommendation-info">
                    <div className="recommendation-title">{movie.name}</div>
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
