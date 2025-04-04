import { _ as _sfc_main$1 } from "./Notification-Ce_99hX7.js";
import { ref, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { u as useSupabaseClient } from "./useSupabaseClient-BMmqXcE2.js";
import { b as useSupabaseUser, c as useRouter, a as useHead } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "@supabase/ssr";
import "cookie-es";
import "destr";
import "ohash";
import "klona";
import "@vue/devtools-api";
const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    const user = useSupabaseUser();
    const router = useRouter();
    const notification = ref({
      show: false,
      message: "",
      type: "error"
    });
    watch(user, (newUser) => {
      if (newUser) {
        router.push("/admin");
      }
    });
    useHead({
      title: "Admin Login - Google Workspace Promo Codes",
      meta: [
        {
          name: "description",
          content: "Sign in to access the Google Workspace Promo Codes admin dashboard."
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Notification = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white" }, _attrs))}><div class="max-w-2xl mx-auto px-4 py-12"><div class="text-center mb-8"><h1 class="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1><p class="text-gray-600">Sign in to access the admin dashboard</p></div><div class="bg-gray-50 p-6">`);
      if (unref(notification).show) {
        _push(ssrRenderComponent(_component_Notification, {
          message: unref(notification).message,
          type: unref(notification).type
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white border border-gray-200 p-8 rounded-lg"><div class="text-center"><svg class="h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><h2 class="text-xl font-semibold text-gray-900 mb-6">Welcome Back</h2></div><button class="w-full flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"><img src="https://www.google.com/favicon.ico" alt="Google" class="h-5 w-5 mr-2"> Sign in with Google </button></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=login-CSL70jSZ.js.map
