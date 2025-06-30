<script lang="ts" setup>
import { type HTMLAttributes, ref } from "vue";
import { X, Tags } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from "@/components/ui/tags-input";
import { cn } from "@/lib/utils";

const props = defineProps<{
    placeholder?: string;
    class?: HTMLAttributes["class"];
}>();

const model = defineModel<string[]>();

const focus = ref(false);

const emit = defineEmits<{
    clear: [];
    focus: [];
    blur: [];
    input: [string];
}>();
</script>

<template>
    <TagsInput v-model="model" :class="cn('p-0 flex-col items-start gap-0', focus ? 'border-ring ring-ring/50 ring-[3px]' : '', props.class)">
        <div class="relative w-full items-center">
            <span class="absolute start-0 inset-y-0 flex items-center justify-center">
                <Tags class="text-muted-foreground size-4 ml-3" />
            </span>
            <TagsInputInput
                :placeholder="props.placeholder || 'Enter tags...'"
                @focus="focus = true; emit('focus')"
                @blur="focus = false; emit('blur')"
                class="w-full px-10 h-9"
            />
            <span class="absolute end-0 inset-y-0 flex items-center justify-center">
                <Button size="icon" variant="link" class="text-muted-foreground hover:text-foreground" @click="emit('clear')" tabindex="0"><X class="size-4" /></Button>
            </span>
        </div>
        <div :class="`flex flex-row flex-wrap w-full gap-1 ${model && model.length > 0 ? 'p-1.5' : ''}`">
            <TagsInputItem v-for="item in model" :key="item" :value="item">
                <TagsInputItemText />
                <TagsInputItemDelete class="cursor-pointer" />
            </TagsInputItem>
        </div>
    </TagsInput>
</template>