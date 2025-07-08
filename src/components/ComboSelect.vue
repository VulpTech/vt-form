<script setup lang="ts">
import { ref, watch, type HTMLAttributes } from "vue";
import { Check, ChevronsUpDown, Search, X } from "lucide-vue-next";
import { type AcceptableValue } from "reka-ui";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxList, ComboboxTrigger } from "@/components/ui/combobox";
import type { Option } from "@/types";

const props = defineProps<{
    options: Option[];
    placeholder?: string;
    class?: HTMLAttributes["class"];
    multiple?: boolean;
    hideSearch?: boolean;
}>();

const model = defineModel<AcceptableValue | AcceptableValue[]>();

const open = ref(false);

const emits = defineEmits<{
    focus: [];
    blur: [];
    clear: [];
    input: [value?: AcceptableValue | AcceptableValue[]];
    change: [value?: AcceptableValue | AcceptableValue[]];
}>();

watch(open, (newValue) => {
    newValue ? emits("focus") : emits("blur");
});

watch(model, (newValue) => {
    emits("input", newValue);
    emits("change", newValue);
});
</script>

<template>
    <Combobox v-model="model" by="label" v-model:open="open" :multiple="props.multiple">
        <ComboboxAnchor as-child>
            <div class="relative w-full items-center">
                <ComboboxTrigger as-child>
                    <Button
                        variant="outline"
                        role="combobox"
                        :aria-expanded="open"
                        :class="cn(`w-full justify-between !pr-10 ${(props.multiple && Array.isArray(model) ? model.length > 0 : model) ? '' : 'text-muted-foreground'}`, props.class)"
                    >
                        <span class="overflow-hidden">
                            {{ (props.multiple && Array.isArray(model) ? model.length > 0 : model)
                            ? (Array.isArray(model)
                                ? model.map(v => props.options.find((option) => option.value === v)?.label).join(", ")
                                : props.options.find((option) => option.value === model)?.label)
                            : props.placeholder || "Select an option" }}
                        </span>
                        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </ComboboxTrigger>
                <span class="absolute end-0 inset-y-0 flex items-center justify-center">
                    <Button size="icon" variant="link" class="text-muted-foreground hover:text-foreground" @click="emits('clear')"><X class="size-4" /></Button>
                </span>
            </div>
        </ComboboxAnchor>

        <ComboboxList class="z-[100] w-[var(--reka-popper-anchor-width)]">
            <template v-if="!props.hideSearch">
                <div class="relative w-full max-w-sm items-center">
                    <ComboboxInput class="focus-visible:ring-0 border-0 border-b rounded-none h-10" placeholder="Search..." />
                    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
                        <Search class="size-4 text-muted-foreground" />
                    </span>
                </div>

                <ComboboxEmpty>
                    No results found.
                </ComboboxEmpty>
            </template>

            <ComboboxGroup class="max-h-[260px] overflow-y-auto">
                <ComboboxItem v-for="option in props.options" :key="option.value.toString()" :value="option.value">
                    {{ option.label }}

                    <ComboboxItemIndicator>
                        <Check :class="cn('ml-auto h-4 w-4')" />
                    </ComboboxItemIndicator>
                </ComboboxItem>
            </ComboboxGroup>
        </ComboboxList>
    </Combobox>
</template>