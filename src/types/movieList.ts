import type { MovieDetail } from "../component/MovieCard";

export type MovieDetailList = {
  page: number;
  results: MovieDetail[];
  total_pages: number;
  total_result: number;
};

export type MovieCredits = {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
};

export type PersonBase = {
  adult: boolean;
  gender: 0 | 1 | 2;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
};

export type CastMember = PersonBase & {
  cast_id: number;
  character: string;
  order: number;
};

export type CrewMember = PersonBase & {
  department: string;
  job: string;
};
