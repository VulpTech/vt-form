<script lang="ts" setup>
import { type HTMLAttributes, ref, computed, watch, useTemplateRef } from "vue";
import { X, Calendar as CalendarIcon } from "lucide-vue-next";
import { type CalendarDate, parseDate } from "@internationalized/date";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import CustomCalendar from "./CustomCalendar.vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
    yearRange?: [number, number];
    class?: HTMLAttributes["class"];
}>();

const model = defineModel<string>();

const calVal = computed({
    get(): CalendarDate | undefined {
        let value = undefined;
        if (model.value) {
            try {
                value = parseDate(model.value);
            } catch {}
        }
        return value;
    },
    set(val?: CalendarDate) {
        model.value = val?.toString() || "";
    }
});

const dateObj = ref({
    year: "",
    month: "",
    day: "",
});

const focus = ref(false);

const dayInputRef = useTemplateRef("day");
const monthInputRef = useTemplateRef("month");
const yearInputRef = useTemplateRef("year");

const emit = defineEmits<{
    focus: [];
    blur: [];
    clear: [];
    input: [value: string];
    change: [value: string];
}>();

function nextInput(e: Event, next: HTMLInputElement | null) {
    const target = e.target as HTMLInputElement;
    if (target.value.length === target.maxLength && next) {
        next.focus();
    }
}

function handleFocus(e: FocusEvent) {
    if (!focus.value) {
        focus.value = true;
    }
}

function handleBlur(e: FocusEvent) {
    if (!(e.relatedTarget instanceof HTMLInputElement && [dayInputRef.value, monthInputRef.value, yearInputRef.value].includes(e.relatedTarget))) {
        focus.value = false;
        emit("blur");
    }
    
}

watch(model, (newValue) => {
    if (!newValue || newValue === "") {
        dateObj.value = {
            year: "",
            month: "",
            day: "",
        };
    } else {
        const matches = newValue.match(/^(\d{4})(-\d{2})?(-\d{2})?$/);
        if (matches) {
            const [_, year, month, day] = matches.map(m => m !== undefined ? m.replace("-", "") : undefined);
            dateObj.value = {
                year: year || "",
                month: month || "",
                day: day || "",
            };
        }
        emit("input", newValue);
        emit("change", newValue);
        emit("blur");
    }
}, { deep: true });

watch(dateObj, (newValue) => {
    if (!newValue.year && !newValue.month && !newValue.day) {
        model.value = undefined;
    } else {
        var dateString = "";
        if (newValue.year && newValue.year !== "") {
            dateString += newValue.year;
        }
        if (newValue.month && newValue.month !== "") {
            dateString += "-" + newValue.month;
        }
        if (newValue.day && newValue.day !== "") {
            dateString += "-" + newValue.day;
        }

        model.value = dateString;
    }
}, { deep: true });
</script>

<template>
    <div :class="cn('relative w-full items-center', focus ? 'border-ring ring-ring/50 ring-[3px] rounded-md' : '', props.class)">
        <div :class="cn('flex flex-row gap-1 rounded-md border border-input px-3 py-2 text-sm bg-background h-9 w-full placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50', props.class)">
            <input v-model="dateObj.day" type="text" name="" id="" maxlength="2" placeholder="DD" class="w-6" ref="day" @input="nextInput($event, monthInputRef)" @focus="handleFocus" @blur="handleBlur">
            <span class="text-muted-foreground">/</span>
            <input v-model="dateObj.month" type="text" name="" id="" maxlength="2" placeholder="MM" class="w-6" ref="month" @input="nextInput($event, yearInputRef)" @focus="handleFocus" @blur="handleBlur">
            <span class="text-muted-foreground">/</span>
            <input v-model="dateObj.year" type="text" name="" id="" maxlength="4" placeholder="YYYY" class="w-10" ref="year" @focus="handleFocus" @blur="handleBlur">
        </div>
        <span class="absolute end-0 inset-y-0 flex items-center justify-center">
            <Popover @update:open="open => open ? emit('focus') : emit('blur')">
                <PopoverTrigger as-child>
                    <Button variant="link" size="icon" class="text-muted-foreground hover:text-foreground" title="Open date picker">
                        <CalendarIcon class="size-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                    <CustomCalendar v-model="calVal" initial-focus :yearRange="props.yearRange" />
                </PopoverContent>
            </Popover>
            <Button size="icon" variant="link" class="text-muted-foreground hover:text-foreground" @click="emit('clear')"><X class="size-4" /></Button>
        </span>
    </div>
</template>
