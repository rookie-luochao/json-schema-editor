import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { StartAppDemo } from "../examples/StartAppDemo";

describe("suite", () => {
  it("test true", () => {
    expect(true).toBe(true);
  });
  it("test false", () => {
    expect(false).toBe(false);
  });
});

describe("render app", () => {
  it("app should be render", () => {
    render(<StartAppDemo />);
    expect(screen.getByText("json-schema-editor")).toBeInTheDocument();
  });
});

// describe("render editor", () => {
//   it("editor should be render", () => {
//     render(<Editor value={'{ name: "json-schema-editor" }'} onChange={(value) => console.log('value: ', value)} />);
//     expect(screen.getByText("json-schema-editor")).toBeInTheDocument();
//   });
// });

// test("editor should be render", async () => {
//   const editor = render(<Editor value={'{ name: "json-schema-editor" }'} onChange={(value) => console.log('value: ', value)} />);
//   const editorThumbnail = (await editor.findByTestId(
//     'json-schema-editor'
//   )) as HTMLImageElement;

//   expect(editorThumbnail).toContain('json-schema-editor');
//   editor.unmount();
// });
