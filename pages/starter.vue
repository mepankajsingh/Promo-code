<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-2xl mx-auto px-4 py-12">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          {{ $t('starter.title') }}
        </h1>
        <p class="text-gray-600 max-w-xl mx-auto">
          {{ $t('starter.subtitle') }}
        </p>
      </div>
      
      <div class="bg-gray-50 p-6 mb-6">
        <form @submit.prevent="claimPromoCode" class="space-y-6">
          <RegionSelector v-model="region" />

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('common.businessEmail') }}</label>
            <input
              v-model="email"
              type="email"
              class="w-full px-3 py-2 border border-gray-300 text-sm"
              :placeholder="$t('common.emailAddresses.placeholder', { email: 'your@business.com' })"
            >
          </div>

          <div v-if="loading" class="bg-white border border-gray-200 p-4 text-center">
            <SkeletonLoader type="text" class="mb-4" />
            <div class="h-12 bg-gray-200 rounded mb-4"></div>
            <SkeletonLoader type="text" />
          </div>

          <div v-else-if="claimed" class="bg-white border border-gray-200 p-4 text-center">
            <Notification
              v-if="notification.show && notification.type === 'success'"
              :message="notification.message"
              :type="notification.type"
              class="mb-4"
            />
            <h3 class="text-sm font-medium text-gray-700 mb-2">{{ $t('common.promoCodeTitle') }}</h3>
            <div 
              class="text-2xl font-mono bg-gray-50 p-3 border border-gray-100 mb-2 text-green-600 cursor-pointer hover:bg-gray-100 transition-colors"
              @click="copyToClipboard(claimedCode)"
              title="Click to copy"
            >
              {{ claimedCode }}
            </div>
            <p class="text-sm text-gray-700">
              {{ $t('common.useCodeMessage') }}
            </p>
          </div>

          <Notification
            v-if="notification.show && notification.type !== 'success'"
            :message="notification.message"
            :type="notification.type"
          />

          <button
            type="submit"
            class="w-full bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="loading || !region"
          >
            <span v-if="loading">{{ $t('common.processing') }}</span>
            <span v-else>{{ $t('common.getPromoCode') }}</span>
          </button>
           
          <div class="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-center">
            <svg class="h-5 w-5 text-yellow-600 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ $t('common.limitedAvailability') }}
          </div>
        </form>
      </div>

      <div class="mt-12 space-y-8">
        <div class="bg-white border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">{{ $t('common.features.title') }}</h2>
          <div class="space-y-4">
            <div class="flex items-start">
              <svg class="h-5 w-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 class="text-sm font-medium text-gray-900">{{ $t('starter.feature1') }}</h3>
              </div>
            </div>
            <div class="flex items-start">
              <svg class="h-5 w-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 class="text-sm font-medium text-gray-900">{{ $t('starter.feature2') }}</h3>
              </div>
            </div>
            <div class="flex items-start">
              <svg class="h-5 w-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 class="text-sm font-medium text-gray-900">{{ $t('starter.feature3') }}</h3>
              </div>
            </div>
          </div>
        </div>

        <UpdatesFeed />
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const { t } = useI18n()

const email = ref('')
const region = ref('')
const loading = ref(false)
const claimed = ref(false)
const claimedCode = ref('')
const error = ref(false)
const errorMessage = ref('')
const notification = ref({
  show: false,
  message: '',
  type: 'error'
})

const { locale } = useI18n()

useHead(() => ({
  title: locale.value === 'en' ? 'Google Workspace Starter Promo Code 2025 - Save 10%' :
         locale.value === 'fr' ? 'Codes promo Google Workspace Starter 2025 - Économisez 10%' :
         locale.value === 'es' ? 'Códigos promocionales de Google Workspace Starter 2025 - Ahorre 10%' :
         locale.value === 'pt' ? 'Códigos promocionais do Google Workspace Starter 2025 - Economize 10%' :
         locale.value === 'de' ? 'Google Workspace Starter Gutscheincodes 2025 - 10% sparen' :
         locale.value === 'ja' ? 'Google Workspace Starter プロモーションコード 2025 - 10%オフ' :
         locale.value === 'hi' ? 'Google Workspace Starter प्रोमो कोड 2025 - 10% बचाएं' :
         locale.value === 'ru' ? 'Промокоды Google Workspace Starter 2025 - Скидка 10%' :
         'Google Workspace Starter Promo Code 2025 - Save 10%',
  meta: [
    {
      name: 'description',
      content: t('starter.metaDescription')
    }
  ]
}))

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    showNotification('Code copied to clipboard!', 'success')
  } catch (err) {
    showNotification('Failed to copy code', 'error')
  }
}

function showNotification(message, type = 'error') {
  notification.value = {
    show: true,
    message: type === 'success' ? t('common.successMessage') : message,
    type
  }
  setTimeout(() => {
    notification.value.show = false
  }, 5000)
}

async function claimPromoCode() {
  loading.value = true
  error.value = false
  notification.value.show = false
  
  try {
    // Get user IP
    const userIp = await useUserIp()
    
    // Check if user has already claimed this type of code
    const { data: existingClaims, error: claimCheckError } = await supabase
      .from('user_claims')
      .select('id')
      .eq('ip_address', userIp)
      .eq('type', 'starter')
    
    if (claimCheckError) throw claimCheckError
    
    if (existingClaims && existingClaims.length > 0) {
      error.value = true
      errorMessage.value = t('starter.alreadyClaimed')
      showNotification(t('starter.alreadyClaimed'), 'warning')
      return
    }
    
    // Get an available promo code
    const { data: availableCodes, error: codeError } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('is_claimed', false)
      .eq('type', 'starter')
      .eq('region', region.value)
      .limit(1)
    
    if (codeError) throw codeError
    
    if (!availableCodes || availableCodes.length === 0) {
      error.value = true
      errorMessage.value = t('starter.noCodesAvailable')
      showNotification(t('starter.noCodesAvailable'), 'warning')
      return
    }
    
    const promoCode = availableCodes[0]
    
    // Begin a transaction using RPC (stored procedure)
    const { data: claimResult, error: claimError } = await supabase.rpc('claim_promo_code', {
      p_code_id: promoCode.id,
      p_ip_address: userIp,
      p_type: 'starter',
      p_region: region.value,
      p_email: email.value
    })
    
    if (claimError) {
      console.error('Error claiming code:', claimError)
      error.value = true
      errorMessage.value = t('starter.claimError')
      showNotification(t('starter.claimError'))
      return
    }
    
    // Success
    claimed.value = true
    claimedCode.value = promoCode.code
    
    // Store email if provided
    if (email.value) {
      await supabase.from('business_emails').insert([{ email: email.value }])
    }
    
    showNotification('Successfully retrieved your promo code!', 'success')
    
  } catch (err) {
    console.error('Error in claim process:', err)
    error.value = true
    errorMessage.value = t('starter.generalError')
    showNotification(t('starter.generalError'))
  } finally {
    loading.value = false
  }
}
</script>
