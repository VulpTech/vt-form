import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MyComponent from "../MyComponent.vue";

describe("MyComponent", () => {
    it("renders properly", () => {
        const wrapper = mount(MyComponent, { props: { title: "title" } });
        expect(wrapper.text()).toContain("title");
    });
});
