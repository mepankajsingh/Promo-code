<template>
  <div class="relative flex items-center h-full">
    <button
      @click="isOpen = !isOpen"
      class="inline-flex items-center px-2 py-1 text-sm text-gray-700 hover:text-blue-600 focus:outline-none"
      aria-label="Select language"
    >
      <div class="flex items-center">
        <img 
          :src="getFlagUrl(currentLocale.code)" 
          :alt="currentLocale.name"
          class="w-4 h-3 object-cover"
          loading="lazy"
        />
        <span class="ml-1 mr-1">{{ currentLocale.name }}</span>
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 top-full mt-1 py-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
      @click.away="isOpen = false"
    >
      <NuxtLink
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
        class="flex items-center px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        :class="{ 'bg-gray-50': locale.code === currentLocale.code }"
      >
        <img 
          :src="getFlagUrl(locale.code)" 
          :alt="locale.name"
          class="w-4 h-3 object-cover"
          loading="lazy"
        />
        <span class="ml-2">{{ locale.name }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const isOpen = ref(false)

const availableLocales = computed(() => {
  return locales.value.map(l => ({
    code: l.code,
    name: l.name
  }))
})

const currentLocale = computed(() => {
  return locales.value.find(l => l.code === locale.value)
})

function getFlagUrl(code) {
  const countryCode = code === 'en' ? 'us' : 
                     code === 'ja' ? 'jp' : 
                     code === 'hi' ? 'in' : code
  return `https://flagcdn.com/w40/${countryCode}.png`
}
</script>
