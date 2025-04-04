import { j as defineNuxtRouteMiddleware, b as useSupabaseUser, n as navigateTo, k as executeAsync } from './server.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-BMmqXcE2.mjs';
import 'vue';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue/server-renderer';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@supabase/ssr';

const admin = defineNuxtRouteMiddleware(async (to) => {
  let __temp, __restore;
  if (!to.path.startsWith("/admin")) {
    return;
  }
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  if (!user.value) {
    return navigateTo("/login");
  }
  try {
    const { data: adminUser, error } = ([__temp, __restore] = executeAsync(() => supabase.from("admin_users").select().eq("user_id", user.value.id).single()), __temp = await __temp, __restore(), __temp);
    if (error || !adminUser) {
      return navigateTo("/login");
    }
  } catch (error) {
    console.error("Error checking admin status:", error);
    return navigateTo("/login");
  }
});

export { admin as default };
//# sourceMappingURL=admin-CAP6StVI.mjs.map
