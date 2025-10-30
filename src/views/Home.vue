<template>
  <div class="bg-gray-700 px-32 py-8">
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
import HeroCarousel from "@/components/HeroCarousel.vue";

const movieStore = useMovieStore();

onMounted(() => {
  movieStore.fetchNowPlayingMovies();
  movieStore.fetchPopularMovies();
  movieStore.fetchTopRatedgMovies();
  movieStore.fetchUpcominMovies();
});
</script>

<style lang="scss" scoped></style>
