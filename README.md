# JSON-Schema-Editor

A json-schema-editor collection, support react、vue framework, will support svelte framework.<br />
json-schema-editor is a lightweight json editor based on codemirror, providing smart prompts and verification based on json-schema.

## List of Contents

- List of Contents
- [Usage](#Usage)
  - [React](#react)
  - [Vue](#vue)
- [License](#license)

## Usage

### React
```tsx
import { JSONSchema7 } from "json-schema";
import { Editor } from "json-schema-enhanced-editor-react";

export function JSONSchemaInputDemo() {
  const [value, setValue] = useState<object | null>({ ...mock.package });
  const [schema, setSchema] = useState<JSONSchema7 | null>(null);
  const [height, setHeight] = useState("300px");

  return (
    <Editor 
      value={value ? JSON.stringify(value, null, 4) : "{}"}
      onChange={(value) => {
        if (!value) return setValue(null);

        try {
          const result = JSON.parse(value) as object;

          if (result) {
            setValue(result);
          }
        } catch (e) {
          // _
        }
      }}
      schema={schema as unknown as JSONSchema7}
      height={height}
    />
  );
}
```

Read more: [json-schema-enhanced-editor-react](https://github.com/rookie-luochao/json-schema-editor/tree/main/packages/json-schema-editor-react)

### Vue
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

Read more: [json-schema-enhanced-editor-vue](https://github.com/rookie-luochao/json-schema-editor/tree/main/packages/json-schema-editor-vue)

## License
[MIT](https://github.com/rookie-luochao/json-schema-editor/blob/main/LICENSE)