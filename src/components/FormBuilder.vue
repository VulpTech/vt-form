<script lang="ts" setup>
import { HTMLAttributes } from "vue";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { FormSchema } from "@/types";
import FormInput from "@/components/FormInput.vue";

const props = defineProps<{
    schema: FormSchema;
    class?: HTMLAttributes["class"];
}>();

const model = defineModel<z.infer<typeof props.schema>>({ required: true });
</script>

<template>
    <div :class="cn('', props.class)">
        <template v-for="(field, fieldKey) in props.schema.shape" :key="fieldKey">
            <div
                v-if="field.metadata"
                :class="field.metadata?.class"
                :style="field.metadata?.style"
            >
                <FormInput :fieldKey="(fieldKey as string)" :field="field" v-model="model[fieldKey]" />
            </div>
        </template>
    </div>
</template>
