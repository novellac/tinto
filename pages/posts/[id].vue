<script setup lang="ts">
import { TinaMarkdown } from '#components'
import { tinaField } from '@/composables/tinaField'
import { useTina } from '@/composables/useTina'
import { client } from '@/tina/__generated__/client'
import { useRoute } from 'vue-router'
import CenteredProseBlock from '~/components/CenteredProseBlock.vue'

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
  contentType: 'post',
})

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

    <h2 class="text-3xl">
      What I'm munching on today:
    </h2>
    <ul v-if="data.snackList" class="flex gap-4 flex-wrap mt-2">
      <li v-for="(item, index) in data.snackList" :key="index" class="bg-pink-200 rounded-full px-2" :data-tina-field="tinaField(data, 'snackList', index)">
        {{ item }}
      </li>
    </ul>

    <h2 class="text-3xl mt-8">
      What I'm thinking about today:
    </h2>
    <div class="prose lg:prose-xl mt-2" :data-tina-field="tinaField(data, 'body')">
      <TinaMarkdown :content="data?.body || []" />
    </div>

    <h2 class="text-3xl mt-8">
      Where you can find these fantatic fruits:
    </h2>
    <ul v-if="data.linkItems" class="flex flex-col gap-2">
      <li v-for="(linkItem, linkIndex) in data.linkItems" :key="linkIndex" class="border-green-700 rounded-full px-2">
        <span class="mr-1">🔗</span>
        <a v-if="linkItem?.href" :href="linkItem?.href" :data-tina-field="tinaField(linkItem, 'linkText')" class="underline">
          {{ linkItem?.linkText }}
        </a>
        <p v-else>
          {{ linkItem?.linkText }}
        </p>
      </li>
    </ul>

    <h2 class="text-3xl">
      One last thought:
    </h2>
    <div class="prose lg:prose-xl mt-2" :data-tina-field="tinaField(data, 'richText')">
      <TinaMarkdown :content="data?.richText || []" />
    </div>

    <h2 class="text-3xl">
      No I was wrong there are even more random thoughts:
    </h2>
    <aside v-if="data.blocks?.length" class="flex flex-col gap-8 mt-8">
      <section v-for="(block, index) in data.blocks" :key="index">
        <CenteredProseBlock v-if="block" :block="block" />
      </section>
    </aside>
  </article>
</template>
