declare module '#supabase/server' {
  const serverSupabaseClient: typeof import('/home/project/node_modules/@nuxtjs/supabase/dist/runtime/server/services').serverSupabaseClient
  const serverSupabaseServiceRole: typeof import('/home/project/node_modules/@nuxtjs/supabase/dist/runtime/server/services').serverSupabaseServiceRole
  const serverSupabaseUser: typeof import('/home/project/node_modules/@nuxtjs/supabase/dist/runtime/server/services').serverSupabaseUser
  const serverSupabaseSession: typeof import('/home/project/node_modules/@nuxtjs/supabase/dist/runtime/server/services').serverSupabaseSession
}