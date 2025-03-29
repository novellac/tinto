<script setup lang="ts">
defineProps({
  block: {
    type: Object,
    default: null,
  },
  headingLevel: {
    type: Number,
    default: 2,
  },
})
</script>

<template>
  <div
    class="horizontal-card-block"
    :class="{ 'image-right': block.imageRight }"
  >
    <div>
      <NuxtImg
        v-if="block.image"
        class="card-image"
        :src="block.image"
        :alt="block.alt"
        loading="lazy"
        placeholder
        :data-tina-field="tinaField(block, 'image')"
      />
    </div>

    <div class="card-content">
      <BaseHeading
        v-if="block.heading"
        :heading-level="headingLevel"
        :hide-heading="block.hideHeading"
        :heading="block.heading"
        :data-tina-field="tinaField(block, 'heading')"
      />

      <div class="prose lg:prose-xl mt-2" :data-tina-field="tinaField(block, 'richText')">
        <TinaMarkdown :content="block?.richText || []" />
      </div>

      <DividerBlock
        v-if="block.dividerStyle"
        class="card-divider"
        :block="block"
        :data-tina-field="tinaField(block, 'dividerStyle')"
      />
    </div>
  </div>
</template>

<style scoped>
.horizontal-card-block {
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
}

.card-image {
  width: 100%;
}

.card-content {
  flex-shrink: 0;
}

.card-divider {
  margin-top: var(--gap-sm);
}

@media screen and (min-width: 768px) {
  .horizontal-card-block {
    flex-direction: row;
    align-items: center;
    gap: var(--gap-base);
  }

  .horizontal-card-block.image-right {
    flex-direction: row-reverse;
  }

  .horizontal-card-block div {
    flex-basis: 50%;
  }

  .card-divider {
    margin-top: var(--gap-base);
  }
}
</style>
