import { JSONSchema7 } from "json-schema";
import React, { useEffect, useState } from "react";
import { JSONSchemaInput } from "./JSONSchemaInput";

const defaultData = {
  name: "json-schema-editor",
  version: "0.1.0",
  contributors: [
    {
      email: "email",
      url: "https://www.google.com",
    },
  ],
};

export function JSONSchemaInputDemo() {
  const [value, setValue] = useState<object | null>(defaultData);
  const [schema, setSchema] = useState<JSONSchema7 | null>(null);
  const [schemaFile, setSchemaFile] = useState("package.json");

  useEffect(() => {
    const schemaSelect = document.getElementById("schema-selection");

    schemaSelect!.onchange = async (e) => {
      const val = (e as unknown as React.ChangeEvent<HTMLInputElement>).target.value;

      if (!val) {
        return;
      }

      const data = (await (await fetch(`https://json.schemastore.org/${val}`)).json()) as JSONSchema7;

      setSchemaFile(val);
      setSchema(data);
    };
  }, []);

  useEffect(() => {
    void initSchema();
  }, []);

  async function initSchema() {
    const data = (await (await fetch(`https://json.schemastore.org/${schemaFile}`)).json()) as JSONSchema7;
    setSchema(data);
  }

  const onChange = (newValue: object | null) => {
    setValue(newValue);
  };

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <select id="schema-selection" value={schemaFile}>
          <option value="package.json">package.json</option>
          <option value="eslintrc.json">eslintrc.json</option>
        </select>
      </div>
      <div style={{ width: "50%" }}>
        <JSONSchemaInput height="500px" value={value} onChange={onChange} schema={schema as unknown as JSONSchema7} />
      </div>
    </div>
  );
}
