<script lang="ts" setup>
import { ref } from "vue";
import * as z  from "zod";
import { schemaCreateEmptyObject, zodMetadata } from "@/form";
import FormBuilder from "@/components/FormBuilder.vue";

const schema = z.object({
    text: zodMetadata(z.string(), {
        label: "text",
        description: "description",
        type: "text",
        initial: "",
        placeholder: "placeholder",
        tooltip: "tooltip",
    }),
    select: zodMetadata(z.string().array(), {
        label: "select",
        description: "description",
        type: "select",
        placeholder: "placeholder",
        initial: [],
        options: [{label: "label 1", value: "value 1"}, {label: "label 2", value: "value 2"}],
        tooltip: "tooltip"
    }),
    textarea: zodMetadata(z.string(), {
        label: "textarea",
        description: "description",
        type: "textarea",
        initial: "",
        placeholder: "placeholder",
        class: "col-span-full",
        tooltip: "tooltip",
    }),
    object: zodMetadata(z.object({
        literal: zodMetadata(z.literal("literal"), {
            type: "hidden",
            initial: "literal",
        }),
        url: zodMetadata(z.string().url(), {
            label: "url",
            description: "description",
            type: "url",
            initial: "",
            placeholder: "placeholder",
            tooltip: "tooltip",
        }),
        checkbox: zodMetadata(z.boolean(), {
            label: "checkbox",
            description: "description",
            type: "checkbox",
            initial: false,
            tooltip: "tooltip",
            trueValue: true,
            falseValue: false,
        }),
    }), {
        label: "object",
        description: "description",
        type: "group",
        initial: {},
        tooltip: "tooltip",
        class: "col-span-full",
    }),
    list: zodMetadata(z.object({
        key: zodMetadata(z.string(), {
            label: "key",
            description: "description",
            type: "text",
            initial: "",
            placeholder: "placeholder",
            tooltip: "tooltip",
        }),
    }).array(), {
        label: "list",
        description: "description",
        type: "add",
        initial: [],
        element: {
            key: ""
        },
        tooltip: "tooltip"
    }),
    number: zodMetadata(z.number().int(), {
        label: "number",
        description: "description",
        type: "number",
        initial: 0,
        tooltip: "tooltip",
    }),
    date: zodMetadata(z.string().date(), {
        label: "date",
        description: "description",
        type: "date",
        initial: "",
        tooltip: "tooltip",
    }),
    password: zodMetadata(z.string(), {
        label: "password",
        description: "description",
        type: "password",
        placeholder: "placeholder",
        initial: "",
        tooltip: "tooltip",
    }),
    range: zodMetadata(z.number().int().min(1).max(5), {
        label: "range",
        description: "description",
        type: "range",
        initial: 1,
        tooltip: "tooltip",
    }),
    multirange: zodMetadata(z.number().int().array(), {
        label: "multirange",
        description: "description",
        type: "range",
        initial: [0, 100],
        tooltip: "tooltip",
    }),
});

const data = ref(schemaCreateEmptyObject(schema));
</script>

<template>
    <div class="p-4">
        <FormBuilder v-model="data" :schema="schema" class="grid grid-cols-2 gap-3" />
        <pre>{{ data }}</pre>
    </div>
</template>