<template>
  <div class="mx-auto flex max-w-[1400px] gap-4 p-4">
    <div class="inline-flex w-[260px] flex-col gap-4">
      <div class="border-2 border-gray-300">
        <h3 class="bg-blue-400 p-5 text-white">{{ "搜尋結果" }}</h3>
        <ul class="cursor-pointer py-2">
          <li
            @click="searchType = item.type"
            class="px-5 py-2.5 hover:bg-gray-200"
            :class="{ 'bg-gray-200': searchType === item.type }"
            v-for="item in searchList"
            :key="item.type"
          >
            {{ item.name
            }}<span class="text-gray-400">({{ searchResults[item.type]?.total_results }})</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 列表 -->
    <div class="inline-flex w-[calc(100%-276px)] flex-col gap-4">
      <div
        class="flex gap-4 overflow-hidden rounded-2xl border-2 border-gray-100 shadow-xl"
        v-for="item in searchResults[searchType]?.results"
        :key="item.id"
      >
        <img
          :class="[
            'object-cover transition-opacity duration-500',
            searchType === 'person' ? 'h-[70px] w-[70px]' : 'h-[141px]',
            item.imgLoaded ? 'opacity-100' : 'opacity-0',
          ]"
          :src="
            !item.imgLoaded
              ? '/img/default.png'
              : item.poster_path
                ? `https://media.themoviedb.org/t/p/w94_and_h141_bestv2/${item.poster_path}`
                : item.profile_path
                  ? `https://media.themoviedb.org/t/p/w94_and_h141_bestv2/${item.profile_path}`
                  : '/img/default.png'
          "
          @load="item.imgLoaded = true"
          alt="poster_path"
        />

        <div class="flex flex-col justify-between py-2 pr-4">
          <div class="flex flex-col gap-1">
            <h1 class="flex gap-1 text-xl font-bold text-black">
              {{ item.title || item.name }}
              <span class="flex items-center font-light text-gray-400">{{
                `(${item.original_title || item.original_name})`
              }}</span>
            </h1>
            <span class="text-gray-400">{{ item.release_date || item.first_air_date }}</span>
          </div>
          <p v-if="searchType !== 'person'" class="line-clamp-2 font-bold">
            {{ item.overview || "暫無內容" }}
          </p>
          <p v-else class="line-clamp-2 font-bold">
            {{ handleDepartmentName(item.known_for_department) + "•" }}
            <span
              class="text-gray-500"
              v-for="(people, index) in item.known_for"
              :key="people.title"
            >
              {{ people.title || people.name }}
              {{ index === item.known_for.length - 1 ? "" : "," }}
            </span>
          </p>
        </div>
      </div>

      <Pagination
        v-if="searchResults[searchType]?.page"
        @change="handlePageChange"
        :currentPage="searchResults[searchType]?.page"
        :totalPages="searchResults[searchType]?.total_pages"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { reactive, ref, watchEffect } from "vue";
import { getSearchMovie, getSearchTv, getSearchPerson, getSearchCollection } from "@/services/tmdb";
import Pagination from "@/components/Pagination.vue";

const searchList = [
  {
    name: "電影",
    type: "movie",
  },
  {
    name: "電視節目",
    type: "tv",
  },
  {
    name: "人物",
    type: "person",
  },
  {
    name: "系列",
    type: "collection",
  },
];

const route = useRoute();

interface Results {
  id: number;
  name?: string;
  title?: string;
  original_title?: string;
  original_name?: string;
  poster_path?: string;
  release_date?: string;
  overview?: string;
  media_type?: string;
  first_air_date?: string;
  profile_path?: string;
  known_for_department?: string;
  imgLoaded?: boolean;
  known_for: {
    title?: string;
    original_title?: string;
    name?: string;
  }[];
}

interface SearchResultsType {
  [key: string]: { results: Results[]; total_results: number; total_pages: number; page: number };
}

const searchResults = reactive<SearchResultsType>({
  movie: { results: [], total_results: 0, total_pages: 0, page: 0 },
  tv: { results: [], total_pages: 0, total_results: 0, page: 0 },
  person: { results: [], total_pages: 0, total_results: 0, page: 0 },
  collection: { results: [], total_pages: 0, total_results: 0, page: 0 },
});

/** 搜尋參數 */
interface SearchParams {
  query: string;
  page?: number;
}

/** 搜尋 API */
const apiMap: Record<
  string,
  (params: SearchParams) => Promise<{
    data: { results: Results[]; total_results: number; total_pages: number; page: number };
  }>
> = {
  movie: getSearchMovie,
  tv: getSearchTv,
  person: getSearchPerson,
  collection: getSearchCollection,
};

/** 搜尋類型 */
const searchType = ref<string>("movie");

/** 搜尋 */
const fetchSearch = async (type: string, query: string, page: number = 1) => {
  if (!apiMap[type]) return;
  const res = await apiMap[type]({ query, page });
  if (searchResults[type]) {
    searchResults[type] = {
      ...res.data,
      results: res.data.results.map((item) => ({
        ...item,
        imgLoaded: false,
      })),
    };
  }
};

watchEffect(() => {
  const query = route.query.search;
  if (!query || Array.isArray(query)) return;

  const q = query as string;
  Object.keys(apiMap).forEach((type) => {
    fetchSearch(type, q);
  });
});

/** 改變頁數 */
const handlePageChange = (page: number) => {
  fetchSearch(searchType.value, route.query.search as string, page);
};

const handleDepartmentName = (name: string = "") => {
  switch (name) {
    case "Acting":
      return "演出";
    case "Visual Effects":
      return "視覺特效";
    case "Writing":
      return "編劇";
    case "Directing":
      return "導演";
    case "Production":
      return "製作";
    case "Creator":
      return "創作人";
    case "Lighting":
      return "燈光";
    default:
      return "未知";
  }
};
</script>

<style scoped></style>
