// src/stores/movie.ts
import { reactive } from "vue";
import { defineStore } from "pinia";
import {
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedgMovies,
  getUpcomingMovies,
  getTrendingMovies,
  getVideosMovies,
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

export interface MovieVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export interface MovieDetail {
  data: {
    results: MovieVideo[];
  };
}

export const useMovieStore = defineStore("movie", () => {
  /** 受歡迎的電影 */
  const popularMovies = reactive<MovieResponse>({
    data: {
      page: 1,
      total_pages: 0,
      total_results: 0,
      results: [],
    },
  });

  /** 上映中的電影 */
  const nowPlayingMovies = reactive<MovieResponse>({
    data: {
      page: 1,
      total_pages: 0,
      total_results: 0,
      results: [],
    },
  });

  /** 評分最高的電影 */
  const topRatedMovies = reactive<MovieResponse>({
    data: {
      page: 1,
      total_pages: 0,
      total_results: 0,
      results: [],
    },
  });

  /** 即將推出的電影 */
  const upcomingMovies = reactive<MovieResponse>({
    data: {
      page: 1,
      total_pages: 0,
      total_results: 0,
      results: [],
    },
  });

  /** 熱門電影 */
  const trendingMovies = reactive<MovieResponse>({
    data: {
      page: 1,
      total_pages: 0,
      total_results: 0,
      results: [],
    },
  });

  const videos = reactive<MovieDetail>({
    data: {
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

    const moviesWithVideos = await Promise.all(
      upcomingMovies.data.results.map(async (movie) => {
        const res = await getVideosMovies(movie.id);
        return res.data.results.length > 0 ? res.data.results[0] : null;
      }),
    );

    videos.data.results = moviesWithVideos.filter((v): v is typeof v => v !== null);
  };

  /** 取得熱門電影 */
  const fetchTrendingMovies = async (value = "day") => {
    const { data } = await getTrendingMovies(value);
    trendingMovies.data = data;
  };

  return {
    upcomingMovies,
    topRatedMovies,
    popularMovies,
    nowPlayingMovies,
    trendingMovies,
    videos,
    fetchPopularMovies,
    fetchNowPlayingMovies,
    fetchTopRatedgMovies,
    fetchUpcominMovies,
    fetchTrendingMovies,
  };
});
