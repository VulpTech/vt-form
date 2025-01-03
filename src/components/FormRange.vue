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

const model = defineModel<number | number[]>({ required: true });

const modelArray = computed({
    get: () => Array.isArray(model.value) ? model.value : [model.value],
    set: val => model.value = val.length === 1 ? val[0] : val,
});
</script>

<template>
    <Slider v-model="modelArray" :min="props.min" :max="props.max" :step="props.step" :class="cn('px-2 pt-2 pb-6', props.class)" />
</template>