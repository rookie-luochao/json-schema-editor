import { Extension } from "@codemirror/state";
import { JSONSchema7 } from "json-schema";

export interface IEditorProps {
  modelValue: string;
  schema?: JSONSchema7 | null | undefined;
  height?: string;
  tabSize?: number;
  extensions?: Extension[];
  change?: (value: string) => void;
}
