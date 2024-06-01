import { EditorState, Extension, StateEffect } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { jsonSchema, updateSchema } from "codemirror-json-schema";
import { JSONSchema7 } from "json-schema";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { commonExtensions } from "./extensions";
import { cleanedMapStr, getRandomInt } from "./utils";

export interface IEditorProps {
  value: string;
  onChange: (value: string | null | undefined) => void;
  schema?: JSONSchema7;
  height?: string;
  tabSize?: number;
  extensions?: Extension[];
}

export function Editor(props: IEditorProps) {
  const { value, onChange, schema, height = "300px", tabSize = 4, extensions } = props;
  const editorRef = useRef<EditorView | null>(null);
  const [domId] = useState(`json-schema-editor-${getRandomInt(1000)}`);

  const customExtensions = useMemo(() => {
    return [
      EditorView.theme({
        "&": {
          height: height,
        },
      }),
    ];
  }, [tabSize, height]);

  useEffect(() => {
    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChange(update.state.doc.toString());
      }
    });

    const lastExtensions = [
      commonExtensions,
      EditorState.tabSize.of(tabSize),
      customExtensions,
      jsonSchema(schema as unknown as JSONSchema7),
      updateListener,
      extensions || [],
    ];

    if (!editorRef.current) {
      const state = EditorState.create({
        doc: value,
        extensions: lastExtensions,
      });

      editorRef.current = new EditorView({
        state,
        parent: document.querySelector(`#${domId}`)!,
      });
    } else {
      editorRef.current.dispatch({
        effects: StateEffect.reconfigure.of(lastExtensions),
      });
    }
  }, [tabSize, commonExtensions, customExtensions, extensions]);

  useEffect(() => {
    if (cleanedMapStr(value) !== cleanedMapStr(editorRef.current?.state.doc.toString())) {
      editorRef.current?.dispatch({
        changes: { from: 0, to: editorRef.current?.state.doc.length, insert: value },
      });
    }
    // editorRef.current?.dispatch({
    //   changes: { from: 0, to: editorRef.current?.state.doc.length, insert: value },
    //   selection: { anchor: cleanedMapStr(value) !== cleanedMapStr(editorRef.current?.state.doc.toString()) ? value?.length : editorRef.current?.state.doc.length }
    // });
  }, [value]);

  useEffect(() => {
    if (editorRef.current && schema) {
      updateSchema(editorRef.current, schema as unknown as JSONSchema7);
    }
  }, [schema]);

  return <div id={domId} />;
}
