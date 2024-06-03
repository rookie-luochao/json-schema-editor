<template>
  <div>
    <StartAppDemo />
    <div style="margin-bottom: 8px">
      <select v-model="schemaFile" @change="handleChange">
        <option value="package.json">package.json</option>
        <option value="eslintrc.json">eslintrc.json</option>
      </select>
      <select v-model="height" style="margin-left: 6px">
        <option v-for="h in heights" :key="h" :value="h">
          {{ h }}
        </option>
      </select>
      <button @click="handleClick" style="margin-left: 6px">set eslintrc value</button>
      <button @click="handleClick2" style="margin-left: 6px">set package value</button>
    </div>
    <div style="width: 70%">
      <Editor v-model="value" :schema="schema" :height="height" :tabSize="tabSize" :change="onChange" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { JSONSchema7 } from "json-schema";
import { Ref, onMounted, ref } from "vue";
import Editor from "../src/Editor.vue";
import StartAppDemo from "./StartAppDemo.vue";

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

const tabSize: Ref<number> = ref(4);
const value: Ref<string> = ref(JSON.stringify({ ...mock.package }, null, tabSize.value));
const schemaFile: Ref<string> = ref("package.json");
const schema: Ref<JSONSchema7 | null> = ref(null);
const height: Ref<string> = ref(heights[2]);

onMounted(() => {
  void changeSchema(schemaFile.value);
});

async function changeSchema(schemaFileName: string) {
  const data = (await (await fetch(`https://json.schemastore.org/${schemaFileName}`)).json()) as JSONSchema7;
  schema.value = data;
}

const handleChange = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;

  if (!val) {
    return;
  }

  schemaFile.value = val;
  void changeSchema(val);
};

const handleClick = () => {
  value.value = JSON.stringify({ ...mock.eslintrc }, null, tabSize.value);
};

const handleClick2 = () => {
  value.value = JSON.stringify({ ...mock.package }, null, tabSize.value);
};

const onChange = (value: string) => {
  console.log("value: ", value);
};
</script>
