<template>
  <div class="max-w-5xl mx-auto px-6 py-20">
    <h1 class="text-4xl font-medium text-gray-900 mb-12">Latest Posts</h1>
    
    <div v-if="posts?.length" class="grid gap-12">
      <article 
        v-for="post in posts" 
        :key="post?.node?._sys.filename"
        class="group"
      >
        <NuxtLink :to="'/posts/' + post?.node?._sys.filename">
          <div class="space-y-4">
            <h2 class="text-2xl font-medium text-gray-900 group-hover:text-gray-600 transition">
              {{ post?.node?.title }}
            </h2>
            <p class="text-gray-600 text-lg">{{ post?.node?.description }}</p>
            <div class="flex items-center text-sm text-gray-500">
              <time>{{ formatDate(post?.node?.date ?? '') }}</time>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>
    <p v-else class="text-gray-600 text-lg">No posts found.</p>
  </div>
</template>

<script setup lang="ts">

import { client } from '@/tina/__generated__/client';

const { data: posts } = await useAsyncData('posts', async () => {
  const postsResponse = await client.queries.postConnection({sort: "date"});
  return postsResponse.data.postConnection.edges?.reverse();
});
function formatDate(date: string | number | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })
}
</script>