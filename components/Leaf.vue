<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  
}>();

const formattedText = computed(() => {
  let result = props.text || "";

  if (props.bold) result = `<strong>${result}</strong>`;
  if (props.italic) result = `<em>${result}</em>`;
  if (props.code) result = `<code class="bg-gray-200 p-1 rounded">${result}</code>`;
    
  return result;
});
</script>

<template>
  <span v-html="formattedText"></span>
</template>
