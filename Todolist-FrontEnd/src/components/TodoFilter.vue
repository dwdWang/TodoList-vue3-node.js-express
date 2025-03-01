<template>
  <div class="flex justify-center space-x-4 mb-8">
    <button
      v-for="filter in filters"
      :key="filter.value"
      @click="$emit('update:modelValue', filter.value)"
      :class="[
        'px-4 py-2 rounded-full transition-all duration-200',
        modelValue === filter.value
          ? 'bg-primary-500 text-white'
          : 'text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-dark-200'
      ]"
    >
      {{ filter.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: 'all' | 'active' | 'completed'
}>()

defineEmits<{
  (e: 'update:modelValue', value: 'all' | 'active' | 'completed'): void
}>()

const filters = [
  { label: '全部', value: 'all' },
  { label: '进行中', value: 'active' },
  { label: '已完成', value: 'completed' }
] as const
</script>
