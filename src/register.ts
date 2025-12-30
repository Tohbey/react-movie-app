import React from "react";
import ReactDOM from "react-dom/client";
import reactToWebComponent from "react-to-webcomponent";
import WebAppFooter from "./component/WebAppFooter";
import Categories from "./component/Categories";
import MovieCard from "./component/MovieCard";
import SeriesCard from "./component/SeriesCard";
import TrendingCard from "./component/TrendingCard";
import { mountReactApp } from "./main";
import Modal from "./modal/modal";
import TvShowModal from "./modal/tvShowModal";

function define<P extends object>(
  name: string,
  component: React.ComponentType<P>,
  propTypes?: {
    [K in keyof P]?: "string" | "number" | "boolean" | "object" | "function";
  }
) {
  if (!customElements.get(name)) {
    const Element = reactToWebComponent(
      component as React.ComponentType<object>,
      React,
      ReactDOM,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { props: propTypes as any }
    );

    customElements.define(name, Element);
  }
}

// Define all web components - they'll use global state via hooks
define("web-app-footer", WebAppFooter, {
  footerConfig: "object",
});
define("web-app-category", Categories, {
  categories: "object",
  containerClass: "string",
  chipClass: "string",
});
define("web-app-movie-card", MovieCard, {
  movieDetail: "object",
});
define("web-app-series-card", SeriesCard, {
  showDetail: "object",
});
define("web-app-trending-card", TrendingCard, {
  trendingDetail: "object",
});
define("web-app-movie-modal", Modal, {
  isOpen: "boolean",
  movieDetail: "object",
  recommendations: "object",
  movieCredits: "object",
});
define("web-app-tvshow-modal", TvShowModal, {
  isOpen: "boolean",
  tvShowDetail: "object",
  recommendations: "object",
  movieCredits: "object",
});

// Export the mount function so Angular can use it
export {
  WebAppFooter,
  Categories,
  mountReactApp,
  MovieCard,
  SeriesCard,
  TrendingCard,
  Modal,
};
