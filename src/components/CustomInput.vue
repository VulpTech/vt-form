<script lang="ts" setup>
import { ref, type HTMLAttributes } from "vue";
import { X, Eye, EyeOff } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const props = defineProps<{
    type?: string;
    id?: string;
    placeholder?: string;
    class?: HTMLAttributes["class"];
}>();

const model = defineModel<string>({ required: true });

const emit = defineEmits<{
    clear: [];
    focus: [];
    blur: [];
    input: [string];
}>();

const showPassword = ref(false);
const inputRef = ref<InstanceType<typeof Input> | null>(null);
const btnRef = ref<InstanceType<typeof Button> | null>(null);

function handleClick() {
    if (props.type === "password" && inputRef.value) {
        showPassword.value = !showPassword.value;
        inputRef.value.$el.focus();
    }
}

function handleBlur(e: FocusEvent) {
    if (props.type === "password" && btnRef.value) {
        if (e.relatedTarget !== btnRef.value.$el) {
            emit("blur");
            showPassword.value = false;
        }
    } else {
        emit("blur");
    }
} 
</script>

<template>
    <div :class="cn('relative w-full items-center', props.class)">
        <Input
            :id="props.id"
            :type="props.type === 'password' ? (showPassword ? 'text' : 'password') : props.type"
            v-model="model"
            :placeholder="placeholder"
            :class="props.type === 'password' ? 'pr-20' : 'pr-10'"
            @focus="emit('focus')"
            @blur="handleBlur"
            ref="inputRef"
        />
        <span class="absolute end-0 inset-y-0 flex items-center justify-center">
            <Button
                v-if="props.type === 'password'"
                size="icon"
                variant="link"
                class="text-muted-foreground hover:text-foreground"
                @click="handleClick"
                :title="showPassword ? 'Hide password' : 'Show password'"
                tabindex="0"
                ref="btnRef"
            >
                <EyeOff v-if="showPassword" class="size-4" />
                <Eye v-else class="size-4" />
            </Button>
            <Button size="icon" variant="link" class="text-muted-foreground hover:text-foreground" @click="emit('clear')" tabindex="0"><X class="size-4" /></Button>
        </span>
    </div>
</template>
