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
    }).array(), {
        label: "add",
        description: "Max 2 elements",
        type: "add",
        initial: [
            {
                text: "",
                date: "",
            },
            // {
            //     text: "",
            //     date: "",
            // },
        ],
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
    // orientation: "horizontal",
    orientation: "vertical",
    steps: [
        {
            id: "step1",
            label: "Step sldjfhlksdjf lksjdf slkdjf sldkfs ldkfjl 1",
            description: "Description of step 1",
        },
        {
            id: "step2",
            label: "Step 2",
            description: "Description of step 2",
        },
        {
            id: "step3",
            label: "Step sldjfhlksdjf lksf 3",
            description: "Description of step 3",
        },
        {
            id: "step4",
            label: "Step sldjfhlksdjf lksjdf slkdjf s 4",
            description: "Description of step 4",
        },
        {
            id: "step5",
            label: "Step s  5",
            description: "Description of step 5",
        },
        {
            id: "step6",
            label: "Step sldjfhlksdjf  sldkfs ldkfjlkjf lksdjf lsdjfls df 6",
            description: "Description of step 6",
        },
        {
            id: "step7",
            label: "Step sldjfhlksdjf lksjdf sl 7",
            description: "Description of step 7",
        },
        {
            id: "step8",
            label: "Step sldjfhlksdjf lksjdf slkdjfjlkjf lksdjf ls df 8",
            description: "Description of step 8",
        },
        {
            id: "step9",
            label: "Step sllksdjf lsdjfls df 9",
            description: "Description of step 9",
        },
        {
            id: "step10",
            label: "Step sldjfhlksd 10",
            description: "Description of step 10",
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
    <!-- <pre>steps: {{ steps }}</pre>
    <pre>formData: {{ formData }}</pre>
    <pre>visited: {{ visited }}</pre>
    <pre>isValid: {{ isValid }}</pre>
    <pre>error: {{ error }}</pre>
    <pre>formErrors: {{ formErrors }}</pre> -->
    <!-- <pre>{{ schema.shape }}</pre> -->
</template>