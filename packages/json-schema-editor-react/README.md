# JSON-Schema-Enhanced-Editor-React

json-schema-enhanced-editor-react is a lightweight json editor based on react & codemirror, providing smart prompts and verification based on json-schema.

## Usage

```tsx
import { JSONSchema7 } from "json-schema";
import { Editor } from "json-schema-enhanced-editor-react";
import React from "react";

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