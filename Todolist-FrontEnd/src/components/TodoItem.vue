<template>
  <div :class="[
    'group flex items-center p-4 rounded-lg transition-all duration-200',
    'hover:bg-primary-50 dark:hover:bg-dark-200',
    'animate-slide-in'
  ]">
    <button
      @click="$emit('toggle')"
      :class="[
        'w-6 h-6 rounded-full border-2 mr-4 transition-all duration-200',
        completed ? 'bg-primary-500 border-primary-500' : 'border-gray-300 dark:border-gray-600'
      ]"
    >
      <svg
        v-if="completed"
        xmlns="http://www.w3.org/2000/svg"
        class="h-full w-full text-white p-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
    <span :class="[
      'flex-1 text-lg transition-all duration-200',
      completed ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-200'
    ]">
      {{ title }}
    </span>
    <button
      @click="$emit('delete')"
      class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  completed: boolean
}>()

defineEmits<{
  (e: 'toggle'): void
  (e: 'delete'): void
}>()
</script>
