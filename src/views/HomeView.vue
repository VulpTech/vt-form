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
        emptyValue: "",
    }),
    textOpt: formField(z.string().optional(), {
        label: "text optional",
        description: "description",
        type: "text",
        placeholder: "placeholder",
        tooltip: "tooltip",
    }),
    select: formField(z.string().array(), {
        label: "select",
        description: "description",
        type: "select",
        placeholder: "placeholder",
        options: generateOptions(10, "long"),
        tooltip: "tooltip",
        multiple: true,
        hideSearch: true,
        emptyValue: []
    }),
    radio: formField(z.string(), {
        label: "radio",
        description: "description",
        type: "radio",
        options: generateOptions(4),
        tooltip: "tooltip",
    }),
    textarea: formField(z.string(), {
        label: "textarea",
        description: "description",
        type: "textarea",
        placeholder: "placeholder",
        class: "col-span-full",
        tooltip: "tooltip",
    }),
    literal: formField(z.object({
        key: z.literal("value")
    }), {
        type: "hidden",
        initial: {
            key: "value"
        },
    }),
    object: formField(z.object({
        literal: formField(z.literal("literal"), {
            type: "hidden",
            initial: "literal",
        }),
        url: formField(z.string().url(), {
            label: "url",
            description: "description",
            type: "url",
            placeholder: "placeholder",
            tooltip: "tooltip",
        }),
        number: formField(z.number().int().min(1).max(5), {
            label: "number",
            description: "Must be between 1 & 5",
            type: "number",
            tooltip: "tooltip",
        }),
        checkbox: formField(z.string(), {
            label: "checkbox",
            description: "description",
            type: "checkbox",
            tooltip: "tooltip",
            trueValue: "yes",
            falseValue: "no",
            emptyValue: "no"
        }),
    }), {
        label: "group",
        description: "description",
        type: "group",
        tooltip: "tooltip",
        class: "col-span-full",
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
        description: "Max 2 elements",
        type: "add",
        // initial: [
        //     {
        //         text: "",
        //         date: "",
        //     },
        //     {
        //         text: "",
        //         date: "",
        //     },
        // ],
        tooltip: "tooltip"
    }),
    number: formField(z.number().int().min(1).max(5), {
        label: "number",
        description: "Must be between 1 & 5",
        type: "number",
        tooltip: "tooltip",
    }),
    date: formField(z.string().date(), {
        label: "date",
        description: "description",
        type: "date",
        tooltip: "tooltip",
    }),
    password: formField(z.string(), {
        label: "password",
        description: "description",
        type: "password",
        placeholder: "placeholder",
        tooltip: "tooltip",
    }),
    search: formField(z.string(), {
        label: "search",
        description: "description",
        type: "search",
        placeholder: "placeholder",
        tooltip: "tooltip",
        // @ts-ignore
        listQuery: async (s: string) => generateOptions(10, "long").filter(o => o.label.toLowerCase().includes(s.toLowerCase())),
    }),
    range: formField(z.number().int().min(0).max(6).step(2), {
        label: "range",
        description: "Must be between 0 & 6, step size 2",
        type: "range",
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
        tooltip: "tooltip",
        icon: "number"
    }),
    tags: formField(z.string().array(), {
        label: "tags",
        description: "description",
        type: "tags",
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

const initialState = {
    text: "initial state value",
    extras: "extra data"
}

const { formData, formErrors, error, isValid, visited, formState } = useVtForm(schema, {
    initialState
});
</script>

<template>
    <FormBuilder v-model="formData" :schema="schema" :registry="registry" class="grid grid-cols-2 gap-3" />
    <Button :disabled="!isValid">Submit</Button>
    <!-- <pre>formState: {{ formState }}</pre> -->
    <!-- <pre>visited: {{ visited }}</pre> -->
    <pre>formData: {{ formData }}</pre>
    <!-- <pre>isValid: {{ isValid }}</pre> -->
    <!-- <pre>error: {{ error }}</pre> -->
    <!-- <pre>formErrors: {{ formErrors }}</pre> -->
    <!-- <pre>{{ schema.shape }}</pre> -->
</template>