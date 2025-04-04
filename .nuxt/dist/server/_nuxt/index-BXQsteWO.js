import { b as useSupabaseUser, c as useRouter, a as useHead, _ as __nuxt_component_1 } from "../server.mjs";
import { _ as _sfc_main$3 } from "./Notification-Ce_99hX7.js";
import { ref, computed, watch, mergeProps, unref, useSSRContext, withCtx, createBlock, openBlock, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent } from "vue/server-renderer";
import { u as useSupabaseClient } from "./useSupabaseClient-BMmqXcE2.js";
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
const _sfc_main$2 = {
  __name: "PromoCodeManager",
  __ssrInlineRender: true,
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  emits: ["code-added", "code-deleted"],
  setup(__props, { emit: __emit }) {
    const supabase = useSupabaseClient();
    const loading = ref(false);
    const claimedCodes = ref([]);
    const availableCodes = ref([]);
    const selectedRegion = ref("americas");
    const showDeleteModal = ref(false);
    const selectedCode = ref(null);
    const props = __props;
    const canManageCodes = computed(() => {
      return props.userId === "d38b6b3e-189c-47ce-b6a6-48187d160ebd";
    });
    const regions = [
      { value: "americas", label: "Americas" },
      { value: "asia_pacific", label: "Asia Pacific" },
      { value: "emea", label: "EMEA" }
    ];
    const newCode = ref({
      code: "",
      type: "starter",
      region: "americas"
    });
    function formatDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    function getAvailableCount(type, region) {
      return availableCodes.value.filter(
        (code) => code.type === type && code.region === region
      ).length;
    }
    function getUsedCount(type, region) {
      return claimedCodes.value.filter(
        (claim) => claim.type === type && claim.region === region
      ).length;
    }
    async function fetchClaimedCodes() {
      try {
        const { data, error } = await supabase.from("user_claims").select(`
        id,
        type,
        region,
        ip_address,
        created_at,
        promo_codes (
          code
        )
      `).order("created_at", { ascending: false });
        if (error) throw error;
        claimedCodes.value = data;
      } catch (error) {
        console.error("Error fetching claimed codes:", error);
      }
    }
    async function fetchAvailableCodes() {
      try {
        const { data, error } = await supabase.from("promo_codes").select("*").eq("is_claimed", false).order("created_at", { ascending: false });
        if (error) throw error;
        availableCodes.value = data;
      } catch (error) {
        console.error("Error fetching available codes:", error);
      }
    }
    watch(selectedRegion, () => {
      Promise.all([
        fetchClaimedCodes(),
        fetchAvailableCodes()
      ]);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="bg-white border border-gray-200 rounded-lg p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Coupon Statistics</h3><div class="border-b border-gray-200 mb-4"><nav class="flex space-x-4" aria-label="Region tabs"><!--[-->`);
      ssrRenderList(regions, (region) => {
        _push(`<button class="${ssrRenderClass([
          "px-3 py-2 text-sm font-medium border-b-2",
          unref(selectedRegion) === region.value ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
        ])}">${ssrInterpolate(region.label)}</button>`);
      });
      _push(`<!--]--></nav></div><div class="grid grid-cols-2 gap-4"><div class="bg-gray-50 p-4 rounded-lg"><h4 class="text-sm font-medium text-gray-900 mb-3">Business Starter</h4><div class="space-y-2"><div class="flex justify-between items-center"><span class="text-sm text-gray-600">Available:</span><span class="text-sm font-medium text-green-600">${ssrInterpolate(getAvailableCount("starter", unref(selectedRegion)))}</span></div><div class="flex justify-between items-center"><span class="text-sm text-gray-600">Used:</span><span class="text-sm font-medium text-blue-600">${ssrInterpolate(getUsedCount("starter", unref(selectedRegion)))}</span></div></div></div><div class="bg-gray-50 p-4 rounded-lg"><h4 class="text-sm font-medium text-gray-900 mb-3">Business Standard</h4><div class="space-y-2"><div class="flex justify-between items-center"><span class="text-sm text-gray-600">Available:</span><span class="text-sm font-medium text-green-600">${ssrInterpolate(getAvailableCount("standard", unref(selectedRegion)))}</span></div><div class="flex justify-between items-center"><span class="text-sm text-gray-600">Used:</span><span class="text-sm font-medium text-blue-600">${ssrInterpolate(getUsedCount("standard", unref(selectedRegion)))}</span></div></div></div></div></div>`);
      if (unref(canManageCodes)) {
        _push(`<div class="bg-white border border-gray-200 rounded-lg"><div class="p-6 border-b border-gray-200"><h3 class="text-lg font-semibold text-gray-900 mb-4">Add New Promo Code</h3><form class="space-y-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Code Type</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" required><option value="starter"${ssrIncludeBooleanAttr(Array.isArray(unref(newCode).type) ? ssrLooseContain(unref(newCode).type, "starter") : ssrLooseEqual(unref(newCode).type, "starter")) ? " selected" : ""}>Business Starter</option><option value="standard"${ssrIncludeBooleanAttr(Array.isArray(unref(newCode).type) ? ssrLooseContain(unref(newCode).type, "standard") : ssrLooseEqual(unref(newCode).type, "standard")) ? " selected" : ""}>Business Standard</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Region</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" required><option value="americas"${ssrIncludeBooleanAttr(Array.isArray(unref(newCode).region) ? ssrLooseContain(unref(newCode).region, "americas") : ssrLooseEqual(unref(newCode).region, "americas")) ? " selected" : ""}>Americas</option><option value="asia_pacific"${ssrIncludeBooleanAttr(Array.isArray(unref(newCode).region) ? ssrLooseContain(unref(newCode).region, "asia_pacific") : ssrLooseEqual(unref(newCode).region, "asia_pacific")) ? " selected" : ""}>Asia Pacific</option><option value="emea"${ssrIncludeBooleanAttr(Array.isArray(unref(newCode).region) ? ssrLooseContain(unref(newCode).region, "emea") : ssrLooseEqual(unref(newCode).region, "emea")) ? " selected" : ""}>EMEA</option></select></div></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Promo Code</label><input${ssrRenderAttr("value", unref(newCode).code)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" required pattern="[A-Z0-9]{15}" title="Code must be 15 characters long and contain only uppercase letters and numbers"></div><div class="flex justify-end"><button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}>${ssrInterpolate(unref(loading) ? "Adding..." : "Add Promo Code")}</button></div></form></div><div class="p-6 border-b border-gray-200"><h3 class="text-lg font-semibold text-gray-900 mb-4">Available Codes</h3><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead><tr><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th><th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead><tbody class="divide-y divide-gray-200"><!--[-->`);
        ssrRenderList(unref(availableCodes), (code) => {
          _push(`<tr><td class="px-4 py-3 text-sm font-medium text-gray-900">${ssrInterpolate(code.code)}</td><td class="px-4 py-3 text-sm text-gray-500">${ssrInterpolate(code.type)}</td><td class="px-4 py-3 text-sm text-gray-500">${ssrInterpolate(code.region)}</td><td class="px-4 py-3 text-sm text-gray-500">${ssrInterpolate(formatDate(code.created_at))}</td><td class="px-4 py-3 text-sm text-right"><button class="text-red-600 hover:text-red-800" title="Delete code"><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white border border-gray-200 rounded-lg p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Claimed Codes</h3><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead><tr><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Claimed By</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Claimed At</th></tr></thead><tbody class="divide-y divide-gray-200"><!--[-->`);
      ssrRenderList(unref(claimedCodes), (claim) => {
        _push(`<tr><td class="px-4 py-3 text-sm font-medium text-gray-900">${ssrInterpolate(claim.promo_codes.code)}</td><td class="px-4 py-3 text-sm text-gray-500">${ssrInterpolate(claim.type)}</td><td class="px-4 py-3 text-sm text-gray-500">${ssrInterpolate(claim.region)}</td><td class="px-4 py-3 text-sm text-gray-500">${ssrInterpolate(claim.ip_address)}</td><td class="px-4 py-3 text-sm text-gray-500">${ssrInterpolate(formatDate(claim.created_at))}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
      if (unref(showDeleteModal)) {
        _push(`<div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"><div class="bg-white rounded-lg p-6 max-w-md w-full mx-4"><h3 class="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3><p class="text-sm text-gray-600 mb-4"> Are you sure you want to delete the promo code <span class="font-medium">${ssrInterpolate((_a = unref(selectedCode)) == null ? void 0 : _a.code)}</span>? This action cannot be undone. </p><div class="flex justify-end space-x-3"><button class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"> Cancel </button><button class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"> Delete </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PromoCodeManager.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "RobotsEditor",
  __ssrInlineRender: true,
  emits: ["saved"],
  setup(__props, { emit: __emit }) {
    const robotsContent = ref("");
    const loading = ref(false);
    const isValid = computed(() => {
      const content = robotsContent.value;
      if (!content) return false;
      const lines = content.split("\n");
      const hasUserAgent = lines.some((line) => line.trim().startsWith("User-agent:"));
      const hasDisallow = lines.some((line) => line.trim().startsWith("Disallow:"));
      const hasAdminDisallow = lines.some((line) => line.trim() === "Disallow: /admin");
      const hasLoginDisallow = lines.some((line) => line.trim() === "Disallow: /login");
      return hasUserAgent && hasDisallow && hasAdminDisallow && hasLoginDisallow;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white border border-gray-200 rounded-lg p-6" }, _attrs))}><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-gray-900">Edit robots.txt</h3><div class="flex items-center space-x-2"><button class="text-gray-600 hover:text-gray-800 text-sm"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}> Reset to Default </button></div></div><div class="mb-4"><textarea rows="10" class="w-full font-mono text-sm p-4 border border-gray-300 rounded-lg"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} placeholder="User-agent: *
Disallow: /admin
Disallow: /login

Sitemap: https://your-site.com/sitemap.xml">${ssrInterpolate(unref(robotsContent))}</textarea><p class="mt-2 text-sm text-gray-500"> Make sure to include User-agent and Disallow directives, and keep the admin and login pages blocked from search engines. </p></div><div class="flex justify-end space-x-3"><button class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"${ssrIncludeBooleanAttr(unref(loading) || !unref(isValid)) ? " disabled" : ""}>${ssrInterpolate(unref(loading) ? "Saving..." : "Save Changes")}</button></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RobotsEditor.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();
    const router = useRouter();
    const isLoading = ref(true);
    const stats = ref({
      totalUsers: 0,
      activePromoCodes: 0,
      claimedCodes: 0
    });
    const notification = ref({
      show: false,
      message: "",
      type: "success"
    });
    const canManageRobots = computed(() => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.id) === "d38b6b3e-189c-47ce-b6a6-48187d160ebd";
    });
    async function checkAdminAccess() {
      if (!user.value) {
        router.push("/login");
        return false;
      }
      try {
        const { data: adminUser } = await supabase.from("admin_users").select().eq("user_id", user.value.id).single();
        if (!adminUser) {
          router.push("/login");
          return false;
        }
        return true;
      } catch (error) {
        console.error("Error checking admin status:", error);
        router.push("/login");
        return false;
      }
    }
    function showNotification(message, type = "success") {
      notification.value = {
        show: true,
        message,
        type
      };
      setTimeout(() => {
        notification.value.show = false;
      }, 5e3);
    }
    function handleCodeAdded() {
      fetchDashboardData();
      showNotification("Promo code added successfully");
    }
    function handleCodeDeleted() {
      fetchDashboardData();
      showNotification("Promo code deleted successfully");
    }
    function handleRobotsSaved(message, type = "success") {
      showNotification(message, type);
    }
    async function fetchDashboardData() {
      if (!user.value) return;
      try {
        const hasAccess = await checkAdminAccess();
        if (!hasAccess) return;
        await supabase.from("admin_users").update({ last_login: (/* @__PURE__ */ new Date()).toISOString() }).eq("user_id", user.value.id);
        const [
          { count: totalUsers },
          { count: activePromoCodes },
          { count: claimedCodes }
        ] = await Promise.all([
          supabase.from("business_emails").select("id", { count: "exact" }),
          supabase.from("promo_codes").select("id", { count: "exact" }).eq("is_claimed", false),
          supabase.from("user_claims").select("id", { count: "exact" })
        ]);
        stats.value = {
          totalUsers: totalUsers || 0,
          activePromoCodes: activePromoCodes || 0,
          claimedCodes: claimedCodes || 0
        };
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        showNotification("Error fetching dashboard data", "error");
      } finally {
        isLoading.value = false;
      }
    }
    watch(user, (newUser) => {
      if (newUser) {
        fetchDashboardData();
      } else {
        router.push("/login");
      }
    });
    useHead({
      title: "Admin Dashboard - Google Workspace Promo Codes",
      meta: [
        {
          name: "description",
          content: "Admin dashboard for managing Google Workspace promo codes and monitoring usage."
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_1;
      const _component_Notification = _sfc_main$3;
      const _component_PromoCodeManager = _sfc_main$2;
      const _component_RobotsEditor = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white" }, _attrs))}><nav class="bg-white border-b border-gray-200"><div class="max-w-4xl mx-auto px-4"><div class="flex justify-between h-14"><div class="flex">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="h-6 w-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor"${_scopeId}><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "h-6 w-6 text-blue-400",
                viewBox: "0 0 24 24",
                fill: "currentColor"
              }, [
                createVNode("path", { d: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center space-x-4">`);
      if (unref(user)) {
        _push(`<span class="text-sm text-gray-700">${ssrInterpolate(unref(user).email)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(user)) {
        _push(`<button class="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-700"><svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> Sign Out </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></nav><div class="max-w-4xl mx-auto px-4 py-12"><div class="text-center mb-8"><h1 class="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1><p class="text-gray-600">Manage promo codes and monitor usage</p></div>`);
      if (unref(notification).show) {
        _push(ssrRenderComponent(_component_Notification, {
          message: unref(notification).message,
          type: unref(notification).type
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"><div class="bg-white border border-gray-200 p-6 rounded-lg"><div class="flex items-center justify-between mb-1"><h3 class="text-sm font-medium text-gray-900">Total Users</h3><svg class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></div><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(stats).totalUsers)}</p></div><div class="bg-white border border-gray-200 p-6 rounded-lg"><div class="flex items-center justify-between mb-1"><h3 class="text-sm font-medium text-gray-900">Active Codes</h3><svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg></div><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(stats).activePromoCodes)}</p></div><div class="bg-white border border-gray-200 p-6 rounded-lg"><div class="flex items-center justify-between mb-1"><h3 class="text-sm font-medium text-gray-900">Claimed Codes</h3><svg class="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg></div><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(stats).claimedCodes)}</p></div></div>`);
      _push(ssrRenderComponent(_component_PromoCodeManager, {
        onCodeAdded: handleCodeAdded,
        onCodeDeleted: handleCodeDeleted,
        "user-id": (_a = unref(user)) == null ? void 0 : _a.id
      }, null, _parent));
      if (unref(canManageRobots)) {
        _push(`<div class="mt-8">`);
        _push(ssrRenderComponent(_component_RobotsEditor, { onSaved: handleRobotsSaved }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-BXQsteWO.js.map
