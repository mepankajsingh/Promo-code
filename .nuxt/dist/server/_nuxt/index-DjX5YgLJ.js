import { _ as _sfc_main$1, a as _sfc_main$4 } from "./UpdatesFeed-B4-RLCUP.js";
import { _ as _sfc_main$2 } from "./SkeletonLoader-DyW6MBOO.js";
import { _ as _sfc_main$3 } from "./Notification-Ce_99hX7.js";
import { ref, watch, mergeProps, unref, isRef, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { u as useSupabaseClient } from "./useSupabaseClient-BMmqXcE2.js";
import { u as useI18n, a as useHead } from "../server.mjs";
import { u as useFetch } from "./fetch-OQemOhf3.js";
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
async function useUserIp() {
  var _a;
  const { data, error } = await useFetch("/api/userIp", "$YtUAfyHzw7");
  if (error.value) {
    console.error("Error fetching IP:", error.value);
    return "0.0.0.0";
  }
  return ((_a = data.value) == null ? void 0 : _a.ip) || "0.0.0.0";
}
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const supabase = useSupabaseClient();
    const email = ref("");
    const promoCode = ref("");
    const previousCodes = ref([]);
    const loading = ref(false);
    const { t } = useI18n();
    const selectedRegion = ref("");
    const selectedPlan = ref("");
    const notification = ref({
      show: false,
      message: "",
      type: "error"
    });
    const { locale } = useI18n();
    useHead(() => ({
      title: locale.value === "en" ? "Google Workspace Promo Codes - Save 10%" : locale.value === "fr" ? "Codes promo Google Workspace - Économisez 10%" : locale.value === "es" ? "Códigos promocionales de Google Workspace - Ahorre 10%" : locale.value === "pt" ? "Códigos promocionais do Google Workspace - Economize 10%" : locale.value === "de" ? "Google Workspace Gutscheincodes - 10% sparen" : locale.value === "ja" ? "Google Workspace プロモーションコード - 10%オフ" : locale.value === "hi" ? "Google Workspace प्रोमो कोड - 10% बचाएं" : locale.value === "ru" ? "Промокоды Google Workspace - Скидка 10%" : "Google Workspace Promo Codes - Save 10%",
      meta: [
        {
          name: "description",
          content: locale.value === "en" ? "Get exclusive 10% discount promo codes for Google Workspace Business plans. Choose your region and get instant access to savings!" : locale.value === "fr" ? "Obtenez des codes promo exclusifs avec 10% de réduction pour les forfaits Google Workspace Business. Choisissez votre région et économisez instantanément !" : locale.value === "es" ? "Obtenga códigos promocionales exclusivos con 10% de descuento para planes Google Workspace Business. ¡Elija su región y obtenga acceso instantáneo a los ahorros!" : locale.value === "pt" ? "Obtenha códigos promocionais exclusivos com 10% de desconto para planos Google Workspace Business. Escolha sua região e tenha acesso instantâneo às economias!" : locale.value === "de" ? "Erhalten Sie exklusive 10% Rabatt-Gutscheincodes für Google Workspace Business-Pläne. Wählen Sie Ihre Region und sparen Sie sofort!" : locale.value === "ja" ? "Google Workspace Business プランの10%割引プロモーションコードを取得。地域を選択して即座に割引を適用！" : locale.value === "hi" ? "Google Workspace बिजनेस प्लान के लिए विशेष 10% छूट प्रोमो कोड प्राप्त करें। अपना क्षेत्र चुनें और तुरंत बचत का लाभ उठाएं!" : locale.value === "ru" ? "Получите эксклюзивные промокоды со скидкой 10% на планы Google Workspace Business. Выберите свой регион и получите мгновенный доступ к экономии!" : "Get exclusive 10% discount promo codes for Google Workspace Business plans. Choose your region and get instant access to savings!"
        }
      ]
    }));
    watch([selectedPlan, selectedRegion], async ([newPlan, newRegion]) => {
      if (newPlan && newRegion) {
        const userIp = await useUserIp();
        const { data: existingClaims } = await supabase.from("user_claims").select("promo_code_id").eq("ip_address", userIp);
        if ((existingClaims == null ? void 0 : existingClaims.length) > 0) {
          const { data: claimedCodes } = await supabase.from("promo_codes").select("code").in("id", existingClaims.map((claim) => claim.promo_code_id));
          if (claimedCodes) {
            previousCodes.value = claimedCodes.map((code) => code.code);
          }
        } else {
          previousCodes.value = [];
        }
        promoCode.value = "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RegionSelector = _sfc_main$1;
      const _component_SkeletonLoader = _sfc_main$2;
      const _component_Notification = _sfc_main$3;
      const _component_UpdatesFeed = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white" }, _attrs))}><div class="max-w-2xl mx-auto px-4 py-12"><div class="text-center mb-8"><h1 class="text-3xl font-bold text-gray-900 mb-2">${ssrInterpolate(_ctx.$t("home.title"))}</h1><p class="text-gray-600 max-w-xl mx-auto">${ssrInterpolate(_ctx.$t("home.subtitle"))}</p></div><div class="bg-gray-50 p-6 mb-6"><form class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">Select Plan</label><div class="grid grid-cols-2 gap-4"><button type="button" class="${ssrRenderClass([
        "p-4 text-left border rounded-lg focus:outline-none",
        unref(selectedPlan) === "starter" ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
      ])}"><div class="font-medium text-gray-900">Business Starter</div><div class="text-sm text-gray-500">$7/user/month</div></button><button type="button" class="${ssrRenderClass([
        "p-4 text-left border rounded-lg focus:outline-none",
        unref(selectedPlan) === "standard" ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
      ])}"><div class="font-medium text-gray-900">Business Standard</div><div class="text-sm text-gray-500">$14/user/month</div></button></div></div>`);
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
      _push(`<button type="submit" class="w-full bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"${ssrIncludeBooleanAttr(unref(loading) || !unref(selectedRegion) || !unref(selectedPlan) || unref(previousCodes).length >= 3) ? " disabled" : ""}>`);
      if (unref(loading)) {
        _push(`<span>${ssrInterpolate(_ctx.$t("common.processing"))}</span>`);
      } else {
        _push(`<span>${ssrInterpolate(_ctx.$t("common.getPromoCode"))}</span>`);
      }
      _push(`</button><div class="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-center"><svg class="h-5 w-5 text-yellow-600 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${ssrInterpolate(_ctx.$t("common.limitedAvailability"))}</div></form></div><div class="mt-12 space-y-8"><div class="bg-white border border-gray-200 p-6"><h2 class="text-xl font-semibold text-gray-900 mb-6">${ssrInterpolate(_ctx.$t("common.features.title"))}</h2><div class="space-y-4"><div class="flex items-start"><svg class="h-5 w-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div><h3 class="text-sm font-medium text-gray-900">${ssrInterpolate(_ctx.$t("common.features.professionalEmail.title"))}</h3><p class="text-sm text-gray-600">${ssrInterpolate(_ctx.$t("common.features.professionalEmail.description"))}</p></div></div><div class="flex items-start"><svg class="h-5 w-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div><h3 class="text-sm font-medium text-gray-900">${ssrInterpolate(_ctx.$t("common.features.videoMeetings.title"))}</h3><p class="text-sm text-gray-600">${ssrInterpolate(_ctx.$t("common.features.videoMeetings.description"))}</p></div></div><div class="flex items-start"><svg class="h-5 w-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div><h3 class="text-sm font-medium text-gray-900">${ssrInterpolate(_ctx.$t("common.features.cloudStorage.title"))}</h3><p class="text-sm text-gray-600">${ssrInterpolate(_ctx.$t("common.features.cloudStorage.description"))}</p></div></div></div></div>`);
      _push(ssrRenderComponent(_component_UpdatesFeed, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DjX5YgLJ.js.map
