<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-2xl mx-auto px-4 py-12">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ $t('standard.title') }}</h1>
        <p class="text-gray-600 mb-4">
          {{ $t('standard.subtitle') }}
        </p>
        <div class="inline-flex items-center bg-blue-50 px-4 py-2 rounded-lg">
          <span class="text-gray-600">$14{{ $t('common.pricing.perUser') }}</span>
        </div>
      </div>
      
      <div class="bg-gray-50 p-6 mb-6">
        <form @submit.prevent="getPromoCode" class="space-y-6">
          <RegionSelector v-model="selectedRegion" />

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

          <div v-else-if="promoCode" class="bg-white border border-gray-200 p-4 text-center">
            <Notification
              v-if="notification.show && notification.type === 'success'"
              :message="notification.message"
              :type="notification.type"
              class="mb-4"
            />
            <h3 class="text-sm font-medium text-gray-700 mb-2">{{ $t('common.promoCodeTitle') }}</h3>
            <div 
              class="text-2xl font-mono bg-gray-50 p-3 border border-gray-100 mb-2 text-green-600 cursor-pointer hover:bg-gray-100 transition-colors"
              @click="copyToClipboard(promoCode)"
              title="Click to copy"
            >
              {{ promoCode }}
            </div>
            <p class="text-sm text-gray-700">
              {{ $t('common.useCodeMessage') }}
            </p>
          </div>

          <div v-if="loading && previousCodes.length > 0" class="mt-4 bg-white border border-blue-200 p-4">
            <SkeletonLoader type="text" class="mb-4" />
            <div class="space-y-3">
              <div v-for="i in previousCodes.length" :key="i" class="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div v-else-if="previousCodes.length > 0" class="mt-4 bg-white border border-blue-200 p-4">
            <h3 class="text-sm font-medium text-gray-700 mb-4 text-center">Previously Claimed Codes</h3>
            <div class="space-y-3">
              <div 
                v-for="code in previousCodes" 
                :key="code" 
                class="font-mono bg-gray-50 p-3 border border-gray-100 text-center text-green-600 cursor-pointer hover:bg-gray-100 transition-colors"
                @click="copyToClipboard(code)"
                title="Click to copy"
              >
                {{ code }}
              </div>
            </div>
          </div>

          <Notification
            v-if="notification.show && notification.type !== 'success'"
            :message="notification.message"
            :type="notification.type"
          />

          <button
            type="submit"
            class="w-full bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="loading || !selectedRegion"
          >
            <span v-if="loading">{{ $t('common.processing') }}</span>
            <span v-else>{{ $t('common.getPromoCode') }}</span>
          </button>
           
          <div class="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-center">
            <svg class="h-5 w-5 text-yellow-600 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a 9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ $t('common.limitedAvailability') }}
          </div>
        </form>
      </div>

      <!-- Features Section -->
      <div class="mt-12 space-y-8">
        <div class="bg-white border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">{{ $t('standard.features.title') }}</h2>
          <div class="space-y-4">
            <div v-for="(feature, key) in features" :key="key" class="flex items-start">
              <svg class="h-5 w-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 class="text-sm font-medium text-gray-900">{{ $t(`standard.features.${key}.title`) }}</h3>
                <p class="text-sm text-gray-600">{{ $t(`standard.features.${key}.description`) }}</p>
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
const email = ref('')
const promoCode = ref('')
const previousCodes = ref([])
const loading = ref(false)
const { t } = useI18n()
const selectedRegion = ref('')
const notification = ref({
  show: false,
  message: '',
  type: 'error'
})

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    showNotification('Code copied to clipboard!', 'success')
  } catch (err) {
    showNotification('Failed to copy code', 'error')
  }
}

const features = {
  email: {},
  meetings: {},
  storage: {}
}

useHead({
  title: 'Google Workspace Business Standard Promo Code - 10% Discount',
  meta: [
    {
      name: 'description',
      content: 'Get your exclusive 10% discount promo code for Google Workspace Business Standard plan.'
    }
  ]
})

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

async function getPromoCode() {
  if (!selectedRegion.value) return
  
  loading.value = true
  let claimedCodeId = null
  notification.value.show = false
  
  try {
    const userIp = await useUserIp()

    // Get all previously claimed codes for this IP address
    const { data: existingClaims, error: claimsError } = await supabase
      .from('user_claims')
      .select('promo_code_id')
      .eq('ip_address', userIp)

    if (claimsError) throw claimsError

    if (existingClaims && existingClaims.length > 0) {
      // Get all previously claimed codes
      const { data: claimedCodes } = await supabase
        .from('promo_codes')
        .select('code')
        .in('id', existingClaims.map(claim => claim.promo_code_id))

      if (claimedCodes) {
        previousCodes.value = claimedCodes.map(code => code.code)
        
        if (existingClaims.length >= 3) {
          showNotification(
            `You have already claimed the maximum of 3 promo codes: ${previousCodes.value.join(', ')}`,
            'warning'
          )
          loading.value = false
          return
        }
      }
    }

    // Get new unclaimed code
    const { data: newCode, error: codeError } = await supabase
      .from('promo_codes')
      .select('id, code')
      .match({
        type: 'standard',
        region: selectedRegion.value,
        is_claimed: false
      })
      .filter('id', 'not.in', `(${existingClaims?.map(claim => claim.promo_code_id).join(',') || ''})`)
      .limit(1)
      .single()

    if (codeError) throw codeError

    if (newCode) {
      claimedCodeId = newCode.id

      // Mark code as claimed immediately
      const { error: updateError } = await supabase
        .from('promo_codes')
        .update({ is_claimed: true })
        .eq('id', newCode.id)

      if (updateError) throw updateError

      // Create claim record with IP
      const { error: claimError } = await supabase
        .from('user_claims')
        .insert([
          { 
            promo_code_id: newCode.id,
            type: 'standard',
            region: selectedRegion.value,
            ip_address: userIp
          }
        ])

      if (claimError) throw claimError

      // Add new code to display
      promoCode.value = newCode.code
      previousCodes.value = [...previousCodes.value, newCode.code]

      // Save email if provided (don't wait for this)
      if (email.value) {
        supabase.from('business_emails').insert([
          { email: email.value }
        ]).then()
      }

      showNotification('Successfully retrieved your promo code!', 'success')
    } else {
      throw new Error('No available promo codes')
    }
  } catch (error) {
    console.error('Error:', error)
    // If we failed after setting the code as claimed, try to revert it
    if (claimedCodeId) {
      await supabase
        .from('promo_codes')
        .update({ is_claimed: false })
        .eq('id', claimedCodeId)
    }
    promoCode.value = ''
    showNotification(error.message || 'Failed to get promo code. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>
