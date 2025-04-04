import { _ as _sfc_main$1 } from "./SkeletonLoader-DyW6MBOO.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { u as useI18n, a as useHead } from "../server.mjs";
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
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    const features = [
      "email",
      "meetings",
      "calendars",
      "drive",
      "collaboration"
    ];
    const steps = [
      "choosePlan",
      "getCode",
      "apply"
    ];
    const { locale } = useI18n();
    useHead(() => ({
      title: locale.value === "en" ? "About GWsave" : locale.value === "fr" ? "À propos de GWsave" : locale.value === "es" ? "Acerca de GWsave" : locale.value === "pt" ? "Sobre GWsave" : locale.value === "de" ? "Über GWsave" : locale.value === "ja" ? "GWsaveについて" : locale.value === "hi" ? "GWsave के बारे में" : locale.value === "ru" ? "О GWsave" : "About GWsave",
      meta: [
        {
          name: "description",
          content: locale.value === "en" ? "Learn about our exclusive 10% discount promo codes for Google Workspace Business plans and how to use them." : locale.value === "fr" ? "Découvrez nos codes promo exclusifs avec 10% de réduction pour les forfaits Google Workspace Business et comment les utiliser." : locale.value === "es" ? "Conozca nuestros códigos promocionales exclusivos con 10% de descuento para planes Google Workspace Business y cómo usarlos." : locale.value === "pt" ? "Saiba mais sobre nossos códigos promocionais exclusivos com 10% de desconto para planos Google Workspace Business e como usá-los." : locale.value === "de" ? "Erfahren Sie mehr über unsere exklusiven 10% Rabatt-Gutscheincodes für Google Workspace Business-Pläne und deren Verwendung." : locale.value === "ja" ? "Google Workspace Business プランの10%割引プロモーションコードとその使用方法について。" : locale.value === "hi" ? "Google Workspace बिजनेस प्लान के लिए हमारे विशेष 10% छूट प्रोमो कोड और उनके उपयोग के बारे में जानें।" : locale.value === "ru" ? "Узнайте о наших эксклюзивных промокодах со скидкой 10% на планы Google Workspace Business и как их использовать." : "Learn about our exclusive 10% discount promo codes for Google Workspace Business plans and how to use them."
        }
      ]
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SkeletonLoader = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white" }, _attrs))}><div class="max-w-2xl mx-auto px-4 py-12">`);
      if (_ctx.loading) {
        _push(ssrRenderComponent(_component_SkeletonLoader, {
          type: "title",
          class: "mb-8"
        }, null, _parent));
      } else {
        _push(`<div class="text-center mb-8"><h1 class="text-3xl font-bold text-gray-900 mb-2">About GWsave</h1><p class="text-gray-600">${ssrInterpolate(_ctx.$t("about.subtitle"))}</p></div>`);
      }
      if (_ctx.loading) {
        _push(ssrRenderComponent(_component_SkeletonLoader, {
          type: "card",
          class: "mb-8"
        }, null, _parent));
      } else {
        _push(`<div class="bg-gray-50 p-6 space-y-8"><p class="text-gray-600">${ssrInterpolate(_ctx.$t("about.welcome"))}</p><div><h2 class="text-lg font-medium text-gray-900 mb-3">${ssrInterpolate(_ctx.$t("about.whyChoose.title"))}</h2><ul class="space-y-2"><!--[-->`);
        ssrRenderList(features, (feature, index) => {
          _push(`<li class="flex items-center text-gray-600"><svg class="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> ${ssrInterpolate(_ctx.$t(`about.whyChoose.features.${feature}`))}</li>`);
        });
        _push(`<!--]--></ul></div><div><h2 class="text-lg font-medium text-gray-900 mb-3">${ssrInterpolate(_ctx.$t("about.howItWorks.title"))}</h2><ol class="space-y-4"><!--[-->`);
        ssrRenderList(steps, (step, index) => {
          _push(`<li class="flex items-start"><span class="flex items-center justify-center bg-blue-600 text-white w-6 h-6 mt-0.5 mr-3 text-sm">${ssrInterpolate(index + 1)}</span><div><h3 class="font-medium mb-1">${ssrInterpolate(_ctx.$t(`about.howItWorks.steps.${step}.title`))}</h3><p class="text-sm text-gray-600">${ssrInterpolate(_ctx.$t(`about.howItWorks.steps.${step}.description`))}</p></div></li>`);
        });
        _push(`<!--]--></ol></div></div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=about-1OCbWMFY.js.map
