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

// const vertical = ref(false);

const schema = z.object({
    // text: formField(z.string(), {
    //     label: "text",
    //     description: "description",
    //     type: "text",
    //     placeholder: "placeholder",
    //     tooltip: "tooltip",
    //     step: "step1",
    // }),
    // object: formField(z.object({
    //     text: formField(z.string(), {
    //         label: "text",
    //         description: "description",
    //         type: "text",
    //         placeholder: "placeholder",
    //         tooltip: "tooltip",
    //     }),
    //     number: formField(z.number(), {
    //         label: "number",
    //         description: "description",
    //         type: "number",
    //         placeholder: "placeholder",
    //         tooltip: "tooltip",
    //     }),
    //     tags: formField(z.string().array(), {
    //         label: "tags",
    //         description: "description",
    //         type: "tags",
    //         placeholder: "placeholder",
    //         tooltip: "tooltip",
    //     }),
    // }), {
    //     type: "group",
    //     step: "step1",
    // }),
    list: formField(z.object({
        text: formField(z.string().min(2), {
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
    }).array().max(2), {
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
        tooltip: "tooltip",
        step: "step1"
    }),
    number: formField(z.number(), {
        label: "number",
        description: "description",
        type: "number",
        placeholder: "placeholder",
        tooltip: "tooltip",
        step: "step2",
    }),
    tags: formField(z.string().array(), {
        label: "tags",
        description: "description",
        type: "tags",
        placeholder: "placeholder",
        tooltip: "tooltip",
        step: "step3",
    }),
});

const stepsConfig: StepConfig = {
    type: "stepper",
    orientation: "vertical",
    steps: [
        {
            id: "step1",
            label: "Step 1",
            description: "Description of step 1",
            // class: "grid grid-cols-2 gap-2"
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
};

const stepIndex = ref(1);

const { formData, formErrors, error, isValid, steps, visited } = useVtForm(schema, { steps: stepsConfig });
</script>

<template>
    <FormBuilder v-model="formData" :schema="schema" :steps="steps" v-model:step="stepIndex" class="">
        <!-- <template #left-buttons-first>first slot</template>
        <template #left-buttons>left btn slot</template>
        <template #right-buttons>right btn slot</template> -->
        <template #right-buttons-last>
            <Button :disabled="!isValid">Submit</Button>
        </template>
    </FormBuilder>
    <pre>steps: {{ steps }}</pre>
    <pre>formData: {{ formData }}</pre>
    <pre>visited: {{ visited }}</pre>
    <pre>isValid: {{ isValid }}</pre>
    <pre>error: {{ error }}</pre>
    <pre>formErrors: {{ formErrors }}</pre>
    <!-- <pre>{{ schema.shape }}</pre> -->
</template>