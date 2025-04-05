<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-2xl mx-auto px-4 py-12">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          {{ $t('home.title') }}
        </h1>
        <p class="text-gray-600 max-w-xl mx-auto">
          {{ $t('home.subtitle') }}
        </p>
      </div>
      
      <div class="bg-gray-50 p-6 mb-6">
        <form @submit.prevent="getPromoCode" class="space-y-6">
          <!-- Plan Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Select Plan</label>
            <div class="grid grid-cols-2 gap-4">
              <button
                type="button"
                @click="selectedPlan = 'starter'"
                :class="[
                  'p-4 text-left border rounded-lg focus:outline-none',
                  selectedPlan === 'starter'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                ]"
              >
                <div class="font-medium text-gray-900">Business Starter</div>
                <div class="text-sm text-gray-500">$7/user/month</div>
              </button>
              <button
                type="button"
                @click="selectedPlan = 'standard'"
                :class="[
                  'p-4 text-left border rounded-lg focus:outline-none',
                  selectedPlan === 'standard'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                ]"
              >
                <div class="font-medium text-gray-900">Business Standard</div>
                <div class="text-sm text-gray-500">$14/user/month</div>
              </button>
            </div>
          </div>

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
            :disabled="loading || !selectedRegion || !selectedPlan || previousCodes.length >= 3"
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
                <h3 class="text-sm font-medium text-gray-900">{{ $t('common.features.professionalEmail.title') }}</h3>
                <p class="text-sm text-gray-600">{{ $t('common.features.professionalEmail.description') }}</p>
              </div>
            </div>
            <div class="flex items-start">
              <svg class="h-5 w-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 class="text-sm font-medium text-gray-900">{{ $t('common.features.videoMeetings.title') }}</h3>
                <p class="text-sm text-gray-600">{{ $t('common.features.videoMeetings.description') }}</p>
              </div>
            </div>
            <div class="flex items-start">
              <svg class="h-5 w-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 class="text-sm font-medium text-gray-900">{{ $t('common.features.cloudStorage.title') }}</h3>
                <p class="text-sm text-gray-600">{{ $t('common.features.cloudStorage.description') }}</p>
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
const selectedPlan = ref('')
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

const { locale } = useI18n()

useHead(() => ({
  title: locale.value === 'en' ? 'Google Workspace Promo Code 2025 - Save 10%' :
         locale.value === 'fr' ? 'Codes promo Google Workspace 2025 - Économisez 10%' :
         locale.value === 'es' ? 'Códigos promocionales de Google Workspace 2025 - Ahorre 10%' :
         locale.value === 'pt' ? 'Códigos promocionais do Google Workspace 2025 - Economize 10%' :
         locale.value === 'de' ? 'Google Workspace Gutscheincodes 2025 - 10% sparen' :
         locale.value === 'ja' ? 'Google Workspace プロモーションコード 2025 - 10%オフ' :
         locale.value === 'hi' ? 'Google Workspace प्रोमो कोड 2025 - 10% बचाएं' :
         locale.value === 'ru' ? 'Промокоды Google Workspace 2025 - Скидка 10%' :
         'Google Workspace Promo Code 2025 - Save 10%',
  meta: [
    {
      name: 'description',
      content: locale.value === 'en' ? 'Get exclusive 10% discount promo codes for Google Workspace Business plans. Choose your region and get instant access to savings!' :
              locale.value === 'fr' ? 'Obtenez des codes promo exclusifs avec 10% de réduction pour les forfaits Google Workspace Business. Choisissez votre région et économisez instantanément !' :
              locale.value === 'es' ? 'Obtenga códigos promocionales exclusivos con 10% de descuento para planes Google Workspace Business. ¡Elija su región y obtenga acceso instantáneo a los ahorros!' :
              locale.value === 'pt' ? 'Obtenha códigos promocionais exclusivos com 10% de desconto para planos Google Workspace Business. Escolha sua região e tenha acesso instantâneo às economias!' :
              locale.value === 'de' ? 'Erhalten Sie exklusive 10% Rabatt-Gutscheincodes für Google Workspace Business-Pläne. Wählen Sie Ihre Region und sparen Sie sofort!' :
              locale.value === 'ja' ? 'Google Workspace Business プランの10%割引プロモーションコードを取得。地域を選択して即座に割引を適用！' :
              locale.value === 'hi' ? 'Google Workspace बिजनेस प्लान के लिए विशेष 10% छूट प्रोमो कोड प्राप्त करें। अपना क्षेत्र चुनें और तुरंत बचत का लाभ उठाएं!' :
              locale.value === 'ru' ? 'Получите эксклюзивные промокоды со скидкой 10% на планы Google Workspace Business. Выберите свой регион и получите мгновенный доступ к экономии!' :
              'Get exclusive 10% discount promo codes for Google Workspace Business plans. Choose your region and get instant access to savings!'
    }
  ]
}))

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
  if (!selectedRegion.value || !selectedPlan.value) return
  
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
        type: selectedPlan.value,
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
            type: selectedPlan.value,
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

// Load existing codes on mount
onMounted(async () => {
  if (selectedPlan.value && selectedRegion.value) {
    const userIp = await useUserIp()
    const { data: existingClaims } = await supabase
      .from('user_claims')
      .select('promo_code_id')
      .eq('ip_address', userIp)

    if (existingClaims?.length > 0) {
      const { data: claimedCodes } = await supabase
        .from('promo_codes')
        .select('code')
        .in('id', existingClaims.map(claim => claim.promo_code_id))

      if (claimedCodes) {
        previousCodes.value = claimedCodes.map(code => code.code)
      }
    }
  }
})

// Watch for plan/region changes to load existing codes
watch([selectedPlan, selectedRegion], async ([newPlan, newRegion]) => {
  if (newPlan && newRegion) {
    const userIp = await useUserIp()
    const { data: existingClaims } = await supabase
      .from('user_claims')
      .select('promo_code_id')
      .eq('ip_address', userIp)

    if (existingClaims?.length > 0) {
      const { data: claimedCodes } = await supabase
        .from('promo_codes')
        .select('code')
        .in('id', existingClaims.map(claim => claim.promo_code_id))

      if (claimedCodes) {
        previousCodes.value = claimedCodes.map(code => code.code)
      }
    } else {
      previousCodes.value = []
    }
    promoCode.value = ''
  }
})
</script>
