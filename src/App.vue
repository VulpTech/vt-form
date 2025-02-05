<script lang="ts" setup>
import * as z from "zod";
import useVtForm from "@/composables/useVtForm";
import { formField } from "@/form";
import FormBuilder from "@/components/FormBuilder.vue";
import { Button } from "@/components/ui/button";
import { externalInputSchema, type InputMeta, type Registry } from "@/types";
import MyComponent from "@/components/MyComponent.vue";

const customUnion = z.discriminatedUnion("type", [
    z.object({
        type: z.literal("custom"),
        initial: z.string(),
        resetValue: z.string().optional(),
    }),
    z.object({
        type: z.literal("custom2"),
        initial: z.string(),
        resetValue: z.string().optional(),
    }),
]).and(externalInputSchema);

type CustomInputMeta = InputMeta | z.infer<typeof customUnion>;

const schema = z.object({
    text: formField(z.string(), {
        label: "text",
        description: "description",
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
        options: [{ label: "label 1", value: "value 1" }, { label: "label 2", value: "value 2" }],
        tooltip: "tooltip",
        multiple: true,
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
        label: "object",
        description: "description",
        type: "group",
        initial: {
            url: "",
            checkbox: false,
        },
        tooltip: "tooltip",
        class: "col-span-full", // self
        groupClass: "flex flex-col", // children container
    }),
    list: formField(z.object({
        key: formField(z.string(), {
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
    number: formField(z.number().int().min(1).max(5), {
        label: "number",
        description: "description",
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
    range: formField(z.number().int().min(1).max(5), {
        label: "range",
        description: "description",
        type: "range",
        initial: 1,
        tooltip: "tooltip",
    }),
    multirange: formField(z.number().int().array(), {
        label: "multirange",
        description: "description",
        type: "range",
        initial: [0, 100],
        tooltip: "tooltip",
    }),
    custom: formField<z.ZodTypeAny, CustomInputMeta>(z.string(), {
        label: "custom",
        description: "description",
        type: "custom",
        initial: "title",
        tooltip: "tooltip",
    }),
});

const registry: Registry = {
    custom: {
        component: MyComponent,
        props: {
            title: (def, meta, model) => model.value
        }
    }
};

const { formData, validity, error, isValid } = useVtForm(schema);
</script>

<template>
    <div class="p-4">
        <p>error:{{ error }}</p>
        <FormBuilder v-model="formData" :schema="schema" :registry="registry" class="grid grid-cols-2 gap-3" />
        <Button :disabled="!isValid">Submit</Button>
        <p>isValid: {{ isValid }}</p>
        <pre>{{ schema.shape }}</pre>
        <pre>validity:{{ validity }}</pre>
        <pre>formData: {{ formData }}</pre>
    </div>
</template>