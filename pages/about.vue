<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-2xl mx-auto px-4 py-12">
      <SkeletonLoader v-if="loading" type="title" class="mb-8" />
      <div v-else class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">About GWsave</h1>
        <p class="text-gray-600">
          {{ $t('about.subtitle') }}
        </p>
      </div>
      
      <SkeletonLoader v-if="loading" type="card" class="mb-8" />
      <div v-else class="bg-gray-50 p-6 space-y-8">
        <p class="text-gray-600">
          {{ $t('about.welcome') }}
        </p>

        <div>
          <h2 class="text-lg font-medium text-gray-900 mb-3">{{ $t('about.whyChoose.title') }}</h2>
          <ul class="space-y-2">
            <li v-for="(feature, index) in features" :key="index" class="flex items-center text-gray-600">
              <svg class="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ $t(`about.whyChoose.features.${feature}`) }}
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-lg font-medium text-gray-900 mb-3">{{ $t('about.howItWorks.title') }}</h2>
          <ol class="space-y-4">
            <li v-for="(step, index) in steps" :key="index" class="flex items-start">
              <span class="flex items-center justify-center bg-blue-600 text-white w-6 h-6 mt-0.5 mr-3 text-sm">{{ index + 1 }}</span>
              <div>
                <h3 class="font-medium mb-1">{{ $t(`about.howItWorks.steps.${step}.title`) }}</h3>
                <p class="text-sm text-gray-600">{{ $t(`about.howItWorks.steps.${step}.description`) }}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const features = [
  'email',
  'meetings',
  'calendars',
  'drive',
  'collaboration'
]

const steps = [
  'choosePlan',
  'getCode',
  'apply'
]

const { locale } = useI18n()

useHead(() => ({
  title: locale.value === 'en' ? 'About GWsave' :
         locale.value === 'fr' ? 'À propos de GWsave' :
         locale.value === 'es' ? 'Acerca de GWsave' :
         locale.value === 'pt' ? 'Sobre GWsave' :
         locale.value === 'de' ? 'Über GWsave' :
         locale.value === 'ja' ? 'GWsaveについて' :
         locale.value === 'hi' ? 'GWsave के बारे में' :
         locale.value === 'ru' ? 'О GWsave' :
         'About GWsave',
  meta: [
    {
      name: 'description',
      content: locale.value === 'en' ? 'Learn about our exclusive 10% discount promo codes for Google Workspace Business plans and how to use them.' :
              locale.value === 'fr' ? 'Découvrez nos codes promo exclusifs avec 10% de réduction pour les forfaits Google Workspace Business et comment les utiliser.' :
              locale.value === 'es' ? 'Conozca nuestros códigos promocionales exclusivos con 10% de descuento para planes Google Workspace Business y cómo usarlos.' :
              locale.value === 'pt' ? 'Saiba mais sobre nossos códigos promocionais exclusivos com 10% de desconto para planos Google Workspace Business e como usá-los.' :
              locale.value === 'de' ? 'Erfahren Sie mehr über unsere exklusiven 10% Rabatt-Gutscheincodes für Google Workspace Business-Pläne und deren Verwendung.' :
              locale.value === 'ja' ? 'Google Workspace Business プランの10%割引プロモーションコードとその使用方法について。' :
              locale.value === 'hi' ? 'Google Workspace बिजनेस प्लान के लिए हमारे विशेष 10% छूट प्रोमो कोड और उनके उपयोग के बारे में जानें।' :
              locale.value === 'ru' ? 'Узнайте о наших эксклюзивных промокодах со скидкой 10% на планы Google Workspace Business и как их использовать.' :
              'Learn about our exclusive 10% discount promo codes for Google Workspace Business plans and how to use them.'
    }
  ]
}))
</script>
