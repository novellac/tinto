<script setup lang="ts">
defineProps({
  block: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <div class="left-aligned-prose-block">
    <BaseHeading v-if="block.heading" :heading="block.heading" :data-tina-field="tinaField(block, 'heading')" />

    <div class="prose lg:prose-xl mt-2" :data-tina-field="tinaField(block, 'richText')">
      <TinaMarkdown :content="block?.richText || []" />
    </div>
  </div>
</template>
