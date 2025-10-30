<template>
  <div class="mb-8">
    <h1 class="mb-4 text-5xl font-bold text-amber-50">{{ title }}</h1>
    <Swiper
      :space-between="20"
      :slides-per-view="8"
      :autoplay="{ delay: 4000 }"
      navigation
      pagination
      effect="fade"
    >
      <SwiperSlide
        v-for="slide in movieStore[type as MovieStoreKeys]?.data?.results"
        :key="slide.id"
        class="cursor-pointer"
      >
        <img
          class="w-full object-cover"
          :src="`https://media.themoviedb.org/t/p/w220_and_h330_face${slide.poster_path}`"
          :alt="slide.title"
        />
        <div>
          <h2 class="mt-2 text-lg font-semibold text-amber-50 hover:text-blue-400">
            {{ slide.title }}
          </h2>
          <p class="text-amber-50">{{ slide.release_date }}</p>
          <p class="text-sm text-amber-200">評分: {{ slide.vote_average }}</p>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { useMovieStore } from "@/stores/movie";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

type MovieStoreKeys = "popularMovies" | "nowPlayingMovies" | "topRatedMovies" | "upcomingMovies";

interface Props {
  title?: string;
  type?: string;
}

withDefaults(defineProps<Props>(), {
  title: "",
  type: "",
});

const movieStore = useMovieStore();
</script>

<style scoped></style>
