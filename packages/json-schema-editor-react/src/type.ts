import { Extension } from "@codemirror/state";
import { JSONSchema7 } from "json-schema";

export interface IEditorProps {
  value: string;
  onChange: (value: string | null | undefined) => void;
  schema?: JSONSchema7;
  height?: string;
  tabSize?: number;
  extensions?: Extension[];
}
