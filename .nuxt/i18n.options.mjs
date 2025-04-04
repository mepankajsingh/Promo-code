
// @ts-nocheck


export const localeCodes =  [
  "en",
  "fr",
  "es",
  "pt",
  "de",
  "ja",
  "hi",
  "ru"
]

export const localeLoaders = {
  "en": [{ key: "../locales/en.json", load: () => import("../locales/en.json" /* webpackChunkName: "locale__home_project_locales_en_json" */), cache: true }],
  "fr": [{ key: "../locales/fr.json", load: () => import("../locales/fr.json" /* webpackChunkName: "locale__home_project_locales_fr_json" */), cache: true }],
  "es": [{ key: "../locales/es.json", load: () => import("../locales/es.json" /* webpackChunkName: "locale__home_project_locales_es_json" */), cache: true }],
  "pt": [{ key: "../locales/pt.json", load: () => import("../locales/pt.json" /* webpackChunkName: "locale__home_project_locales_pt_json" */), cache: true }],
  "de": [{ key: "../locales/de.json", load: () => import("../locales/de.json" /* webpackChunkName: "locale__home_project_locales_de_json" */), cache: true }],
  "ja": [{ key: "../locales/ja.json", load: () => import("../locales/ja.json" /* webpackChunkName: "locale__home_project_locales_ja_json" */), cache: true }],
  "hi": [{ key: "../locales/hi.json", load: () => import("../locales/hi.json" /* webpackChunkName: "locale__home_project_locales_hi_json" */), cache: true }],
  "ru": [{ key: "../locales/ru.json", load: () => import("../locales/ru.json" /* webpackChunkName: "locale__home_project_locales_ru_json" */), cache: true }]
}

export const vueI18nConfigs = [
  
]

export const nuxtI18nOptions = {
  "experimental": {
    "localeDetector": "",
    "switchLocalePathLinkSSR": false,
    "autoImportTranslationFunctions": false
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false
  },
  "compilation": {
    "jit": true,
    "strictMessage": true,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "",
  "locales": [
    {
      "code": "en",
      "name": "English",
      "language": "en-US",
      "files": [
        "/home/project/locales/en.json"
      ]
    },
    {
      "code": "fr",
      "name": "Français",
      "language": "fr-FR",
      "files": [
        "/home/project/locales/fr.json"
      ]
    },
    {
      "code": "es",
      "name": "Español",
      "language": "es-ES",
      "files": [
        "/home/project/locales/es.json"
      ]
    },
    {
      "code": "pt",
      "name": "Português",
      "language": "pt-BR",
      "files": [
        "/home/project/locales/pt.json"
      ]
    },
    {
      "code": "de",
      "name": "Deutsch",
      "language": "de-DE",
      "files": [
        "/home/project/locales/de.json"
      ]
    },
    {
      "code": "ja",
      "name": "日本語",
      "language": "ja-JP",
      "files": [
        "/home/project/locales/ja.json"
      ]
    },
    {
      "code": "hi",
      "name": "हिन्दी",
      "language": "hi-IN",
      "files": [
        "/home/project/locales/hi.json"
      ]
    },
    {
      "code": "ru",
      "name": "Русский",
      "language": "ru-RU",
      "files": [
        "/home/project/locales/ru.json"
      ]
    }
  ],
  "defaultLocale": "en",
  "defaultDirection": "ltr",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "prefix_except_default",
  "lazy": true,
  "langDir": "locales",
  "detectBrowserLanguage": {
    "alwaysRedirect": true,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "i18n_redirected",
    "cookieSecure": false,
    "fallbackLocale": "",
    "redirectOn": "root",
    "useCookie": true
  },
  "differentDomains": false,
  "baseUrl": "",
  "dynamicRouteParams": false,
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false,
  "multiDomainLocales": false,
  "i18nModules": []
}

export const normalizedLocales = [
  {
    "code": "en",
    "name": "English",
    "language": "en-US",
    "files": [
      {
        "path": "/home/project/locales/en.json"
      }
    ]
  },
  {
    "code": "fr",
    "name": "Français",
    "language": "fr-FR",
    "files": [
      {
        "path": "/home/project/locales/fr.json"
      }
    ]
  },
  {
    "code": "es",
    "name": "Español",
    "language": "es-ES",
    "files": [
      {
        "path": "/home/project/locales/es.json"
      }
    ]
  },
  {
    "code": "pt",
    "name": "Português",
    "language": "pt-BR",
    "files": [
      {
        "path": "/home/project/locales/pt.json"
      }
    ]
  },
  {
    "code": "de",
    "name": "Deutsch",
    "language": "de-DE",
    "files": [
      {
        "path": "/home/project/locales/de.json"
      }
    ]
  },
  {
    "code": "ja",
    "name": "日本語",
    "language": "ja-JP",
    "files": [
      {
        "path": "/home/project/locales/ja.json"
      }
    ]
  },
  {
    "code": "hi",
    "name": "हिन्दी",
    "language": "hi-IN",
    "files": [
      {
        "path": "/home/project/locales/hi.json"
      }
    ]
  },
  {
    "code": "ru",
    "name": "Русский",
    "language": "ru-RU",
    "files": [
      {
        "path": "/home/project/locales/ru.json"
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false

export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18n"
export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
