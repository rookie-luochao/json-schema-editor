# JSON-Schema-Enhanced-Editor-Vue

[![npm package](https://img.shields.io/npm/v/json-schema-enhanced-editor-vue.svg)](https://www.npmjs.com/package/json-schema-enhanced-editor-vue)

json-schema-enhanced-editor-vue is a lightweight json editor based on vue & codemirror, providing smart prompts and verification based on json-schema.

## Usage

```vue
<template>
  <Editor
    v-model="value"
    :schema="schema"
    :height="height"
    :change="onChange"
  />
</template>
<script setup lang="ts">
import { JSONSchema7 } from "json-schema";
import { Editor } from "json-schema-enhanced-editor-vue";

const value: Ref<string> = ref(JSON.stringify({ ...mock.package }, null, 4));
const schema: Ref<JSONSchema7 | null> = ref(null);
const height: Ref<string> = ref("300px");

const onChange = (value: string) => {
  console.log('value: ', value);
}
</script>
```