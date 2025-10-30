import axios from "axios";

const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
const token = import.meta.env.VITE_TMDB_BEARER_TOKEN;

const tmdb = axios.create({
  baseURL: baseUrl,
  params: { language: "zh-TW", region: "TW" },

  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

/** 搜尋電影 */
export const getSearchMovie = (data = {}) => tmdb.get("/search/movie", { params: { ...data } });

/** 搜尋人物 */
export const getSearchPerson = (data = {}) => tmdb.get("/search/person", { params: { ...data } });

/** 搜尋系列 */
export const getSearchCollection = (data = {}) =>
  tmdb.get("/search/collection", { params: { ...data } });

/** 搜尋電視節目 */
export const getSearchTv = (data = {}) => tmdb.get("/search/tv", { params: { ...data } });

/** 上映中的電影 */
export const getNowPlayingMovies = (page = 1) =>
  tmdb.get("/movie/now_playing", { params: { page } });

/** 受歡迎的電影 */
export const getPopularMovies = (page = 1) => tmdb.get("/movie/popular", { params: { page } });

/** 評分最高的電影 */
export const getTopRatedgMovies = (page = 1) => tmdb.get("/movie/top_rated", { params: { page } });

/** 即將推出的電影 */
export const getUpcomingMovies = (page = 1) => tmdb.get("/movie/upcoming", { params: { page } });

/** 熱門電影 */
export const getTrendingMovies = (data = "day") => tmdb.get(`/trending/movie/${data}`);

/** 影片 */
export const getVideosMovies = (id = 0) => tmdb.get(`/movie/${id}/videos`);

// 取得電影詳情
// export const getMovieDetail = (id: number) => tmdb.get(`/movie/${id}`);

export default tmdb;
