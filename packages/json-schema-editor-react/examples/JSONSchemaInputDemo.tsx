import { JSONSchema7 } from "json-schema";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { JSONSchemaInput } from "./JSONSchemaInput";

const mock = {
  package: {
    name: "json-schema-editor",
    version: "0.1.0",
    contributors: [
      {
        email: "email",
        url: "https://www.google.com",
      },
    ],
  },
  eslintrc: { root: true, noInlineConfig: "test" },
};
const heights = ["100px", "200px", "300px", "500px"];

export function JSONSchemaInputDemo() {
  const [value, setValue] = useState<object | null>({ ...mock.package });
  const [schema, setSchema] = useState<JSONSchema7 | null>(null);
  const [schemaFile, setSchemaFile] = useState("package.json");
  const [height, setHeight] = useState(heights[2]);

  useEffect(() => {
    void changeSchema(schemaFile);
  }, []);

  const onChange = (newValue: object | null) => {
    setValue(newValue);
  };

  const handleChange = (e: SyntheticEvent) => {
    const val = (e.target as HTMLInputElement).value;

    if (!val) {
      return;
    }

    setSchemaFile(val);
    void changeSchema(val);
  };

  async function changeSchema(schemaFileName: string) {
    const data = (await (await fetch(`https://json.schemastore.org/${schemaFileName}`)).json()) as JSONSchema7;
    setSchema(data);
  }

  const handleClick = () => {
    setValue({ ...mock.eslintrc });
  };

  const handleClick2 = () => {
    setValue({ ...mock.package });
  };

  const handleHeightChange = (e: SyntheticEvent) => {
    setHeight((e.target as HTMLInputElement).value);
  };

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <select value={schemaFile} onChange={handleChange}>
          <option value="package.json">package.json</option>
          <option value="eslintrc.json">eslintrc.json</option>
        </select>
        <select value={height} onChange={handleHeightChange} style={{ marginLeft: 6 }}>
          {heights.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        <button onClick={handleClick} style={{ marginLeft: 6 }}>
          set eslintrc value
        </button>
        <button onClick={handleClick2} style={{ marginLeft: 6 }}>
          set package value
        </button>
      </div>
      <div style={{ width: "70%" }}>
        <JSONSchemaInput value={value} onChange={onChange} schema={schema as unknown as JSONSchema7} height={height} />
      </div>
    </div>
  );
}
