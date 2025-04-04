<template>
  <div class="min-h-screen bg-white">
    <!-- Admin Header -->
    <nav class="bg-white border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-4">
        <div class="flex justify-between h-14">
          <div class="flex">
            <NuxtLink to="/" class="flex items-center">
              <svg class="h-6 w-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-4">
            <span v-if="user" class="text-sm text-gray-700">{{ user.email }}</span>
            <button
              v-if="user"
              @click="handleSignOut"
              class="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-700"
            >
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 py-12">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p class="text-gray-600">Manage promo codes and monitor usage</p>
      </div>

      <Notification
        v-if="notification.show"
        :message="notification.message"
        :type="notification.type"
      />

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white border border-gray-200 p-6 rounded-lg">
          <div class="flex items-center justify-between mb-1">
            <h3 class="text-sm font-medium text-gray-900">Total Users</h3>
            <svg class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p class="text-2xl font-bold text-gray-900">{{ stats.totalUsers }}</p>
        </div>
        <div class="bg-white border border-gray-200 p-6 rounded-lg">
          <div class="flex items-center justify-between mb-1">
            <h3 class="text-sm font-medium text-gray-900">Active Codes</h3>
            <svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <p class="text-2xl font-bold text-gray-900">{{ stats.activePromoCodes }}</p>
        </div>
        <div class="bg-white border border-gray-200 p-6 rounded-lg">
          <div class="flex items-center justify-between mb-1">
            <h3 class="text-sm font-medium text-gray-900">Claimed Codes</h3>
            <svg class="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <p class="text-2xl font-bold text-gray-900">{{ stats.claimedCodes }}</p>
        </div>
      </div>

      <!-- Promo Code Manager -->
      <PromoCodeManager 
        @code-added="handleCodeAdded" 
        @code-deleted="handleCodeDeleted"
        :user-id="user?.id"
      />

      <!-- Robots.txt Editor -->
      <div class="mt-8" v-if="canManageRobots">
        <RobotsEditor @saved="handleRobotsSaved" />
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()
const isLoading = ref(true)

// Add loading state
const stats = ref({
  totalUsers: 0,
  activePromoCodes: 0,
  claimedCodes: 0
})

const notification = ref({
  show: false,
  message: '',
  type: 'success'
})

// Check if user can manage robots.txt
const canManageRobots = computed(() => {
  return user.value?.id === 'd38b6b3e-189c-47ce-b6a6-48187d160ebd'
})

// Check admin access before showing content
async function checkAdminAccess() {
  if (!user.value) {
    router.push('/login')
    return false
  }

  try {
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select()
      .eq('user_id', user.value.id)
      .single()

    if (!adminUser) {
      router.push('/login')
      return false
    }

    return true
  } catch (error) {
    console.error('Error checking admin status:', error)
    router.push('/login')
    return false
  }
}

function showNotification(message, type = 'success') {
  notification.value = {
    show: true,
    message,
    type
  }
  setTimeout(() => {
    notification.value.show = false
  }, 5000)
}

// Handle code added
function handleCodeAdded() {
  fetchDashboardData()
  showNotification('Promo code added successfully')
}

// Handle code deleted
function handleCodeDeleted() {
  fetchDashboardData()
  showNotification('Promo code deleted successfully')
}

// Handle robots.txt saved
function handleRobotsSaved(message, type = 'success') {
  showNotification(message, type)
}

// Handle Sign Out
async function handleSignOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.push('/login')
  } catch (error) {
    console.error('Error signing out:', error)
    showNotification('Error signing out. Please try again.', 'error')
  }
}

async function fetchDashboardData() {
  if (!user.value) return

  try {
    const hasAccess = await checkAdminAccess()
    if (!hasAccess) return

    // Update last login
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('user_id', user.value.id)

    // Fetch stats
    const [
      { count: totalUsers },
      { count: activePromoCodes },
      { count: claimedCodes }
    ] = await Promise.all([
      supabase.from('business_emails').select('id', { count: 'exact' }),
      supabase.from('promo_codes').select('id', { count: 'exact' }).eq('is_claimed', false),
      supabase.from('user_claims').select('id', { count: 'exact' })
    ])

    stats.value = {
      totalUsers: totalUsers || 0,
      activePromoCodes: activePromoCodes || 0,
      claimedCodes: claimedCodes || 0
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    showNotification('Error fetching dashboard data', 'error')
  } finally {
    isLoading.value = false
  }
}

// Watch for user changes
watch(user, (newUser) => {
  if (newUser) {
    fetchDashboardData()
  } else {
    router.push('/login')
  }
})

// Initial fetch
onMounted(async () => {
  const hasAccess = await checkAdminAccess()
  if (hasAccess) {
    await fetchDashboardData()
  }
})

useHead({
  title: 'Admin Dashboard - Google Workspace Promo Codes',
  meta: [
    {
      name: 'description',
      content: 'Admin dashboard for managing Google Workspace promo codes and monitoring usage.'
    }
  ]
})
</script>
