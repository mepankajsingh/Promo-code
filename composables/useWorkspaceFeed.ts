import { ref } from 'vue'

export function useWorkspaceFeed() {
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchLatestUpdates(limit = 3) {
    loading.value = true
    error.value = null

    try {
      const { data } = await useFetch('/api/feed')
      items.value = data.value?.items?.slice(0, limit) || []
    } catch (err) {
      console.error('Error fetching feed:', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    loading,
    error,
    fetchLatestUpdates
  }
}
