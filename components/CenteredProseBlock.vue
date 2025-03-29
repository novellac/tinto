<script setup lang="ts">
defineProps({
  block: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="max-w-lg border border-fuchsia-300 p-8 rounded mx-auto">
    <BaseHeading v-if="block.heading" :heading="block.heading" :data-tina-field="tinaField(block, 'heading')" />

    <div class="prose lg:prose-xl mt-2" :data-tina-field="tinaField(block, 'richText')">
      <TinaMarkdown :content="block?.richText || []" />
    </div>
  </div>
</template>
