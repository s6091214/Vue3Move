<template>
  <div class="">
    <div class="flex items-center gap-4">
      <div class="mb-4 flex items-center gap-4">
        <h1 class="text-5xl font-bold text-amber-50">{{ "趨勢" }}</h1>

        <div class="relative flex h-7 rounded-full bg-gray-800/60">
          <div
            v-for="item in switchList"
            :key="item.type"
            @click="handleClick(item.type)"
            class="relative z-10 cursor-pointer px-5 py-1 text-sm font-medium transition-colors"
            :class="selected === item.type ? 'text-white' : 'text-gray-400'"
          >
            {{ item.name }}
          </div>

          <!-- 底條動畫 -->
          <div
            class="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-emerald-500 transition-transform duration-300 ease-out"
            :class="selected === 'week' ? 'translate-x-full' : ''"
          ></div>
        </div>
      </div>
    </div>

    <Swiper
      :space-between="20"
      :slides-per-view="6.3"
      :autoplay="{ delay: 4000 }"
      navigation
      pagination
      effect="fade"
    >
      <SwiperSlide
        v-for="slide in movieStore.trendingMovies.data?.results"
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
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

import { useMovieStore } from "@/stores/movie";
const movieStore = useMovieStore();

const emit = defineEmits<{
  (e: "changeTrendingType", type: string): void;
}>();

/** 切換趨勢類型 */
const handleClick = (type: string) => {
  selected.value = type;
  emit("changeTrendingType", type);
};

const switchList = [
  {
    name: "今日",
    type: "day",
  },
  {
    name: "本週",
    type: "week",
  },
];

const selected = ref("day");
</script>

<style scoped></style>
