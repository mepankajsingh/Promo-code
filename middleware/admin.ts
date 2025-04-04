import { useSupabaseClient } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware if not on admin pages
  if (!to.path.startsWith('/admin')) {
    return
  }

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  // Redirect to login if no user
  if (!user.value) {
    return navigateTo('/login')
  }

  try {
    const { data: adminUser, error } = await supabase
      .from('admin_users')
      .select()
      .eq('user_id', user.value.id)
      .single()

    if (error || !adminUser) {
      return navigateTo('/login')
    }
  } catch (error) {
    console.error('Error checking admin status:', error)
    return navigateTo('/login')
  }
})
