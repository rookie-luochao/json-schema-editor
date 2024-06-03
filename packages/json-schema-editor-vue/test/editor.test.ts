import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import StartAppDemo from "../examples/StartAppDemo.vue";

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
    const wrapper = mount(StartAppDemo, {
      props: {
        name: "Hello json-schema-edidor",
      },
    });

    expect(wrapper.text()).toContain("Hello json-schema-edidor");
  });
});
