<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Switch } from "@/components/ui/switch";

const props = defineProps<{
    trueValue?: any;
    falseValue?: any;
    class?: HTMLAttributes["class"];
}>();

const model = defineModel<any>();
</script>

<template>
    <Switch
        :modelValue="props.trueValue ? model === props.trueValue : model"
        @update:modelValue="props.trueValue && props.trueValue ? model = ($event ? props.trueValue : props.falseValue) : model = $event"
        :class="props.class"
    />
</template>
