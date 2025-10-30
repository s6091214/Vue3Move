<template>
  <div class="flex flex-col gap-4 bg-gray-700 px-32 py-8">
    <TrendingMovies @changeTrendingType="handleChangeTrendingType" />
    <Video />
    <HeroCarousel title="上映中" type="nowPlayingMovies" />
    <HeroCarousel title="受歡迎" type="popularMovies" />
    <HeroCarousel title="評分最高" type="topRatedMovies" />
    <HeroCarousel title="即將推出" type="upcomingMovies" />
  </div>
</template>

<script lang="ts" setup>
// Using defineOptions to set a multi-word component name to satisfy the linter

import { onMounted } from "vue";
import { useMovieStore } from "@/stores/movie";
import TrendingMovies from "@/components/TrendingMovies.vue";
import HeroCarousel from "@/components/HeroCarousel.vue";
import Video from "@/components/Video.vue";

const movieStore = useMovieStore();

/** 切換趨勢類型 */
const handleChangeTrendingType = (type: string) => {
  movieStore.fetchTrendingMovies(type);
};

onMounted(() => {
  movieStore.fetchNowPlayingMovies();
  movieStore.fetchPopularMovies();
  movieStore.fetchTopRatedgMovies();
  movieStore.fetchUpcominMovies();
  movieStore.fetchTrendingMovies();
});
</script>

<style lang="scss" scoped></style>
