<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-2xl mx-auto px-4 py-12">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ $t('contact.title') }}</h1>
        <p class="text-gray-600">
          {{ $t('contact.subtitle') }}
        </p>
      </div>
      
      <div class="bg-gray-50 p-6 space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-white border border-gray-200">
            <h2 class="text-lg font-medium text-gray-900 mb-2">{{ $t('contact.emailSupport.title') }}</h2>
            <a 
              :href="'mailto:support@gwsave.com'" 
              class="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@gwsave.com
            </a>
          </div>
          
          <div class="p-4 bg-white border border-gray-200">
            <h2 class="text-lg font-medium text-gray-900 mb-2">{{ $t('contact.businessHours.title') }}</h2>
            <div class="space-y-2 text-sm">
              <div class="flex items-center text-gray-600">
                <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ $t('contact.businessHours.hours') }}
              </div>
              <div class="flex items-center text-gray-600">
                <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ $t('contact.businessHours.days') }}
              </div>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 border border-blue-100 p-4">
          <div class="flex items-start">
            <svg class="h-6 w-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div>
              <h2 class="text-lg font-medium text-gray-900 mb-1">{{ $t('contact.response.title') }}</h2>
              <p class="text-sm text-gray-600">
                {{ $t('contact.response.description') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n()

useHead(() => ({
  title: locale.value === 'en' ? 'Contact Us - Google Workspace Promo Codes' :
         locale.value === 'fr' ? 'Contactez-nous - Codes promo Google Workspace' :
         locale.value === 'es' ? 'Contáctenos - Códigos promocionales de Google Workspace' :
         locale.value === 'pt' ? 'Contate-nos - Códigos promocionais do Google Workspace' :
         locale.value === 'de' ? 'Kontaktieren Sie uns - Google Workspace Gutscheincodes' :
         locale.value === 'ja' ? 'お問い合わせ - Google Workspace プロモーションコード' :
         locale.value === 'hi' ? 'संपर्क करें - Google Workspace प्रोमो कोड' :
         locale.value === 'ru' ? 'Свяжитесь с нами - Промокоды Google Workspace' :
         'Contact Us - Google Workspace Promo Codes',
  meta: [
    {
      name: 'description',
      content: locale.value === 'en' ? 'Contact our support team for help with Google Workspace promo codes and discounts.' :
              locale.value === 'fr' ? 'Contactez notre équipe de support pour obtenir de l\'aide avec les codes promo Google Workspace.' :
              locale.value === 'es' ? 'Contacte a nuestro equipo de soporte para obtener ayuda con los códigos promocionales de Google Workspace.' :
              locale.value === 'pt' ? 'Entre em contato com nossa equipe de suporte para obter ajuda com os códigos promocionais do Google Workspace.' :
              locale.value === 'de' ? 'Kontaktieren Sie unser Support-Team für Hilfe mit Google Workspace Gutscheincodes.' :
              locale.value === 'ja' ? 'Google Workspace プロモーションコードについてサポートチームにお問い合わせください。' :
              locale.value === 'hi' ? 'Google Workspace प्रोमो कोड के लिए हमारी सहायता टीम से संपर्क करें।' :
              locale.value === 'ru' ? 'Свяжитесь с нашей службой поддержки для помощи с промокодами Google Workspace.' :
              'Contact our support team for help with Google Workspace promo codes and discounts.'
    }
  ]
}))
</script>
