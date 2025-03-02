<script setup lang="ts">
import { computed, unref } from "vue";
import TinaNode from "./TinaNode.vue";

export type TinaMarkdownContent = {
  type: string;
  children?: TinaMarkdownContent[];
  text?: string; 
};

const props = defineProps<{
  content: TinaMarkdownContent | TinaMarkdownContent[];
  components?: Record<string, any>;
}>();

const nodes = computed(() => {
  const rawContent = unref(props.content);
  return Array.isArray(rawContent) ? rawContent : rawContent?.children || [];
});

</script>

<template>
  <template v-for="(child, index) in nodes" :key="index">
    <TinaNode :child="child" :components="components" />
  </template>
</template>

