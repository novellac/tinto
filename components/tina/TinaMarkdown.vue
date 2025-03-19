<script setup lang="ts">
import type { MarkdownElement } from '~/components/tina/TinaNode.vue'
import { TinaBlockQuote, TinaCallout, TinaCurrentDate } from '#components'
import { computed, unref } from 'vue'
import TinaNode from './TinaNode.vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  content: TinaMarkdownContent | TinaMarkdownContent[]
}>()

export interface TinaMarkdownContent {
  type: string
  children?: TinaMarkdownContent[]
  text?: string
}

// ? Custom Components that are passed to TinaMarkdown
const customComponents: Partial<Record<MarkdownElement, unknown>> = {
  callout: TinaCallout,
  currentDateTime: TinaCurrentDate,
  blockquote: TinaBlockQuote,
}

const nodes = computed(() => {
  const rawContent = unref(props.content)
  return Array.isArray(rawContent) ? rawContent : rawContent?.children || []
})
</script>

<template>
  <template v-for="(child, index) in nodes" :key="index">
    <TinaNode :child="child" :components="customComponents" v-bind="$attrs" />
  </template>
</template>
