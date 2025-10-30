// src/stores/movie.ts
import { reactive } from "vue";
import { defineStore } from "pinia";
import {
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedgMovies,
  getUpcomingMovies,
} from "@/services/tmdb";

interface MovieResult {
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  id: number;
}

export interface MovieResponse {
  data: {
    page: number;
    total_pages: number;
    total_results: number;
    results: MovieResult[];
  };
}

export const useMovieStore = defineStore("movie", () => {
  const popularMovies = reactive<MovieResponse>({
    data: {
      page: 1,
      total_pages: 0,
      total_results: 0,
      results: [],
    },
  });

  const nowPlayingMovies = reactive<MovieResponse>({
    data: {
      page: 1,
      total_pages: 0,
      total_results: 0,
      results: [],
    },
  });

  const topRatedMovies = reactive<MovieResponse>({
    data: {
      page: 1,
      total_pages: 0,
      total_results: 0,
      results: [],
    },
  });

  const upcomingMovies = reactive<MovieResponse>({
    data: {
      page: 1,
      total_pages: 0,
      total_results: 0,
      results: [],
    },
  });

  /** 取得上映中的電影 */
  const fetchNowPlayingMovies = async (p = 1) => {
    const { data } = await getNowPlayingMovies(p);
    nowPlayingMovies.data = data;
  };

  /** 取得受歡迎電影 */
  const fetchPopularMovies = async (p = 1) => {
    const { data } = await getPopularMovies(p);
    popularMovies.data = data;
  };

  /** 取得評分最高的電影 */
  const fetchTopRatedgMovies = async (p = 1) => {
    const { data } = await getTopRatedgMovies(p);
    topRatedMovies.data = data;
  };

  /** 取得即將推出的電影 */
  const fetchUpcominMovies = async (p = 1) => {
    const { data } = await getUpcomingMovies(p);
    upcomingMovies.data = data;
  };

  return {
    upcomingMovies,
    topRatedMovies,
    popularMovies,
    nowPlayingMovies,
    fetchPopularMovies,
    fetchNowPlayingMovies,
    fetchTopRatedgMovies,
    fetchUpcominMovies,
  };
});
