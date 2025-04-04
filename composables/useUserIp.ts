export async function useUserIp() {
  const { data, error } = await useFetch('/api/userIp')
  
  if (error.value) {
    console.error('Error fetching IP:', error.value)
    return '0.0.0.0'
  }
  
  return data.value?.ip || '0.0.0.0'
}
