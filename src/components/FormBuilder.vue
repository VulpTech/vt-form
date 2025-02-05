<script lang="ts" setup>
import { HTMLAttributes } from "vue";
import * as z from "zod";
import { cn } from "@/lib/utils";
import type { FormSchema, Registry } from "@/types";
import FormInput from "@/components/FormInput.vue";

const props = defineProps<{
    schema: FormSchema;
    disabled?: boolean;
    class?: HTMLAttributes["class"];
    registry?: Registry;
}>();

const model = defineModel<z.infer<typeof props.schema> | undefined>({ required: true });
</script>

<template>
    <span v-if="!model" class="text-destructive">Invalid form model.</span>
    <div v-else :class="cn('', props.class)">
        <template v-for="(field, fieldKey) in props.schema.shape" :key="fieldKey">
            <div
                v-if="field.metadata"
                :class="field.metadata?.class"
                :style="field.metadata?.style"
            >
                <FormInput
                    :fieldKey="(fieldKey as string)"
                    :field="field" v-model="model[fieldKey]"
                    :disabled="disabled"
                    :registry="props.registry"
                />
            </div>
        </template>
    </div>
</template>
