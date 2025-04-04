<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-2xl mx-auto px-4 py-12">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
        <p class="text-gray-600">Sign in to access the admin dashboard</p>
      </div>
      
      <div class="bg-gray-50 p-6">
        <Notification
          v-if="notification.show"
          :message="notification.message"
          :type="notification.type"
        />

        <div class="bg-white border border-gray-200 p-8 rounded-lg">
          <div class="text-center">
            <svg class="h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Welcome Back</h2>
          </div>

          <button
            @click="handleSignIn"
            class="w-full flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              class="h-5 w-5 mr-2"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()
const notification = ref({
  show: false,
  message: '',
  type: 'error'
})

// Redirect if already logged in
watch(user, (newUser) => {
  if (newUser) {
    router.push('/admin')
  }
})

function showNotification(message, type = 'error') {
  notification.value = {
    show: true,
    message,
    type
  }
  setTimeout(() => {
    notification.value.show = false
  }, 5000)
}

async function handleSignIn() {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `${window.location.origin}/admin`
      }
    })
    if (error) throw error
  } catch (error) {
    console.error('Error signing in:', error)
    showNotification('Failed to sign in with Google. Please try again.')
  }
}

useHead({
  title: 'Admin Login - Google Workspace Promo Codes',
  meta: [
    {
      name: 'description',
      content: 'Sign in to access the Google Workspace Promo Codes admin dashboard.'
    }
  ]
})
</script>
