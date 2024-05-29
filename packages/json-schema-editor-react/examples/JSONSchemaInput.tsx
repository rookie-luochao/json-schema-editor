import { JSONSchema7 } from "json-schema";
import React from "react";
import { Editor } from "../src/Editor";

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
      height={props.height}
      schema={props.schema}
      value={value}
      onChange={(value) => {
        if (!value) return props.onChange(null);

        try {
          const result = JSON.parse(value) as object;

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
