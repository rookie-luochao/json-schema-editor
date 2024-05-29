# JSON-Schema-Enhanced-Editor-React

json-schema-enhanced-editor-react is a lightweight json editor based on react & codemirror, providing smart prompts and verification based on json-schema.

## Usage

```tsx
import { JSONSchema7 } from "json-schema";
import { Editor } from "json-schema-enhanced-editor-react";
import React from "react";

interface IJSONInputWithSchemaProps {
  value: object | null;
  onChange: (value: object | null) => void;
  schema: JSONSchema7;
  height?: number;
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