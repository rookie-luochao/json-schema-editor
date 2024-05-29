# JSON-Schema-Editor

A json-schema-editor collection, support react framework, will support vue3、svelte.<br />
json-schema-editor is a lightweight json editor based on codemirror, providing smart prompts and verification based on json-schema.

## List of Contents

- List of Contents
- [Usage](#Usage)
  - [React](#react)
- [License](#license)

## Usage

### React
```tsx
import { JSONSchema7 } from "json-schema";
import { Editor } from "json-schema-editor-react";
import React from "react";

interface IJSONInputWithSchemaProps {
  value: object | null;
  onChange: (value: object | null) => void;
  schema: JSONSchema7;
  height?: string;
}

export function JSONSchemaInput(props: IJSONInputWithSchemaProps) {
  const value = props.value ? JSON.stringify(props.value, null, 4) : "{}";

  return (
    <Editor
      height={props.height || "300px"}
      schema={props.schema}
      value={value}
      onChange={(value) => {
        if (!value) return props.onChange(null);

        try {
          const result = JSON.parse(value);
          
          if (result) {
            props.onChange(result);
          }
        } catch (e) {
          // _
        }
      }}
    />
  );
}
```

Read more: [json-schema-editor-react](https://github.com/rookie-luochao/json-schema-editor/tree/main/packages/json-schema-editor-react)

## License
[MIT](https://github.com/rookie-luochao/json-schema-editor/blob/main/LICENSE)