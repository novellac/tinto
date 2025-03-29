<!-- eslint-disable vue/no-v-html -->
<script setup lang="ts">
defineProps({
  block: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <div class="vertical-card-block">
    <NuxtImg
      v-if="block.image"
      class="card-image"
      :src="block.image"
      :alt="block.alt"
      loading="lazy"
      placeholder
      :data-tina-field="tinaField(block, 'image')"
    />

    <div>
      <BaseHeading v-if="block.heading" :heading="block.heading" :data-tina-field="tinaField(block, 'heading')" />

      <div class="prose lg:prose-xl mt-2" :data-tina-field="tinaField(block, 'richText')">
        <TinaMarkdown :content="block?.richText || []" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.vertical-card-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-sm);
}

.card-image {
  width: 100%;
  margin: auto;
}
</style>
