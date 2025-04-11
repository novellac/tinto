<script setup lang="ts">
import { client } from '@/tina/__generated__/client'

const { data: authors } = await useAsyncData('authors', async () => {
  const authorsResponse = await client.queries.authorConnection({ sort: 'title' })
  return authorsResponse.data.authorConnection.edges?.reverse()
})
</script>

<template>
  <div class="max-w-5xl mx-auto px-6 py-20">
    <h1 class="text-4xl font-medium text-gray-900 mb-12">
      Site Authors
    </h1>

    <ul v-if="authors?.length" class="grid gap-12">
      <li
        v-for="author in authors"
        :key="author?.node?._sys.filename"
        class="group"
      >
        <NuxtLink :to="`/authors/${author?.node?._sys.filename}`">
          <div class="space-y-4">
            <h2 class="text-2xl font-medium text-gray-900 group-hover:text-gray-600 transition">
              {{ author?.node?.title }}
            </h2>
          </div>
        </NuxtLink>
      </li>
    </ul>
    <p v-else class="text-gray-600 text-lg">
      No authors found.
    </p>
  </div>
</template>
