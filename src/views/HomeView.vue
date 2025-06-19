<script lang="ts" setup>
import * as z from "zod";
import useVtForm from "../composables/useVtForm";
import { formField } from "../form";
import FormBuilder from "../components/FormBuilder.vue";
import { Button } from "../components/ui/button";
import MyComponent from "../components/MyComponent.vue";
import type { Option, Registry } from "../types"

function generateOptions(length: number, size: "long" | "short" = "short"): Option[] {
    return [...Array(length).keys()].map(k => {
        return {value: `option ${k + 1}`, label: `${size === 'long' ? 'The long label for option' : 'Label'} ${k + 1}`};
    });
}

const schema = z.object({
    text: formField(z.string().min(10), {
        label: "text",
        description: "Minimium 10 characters",
        type: "text",
        initial: "initial",
        resetValue: "",
        placeholder: "placeholder",
        tooltip: "tooltip",
    }),
    textOpt: formField(z.string().optional(), {
        label: "text optional",
        description: "description",
        type: "text",
        initial: "x",
        placeholder: "placeholder",
        tooltip: "tooltip",
    }),
    select: formField(z.string().array(), {
        label: "select",
        description: "description",
        type: "select",
        placeholder: "placeholder",
        initial: [],
        options: generateOptions(10, "long"),
        tooltip: "tooltip",
        multiple: true,
        hideSearch: true,
    }),
    radio: formField(z.string(), {
        label: "radio",
        description: "description",
        type: "radio",
        initial: "",
        options: generateOptions(4),
        tooltip: "tooltip",
    }),
    textarea: formField(z.string(), {
        label: "textarea",
        description: "description",
        type: "textarea",
        initial: "",
        placeholder: "placeholder",
        class: "col-span-full",
        tooltip: "tooltip",
    }),
    object: formField(z.object({
        // literal: formField(z.literal("literal"), {
        //     type: "hidden",
        //     initial: "literal",
        // }),
        url: formField(z.string().url(), {
            label: "url",
            description: "description",
            type: "url",
            initial: "",
            placeholder: "placeholder",
            tooltip: "tooltip",
        }),
        number: formField(z.number().int().min(1).max(5), {
            label: "number",
            description: "Must be between 1 & 5",
            type: "number",
            initial: 1,
            tooltip: "tooltip",
        }),
        checkbox: formField(z.boolean(), {
            label: "checkbox",
            description: "description",
            type: "checkbox",
            initial: false,
            tooltip: "tooltip",
            trueValue: true,
            falseValue: false,
        }),
    }), {
        label: "group",
        description: "description",
        type: "group",
        initial: {
            url: "",
            number: 1,
            checkbox: false,
        },
        tooltip: "tooltip",
        class: "col-span-full", // self
        // groupClass: "flex flex-col", // children container
    }),
    list: formField(z.object({
        text: formField(z.string(), {
            label: "text",
            description: "description",
            type: "text",
            initial: "",
            placeholder: "placeholder",
            tooltip: "tooltip",
        }),
        date: formField(z.string().date(), {
            label: "date",
            description: "description",
            type: "date",
            initial: "",
            tooltip: "tooltip",
        }),
    }).array(), {
        label: "add",
        description: "description",
        type: "add",
        initial: [],
        element: {
            text: "",
            date: ""
        },
        tooltip: "tooltip"
    }),
    number: formField(z.number().int().min(1).max(5), {
        label: "number",
        description: "Must be between 1 & 5",
        type: "number",
        initial: 1,
        tooltip: "tooltip",
    }),
    date: formField(z.string().date(), {
        label: "date",
        description: "description",
        type: "date",
        initial: "",
        tooltip: "tooltip",
    }),
    password: formField(z.string(), {
        label: "password",
        description: "description",
        type: "password",
        placeholder: "placeholder",
        initial: "",
        tooltip: "tooltip",
    }),
    search: formField(z.string(), {
        label: "search",
        description: "description",
        type: "search",
        placeholder: "Search...",
        initial: "",
        tooltip: "tooltip",
        // @ts-ignore
        listQuery: async (s: string) => generateOptions(10, "long").filter(o => o.label.toLowerCase().includes(s.toLowerCase())),
    }),
    range: formField(z.number().int().min(0).max(6).step(2), {
        label: "range",
        description: "Must be between 0 & 6, step size 2",
        type: "range",
        initial: 0,
        tooltip: "tooltip",
    }),
    multirange: formField(z.number().int().array(), {
        label: "multirange",
        description: "description",
        type: "range",
        initial: [0, 100],
        tooltip: "tooltip",
    }),
    rating: formField(z.number().int().min(1).max(5), {
        label: "rating",
        description: "description",
        type: "rating",
        initial: 1,
        tooltip: "tooltip",
        icon: "number"
    }),
    tags: formField(z.string().array(), {
        label: "tags",
        description: "description",
        type: "tags",
        initial: [],
        tooltip: "tooltip",
        placeholder: "placeholder",
    }),
    // external input type - use type any for now
    custom: formField<z.ZodTypeAny, any>(z.string(), {
        label: "custom",
        description: "description",
        type: "custom",
        initial: "title",
        tooltip: "tooltip",
    }),
});

// user-provided component registry
const registry: Registry = {
    custom: {
        component: MyComponent,
        props: {
            title: (def, meta, model) => model.value,
        },
    },
};

const { formData, validity, error, isValid } = useVtForm(schema);
</script>

<template>
    <FormBuilder v-model="formData" :schema="schema" :registry="registry" class="grid grid-cols-2 gap-3" />
    <Button :disabled="!isValid">Submit</Button>
    <pre>formData: {{ formData }}</pre>
    <pre>isValid: {{ isValid }}</pre>
    <pre>error: {{ error }}</pre>
    <pre>validity: {{ validity }}</pre>
    <!-- <pre>{{ schema.shape }}</pre> -->
</template>