<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-2xl mx-auto px-4 py-12">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ $t('updates.title') }}</h1>
        <p class="text-gray-600 mb-4">
          {{ $t('updates.subtitle') }}
        </p>
        <a 
          href="https://workspaceupdates.googleblog.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          {{ $t('updates.viewOfficialBlog') }}
          <svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      <SkeletonLoader v-if="pending" type="feed" :count="5" />

      <div v-else-if="error" class="bg-red-50 border border-red-100 p-6 rounded-lg">
        <div class="flex items-center text-red-700 mb-2">
          <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-medium">{{ $t('updates.error') }}</span>
        </div>
        <p class="text-red-600 text-sm">{{ error.message || $t('updates.errorMessage') }}</p>
      </div>

      <div v-else-if="!data?.items?.length" class="bg-yellow-50 border border-yellow-100 p-6 rounded-lg">
        <div class="flex items-center text-yellow-700 mb-2">
          <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-medium">{{ $t('updates.noUpdates') }}</span>
        </div>
        <p class="text-yellow-600 text-sm">{{ $t('updates.checkBack') }}</p>
      </div>

      <div v-else class="space-y-6">
        <article 
          v-for="item in data.items" 
          :key="item.link" 
          class="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-colors duration-200"
        >
          <h2 class="text-lg font-semibold text-gray-900 mb-2">
            {{ item.title }}
          </h2>
          <div class="text-sm text-gray-500 mb-3">
            <time :datetime="item.date">
              {{ formatDate(item.date) }}
            </time>
          </div>
          <p class="text-gray-600 text-sm leading-relaxed mb-4">{{ item.content }}</p>
          <a 
            :href="item.link" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            {{ $t('updates.readMore') }}
            <svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data, pending, error } = await useFetch('/api/feed')
const { locale } = useI18n()

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString(locale.value, { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  })
}

useHead(() => ({
  title: locale.value === 'en' ? 'Google Workspace Product Updates' :
         locale.value === 'fr' ? 'Mises à jour des produits Google Workspace' :
         locale.value === 'es' ? 'Actualizaciones de productos de Google Workspace' :
         locale.value === 'pt' ? 'Atualizações de produtos do Google Workspace' :
         locale.value === 'de' ? 'Google Workspace Produkt-Updates' :
         locale.value === 'ja' ? 'Google Workspace 製品アップデート' :
         locale.value === 'hi' ? 'Google Workspace उत्पाद अपडेट' :
         locale.value === 'ru' ? 'Обновления продуктов Google Workspace' :
         'Google Workspace Product Updates',
  meta: [
    {
      name: 'description',
      content: locale.value === 'en' ? 'Stay up to date with the latest Google Workspace updates, features, and announcements.' :
              locale.value === 'fr' ? 'Restez à jour avec les dernières mises à jour, fonctionnalités et annonces de Google Workspace.' :
              locale.value === 'es' ? 'Manténgase al día con las últimas actualizaciones, funciones y anuncios de Google Workspace.' :
              locale.value === 'pt' ? 'Fique por dentro das últimas atualizações, recursos e anúncios do Google Workspace.' :
              locale.value === 'de' ? 'Bleiben Sie auf dem Laufenden über die neuesten Google Workspace Updates, Funktionen und Ankündigungen.' :
              locale.value === 'ja' ? 'Google Workspace の最新のアップデート、機能、お知らせをご確認ください。' :
              locale.value === 'hi' ? 'Google Workspace के नवीनतम अपडेट, सुविधाओं और घोषणाओं से अपडेट रहें।' :
              locale.value === 'ru' ? 'Будьте в курсе последних обновлений, функций и объявлений Google Workspace.' :
              'Stay up to date with the latest Google Workspace updates, features, and announcements.'
    }
  ]
}))</script>
