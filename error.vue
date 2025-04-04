<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24">
      <div class="text-center">
        <p class="text-sm font-semibold text-blue-600 uppercase tracking-wide">404 error</p>
        <h1 class="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p class="mt-4 text-lg text-gray-500">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div class="mt-8">
          <NuxtLink
            :to="localePath('/')"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <svg
              class="h-5 w-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath()

// Set page title and meta
useHead({
  title: '404 - Page Not Found',
  meta: [
    {
      name: 'description',
      content: 'Sorry, the page you are looking for could not be found.'
    }
  ]
})

// Handle the error
const error = useError()

// You can access error details if needed
// console.log(error.value)
</script>
