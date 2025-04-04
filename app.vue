<template>
  <div class="min-h-screen bg-white">
    <nav class="bg-white border-b border-gray-200">
      <div class="max-w-2xl mx-auto px-4">
        <div class="flex justify-between h-14">
          <div class="flex items-center">
            <NuxtLink :to="localePath('/')" class="flex items-center">
              <img src="https://assets.gwsave.com/header-logo.svg" alt="GWsave" class="h-4" />
            </NuxtLink>
          </div>
          <div class="flex space-x-4">
            <NuxtLink :to="localePath('/starter')" class="inline-flex items-center px-2 py-1 text-sm text-gray-700 hover:text-blue-600">
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {{ $t('common.menu.starter') }}
            </NuxtLink>
            <NuxtLink :to="localePath('/standard')" class="inline-flex items-center px-2 py-1 text-sm text-gray-700 hover:text-blue-600">
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {{ $t('common.menu.standard') }}
            </NuxtLink>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>

    <main>
      <NuxtPage />
    </main>

    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-2xl mx-auto py-4 px-4">
        <div class="flex justify-center space-x-6 mb-4">
          <NuxtLink :to="localePath('/about')" class="inline-flex items-center text-sm text-gray-600 hover:text-blue-600">
            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ $t('common.menu.about') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/updates')" class="inline-flex items-center text-sm text-gray-600 hover:text-blue-600">
            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            {{ $t('common.menu.updates') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/contact')" class="inline-flex items-center text-sm text-gray-600 hover:text-blue-600">
            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {{ $t('common.menu.contact') }}
          </NuxtLink>
        </div>
        <p class="text-center text-sm text-gray-600">
          {{ $t('common.copyright', { year: new Date().getFullYear() }) }}
        </p>
        <div class="mt-4 text-center text-xs text-gray-500 space-y-2">
          <p>We are not affiliated with Google or Google Workspace. Google Workspace is a trademark of Google LLC.</p>
          <p>We may earn a small affiliate commission when you purchase a Google Workspace plan using our promo codes.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const localePath = useLocalePath()
const { locale } = useI18n()
const route = useRoute()

// Get base URL for canonical links
const baseURL = 'https://gwsave.com'

// Get localized title
const getLocalizedTitle = () => {
  switch (locale.value) {
    case 'fr': return 'Codes promo Google Workspace'
    case 'es': return 'Códigos promocionales de Google Workspace'
    case 'pt': return 'Códigos promocionais do Google Workspace'
    case 'de': return 'Google Workspace Gutscheincodes'
    case 'ja': return 'Google Workspace プロモーションコード'
    case 'hi': return 'Google Workspace प्रोमो कोड'
    case 'ru': return 'Промокоды Google Workspace'
    default: return 'Google Workspace Promo Codes'
  }
}

// Get localized description
const getLocalizedDescription = () => {
  switch (locale.value) {
    case 'fr': return 'Obtenez 10% de réduction exclusive sur les forfaits Google Workspace Business avec nos codes promo.'
    case 'es': return 'Obtenga un 10% de descuento exclusivo en los planes de Google Workspace Business con nuestros códigos promocionales.'
    case 'pt': return 'Obtenha 10% de desconto exclusivo nos planos Google Workspace Business com nossos códigos promocionais.'
    case 'de': return 'Erhalten Sie 10% Rabatt auf Google Workspace Business-Pläne mit unseren Gutscheincodes.'
    case 'ja': return 'プロモーションコードで Google Workspace Business プランが10%オフ。'
    case 'hi': return 'हमारे प्रोमो कोड के साथ Google Workspace बिजनेस प्लान पर 10% की विशेष छूट पाएं।'
    case 'ru': return 'Получите эксклюзивную скидку 10% на планы Google Workspace Business с нашими промокодами.'
    default: return 'Get exclusive 10% discount on Google Workspace Business plans with our promo codes.'
  }
}

// Update meta data based on current locale
useHead({
  htmlAttrs: {
    lang: locale.value
  },
  title: getLocalizedTitle(),
  meta: [
    {
      name: 'description',
      content: getLocalizedDescription()
    },
    // Open Graph tags
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${baseURL}${route.fullPath}` },
    { property: 'og:title', content: getLocalizedTitle() },
    { property: 'og:description', content: getLocalizedDescription() },
    { property: 'og:image', content: `https://assets.gwsave.com/og-image.png` },
    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: `${baseURL}${route.fullPath}` },
    { name: 'twitter:title', content: getLocalizedTitle() },
    { name: 'twitter:description', content: getLocalizedDescription() },
    { name: 'twitter:image', content: `https://assets.gwsave.com/og-image.png` },
    // Additional SEO tags
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'Google Workspace Promos' }
  ],
  // Add JSON-LD structured data
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Google Workspace Promos',
        url: baseURL,
        description: getLocalizedDescription(),
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseURL}/search?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      })
    }
  ],
  // Add language alternates and preconnect links
  link: [
    // Preconnect links
    { rel: 'preconnect', href: 'https://iinwnmqjdemucplpzljf.supabase.co' },
    { rel: 'preconnect', href: 'https://flagcdn.com' },
    // Language alternates
    { rel: 'canonical', href: `${baseURL}${route.fullPath}` },
    { rel: 'alternate', hreflang: 'x-default', href: `${baseURL}${route.fullPath}` },
    { rel: 'alternate', hreflang: 'en', href: `${baseURL}${route.fullPath}` },
    { rel: 'alternate', hreflang: 'fr', href: `${baseURL}/fr${route.fullPath}` },
    { rel: 'alternate', hreflang: 'es', href: `${baseURL}/es${route.fullPath}` },
    { rel: 'alternate', hreflang: 'pt', href: `${baseURL}/pt${route.fullPath}` },
    { rel: 'alternate', hreflang: 'de', href: `${baseURL}/de${route.fullPath}` },
    { rel: 'alternate', hreflang: 'ja', href: `${baseURL}/ja${route.fullPath}` },
    { rel: 'alternate', hreflang: 'hi', href: `${baseURL}/hi${route.fullPath}` },
    { rel: 'alternate', hreflang: 'ru', href: `${baseURL}/ru${route.fullPath}` }
  ]
})
</script>
