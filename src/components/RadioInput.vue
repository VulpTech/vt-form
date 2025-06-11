<script lang="ts" setup>
import { type HTMLAttributes } from "vue";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Option } from "@/types";

const props = defineProps<{
    options: Option[];
    id: HTMLAttributes["id"];
    class?: HTMLAttributes["class"];
}>();

const model = defineModel<string>();
</script>

<template>
    <RadioGroup v-model="model" :orientation="'vertical'" @update:modelValue="">
        <div v-for="option, index in props.options" class="flex items-center space-x-2">
            <RadioGroupItem :id="`${props.id}-${index}`" :value="option.value" />
            <Label :for="`${props.id}-${index}`">{{ option.label }}</Label>
        </div>
    </RadioGroup>
</template>