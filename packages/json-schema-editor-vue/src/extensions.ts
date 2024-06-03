import { autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap } from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap, insertTab } from "@codemirror/commands";
import { bracketMatching, foldGutter, foldKeymap, indentOnInput, indentUnit } from "@codemirror/language";
import { lintGutter, lintKeymap } from "@codemirror/lint";
import { EditorView, drawSelection, gutter, highlightActiveLineGutter, keymap, lineNumbers } from "@codemirror/view";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

export const commonExtensions = [
  gutter({ class: "CodeMirror-lint-markers" }),
  bracketMatching(),
  highlightActiveLineGutter(),
  // basicSetup,
  closeBrackets(),
  history(),
  autocompletion(),
  lineNumbers(),
  lintGutter(),
  indentUnit.of("\t"),
  indentOnInput(),
  drawSelection(),
  foldGutter(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap,
    { key: "Tab", run: insertTab },
    { key: "Shift-Tab", run: insertTab },
  ]),
  // style
  vscodeDark,
  EditorView.lineWrapping,
];
