<template>
  <h2 style="margin-bottom: 16px">
    {{ name }}
  </h2>
</template>
<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";

const props = defineProps<{
  name?: string;
}>();
const name: Ref<string> = ref(props.name || "json-schema-enhanced-editor-vue");
</script>
