<script lang="ts" setup>
import { type HTMLAttributes } from "vue";
import { X } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldInput, NumberFieldIncrement } from "@/components/ui/number-field";
import { Button } from "@/components/ui/button";

const props = defineProps<{
    id?: string;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    showSign?: boolean;
    class?: HTMLAttributes["class"];
}>();

const model = defineModel<number>();

const emit = defineEmits<{
    clear: [];
    focus: [];
    blur: [];
    input: [string];
}>();
</script>

<template>
    <NumberField
        :min="props.min"
        :max="props.max"
        :step="props.step"
        v-model="model"
        :defaultValue="props.defaultValue"
        :format-options="{ signDisplay: props.showSign ? 'exceptZero' : undefined }"
    >
        <div class="relative w-full items-center">
            <NumberFieldContent >
                <NumberFieldDecrement />
                <NumberFieldInput :class="cn('!pr-14', props.class)" />
                <NumberFieldIncrement class="mr-10" />
            </NumberFieldContent>
            <span class="absolute end-0 inset-y-0 flex items-center justify-center">
                <Button size="icon" variant="link" class="text-muted-foreground hover:text-foreground" @click="emit('clear')"><X class="size-4" /></Button>
            </span>
        </div>
    </NumberField>
</template>