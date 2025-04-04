<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">{{ $t('standard.title') }}</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">{{ $t('standard.claimTitle') }}</h2>
      
      <div v-if="loading" class="flex justify-center my-8">
        <SkeletonLoader />
      </div>
      
      <div v-else-if="claimed" class="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800">{{ $t('standard.success') }}</h3>
            <div class="mt-2 text-sm text-green-700">
              <p>{{ $t('standard.codeInfo') }}</p>
              <p class="mt-2 font-mono font-bold text-lg">{{ claimedCode }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">{{ $t('standard.error') }}</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ errorMessage }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else>
        <p class="mb-4">{{ $t('standard.description') }}</p>
        
        <form @submit.prevent="claimPromoCode" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('standard.emailLabel') }}</label>
            <input 
              id="email"
              v-model="email" 
              type="email" 
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label for="region" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('standard.regionLabel') }}</label>
            <select 
              id="region"
              v-model="region" 
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="americas">{{ $t('regions.americas') }}</option>
              <option value="emea">{{ $t('regions.emea') }}</option>
              <option value="asia_pacific">{{ $t('regions.asiaPacific') }}</option>
            </select>
          </div>
          
          <div class="pt-2">
            <button 
              type="submit" 
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              :disabled="loading"
            >
              {{ $t('standard.claimButton') }}
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <div class="prose max-w-none">
      <h2>{{ $t('standard.featuresTitle') }}</h2>
      <ul>
        <li>{{ $t('standard.feature1') }}</li>
        <li>{{ $t('standard.feature2') }}</li>
        <li>{{ $t('standard.feature3') }}</li>
        <li>{{ $t('standard.feature4') }}</li>
        <li>{{ $t('standard.feature5') }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const { t } = useI18n()

const email = ref('')
const region = ref('americas')
const loading = ref(false)
const claimed = ref(false)
const claimedCode = ref('')
const error = ref(false)
const errorMessage = ref('')

async function claimPromoCode() {
  loading.value = true
  error.value = false
  
  try {
    // Get user IP
    const userIp = await useUserIp()
    
    // Check if user has already claimed this type of code
    const { data: existingClaims, error: claimCheckError } = await supabase
      .from('user_claims')
      .select('id')
      .eq('ip_address', userIp)
      .eq('type', 'standard')
    
    if (claimCheckError) throw claimCheckError
    
    if (existingClaims && existingClaims.length > 0) {
      error.value = true
      errorMessage.value = t('standard.alreadyClaimed')
      return
    }
    
    // Get an available promo code
    const { data: availableCodes, error: codeError } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('is_claimed', false)
      .eq('type', 'standard')
      .eq('region', region.value)
      .limit(1)
    
    if (codeError) throw codeError
    
    if (!availableCodes || availableCodes.length === 0) {
      error.value = true
      errorMessage.value = t('standard.noCodesAvailable')
      return
    }
    
    const promoCode = availableCodes[0]
    
    // Begin a transaction using RPC (stored procedure)
    const { data: claimResult, error: claimError } = await supabase.rpc('claim_promo_code', {
      p_code_id: promoCode.id,
      p_ip_address: userIp,
      p_type: 'standard',
      p_region: region.value,
      p_email: email.value
    })
    
    if (claimError) {
      console.error('Error claiming code:', claimError)
      error.value = true
      errorMessage.value = t('standard.claimError')
      return
    }
    
    // Success
    claimed.value = true
    claimedCode.value = promoCode.code
    
    // Store email if provided
    if (email.value) {
      await supabase.from('business_emails').insert([{ email: email.value }])
    }
    
  } catch (err) {
    console.error('Error in claim process:', err)
    error.value = true
    errorMessage.value = t('standard.generalError')
  } finally {
    loading.value = false
  }
}
</script>
