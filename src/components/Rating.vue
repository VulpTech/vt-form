<script lang="ts" setup>
import { HTMLAttributes } from "vue";
import { Star } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const props = withDefaults(defineProps<{
    icon?: "star" | "number";
    min?: number;
    max?: number;
    step?: number;
    class?: HTMLAttributes["class"];
}>(), {
    icon: "star",
    min: 1,
    max: 5,
    step: 1,
});

const model = defineModel<number>();

function* range(start: number, stop: number, step: number = 1) {
    if (stop == null) {
        // one param defined
        stop = start;
        start = 0;
    }

    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
        yield i;
    }
}
</script>

<template>
    <div :class="cn('flex flex-row items-center gap-1', props.class)">
        <Button v-for="value of range(props.min, props.max + 1, props.step)" :variant="model && value <= model ? 'default' : 'secondary'" size="icon" @click="model = value">
            <Star v-if="props.icon === 'star'" :class="`size-4 ${model && value <= model ? 'fill-primary-foreground' : ''}`" />
            <template v-else>{{ value }}</template>
        </Button>
    </div>
</template>
