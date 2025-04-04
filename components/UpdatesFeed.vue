<template>
  <div class="bg-white border border-gray-200 p-6">
    <h2 class="text-xl font-semibold text-gray-900 mb-6">{{ $t('updates.title') }}</h2>
    
    <SkeletonLoader v-if="loading" type="feed" :count="3" />

    <div v-else-if="error" class="text-red-600 text-sm">
      {{ $t('updates.error') }}
    </div>

    <div v-else class="space-y-4">
      <div v-for="item in items" :key="item.link" class="flex items-start">
        <svg class="h-5 w-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <div>
          <h3 class="text-sm font-medium text-gray-900">
            <a :href="item.link" target="_blank" rel="noopener noreferrer" class="hover:text-blue-600">
              {{ item.title }}
            </a>
          </h3>
          <p class="text-sm text-gray-600 mt-1">{{ item.content }}</p>
          <div class="text-xs text-gray-500 mt-1">{{ formatDate(item.date) }}</div>
        </div>
      </div>
    </div>

    <div class="mt-4 text-center">
      <NuxtLink 
        :to="localePath('/updates')" 
        class="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        {{ $t('updates.readMore') }}
        <svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { data, pending: loading, error } = await useFetch('/api/feed')
const localePath = useLocalePath()

const items = computed(() => data.value?.items?.slice(0, 3) || [])

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString(useI18n().locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
