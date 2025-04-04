<template>
  <div class="space-y-6">
    <!-- Coupon Statistics -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Coupon Statistics</h3>
      
      <!-- Region Tabs -->
      <div class="border-b border-gray-200 mb-4">
        <nav class="flex space-x-4" aria-label="Region tabs">
          <button
            v-for="region in regions"
            :key="region.value"
            @click="selectedRegion = region.value"
            :class="[
              'px-3 py-2 text-sm font-medium border-b-2',
              selectedRegion === region.value
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ region.label }}
          </button>
        </nav>
      </div>

      <!-- Statistics Grid -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Starter Statistics -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="text-sm font-medium text-gray-900 mb-3">Business Starter</h4>
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Available:</span>
              <span class="text-sm font-medium text-green-600">
                {{ getAvailableCount('starter', selectedRegion) }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Used:</span>
              <span class="text-sm font-medium text-blue-600">
                {{ getUsedCount('starter', selectedRegion) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Standard Statistics -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="text-sm font-medium text-gray-900 mb-3">Business Standard</h4>
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Available:</span>
              <span class="text-sm font-medium text-green-600">
                {{ getAvailableCount('standard', selectedRegion) }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Used:</span>
              <span class="text-sm font-medium text-blue-600">
                {{ getUsedCount('standard', selectedRegion) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="canManageCodes" class="bg-white border border-gray-200 rounded-lg">
      <!-- Add New Promo Code -->
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Add New Promo Code</h3>
        <form @submit.prevent="addPromoCode" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Code Type</label>
              <select 
                v-model="newCode.type"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                required
              >
                <option value="starter">Business Starter</option>
                <option value="standard">Business Standard</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select 
                v-model="newCode.region"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                required
              >
                <option value="americas">Americas</option>
                <option value="asia_pacific">Asia Pacific</option>
                <option value="emea">EMEA</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
            <input 
              v-model="newCode.code"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              required
              pattern="[A-Z0-9]{15}"
              title="Code must be 15 characters long and contain only uppercase letters and numbers"
            >
          </div>
          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              :disabled="loading"
            >
              {{ loading ? 'Adding...' : 'Add Promo Code' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Available Codes List -->
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Available Codes</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="code in availableCodes" :key="code.id">
                <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ code.code }}</td>
                <td class="px-4 py-3 text-sm text-gray-500">{{ code.type }}</td>
                <td class="px-4 py-3 text-sm text-gray-500">{{ code.region }}</td>
                <td class="px-4 py-3 text-sm text-gray-500">{{ formatDate(code.created_at) }}</td>
                <td class="px-4 py-3 text-sm text-right">
                  <button
                    @click="confirmDelete(code)"
                    class="text-red-600 hover:text-red-800"
                    title="Delete code"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Claimed Codes List -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Claimed Codes</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Claimed By</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Claimed At</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="claim in claimedCodes" :key="claim.id">
              <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ claim.promo_codes.code }}</td>
              <td class="px-4 py-3 text-sm text-gray-500">{{ claim.type }}</td>
              <td class="px-4 py-3 text-sm text-gray-500">{{ claim.region }}</td>
              <td class="px-4 py-3 text-sm text-gray-500">{{ claim.ip_address }}</td>
              <td class="px-4 py-3 text-sm text-gray-500">{{ formatDate(claim.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
        <p class="text-sm text-gray-600 mb-4">
          Are you sure you want to delete the promo code <span class="font-medium">{{ selectedCode?.code }}</span>?
          This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
          >
            Cancel
          </button>
          <button
            @click="deleteCode"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const loading = ref(false)
const claimedCodes = ref([])
const availableCodes = ref([])
const selectedRegion = ref('americas')
const showDeleteModal = ref(false)
const selectedCode = ref(null)

const props = defineProps({
  userId: {
    type: String,
    required: true
  }
})

const canManageCodes = computed(() => {
  return props.userId === 'd38b6b3e-189c-47ce-b6a6-48187d160ebd'
})

const regions = [
  { value: 'americas', label: 'Americas' },
  { value: 'asia_pacific', label: 'Asia Pacific' },
  { value: 'emea', label: 'EMEA' }
]

const newCode = ref({
  code: '',
  type: 'starter',
  region: 'americas'
})

// Format date
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Get available count for type and region
function getAvailableCount(type, region) {
  return availableCodes.value.filter(
    code => code.type === type && code.region === region
  ).length
}

// Get used count for type and region
function getUsedCount(type, region) {
  return claimedCodes.value.filter(
    claim => claim.type === type && claim.region === region
  ).length
}

// Confirm delete
function confirmDelete(code) {
  selectedCode.value = code
  showDeleteModal.value = true
}

// Add new promo code
async function addPromoCode() {
  if (!canManageCodes) return
  
  loading.value = true
  try {
    const { error } = await supabase
      .from('promo_codes')
      .insert([{
        code: newCode.value.code,
        type: newCode.value.type,
        region: newCode.value.region,
        is_claimed: false
      }])
    
    if (error) throw error

    // Reset form
    newCode.value = {
      code: '',
      type: 'starter',
      region: 'americas'
    }

    // Refresh data
    await Promise.all([
      fetchClaimedCodes(),
      fetchAvailableCodes()
    ])

    // Emit event to refresh stats
    emit('code-added')
  } catch (error) {
    console.error('Error adding promo code:', error)
  } finally {
    loading.value = false
  }
}

// Delete promo code
async function deleteCode() {
  if (!canManageCodes || !selectedCode.value) return
  
  try {
    const { error } = await supabase
      .from('promo_codes')
      .delete()
      .eq('id', selectedCode.value.id)

    if (error) throw error

    // Close modal
    showDeleteModal.value = false
    selectedCode.value = null

    // Refresh data
    await Promise.all([
      fetchClaimedCodes(),
      fetchAvailableCodes()
    ])

    // Emit event to refresh stats
    emit('code-deleted')
  } catch (error) {
    console.error('Error deleting promo code:', error)
  }
}

// Fetch claimed codes
async function fetchClaimedCodes() {
  try {
    const { data, error } = await supabase
      .from('user_claims')
      .select(`
        id,
        type,
        region,
        ip_address,
        created_at,
        promo_codes (
          code
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error;
    claimedCodes.value = data
  } catch (error) {
    console.error('Error fetching claimed codes:', error)
  }
}

// Fetch available codes
async function fetchAvailableCodes() {
  try {
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('is_claimed', false)
      .order('created_at', { ascending: false })

    if (error) throw error
    availableCodes.value = data
  } catch (error) {
    console.error('Error fetching available codes:', error)
  }
}

// Define emits
const emit = defineEmits(['code-added', 'code-deleted'])

// Watch region changes to refresh data
watch(selectedRegion, () => {
  Promise.all([
    fetchClaimedCodes(),
    fetchAvailableCodes()
  ])
})

// Initial fetch
onMounted(() => {
  Promise.all([
    fetchClaimedCodes(),
    fetchAvailableCodes()
  ])
})
</script>
