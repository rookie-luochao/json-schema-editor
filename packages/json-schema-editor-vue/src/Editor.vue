<template>
  <div :id="domIdRef" />
</template>
<script setup lang="ts">
import { EditorState, Extension, StateEffect } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { jsonSchema, updateSchema } from "codemirror-json-schema";
import { JSONSchema7 } from "json-schema";
import { Ref, ref, watch } from "vue";
import { commonExtensions } from "./extensions";
import { IEditorProps } from "./type";
import { cleanedMapStr, formatJson, getRandomInt } from "./utils";

const props = withDefaults(defineProps<IEditorProps>(), {
  tabSize: 4,
  height: "300px",
});
const editorRef: Ref<EditorView | null> = ref(null);
const domIdRef: Ref<string> = ref(`json-schema-editor-${getRandomInt(1000)}`);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

watch(
  () => [props.schema, props.height, props.tabSize, props.extensions],
  ([newSchema, newHeight, newTabSize, newExtensions]) => {
    const lastExtensions = [
      commonExtensions,
      EditorState.tabSize.of(newTabSize as number),
      EditorView.theme({
        "&": {
          height: newHeight as string,
        },
      }),
      EditorView.domEventHandlers({
        paste(event, view) {
          const clipboardData = event.clipboardData;

          if (!clipboardData) {
            return;
          }

          const text = clipboardData.getData("text/plain");
          const formattedText = formatJson(text, newTabSize as number);

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
      jsonSchema(newSchema as unknown as JSONSchema7),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          const docString = update.state.doc.toString();
          emit("update:modelValue", docString);
          props.change && props.change(docString);
        }
      }),
      (newExtensions || []) as Extension[],
    ];

    if (!editorRef.value) {
      const state = EditorState.create({
        doc: props.modelValue,
        extensions: lastExtensions,
      });

      editorRef.value = new EditorView({
        state,
        parent: document.querySelector(`#${domIdRef.value}`)!,
      });
    } else {
      editorRef.value.dispatch({
        effects: StateEffect.reconfigure.of(lastExtensions),
      });
    }
  },
);

watch(
  () => props.modelValue,
  (newValue) => {
    if (cleanedMapStr(newValue) !== cleanedMapStr(editorRef.value?.state.doc.toString())) {
      editorRef.value?.dispatch({
        changes: { from: 0, to: editorRef.value?.state.doc.length, insert: newValue },
      });
    }
  },
);

watch(
  () => props.schema,
  (newSchema) => {
    if (editorRef.value) {
      updateSchema(editorRef.value, newSchema as unknown as JSONSchema7);
    }
  },
);
</script>
