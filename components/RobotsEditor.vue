<template>
  <div class="bg-white border border-gray-200 rounded-lg p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900">Edit robots.txt</h3>
      <div class="flex items-center space-x-2">
        <button
          @click="resetToDefault"
          class="text-gray-600 hover:text-gray-800 text-sm"
          :disabled="loading"
        >
          Reset to Default
        </button>
      </div>
    </div>
    
    <div class="mb-4">
      <textarea
        v-model="robotsContent"
        rows="10"
        class="w-full font-mono text-sm p-4 border border-gray-300 rounded-lg"
        :disabled="loading"
        placeholder="User-agent: *&#10;Disallow: /admin&#10;Disallow: /login&#10;&#10;Sitemap: https://your-site.com/sitemap.xml"
      ></textarea>
      <p class="mt-2 text-sm text-gray-500">
        Make sure to include User-agent and Disallow directives, and keep the admin and login pages blocked from search engines.
      </p>
    </div>

    <div class="flex justify-end space-x-3">
      <button
        @click="saveRobots"
        class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
        :disabled="loading || !isValid"
      >
        {{ loading ? 'Saving...' : 'Save Changes' }}
      </button>
    </div>
  </div>
</template>

<script setup>
const robotsContent = ref('')
const loading = ref(false)

const emit = defineEmits(['saved'])

const defaultContent = `User-agent: *
Disallow: /admin
Disallow: /login

Sitemap: https://workspace-promos.netlify.app/sitemap.xml`

const isValid = computed(() => {
  const content = robotsContent.value
  if (!content) return false

  const lines = content.split('\n')
  const hasUserAgent = lines.some(line => line.trim().startsWith('User-agent:'))
  const hasDisallow = lines.some(line => line.trim().startsWith('Disallow:'))
  const hasAdminDisallow = lines.some(line => line.trim() === 'Disallow: /admin')
  const hasLoginDisallow = lines.some(line => line.trim() === 'Disallow: /login')

  return hasUserAgent && hasDisallow && hasAdminDisallow && hasLoginDisallow
})

// Load current robots.txt content
async function loadRobotsContent() {
  try {
    const response = await fetch('/robots.txt')
    if (!response.ok) throw new Error('Failed to load robots.txt')
    robotsContent.value = await response.text()
  } catch (error) {
    console.error('Error loading robots.txt:', error)
    emit('saved', 'Error loading robots.txt', 'error')
  }
}

// Reset to default content
function resetToDefault() {
  robotsContent.value = defaultContent
}

// Save robots.txt content
async function saveRobots() {
  if (!isValid.value) {
    emit('saved', 'Invalid robots.txt content. Must include User-agent and Disallow directives for admin and login pages.', 'error')
    return
  }

  loading.value = true
  try {
    const response = await fetch('/api/robots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: robotsContent.value }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to save robots.txt')
    }

    emit('saved', 'robots.txt updated successfully')
  } catch (error) {
    console.error('Error saving robots.txt:', error)
    emit('saved', error.message || 'Error saving robots.txt', 'error')
  } finally {
    loading.value = false
  }
}

// Load content on mount
onMounted(() => {
  loadRobotsContent()
})
</script>
