<script setup lang="ts">
import type { MarkdownElement } from '~/components/tina/TinaNode.vue'
import { TinaBlockQuote, TinaCallout, TinaCurrentDate, TinaMarkdown } from '#components'
import { tinaField } from '@/composables/tinaField'
import { useTina } from '@/composables/useTina'
import { client } from '@/tina/__generated__/client'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const postSlug = route.params.id

definePageMeta({
  prerender: true,
})

const postResponse = await client.queries.post({ relativePath: `${postSlug}.mdx` })

const { data } = useTina({
  query: postResponse.query,
  variables: postResponse.variables,
  data: postResponse.data.post,
})

const markdownContent = computed(() => data.value?.body || [])

// ? Custom Components that are passed to TinaMarkdown
const customComponents: Partial<Record<MarkdownElement, unknown>> = {
  callout: TinaCallout,
  currentDateTime: TinaCurrentDate,
  blockquote: TinaBlockQuote,
}

function formatDate(date: string | number | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
</script>

<template>
  <article v-if="data" class="max-w-3xl mx-auto px-6 py-20">
    <header class="mb-12 text-center">
      <h1 :data-tina-field="tinaField(data, 'title')" class="text-4xl font-medium text-gray-900 mb-4">
        {{ data.title }}
      </h1>
      <div class="text-pink-600" :data-tina-field="tinaField(data, 'date')">
        <time>{{ formatDate(data.date) }}</time>
      </div>
    </header>

    <div class="prose lg:prose-xl" :data-tina-field="tinaField(data, 'body')">
      <TinaMarkdown :content="markdownContent" :components="customComponents" />
    </div>
  </article>
</template>
