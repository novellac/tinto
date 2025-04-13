<script setup lang="ts">
import { tinaField } from '@/composables/tinaField'
import { useBlockTemplate } from '@/composables/useBlockTemplate'
import { useTina } from '@/composables/useTina'
import { client } from '@/tina/__generated__/client'
import { useRoute } from 'vue-router'
import CenteredProseBlock from '~/components/CenteredProseBlock.vue'
import { ContentType } from '~/types'

const route = useRoute()
const authorSlug = route.params.id

definePageMeta({
  prerender: true,
})

const authorResponse = await client.queries.author({ relativePath: `${authorSlug}.mdx` })

const { data } = useTina({
  query: authorResponse.query,
  variables: authorResponse.variables,
  data: authorResponse.data.author,
  contentType: ContentType.AUTHOR,
})
</script>

<template>
  <article v-if="data" class="max-w-3xl mx-auto px-6 py-20">
    <header class="mb-12 text-center">
      <h1 :data-tina-field="tinaField(data, 'title')" class="text-4xl font-medium text-gray-900 mb-4">
        {{ data.title }}
      </h1>
    </header>

    <HeroCardBlock
      v-if="data.heroField"
      class="basicpage-hero"
      :block="data.heroField"
    />

    <DividerBlock
      v-if="data.dividerField"
      class="basicpage-divider"
      :block="data.dividerField"
    />

    <aside v-if="data.blocks?.length" class="flex flex-col gap-8 mt-8">
      <section v-for="(block, index) in data.blocks" :key="index">
        <component :is="useBlockTemplate({ rawTemplateName: block.__typename, contentType: ContentType.AUTHOR })" v-if="block" :block="block" />
      </section>
    </aside>
  </article>
</template>
