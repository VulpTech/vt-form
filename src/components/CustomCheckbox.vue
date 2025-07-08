<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Checkbox } from "@/components/ui/checkbox";

const props = defineProps<{
    trueValue?: any;
    falseValue?: any;
    class?: HTMLAttributes["class"];
}>();

const model = defineModel<any>();
</script>

<template>
    <Checkbox
        :modelValue="props.trueValue ? model === props.trueValue : model"
        @update:modelValue="props.trueValue && props.trueValue ? model = ($event ? props.trueValue : props.falseValue) : model = $event"
        :class="props.class"
    />
</template>
