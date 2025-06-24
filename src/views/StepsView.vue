<script lang="ts" setup>
import { computed, ref } from "vue";
import * as z from "zod";
import useVtForm from "../composables/useVtForm";
import { formField } from "../form";
import FormBuilder from "../components/FormBuilder.vue";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import type { StepConfig } from "../types";

const vertical = ref(false);

const schema = z.object({
    text: formField(z.string(), {
        label: "text",
        description: "description",
        type: "text",
        initial: undefined,
        placeholder: "placeholder",
        tooltip: "tooltip",
        step: "step1",
    }),
    number: formField(z.number(), {
        label: "number",
        description: "description",
        type: "number",
        initial: 0,
        placeholder: "placeholder",
        tooltip: "tooltip",
        step: "step2",
    }),
    tags: formField(z.string().array(), {
        label: "tags",
        description: "description",
        type: "tags",
        initial: [],
        placeholder: "placeholder",
        tooltip: "tooltip",
        step: "step3",
    }),
    object: formField(z.object({
        text: formField(z.string(), {
            label: "text",
            description: "description",
            type: "text",
            initial: "",
            placeholder: "placeholder",
            tooltip: "tooltip",
            step: "step1",
        }),
        number: formField(z.number(), {
            label: "number",
            description: "description",
            type: "number",
            initial: 0,
            placeholder: "placeholder",
            tooltip: "tooltip",
            step: "step2",
        }),
        tags: formField(z.string().array(), {
            label: "tags",
            description: "description",
            type: "tags",
            initial: [],
            placeholder: "placeholder",
            tooltip: "tooltip",
            step: "step3",
        }),
    }), {
        type: "add",
        step: "step1",
        initial: [{
            text: undefined,
            number: 0,
            tags: []
        }],
        element: {
            text: undefined,
            number: 0,
            tags: []
        }
    })
});

const steps = computed<StepConfig>(() => {
    return {
        type: "stepper",
        orientation: vertical.value ? "vertical" : "horizontal",
        steps: [
            {
                id: "step1",
                label: "Step 1",
                description: "Description of step 1",
                class: "grid grid-cols-2 gap-2"
            },
            {
                id: "step2",
                label: "Step 2",
                description: "Description of step 2 Lorem ipsum dolor sit amet consectetur adipisicing elit."
            },
            {
                id: "step3",
                label: "Step 3",
                description: "Description of step 3"
            },
        ],
    }
});

const { formData, formErrors, error, isValid } = useVtForm(schema, {steps});
</script>

<template>
    <div class="mb-3">
        <Label>Orientation</Label>
        <div class="flex flex-row gap-1 items-center text-sm">
            <span>Horizontal</span>
            <Switch v-model="vertical" />
            <span>Vertical</span>
        </div>
    </div>
    <FormBuilder v-model="formData" :schema="schema" :steps="steps" class="">
        <template #left-buttons-first>first slot</template>
        <template #left-buttons>left btn slot</template>
        <template #right-buttons>right btn slot</template>
        <template #right-buttons-last>last slot</template>
    </FormBuilder>
    <Button :disabled="!isValid">Submit</Button>
    <pre>formData: {{ formData }}</pre>
    <pre>isValid: {{ isValid }}</pre>
    <pre>error: {{ error }}</pre>
    <pre>formErrors: {{ formErrors }}</pre>
    <!-- <pre>{{ schema.shape }}</pre> -->
</template>