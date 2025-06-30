<script lang="ts" setup>
import { computed, type ComputedRef, inject } from "vue";
import * as z from "zod";
import { CircleHelp } from "lucide-vue-next";
import { formErrorsKey, type InputSchema, type Registry, type FormError, visitedKey } from "@/types";
import { getZodSchema } from "@/form";
import { Label } from "@/components/ui/label";
import CustomTooltip from "@/components/CustomTooltip.vue";
import { cn } from "@/lib/utils";
import { defaultRegistry } from "@/registry";

const props = defineProps<{
    fieldKey: string;
    field: InputSchema;
    fieldPath: string;
    disabled?: boolean;
    registry?: Registry;
}>();

const fieldDef = getZodSchema(props.field)._def;
const fieldUnwrapped = props.field.unwrap();
const fieldMeta = props.field.metadata;
const required = !fieldUnwrapped.isOptional();

const formErrors = inject(formErrorsKey) as ComputedRef<FormError[]>;
const isVisited = inject(visitedKey) as (key: string, value?: -1 | 0 | 1) => boolean | void;

const model = defineModel<z.infer<typeof fieldUnwrapped>>();

const errorMessages = computed(() => formErrors.value.filter(e => e.path === props.fieldPath));

const mergedRegistry = computed(() => {
    return {...defaultRegistry, ...props.registry};
});

const registryItem = computed(() => {
    return mergedRegistry.value[fieldMeta.type] || mergedRegistry.value.default;
});

const computedProps = computed(() => {
    if (registryItem.value.props) {
        return Object.entries(registryItem.value.props).reduce((obj, [key, fn]) => {
            obj[key] = fn(fieldDef, fieldMeta, model, props.field, props.fieldKey);
            return obj;
        }, {} as Record<string, any>);
    } else {
        return {};
    }
});

const computedEvents = computed(() => {
    if (registryItem.value.events) {
        return Object.entries(registryItem.value.events).reduce((obj, [key, fn]) => {
            obj[key] = fn(fieldDef, fieldMeta, model, props.field, props.fieldKey);
            return obj;
        }, {} as Record<string, any>);
    } else {
        return {};
    }
});

function reset() {
    model.value = fieldMeta.resetValue !== undefined ? fieldMeta.resetValue : fieldMeta.initial;
    isVisited(props.fieldPath, 0);
}
</script>

<template>
    <div v-if="fieldMeta.type !== 'hidden'" :class="cn('form-input flex flex-col gap-1', fieldMeta.class)">
        <div :class="`flex gap-1 ${['checkbox', 'switch'].includes(fieldMeta.type) ? 'flex-row-reverse items-center justify-end' : 'flex-col'}`">
            <div class="flex flex-row gap-1 items-center">
                <Label v-if="fieldMeta.label" :for="props.fieldKey">{{ fieldMeta.label }}<span v-if="required" class="text-destructive"> *</span></Label>
                <CustomTooltip v-if="fieldMeta.tooltip">
                    <template #trigger><CircleHelp class="size-4" /></template>
                    {{ fieldMeta.tooltip }}
                </CustomTooltip>
            </div>
            <component :is="registryItem.component"
                :id="props.fieldKey"
                v-bind="computedProps"
                v-on="computedEvents"
                v-model="model"
                :placeholder="fieldMeta.placeholder"
                :class="errorMessages.length > 0 && isVisited(props.fieldPath) ? '!border-destructive' : ''"
                :disabled="disabled"
                :registry="props.registry"
                :fieldPath="['group', 'add'].includes(fieldMeta.type) ? props.fieldPath : undefined"
                @clear="reset"
                @blur="isVisited(props.fieldPath, 1)"
            />
            <Label v-if="fieldMeta.type === 'switch' && fieldMeta.falseLabel">{{ fieldMeta.falseLabel }}</Label>
        </div>
        <p v-if="fieldMeta.description" :id="`${props.fieldKey}-desc`" class="text-sm text-muted-foreground">{{ fieldMeta.description }}</p>
        <div v-if="errorMessages.length > 0 && isVisited(props.fieldPath)" :name="props.fieldKey" class="text-destructive">
            <span v-for="message in errorMessages">{{ message.message }}</span>
        </div>
    </div>
</template>
