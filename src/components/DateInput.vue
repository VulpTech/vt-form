<script lang="ts" setup>
import { computed, type HTMLAttributes } from "vue";
import {
    DateFormatter,
    getLocalTimeZone,
    parseDate,
} from "@internationalized/date";
import { Calendar as CalendarIcon, X } from "lucide-vue-next";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const df = new DateFormatter("en-AU", { dateStyle: "long" });

const props = defineProps<{
    class?: HTMLAttributes["class"];
    placeholder?: string;
}>();

const model = defineModel<string>({ required: true });

const value = computed({
    get: () => model.value ? parseDate(model.value) : undefined,
    set: val => val,
});

const emit = defineEmits<{
    clear: [];
    focus: [];
    blur: [];
    input: [string];
}>();
</script>

<template>
    <Popover>
        <div :class="cn('relative w-full items-center', props.class)">
            <PopoverTrigger as-child>
                <Button variant="outline" :class="cn(
                    'w-full justify-start text-left font-normal',
                    !value && 'text-muted-foreground',
                    props.class,
                )">
                    <CalendarIcon class="mr-2 h-4 w-4" />
                    {{ value ? df.format(value.toDate(getLocalTimeZone())) : (props.placeholder || "Select a date") }}
                </Button>
            </PopoverTrigger>
            <span class="absolute end-0 inset-y-0 flex items-center justify-center">
                <Button size="icon" variant="link" class="text-muted-foreground hover:text-foreground" @click="emit('clear')"><X class="size-4" /></Button>
            </span>
        </div>
        <PopoverContent class="w-auto p-0">
            <Calendar v-model="value" initial-focus @update:modelValue="(v) => v ? model = v.toString() : model = ''" />
        </PopoverContent>
    </Popover>
</template>