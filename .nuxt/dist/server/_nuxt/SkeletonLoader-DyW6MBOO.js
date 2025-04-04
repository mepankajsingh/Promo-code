import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList } from "vue/server-renderer";
const _sfc_main = {
  __name: "SkeletonLoader",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) => ["text", "title", "card", "form", "feed"].includes(value)
    },
    count: {
      type: Number,
      default: 3
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "animate-pulse" }, _attrs))}>`);
      if (__props.type === "text") {
        _push(`<div class="h-4 bg-gray-200 rounded w-3/4"></div>`);
      } else if (__props.type === "title") {
        _push(`<div class="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>`);
      } else if (__props.type === "card") {
        _push(`<div class="bg-white border border-gray-200 p-6 rounded-lg"><div class="h-6 bg-gray-200 rounded w-1/4 mb-4"></div><div class="space-y-3"><div class="h-4 bg-gray-200 rounded"></div><div class="h-4 bg-gray-200 rounded w-5/6"></div><div class="h-4 bg-gray-200 rounded w-4/6"></div></div></div>`);
      } else if (__props.type === "form") {
        _push(`<div class="space-y-4"><div class="h-8 bg-gray-200 rounded"></div><div class="h-10 bg-gray-200 rounded"></div><div class="h-10 bg-gray-200 rounded"></div></div>`);
      } else if (__props.type === "feed") {
        _push(`<div class="space-y-6"><!--[-->`);
        ssrRenderList(__props.count, (i) => {
          _push(`<div class="bg-white border border-gray-200 p-6"><div class="h-6 bg-gray-200 rounded w-3/4 mb-3"></div><div class="h-4 bg-gray-200 rounded w-1/4 mb-4"></div><div class="space-y-2"><div class="h-4 bg-gray-200 rounded"></div><div class="h-4 bg-gray-200 rounded w-5/6"></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SkeletonLoader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=SkeletonLoader-DyW6MBOO.js.map
