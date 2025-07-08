<script lang="ts" setup>
import { type HTMLAttributes, ref, watch } from "vue";
import * as z from "zod";
import { getZodSchema } from "@/form";
import FormInput from "@/components/FormInput.vue";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { InputSchema, Registry } from "@/types";

type ObjectGroupSchema = z.ZodObject<{[key: string]: InputSchema}>;

const props = defineProps<{
    fieldKey?: string;
    field: InputSchema<ObjectGroupSchema> | ObjectGroupSchema;
    fieldPath: string;
    registry?: Registry;
    class?: HTMLAttributes["class"];
}>();

const shape = getZodSchema(props.field).shape;
const nonHiddenKeys = Object.keys(shape).filter(k => shape[k].metadata.type !== "hidden");

const model = defineModel<z.infer<typeof props.field>>();

function createData() {
    return Object.keys(shape).reduce((obj, key) => {
        obj[key] = shape[key].metadata.type === "hidden" ? shape[key].metadata.initial : undefined;
        return obj;
    }, {} as Record<string, any>);
}

const data = ref(model.value || createData());

watch(data, (newValue) => {
    if (newValue !== undefined) {
        const emptyObj = Object.entries(newValue).filter(([k, v]) => nonHiddenKeys.includes(k)).every(([k, v]) => v === undefined);
        if (emptyObj) {
            model.value = undefined;
        } else {
            model.value = newValue;
        }
    } else {
        model.value = newValue;
    }
}, { deep: true });

watch(model, (newValue) => {
    if (newValue !== undefined) {
        data.value = newValue;
    } else {
        data.value = createData();
    }
}, { deep: true });
</script>

<template>
    <Card :class="cn('grow p-6 grid grid-cols-2 gap-2', props.class)">
        <template v-for="(f, k) in shape" :key="k">
            <div
                v-if="f.metadata.type !== 'hidden'"
                :class="f.metadata?.class"
                :style="f.metadata?.style"
            >
                <FormInput
                    :fieldKey="(k as string)"
                    :field="f"
                    :fieldPath="`${props.fieldPath}.${(k as string)}`"
                    v-model="data[k]"
                    :registry="props.registry"
                />
            </div>
        </template>
    </Card>
</template>
