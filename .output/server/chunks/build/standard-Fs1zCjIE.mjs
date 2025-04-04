import { _ as _sfc_main$1, a as _sfc_main$4 } from './UpdatesFeed-B4-RLCUP.mjs';
import { _ as _sfc_main$2 } from './SkeletonLoader-DyW6MBOO.mjs';
import { _ as _sfc_main$3 } from './Notification-Ce_99hX7.mjs';
import { ref, mergeProps, unref, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useSupabaseClient } from './useSupabaseClient-BMmqXcE2.mjs';
import { u as useI18n, a as useHead } from './server.mjs';
import './fetch-OQemOhf3.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@supabase/ssr';

const _sfc_main = {
  __name: "standard",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    const email = ref("");
    const promoCode = ref("");
    const previousCodes = ref([]);
    const loading = ref(false);
    const { t } = useI18n();
    const selectedRegion = ref("");
    const notification = ref({
      show: false,
      message: "",
      type: "error"
    });
    const features = {
      email: {},
      meetings: {},
      storage: {}
    };
    useHead({
      title: "Google Workspace Business Standard Promo Code - 10% Discount",
      meta: [
        {
          name: "description",
          content: "Get your exclusive 10% discount promo code for Google Workspace Business Standard plan."
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RegionSelector = _sfc_main$1;
      const _component_SkeletonLoader = _sfc_main$2;
      const _component_Notification = _sfc_main$3;
      const _component_UpdatesFeed = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white" }, _attrs))}><div class="max-w-2xl mx-auto px-4 py-12"><div class="text-center mb-8"><h1 class="text-3xl font-bold text-gray-900 mb-2">${ssrInterpolate(_ctx.$t("standard.title"))}</h1><p class="text-gray-600 mb-4">${ssrInterpolate(_ctx.$t("standard.subtitle"))}</p><div class="inline-flex items-center bg-blue-50 px-4 py-2 rounded-lg"><span class="text-gray-600">$14${ssrInterpolate(_ctx.$t("common.pricing.perUser"))}</span></div></div><div class="bg-gray-50 p-6 mb-6"><form class="space-y-6">`);
      _push(ssrRenderComponent(_component_RegionSelector, {
        modelValue: unref(selectedRegion),
        "onUpdate:modelValue": ($event) => isRef(selectedRegion) ? selectedRegion.value = $event : null
      }, null, _parent));
      _push(`<div><label class="block text-sm font-medium text-gray-700 mb-1">${ssrInterpolate(_ctx.$t("common.businessEmail"))}</label><input${ssrRenderAttr("value", unref(email))} type="email" class="w-full px-3 py-2 border border-gray-300 text-sm"${ssrRenderAttr("placeholder", _ctx.$t("common.emailAddresses.placeholder", { email: "your@business.com" }))}></div>`);
      if (unref(loading)) {
        _push(`<div class="bg-white border border-gray-200 p-4 text-center">`);
        _push(ssrRenderComponent(_component_SkeletonLoader, {
          type: "text",
          class: "mb-4"
        }, null, _parent));
        _push(`<div class="h-12 bg-gray-200 rounded mb-4"></div>`);
        _push(ssrRenderComponent(_component_SkeletonLoader, { type: "text" }, null, _parent));
        _push(`</div>`);
      } else if (unref(promoCode)) {
        _push(`<div class="bg-white border border-gray-200 p-4 text-center">`);
        if (unref(notification).show && unref(notification).type === "success") {
          _push(ssrRenderComponent(_component_Notification, {
            message: unref(notification).message,
            type: unref(notification).type,
            class: "mb-4"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<h3 class="text-sm font-medium text-gray-700 mb-2">${ssrInterpolate(_ctx.$t("common.promoCodeTitle"))}</h3><div class="text-2xl font-mono bg-gray-50 p-3 border border-gray-100 mb-2 text-green-600 cursor-pointer hover:bg-gray-100 transition-colors" title="Click to copy">${ssrInterpolate(unref(promoCode))}</div><p class="text-sm text-gray-700">${ssrInterpolate(_ctx.$t("common.useCodeMessage"))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(loading) && unref(previousCodes).length > 0) {
        _push(`<div class="mt-4 bg-white border border-blue-200 p-4">`);
        _push(ssrRenderComponent(_component_SkeletonLoader, {
          type: "text",
          class: "mb-4"
        }, null, _parent));
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(previousCodes).length, (i) => {
          _push(`<div class="h-12 bg-gray-200 rounded"></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (unref(previousCodes).length > 0) {
        _push(`<div class="mt-4 bg-white border border-blue-200 p-4"><h3 class="text-sm font-medium text-gray-700 mb-4 text-center">Previously Claimed Codes</h3><div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(previousCodes), (code) => {
          _push(`<div class="font-mono bg-gray-50 p-3 border border-gray-100 text-center text-green-600 cursor-pointer hover:bg-gray-100 transition-colors" title="Click to copy">${ssrInterpolate(code)}</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(notification).show && unref(notification).type !== "success") {
        _push(ssrRenderComponent(_component_Notification, {
          message: unref(notification).message,
          type: unref(notification).type
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit" class="w-full bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"${ssrIncludeBooleanAttr(unref(loading) || !unref(selectedRegion)) ? " disabled" : ""}>`);
      if (unref(loading)) {
        _push(`<span>${ssrInterpolate(_ctx.$t("common.processing"))}</span>`);
      } else {
        _push(`<span>${ssrInterpolate(_ctx.$t("common.getPromoCode"))}</span>`);
      }
      _push(`</button><div class="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-center"><svg class="h-5 w-5 text-yellow-600 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a 9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${ssrInterpolate(_ctx.$t("common.limitedAvailability"))}</div></form></div><div class="mt-12 space-y-8"><div class="bg-white border border-gray-200 p-6"><h2 class="text-xl font-semibold text-gray-900 mb-6">${ssrInterpolate(_ctx.$t("standard.features.title"))}</h2><div class="space-y-4"><!--[-->`);
      ssrRenderList(features, (feature, key) => {
        _push(`<div class="flex items-start"><svg class="h-5 w-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div><h3 class="text-sm font-medium text-gray-900">${ssrInterpolate(_ctx.$t(`standard.features.${key}.title`))}</h3><p class="text-sm text-gray-600">${ssrInterpolate(_ctx.$t(`standard.features.${key}.description`))}</p></div></div>`);
      });
      _push(`<!--]--></div></div>`);
      _push(ssrRenderComponent(_component_UpdatesFeed, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/standard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=standard-Fs1zCjIE.mjs.map
