<script setup lang="ts">
import { client } from '@/tina/__generated__/client'
import { ContentType } from '~/types'

const { headingLevel } = defineProps({
  block: {
    type: Object,
    default: null,
  },
  headingLevel: {
    type: Number,
    default: 3,
  },
})

const hTag = computed(() => {
  return `h${headingLevel}`
})

</script>

<template>
  <div class="flex gap-4 items-center">
    <NuxtImg v-if="block.heroField.image"
      class="rounded-full h-12 w-12 object-cover border-2 border-purple-300 bg-purple-200" :src="block.heroField.image"
      :alt="block.heroField.alt" loading="lazy" placeholder :data-tina-field="tinaField(block.heroField, 'image')" />

    <component class="text-lg" :is="hTag" :heading="block.title" :headingLevel>
      <NuxtLink :to="`/authors/${block._sys.filename}`">{{ block.title }}</NuxtLink>
    </component>
  </div>
</template>
