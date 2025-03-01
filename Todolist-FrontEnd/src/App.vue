<template>
  <div :class="[
    'min-h-screen transition-colors duration-300',
    isDark ? 'dark bg-dark-100' : 'bg-gray-50'
  ]">
    <div class="container mx-auto px-4 py-8 max-w-2xl">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Todo List</h1>
        <button @click="() => toggleDark()" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-200">
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </div>

      <div class="mb-6">
        <form @submit.prevent="addTodo" class="flex space-x-2">
          <input
            v-model="newTodo"
            type="text"
            placeholder="添加新的待办事项..."
            class="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-200 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
          <button
            type="submit"
            class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
          >
            添加
          </button>
        </form>
      </div>

      <TodoStats :total="todos.length" :completed="completedCount" />
      <TodoFilter v-model="filter" />

      <TransitionGroup name="list" tag="div" class="space-y-2">
        <TodoItem
          v-for="todo in filteredTodos"
          :key="todo._id"
          :title="todo.value"
          :completed="todo.isCompleted"
          @toggle="handleToggleTodo(todo._id)"
          @delete="handleDeleteTodo(todo._id)"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import TodoItem from './components/TodoItem.vue'
import TodoFilter from './components/TodoFilter.vue'
import TodoStats from './components/TodoStats.vue'
import { fetchTodos, createTodo, toggleTodo, deleteTodo, type Todo } from './api/todo'

// Dark mode setup
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
  storage: localStorage,
  storageKey: 'vueuse-color-scheme',
  onChanged: (dark: boolean) => {
    // 强制更新 DOM
    document.documentElement.classList.toggle('dark', dark)
  }
})
const toggleDark = useToggle(isDark)

// Todo state
const todos = ref<Todo[]>([])
const newTodo = ref('')
const filter = ref<'all' | 'active' | 'completed'>('all')
const isLoading = ref(false)

// Load todos on mount
onMounted(async () => {
  try {
    isLoading.value = true
    todos.value = await fetchTodos()
  } catch (error) {
    console.error('Failed to load todos:', error)
  } finally {
    isLoading.value = false
  }
})

const completedCount = computed(() => todos.value.filter(t => t.isCompleted).length)

const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'active':
      return todos.value.filter(t => !t.isCompleted)
    case 'completed':
      return todos.value.filter(t => t.isCompleted)
    default:
      return todos.value
  }
})

async function addTodo() {
  if (!newTodo.value.trim()) return
  try {
    const todo = await createTodo(newTodo.value.trim())
    todos.value.push(todo)
    newTodo.value = ''
  } catch (error) {
    console.error('Failed to add todo:', error)
  }
}

async function handleToggleTodo(id: string) {
  try {
    const updatedTodo = await toggleTodo(id)
    const index = todos.value.findIndex(t => t._id === id)
    if (index !== -1) {
      todos.value[index] = updatedTodo
    }
  } catch (error) {
    console.error('Failed to toggle todo:', error)
  }
}

async function handleDeleteTodo(id: string) {
  try {
    await deleteTodo(id)
    const index = todos.value.findIndex(t => t._id === id)
    if (index !== -1) {
      todos.value.splice(index, 1)
    }
  } catch (error) {
    console.error('Failed to delete todo:', error)
  }
}
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
