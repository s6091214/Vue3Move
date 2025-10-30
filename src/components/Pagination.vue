<template>
  <div class="flex items-center justify-center gap-2 py-4">
    <!-- 上一頁 -->
    <button
      class="cursor-pointer p-2 disabled:opacity-40"
      :disabled="currentPage === 1"
      @click="emit('change', currentPage - 1)"
    >
      <Icon icon="mdi:chevron-left" class="h-5 w-5" />
    </button>

    <!-- 頁碼 -->
    <button v-if="startPage > 1" class="px-3 py-1" @click="emit('change', 1)">1</button>
    <span v-if="startPage > 2">...</span>

    <button
      v-for="page in pagesToShow"
      :key="page"
      class="cursor-pointer rounded-md px-3 py-1"
      :class="page === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'"
      @click="emit('change', page)"
    >
      {{ page }}
    </button>

    <span v-if="endPage < totalPages - 1">...</span>
    <button v-if="endPage < totalPages" class="px-3 py-1" @click="emit('change', totalPages)">
      {{ totalPages }}
    </button>

    <!-- 下一頁 -->
    <button
      class="cursor-pointer p-2 disabled:opacity-40"
      :disabled="currentPage === totalPages"
      @click="emit('change', currentPage + 1)"
    >
      <Icon icon="mdi:chevron-right" class="h-5 w-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";

interface Props {
  totalPages?: number;
  currentPage?: number;
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  totalPages: 1,
});

const emit = defineEmits<{
  (e: "change", page: number): void;
}>();

/** 開始頁碼 */
const startPage = computed(() => Math.floor((props.currentPage - 1) / 10) * 10 + 1);

/** 結束頁碼 */
const endPage = computed(() => Math.min(startPage.value + 9, props.totalPages));

/** 顯示的頁碼 */
const pagesToShow = computed(() => {
  const pages: number[] = [];
  for (let i = startPage.value; i <= endPage.value; i++) {
    pages.push(i);
  }
  return pages;
});
</script>
