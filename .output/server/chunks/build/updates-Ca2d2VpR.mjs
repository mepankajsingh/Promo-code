import { _ as _sfc_main$1 } from './SkeletonLoader-DyW6MBOO.mjs';
import { withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useFetch } from './fetch-OQemOhf3.mjs';
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
  __name: "updates",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/feed", "$LjuoNkSePZ")), __temp = await __temp, __restore(), __temp);
    const { locale } = useI18n();
    function formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString(locale.value, {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
    useHead(() => ({
      title: locale.value === "en" ? "Google Workspace Product Updates" : locale.value === "fr" ? "Mises \xE0 jour des produits Google Workspace" : locale.value === "es" ? "Actualizaciones de productos de Google Workspace" : locale.value === "pt" ? "Atualiza\xE7\xF5es de produtos do Google Workspace" : locale.value === "de" ? "Google Workspace Produkt-Updates" : locale.value === "ja" ? "Google Workspace \u88FD\u54C1\u30A2\u30C3\u30D7\u30C7\u30FC\u30C8" : locale.value === "hi" ? "Google Workspace \u0909\u0924\u094D\u092A\u093E\u0926 \u0905\u092A\u0921\u0947\u091F" : locale.value === "ru" ? "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432 Google Workspace" : "Google Workspace Product Updates",
      meta: [
        {
          name: "description",
          content: locale.value === "en" ? "Stay up to date with the latest Google Workspace updates, features, and announcements." : locale.value === "fr" ? "Restez \xE0 jour avec les derni\xE8res mises \xE0 jour, fonctionnalit\xE9s et annonces de Google Workspace." : locale.value === "es" ? "Mant\xE9ngase al d\xEDa con las \xFAltimas actualizaciones, funciones y anuncios de Google Workspace." : locale.value === "pt" ? "Fique por dentro das \xFAltimas atualiza\xE7\xF5es, recursos e an\xFAncios do Google Workspace." : locale.value === "de" ? "Bleiben Sie auf dem Laufenden \xFCber die neuesten Google Workspace Updates, Funktionen und Ank\xFCndigungen." : locale.value === "ja" ? "Google Workspace \u306E\u6700\u65B0\u306E\u30A2\u30C3\u30D7\u30C7\u30FC\u30C8\u3001\u6A5F\u80FD\u3001\u304A\u77E5\u3089\u305B\u3092\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002" : locale.value === "hi" ? "Google Workspace \u0915\u0947 \u0928\u0935\u0940\u0928\u0924\u092E \u0905\u092A\u0921\u0947\u091F, \u0938\u0941\u0935\u093F\u0927\u093E\u0913\u0902 \u0914\u0930 \u0918\u094B\u0937\u0923\u093E\u0913\u0902 \u0938\u0947 \u0905\u092A\u0921\u0947\u091F \u0930\u0939\u0947\u0902\u0964" : locale.value === "ru" ? "\u0411\u0443\u0434\u044C\u0442\u0435 \u0432 \u043A\u0443\u0440\u0441\u0435 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0445 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439, \u0444\u0443\u043D\u043A\u0446\u0438\u0439 \u0438 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0439 Google Workspace." : "Stay up to date with the latest Google Workspace updates, features, and announcements."
        }
      ]
    }));
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_SkeletonLoader = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white" }, _attrs))}><div class="max-w-2xl mx-auto px-4 py-12"><div class="text-center mb-8"><h1 class="text-3xl font-bold text-gray-900 mb-2">${ssrInterpolate(_ctx.$t("updates.title"))}</h1><p class="text-gray-600 mb-4">${ssrInterpolate(_ctx.$t("updates.subtitle"))}</p><a href="https://workspaceupdates.googleblog.com/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 hover:text-blue-800">${ssrInterpolate(_ctx.$t("updates.viewOfficialBlog"))} <svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a></div>`);
      if (unref(pending)) {
        _push(ssrRenderComponent(_component_SkeletonLoader, {
          type: "feed",
          count: 5
        }, null, _parent));
      } else if (unref(error)) {
        _push(`<div class="bg-red-50 border border-red-100 p-6 rounded-lg"><div class="flex items-center text-red-700 mb-2"><svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span class="font-medium">${ssrInterpolate(_ctx.$t("updates.error"))}</span></div><p class="text-red-600 text-sm">${ssrInterpolate(unref(error).message || _ctx.$t("updates.errorMessage"))}</p></div>`);
      } else if (!((_b = (_a = unref(data)) == null ? void 0 : _a.items) == null ? void 0 : _b.length)) {
        _push(`<div class="bg-yellow-50 border border-yellow-100 p-6 rounded-lg"><div class="flex items-center text-yellow-700 mb-2"><svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span class="font-medium">${ssrInterpolate(_ctx.$t("updates.noUpdates"))}</span></div><p class="text-yellow-600 text-sm">${ssrInterpolate(_ctx.$t("updates.checkBack"))}</p></div>`);
      } else {
        _push(`<div class="space-y-6"><!--[-->`);
        ssrRenderList(unref(data).items, (item) => {
          _push(`<article class="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-colors duration-200"><h2 class="text-lg font-semibold text-gray-900 mb-2">${ssrInterpolate(item.title)}</h2><div class="text-sm text-gray-500 mb-3"><time${ssrRenderAttr("datetime", item.date)}>${ssrInterpolate(formatDate(item.date))}</time></div><p class="text-gray-600 text-sm leading-relaxed mb-4">${ssrInterpolate(item.content)}</p><a${ssrRenderAttr("href", item.link)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">${ssrInterpolate(_ctx.$t("updates.readMore"))} <svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></a></article>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/updates.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=updates-Ca2d2VpR.mjs.map
