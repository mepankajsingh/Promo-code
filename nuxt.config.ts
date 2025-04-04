export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase', '@nuxtjs/i18n'],
  supabase: {
    url: 'https://iinwnmqjdemucplpzljf.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpbndubXFqZGVtdWNwbHB6bGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyNjc4NTcsImV4cCI6MjA1NDg0Mzg1N30.u1BfmcWoEY1S7XqRbHbqAc8wLcUb6FqNQyoxYEz8Yck',
    redirect: false,
    cookieOptions: {
      secure: false
    }
  },
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'fr', iso: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'es', iso: 'es-ES', name: 'Español', file: 'es.json' },
      { code: 'pt', iso: 'pt-BR', name: 'Português', file: 'pt.json' },
      { code: 'de', iso: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'ja', iso: 'ja-JP', name: '日本語', file: 'ja.json' },
      { code: 'hi', iso: 'hi-IN', name: 'हिन्दी', file: 'hi.json' },
      { code: 'ru', iso: 'ru-RU', name: 'Русский', file: 'ru.json' }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true
    }
  },
  app: {
    head: {
      title: 'GWsave - Google Workspace Promo Codes',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'https://assets.gwsave.com/icon.svg' }
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          hid: 'description', 
          name: 'description', 
          content: 'Get exclusive 10% discount on Google Workspace Business plans with GWsave promo codes.'
        }
      ]
    }
  },
  // Configure routes and SSR
  routeRules: {
    '/': { ssr: true },
    '/updates': { ssr: true },
    '/starter': { ssr: true },
    '/standard': { ssr: true },
    '/about': { ssr: true },
    '/contact': { ssr: true }
  },
  // Configure nitro for better feed handling
  nitro: {
    routeRules: {
      '/api/feed': { cors: true, headers: { 'cache-control': 'max-age=300, s-maxage=300' } }
    }
  }
})
