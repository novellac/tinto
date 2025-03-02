<script setup lang="ts">
import { computed, watchEffect, ref } from "vue";
import { format } from "date-fns";

const props = defineProps<{
  format?: "iso" | "utc" | "local";
}>();

const formatType = computed(() => props.format || "local");
const currentDate = ref(new Date());


const formattedDate = computed(() => {
  switch (formatType.value) {
    case "iso":
      return format(currentDate.value, "yyyy-MM-dd");
    case "utc":
      return format(currentDate.value, "eee, dd MMM yyyy HH:mm:ss OOOO");
    default:  
      return format(currentDate.value, "P");
  }
});

</script>

<template>
  <span>{{ formattedDate }}</span>
</template>
