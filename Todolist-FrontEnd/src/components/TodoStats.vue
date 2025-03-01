<template>
  <div class="flex items-center justify-between p-4 bg-primary-50 dark:bg-dark-200 rounded-lg mb-6">
    <div class="flex items-center space-x-2">
      <div class="text-primary-600 dark:text-primary-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
        </svg>
      </div>
      <span class="text-gray-600 dark:text-gray-300">总计: {{ total }}</span>
    </div>
    <div class="flex items-center">
      <div class="w-32 h-2 bg-gray-200 dark:bg-dark-300 rounded-full overflow-hidden">
        <div
          class="h-full bg-primary-500 transition-all duration-300"
          :style="{ width: `${percentage}%` }"
        ></div>
      </div>
      <span class="ml-2 text-primary-600 dark:text-primary-400">{{ percentage }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  total: number
  completed: number
}>()

const percentage = computed(() => {
  if (props.total === 0) return 0
  return Math.round((props.completed / props.total) * 100)
})
</script>
