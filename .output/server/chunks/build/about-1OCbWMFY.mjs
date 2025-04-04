import { _ as _sfc_main$1 } from './SkeletonLoader-DyW6MBOO.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useI18n, a as useHead } from './server.mjs';
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
      title: locale.value === "en" ? "About GWsave" : locale.value === "fr" ? "\xC0 propos de GWsave" : locale.value === "es" ? "Acerca de GWsave" : locale.value === "pt" ? "Sobre GWsave" : locale.value === "de" ? "\xDCber GWsave" : locale.value === "ja" ? "GWsave\u306B\u3064\u3044\u3066" : locale.value === "hi" ? "GWsave \u0915\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902" : locale.value === "ru" ? "\u041E GWsave" : "About GWsave",
      meta: [
        {
          name: "description",
          content: locale.value === "en" ? "Learn about our exclusive 10% discount promo codes for Google Workspace Business plans and how to use them." : locale.value === "fr" ? "D\xE9couvrez nos codes promo exclusifs avec 10% de r\xE9duction pour les forfaits Google Workspace Business et comment les utiliser." : locale.value === "es" ? "Conozca nuestros c\xF3digos promocionales exclusivos con 10% de descuento para planes Google Workspace Business y c\xF3mo usarlos." : locale.value === "pt" ? "Saiba mais sobre nossos c\xF3digos promocionais exclusivos com 10% de desconto para planos Google Workspace Business e como us\xE1-los." : locale.value === "de" ? "Erfahren Sie mehr \xFCber unsere exklusiven 10% Rabatt-Gutscheincodes f\xFCr Google Workspace Business-Pl\xE4ne und deren Verwendung." : locale.value === "ja" ? "Google Workspace Business \u30D7\u30E9\u30F3\u306E10%\u5272\u5F15\u30D7\u30ED\u30E2\u30FC\u30B7\u30E7\u30F3\u30B3\u30FC\u30C9\u3068\u305D\u306E\u4F7F\u7528\u65B9\u6CD5\u306B\u3064\u3044\u3066\u3002" : locale.value === "hi" ? "Google Workspace \u092C\u093F\u091C\u0928\u0947\u0938 \u092A\u094D\u0932\u093E\u0928 \u0915\u0947 \u0932\u093F\u090F \u0939\u092E\u093E\u0930\u0947 \u0935\u093F\u0936\u0947\u0937 10% \u091B\u0942\u091F \u092A\u094D\u0930\u094B\u092E\u094B \u0915\u094B\u0921 \u0914\u0930 \u0909\u0928\u0915\u0947 \u0909\u092A\u092F\u094B\u0917 \u0915\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902 \u091C\u093E\u0928\u0947\u0902\u0964" : locale.value === "ru" ? "\u0423\u0437\u043D\u0430\u0439\u0442\u0435 \u043E \u043D\u0430\u0448\u0438\u0445 \u044D\u043A\u0441\u043A\u043B\u044E\u0437\u0438\u0432\u043D\u044B\u0445 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u0430\u0445 \u0441\u043E \u0441\u043A\u0438\u0434\u043A\u043E\u0439 10% \u043D\u0430 \u043F\u043B\u0430\u043D\u044B Google Workspace Business \u0438 \u043A\u0430\u043A \u0438\u0445 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C." : "Learn about our exclusive 10% discount promo codes for Google Workspace Business plans and how to use them."
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

export { _sfc_main as default };
//# sourceMappingURL=about-1OCbWMFY.mjs.map
