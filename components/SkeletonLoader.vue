<template>
  <div class="animate-pulse">
    <div v-if="type === 'text'" class="h-4 bg-gray-200 rounded w-3/4"></div>
    
    <div v-else-if="type === 'title'" class="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
    
    <div v-else-if="type === 'card'" class="bg-white border border-gray-200 p-6 rounded-lg">
      <div class="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div class="space-y-3">
        <div class="h-4 bg-gray-200 rounded"></div>
        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        <div class="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>

    <div v-else-if="type === 'form'" class="space-y-4">
      <div class="h-8 bg-gray-200 rounded"></div>
      <div class="h-10 bg-gray-200 rounded"></div>
      <div class="h-10 bg-gray-200 rounded"></div>
    </div>

    <div v-else-if="type === 'feed'" class="space-y-6">
      <div v-for="i in count" :key="i" class="bg-white border border-gray-200 p-6">
        <div class="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div class="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div class="space-y-2">
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['text', 'title', 'card', 'form', 'feed'].includes(value)
  },
  count: {
    type: Number,
    default: 3
  }
})
</script>
