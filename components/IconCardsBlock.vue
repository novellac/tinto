<script setup lang="ts">
defineProps({
  block: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <div class="icon-cards-block">
    <BaseHeading v-if="block.heading" :heading="block.heading" :data-tina-field="tinaField(block, 'heading')" />

    <ul v-if="block.text" class="cards-list">
      <li v-for="(item, index) in block.text" :key="index" :data-tina-field="tinaField(block, 'text')">
        <img v-if="block.iconCardsIcon.image" class="card-image" :src="block.iconCardsIcon.image" :alt="block.iconCardsIcon.alt">

        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.icon-cards-block {
  display: flex;
  flex-direction: column;
}

.cards-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
}

.cards-list li:first-child img {
  padding-top: 0;
}

.card-image {
  width: 4rem;
  padding: calc(var(--gap-sm) / 2);
}

@media screen and (min-width: 768px) {
  .cards-list li:first-child img {
    padding: calc(var(--gap-sm) / 2);
  }
  .cards-list {
    flex-direction: row;
    gap: var(--gap-lg);
  }
  .cards-list li {
    flex-basis: 33%;
  }
}
</style>
