import { EditorState, Extension, StateEffect } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { jsonSchema, updateSchema } from "codemirror-json-schema";
import { JSONSchema7 } from "json-schema";
import React, { useEffect, useRef, useState } from "react";
import { commonExtensions } from "./extensions";
import { cleanedMapStr, formatJson, getRandomInt } from "./utils";

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

  useEffect(() => {
    const lastExtensions = [
      commonExtensions,
      EditorView.theme({
        "&": {
          height: height,
        },
      }),
      EditorState.tabSize.of(tabSize),
      EditorView.domEventHandlers({
        paste(event, view) {
          const clipboardData = event.clipboardData;

          if (!clipboardData) {
            return;
          }

          const text = clipboardData.getData("text/plain");
          const formattedText = formatJson(text, tabSize);

          if (formattedText !== text) {
            event.preventDefault();
            view.dispatch({
              changes: {
                from: view.state.selection.main.from,
                to: view.state.selection.main.to,
                insert: formattedText,
              },
            });
          }
        },
      }),
      jsonSchema(schema as unknown as JSONSchema7),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onChange(update.state.doc.toString());
        }
      }),
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
  }, [height, tabSize, commonExtensions, extensions]);

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
