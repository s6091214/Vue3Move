<template>
  <div class="h-16 w-full bg-blue-900">
    <div class="mx-auto flex h-full max-w-[1300px] items-center justify-between px-4">
      <ul class="flex cursor-pointer gap-4">
        <router-link to="/"><Icon icon="skill-icons:vuejs-light" class="h-8 w-8" /></router-link>

        <li
          class="group relative inline-flex items-center font-bold text-white"
          v-for="item in menuItems"
          :key="item.title"
        >
          {{ item.title }}

          <!-- 下拉區塊 -->
          <div class="absolute top-full left-0 z-10 hidden group-hover:block">
            <ul class="mt-2 rounded-md bg-blue-800 p-4 shadow-lg">
              <li
                class="rounded-md px-4 py-2 whitespace-nowrap text-white hover:bg-blue-700"
                v-for="subItem in item.subMenu"
                :key="subItem.name"
              >
                <router-link :to="subItem.link">{{ subItem.name }}</router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <div class="relative flex w-full max-w-md items-center rounded-md bg-white px-2 py-1">
        <Icon
          icon="oui:ws-search"
          class="absolute left-2 h-5 w-5 cursor-pointer text-gray-500"
          @click="handleSearch"
        />
        <input
          v-model.trim="searchQuery"
          type="text"
          placeholder="搜尋電影、電視節目或人物"
          class="w-full rounded-md py-1 pr-2 pl-8 text-gray-800 focus:outline-none"
          @keyup.enter="handleSearch"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const searchQuery = ref<string>("");

const menuItems = [
  {
    title: "熱門",
    subMenu: [
      {
        name: "熱門電影",
        link: "/movie",
      },
      {
        name: "上映中",
        link: "/movie/now-playing",
      },
      {
        name: "即將上映",
        link: "/movie/upcoming",
      },
      {
        name: "評分最高",
        link: "/movie/top-rated",
      },
    ],
  },
  {
    title: "電視節目",
    subMenu: [
      {
        name: "熱門",
        link: "/tv",
      },
      {
        name: "今日播出",
        link: "/tv/airing-today",
      },
      {
        name: "電視播出",
        link: "/tv/on-the-air",
      },
      {
        name: "評分最高",
        link: "/tv/top-rated",
      },
    ],
  },
  {
    title: "人物",
    subMenu: [
      {
        name: "熱門人物",
        link: "/person",
      },
    ],
  },
];

/** 搜尋 */
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: "search",
      query: { search: searchQuery.value },
    });
  }
};
</script>

<style scoped></style>
