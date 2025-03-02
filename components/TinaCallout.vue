<script setup lang="ts">
const props = defineProps<{
  text: string;
  type?: "info" | "warning" | "success";
}>();

</script>

<template>
  <div
    class="p-4 border-l-4"
    :class="{
      'border-blue-500 bg-blue-100': type === 'info',
      'border-yellow-500 bg-yellow-100': type === 'warning',
      'border-green-500 bg-green-100': type === 'success'
    }"
  >
    <strong>{{ type?.toUpperCase() || "NOTE" }}</strong>
    <p class="mt-1 text-gray-800">{{ text }}</p>
  </div>
</template>
