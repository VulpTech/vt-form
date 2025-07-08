<script lang="ts" setup>
import { computed, type HTMLAttributes } from "vue";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const props = defineProps<{
    id?: string;
    class?: HTMLAttributes["class"];
    min?: number;
    max?: number;
    step?: number;
}>();

const model = defineModel<number | number[]>();

const emit = defineEmits<{
    clear: [];
    focus: [];
    blur: [];
    input: [string];
}>();

const modelArray = computed({
    get: () => model.value ? (Array.isArray(model.value) ? model.value : [model.value]) : [0],
    set: (val: number[]) => model.value = val.length === 1 ? val[0] : val,
});
</script>

<template>
    <Slider v-model="modelArray" :min="props.min" :max="props.max" :step="props.step" :class="cn('px-2 pt-2 pb-6', props.class)" @blur="emit('blur')" />
</template>