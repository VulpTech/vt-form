<script lang="ts" setup>
import { computed, watch } from "vue";
import * as z from "zod";
import { CircleHelp } from "lucide-vue-next";
import type { InputSchema, Registry } from "@/types";
import { getZodSchema } from "@/form";
import { Label } from "@/components/ui/label";
import CustomTooltip from "@/components/CustomTooltip.vue";
import { useVtField } from "@/composables/useVtField";
import { cn } from "@/lib/utils";
import { defaultRegistry } from "@/registry";

const props = defineProps<{
    fieldKey: string;
    field: InputSchema;
    disabled?: boolean;
    registry?: Registry;
}>();

const fieldUnwrapped = props.field.unwrap();

const model = defineModel<z.infer<typeof fieldUnwrapped>>({ required: true });
const { errorMessage, required, validate, resetField } = useVtField(props.field, model);
const fieldDef = getZodSchema(props.field)._def;

const fieldMeta = props.field.metadata;

const mergedRegistry = computed(() => {
    return {...defaultRegistry, ...props.registry};
})

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

watch(model, () => {
    validate();
});
</script>

<template>
    <div v-if="fieldMeta.type !== 'hidden'" :class="cn('form-input flex flex-col gap-1', fieldMeta.class)">
        <div :class="`flex gap-1 ${['checkbox', 'switch', 'radio'].includes(fieldMeta.type) ? 'flex-row-reverse items-center justify-end' : 'flex-col'}`">
            <div class="flex flex-row gap-1 items-center">
                <Label v-if="fieldMeta.label" :for="props.fieldKey">{{ fieldMeta.label }}<span v-if="required" class="text-destructive"> *</span></Label>
                <CustomTooltip v-if="fieldMeta.tooltip">
                    <template #trigger><CircleHelp class="size-4" /></template>
                    {{ fieldMeta.tooltip }}
                </CustomTooltip>
            </div>
            <!-- @vue-ignore -->
            <component :is="registryItem.component"
                :id="props.fieldKey"
                v-bind="computedProps"
                v-on="computedEvents"
                v-model="model"
                :placeholder="fieldMeta.placeholder"
                :class="errorMessage ? '!border-destructive' : ''"
                :disabled="disabled"
                :registry="props.registry"
                @blur="validate"
                @clear="resetField"
            />
            <Label v-if="fieldMeta.type === 'switch' && fieldMeta.falseLabel">{{ fieldMeta.falseLabel }}</Label>
        </div>
        <p v-if="fieldMeta.description" :id="`${props.fieldKey}-desc`" class="text-sm text-muted-foreground">{{ fieldMeta.description }}</p>
        <div v-if="errorMessage" :name="props.fieldKey" class="text-destructive">{{ errorMessage }}</div>
    </div>
</template>
