<template>
  <div>
    <h1 class="mb-4 text-5xl font-bold text-amber-50">{{ "最新預告片" }}</h1>

    <Swiper :space-between="20" :slides-per-view="4">
      <SwiperSlide
        v-for="video in movieStore.videos.data.results"
        :key="video.id"
        class="cursor-pointer"
      >
        <img
          class="aspect-video w-full rounded-lg object-cover"
          :src="`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`"
          :alt="video.name"
        />
        <p class="mt-1 text-amber-50">{{ video.name }}</p>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { useMovieStore } from "@/stores/movie";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const movieStore = useMovieStore();
</script>

<style scoped></style>
