<template>
  <div class="max-w-5xl mx-auto px-6 py-20">
    <section class="text-center mb-20">
      <h1 class="text-5xl font-medium text-gray-900 mb-6">
        Create Your Blog with TinaCMS
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        A modern blogging platform built with Nuxt and TinaCMS. Start writing beautiful content in minutes.
      </p>
      <div class="flex justify-center space-x-4">
        <NuxtLink
          to="/posts"
          class="inline-block bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition"
        >
          View Blog Posts
        </NuxtLink>
        <a
          href="https://tina.io/docs/setup-overview/"
          target="_blank"
          rel="noopener"
          class="inline-block bg-white border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-50 transition"
        >
          Get Started
        </a>
      </div>
    </section>

    <section class="grid md:grid-cols-3 gap-12">
      <div class="text-center">
        <h3 class="text-xl font-medium text-gray-900 mb-4">
          Visual Editing
        </h3>
        <p class="text-gray-600">
          Edit your content visually with TinaCMS's intuitive interface. No coding required.
        </p>
      </div>
      <div class="text-center">
        <h3 class="text-xl font-medium text-gray-900 mb-4">
          Markdown Support
        </h3>
        <p class="text-gray-600">
          Write your content in Markdown with full support for rich text formatting.
        </p>
      </div>
      <div class="text-center">
        <h3 class="text-xl font-medium text-gray-900 mb-4">
          Fast & Modern
        </h3>
        <p class="text-gray-600">
          Built with Nuxt 3 for optimal performance and developer experience.
        </p>
      </div>
    </section>
  </div>
</template>
