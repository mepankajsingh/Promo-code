import { unref, withAsyncContext, computed, mergeProps, withCtx, createTextVNode, createBlock, toDisplayString, openBlock, createVNode, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _sfc_main$2 } from './SkeletonLoader-DyW6MBOO.mjs';
import { d as useLocalePath, _ as __nuxt_component_1, u as useI18n } from './server.mjs';
import { u as useFetch } from './fetch-OQemOhf3.mjs';

function useRegions() {
  const regions = ref({
    americas: {
      name: "Americas",
      countries: [
        { name: "Argentina" },
        { name: "Brazil" },
        { name: "Canada" },
        { name: "Chile" },
        { name: "Colombia" },
        { name: "Mexico" },
        { name: "Peru" },
        { name: "United States" }
      ]
    },
    asia_pacific: {
      name: "Asia Pacific",
      countries: [
        { name: "Australia" },
        { name: "Hong Kong" },
        { name: "India" },
        { name: "Japan" },
        { name: "New Zealand" },
        { name: "Singapore" }
      ]
    },
    emea: {
      name: "EMEA",
      countries: [
        { name: "Belgium" },
        { name: "France" },
        { name: "Germany" },
        { name: "Ireland" },
        { name: "Italy" },
        { name: "Netherlands" },
        { name: "Portugal" },
        { name: "Spain" },
        { name: "United Arab Emirates" },
        { name: "United Kingdom" }
      ]
    }
  });
  return {
    regions
  };
}
const _sfc_main$1 = {
  __name: "RegionSelector",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const { regions } = useRegions();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><label class="block text-sm font-medium text-gray-700 mb-1">${ssrInterpolate(_ctx.$t("common.region.label"))}</label><div class="grid grid-cols-3 gap-2"><!--[-->`);
      ssrRenderList(unref(regions), (region, key) => {
        _push(`<button type="button" class="group relative"><div class="${ssrRenderClass([
          "px-3 py-2 text-sm border flex items-center justify-center space-x-2",
          __props.modelValue === key ? "bg-blue-50 border-blue-500 text-blue-700" : "border-gray-300 text-gray-700 hover:bg-gray-50"
        ])}">`);
        if (key === "americas") {
          _push(`<svg class="h-4 w-4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 346.374 346.375" fill="currentColor"><g><path d="M325.772,254.84c0.4-0.731,0.767-1.498,1.149-2.241c0.875-1.682,1.744-3.362,2.556-5.066 c0.549-1.138,1.047-2.305,1.567-3.453c0.617-1.361,1.246-2.723,1.829-4.117c0.566-1.35,1.087-2.733,1.613-4.105 c0.479-1.224,0.978-2.459,1.429-3.705c0.521-1.43,0.989-2.871,1.47-4.317c0.412-1.241,0.841-2.465,1.224-3.711 c0.429-1.396,0.807-2.813,1.201-4.231c0.371-1.326,0.766-2.642,1.104-3.991c0.337-1.315,0.611-2.647,0.915-3.979 c0.343-1.453,0.686-2.905,0.983-4.381c0.251-1.212,0.435-2.436,0.657-3.659c0.286-1.601,0.589-3.202,0.829-4.82 c0.166-1.092,0.286-2.195,0.423-3.299c0.229-1.75,0.475-3.5,0.646-5.272c0.103-1.052,0.154-2.121,0.246-3.19 c0.137-1.807,0.303-3.597,0.389-5.421c0.086-1.646,0.098-3.305,0.126-4.969c0.022-1.195,0.091-2.382,0.091-3.588 c0-0.029,0-0.066,0-0.101c0-0.034,0-0.065,0-0.1c0-83.343-58.735-153.049-137.958-169.25c-0.108-0.02-0.206-0.048-0.314-0.072 c-2.281-0.463-4.58-0.86-6.901-1.235c-0.646-0.106-1.287-0.229-1.938-0.329c-1.83-0.274-3.694-0.492-5.547-0.706 c-1.086-0.132-2.161-0.277-3.259-0.389c-1.59-0.152-3.186-0.252-4.78-0.363c-1.327-0.095-2.637-0.215-3.978-0.274 c-0.177-0.006-0.357-0.029-0.54-0.034L170.634,0l0.194,0.352C128.987,0.917,90.705,16.394,61.043,41.713l0.375-1.898L47.423,54.659 c-0.04,0.04-0.078,0.088-0.117,0.128c-1.827,1.938-3.6,3.917-5.341,5.938c-0.052,0.063-0.103,0.123-0.157,0.186 c-1.71,1.993-3.368,4.023-4.983,6.095c-0.1,0.129-0.203,0.258-0.303,0.386c-1.524,1.958-3,3.948-4.44,5.972 c-0.191,0.277-0.386,0.546-0.583,0.821c-1.312,1.873-2.585,3.771-3.825,5.698c-0.292,0.458-0.586,0.906-0.872,1.358 c-1.106,1.755-2.185,3.536-3.231,5.341c-0.383,0.648-0.757,1.298-1.126,1.949c-0.923,1.639-1.821,3.291-2.693,4.958 c-0.443,0.843-0.872,1.692-1.304,2.542c-0.763,1.518-1.501,3.044-2.221,4.591c-0.48,1.029-0.94,2.062-1.404,3.097 c-0.62,1.412-1.224,2.821-1.815,4.251c-0.492,1.201-0.966,2.413-1.43,3.625c-0.497,1.304-0.995,2.616-1.464,3.934 c-0.486,1.358-0.94,2.728-1.392,4.105c-0.397,1.218-0.797,2.43-1.167,3.659c-0.46,1.521-0.883,3.051-1.304,4.583 c-0.306,1.106-0.609,2.222-0.892,3.34c-0.426,1.689-0.806,3.394-1.181,5.103c-0.223,0.998-0.452,1.993-0.652,2.999 c-0.375,1.884-0.7,3.777-1.012,5.675c-0.14,0.86-0.306,1.715-0.435,2.582c-0.32,2.119-0.578,4.257-0.812,6.393 c-0.077,0.674-0.177,1.341-0.24,2.016c-0.251,2.521-0.44,5.058-0.58,7.599c-0.017,0.314-0.052,0.632-0.071,0.955 c-0.14,2.862-0.22,5.732-0.22,8.617c0,0.031,0,0.06,0,0.089c0,0.028,0,0.06,0,0.094c0,95.408,77.622,173.036,173.033,173.036 c63.053,0,118.317-33.92,148.56-84.455c0.052-0.086,0.103-0.166,0.148-0.252C323.245,259.415,324.537,257.15,325.772,254.84z"></path></g></svg>`);
        } else if (key === "asia_pacific") {
          _push(`<svg class="h-4 w-4" viewBox="0 0 358.194 358.193" fill="currentColor"><path d="M179.1,0C80.341,0,0,80.344,0,179.1c0,98.75,80.341,179.094,179.1,179.094 c98.75,0,179.094-80.344,179.094-179.1S277.85,0,179.1,0z M154.778,254.92c-0.44-2.876,3.062-14.729,5.627-23.375 c2.916-9.858,6.218-21.03,7.582-29.882c1.709-11.1,2.676-12.546,4.14-14.736c1.083-1.617,2.559-3.824,4.352-8.313 c2.19-5.486,16.402-11.53,24.036-14.767c4.751-2.021,8.502-3.62,10.772-5.229c6.479-4.58,6.353-9.263,5.712-11.645 c-1.944-7.116-11.916-8.837-20.391-9.546c-14.826-1.241-34.036-16.974-39.371-28.988c-2.642-5.95-2.358-11.307-1.609-14.85 c4.414,0.749,10.956,0.566,17.037-1.172c0.323-0.091,0.535-0.117,0.652-0.117c1.692,0,4.543,5.727,6.241,9.146 c2.928,5.873,6.241,12.537,12.18,15.933c7.696,4.403,16.056,5.878,22.151,6.962c2.698,0.48,5.249,0.932,6.793,1.481 c1.144,0.412,2.315,0.621,3.493,0.621c7.92,0,13.066-8.243,15.359-24.533c3.03,0.649,6.707,0.463,10.961,0.057 c3.769-0.36,8.543-0.643,12.528-0.115c2.064,1.292,3.625,11.61,2.476,22.489l-0.148,1.406l0.503,1.315 c0.264,0.663,6.313,16.296,13.838,25.745c3.648,4.563,7.902,6.882,12.648,6.882c4.534,0,8.463-2.161,11.613-3.899 c0.863-0.475,1.721-0.949,2.567-1.353c8.291-3.994,5.975-14.27,4.438-21.068c-0.48-2.173-1.099-4.877-1.029-6.007 c0.16-3.167,0.08-7.028,0-10.758c-0.058-2.71-0.12-5.427-0.08-7.828c1.841-0.835,6.604-2.504,18.028-4.494 c11.671,23.115,17.817,48.895,17.817,74.829c-0.018,91.842-74.752,166.566-166.594,166.566 c-91.857,0-166.594-74.724-166.594-166.572c0-12.471,1.569-25.354,4.674-38.328c1.164,0.074,3.402,0.466,7.136,2.001 c9.306,3.834,19.901,20.668,23.358,27.109c0.449,0.737,11.107,18.264,20.405,28.848c1.81,2.064,3.537,3.945,5.184,5.746 c6.621,7.233,11.41,12.465,15.768,22.255c2.275,5.106,3.682,13.151,5.046,20.934c2.067,11.802,4.017,22.935,9.34,29.15 c3.442,4.025,7.253,5.981,11.639,5.981c3.073,0,5.861-0.984,8.554-1.934c2.793-0.988,5.681-2.007,9.106-2.007 c8.18,0,15.867-4.02,20.07-10.486C155.813,263.715,156.482,258.626,154.778,254.92z"></path></svg>`);
        } else {
          _push(`<svg class="h-4 w-4" viewBox="0 0 449.39 449.39" fill="currentColor"><path d="M227.459,0.072l-0.012-0.009h-0.271C226.347,0.057,225.533,0,224.701,0 C100.797,0,0,100.797,0,224.695C0,348.593,100.797,449.39,224.695,449.39c123.897,0,224.695-100.797,224.695-224.695 C449.39,101.724,350.08,1.564,227.459,0.072z M233.478,157.014c30.591-1.152,58.323-8.163,82.733-18.104 c9.436,22.969,15.959,48.76,17.034,77.001h-99.768V157.014z M215.912,215.912h-99.768c1.078-28.264,7.577-54.055,17.005-77.019 c24.416,9.952,52.163,16.968,82.763,18.121V215.912z M98.639,215.912H17.771c1.878-44.786,18.063-85.907,44.072-118.966 c15.084,11.896,33.633,24.339,55.279,34.837C106.981,156.439,99.745,184.68,98.639,215.912z M98.584,233.478 c1.2,31.117,8.331,59.232,18.598,84.101c-21.671,10.498-40.238,22.958-55.333,34.856C35.84,319.379,19.65,278.261,17.777,233.478 H98.584z M116.167,233.478h99.745v58.907c-30.428,1.138-58.038,8.073-82.348,17.937 C124.043,287.41,117.385,261.691,116.167,233.478z M233.478,233.478h99.745c-1.219,28.201-7.892,53.932-17.417,76.844 c-24.308-9.863-51.908-16.793-82.334-17.937v-58.907H233.478z M350.805,233.478h80.813c-1.876,44.783-18.069,85.907-44.075,118.969 c-15.106-11.916-33.701-24.381-55.384-34.891C342.429,292.682,349.599,264.573,350.805,233.478z M350.829,215.912 c-1.069-31.137-8.103-59.313-18.292-84.252c21.534-10.472,39.986-22.864,55.007-34.714c26.012,33.059,42.199,74.18,44.075,118.961 h-80.79V215.912z M376.096,83.606c-13.929,10.938-30.969,22.343-50.73,32.007C303.5,70.76,272.383,37.997,251.604,19.37 C300.481,25.746,344.042,49.255,376.096,83.606z M308.956,122.909c-22.38,9.04-47.688,15.404-75.478,16.539V27.069 C252.175,43.125,285.895,76.27,308.956,122.909z M215.912,27.052v112.39c-27.807-1.135-53.124-7.51-75.515-16.565 C163.46,76.201,197.206,43.077,215.912,27.052z M197.995,19.347c-12.628,11.539-27.286,26.78-38.942,41.501 c-11.588,14.638-24.09,33.133-34.729,54.904c-19.89-9.697-37.027-21.153-51.033-32.146 C105.394,49.201,149.028,25.68,197.995,19.347z M73.285,365.781c14.023-11.007,31.189-22.482,51.116-32.181 c22.26,45.265,53.961,78.131,75.023,96.635C149.872,424.163,105.706,400.512,73.285,365.781z M140.877,326.304 c22.271-8.943,47.434-15.232,75.035-16.354v111.284C197.329,405.292,163.918,372.477,140.877,326.304z M233.478,421.235V309.951 c27.595,1.127,52.748,7.41,75.021,16.354C285.449,372.449,252.055,405.281,233.478,421.235z M250.186,430.201 c20.619-18.264,52.389-51.188,74.746-96.623c19.944,9.709,37.133,21.191,51.164,32.203 C343.727,400.478,299.641,424.105,250.186,430.201z"></path></svg>`);
        }
        _push(`<span>${ssrInterpolate(_ctx.$t(`common.region.${key}`))}</span></div><div class="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded py-1 px-2 -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full w-48"><div class="text-center mb-1 font-medium">${ssrInterpolate(_ctx.$t("common.region.availableIn"))}</div><div class="text-gray-200 text-xs">${ssrInterpolate(region.countries.map((c) => _ctx.$t(`common.region.countries.${c.name}`)).join(", "))}</div><div class="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div></div></button>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RegionSelector.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "UpdatesFeed",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data, pending: loading, error } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/feed", "$XKBtfkR5iR")), __temp = await __temp, __restore(), __temp);
    const localePath = useLocalePath();
    const items = computed(() => {
      var _a, _b;
      return ((_b = (_a = data.value) == null ? void 0 : _a.items) == null ? void 0 : _b.slice(0, 3)) || [];
    });
    function formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString(useI18n().locale.value, {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SkeletonLoader = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white border border-gray-200 p-6" }, _attrs))}><h2 class="text-xl font-semibold text-gray-900 mb-6">${ssrInterpolate(_ctx.$t("updates.title"))}</h2>`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_SkeletonLoader, {
          type: "feed",
          count: 3
        }, null, _parent));
      } else if (unref(error)) {
        _push(`<div class="text-red-600 text-sm">${ssrInterpolate(_ctx.$t("updates.error"))}</div>`);
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(items), (item) => {
          _push(`<div class="flex items-start"><svg class="h-5 w-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><div><h3 class="text-sm font-medium text-gray-900"><a${ssrRenderAttr("href", item.link)} target="_blank" rel="noopener noreferrer" class="hover:text-blue-600">${ssrInterpolate(item.title)}</a></h3><p class="text-sm text-gray-600 mt-1">${ssrInterpolate(item.content)}</p><div class="text-xs text-gray-500 mt-1">${ssrInterpolate(formatDate(item.date))}</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`<div class="mt-4 text-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/updates"),
        class: "inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("updates.readMore"))} <svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"${_scopeId}></path></svg>`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("updates.readMore")) + " ", 1),
              (openBlock(), createBlock("svg", {
                class: "h-4 w-4 ml-1",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M14 5l7 7m0 0l-7 7m7-7H3"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UpdatesFeed.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$1 as _, _sfc_main as a };
//# sourceMappingURL=UpdatesFeed-B4-RLCUP.mjs.map
