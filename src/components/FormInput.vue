<script lang="ts" setup>
import { computed, watch } from "vue";
import * as z from "zod";
import { CircleHelp } from "lucide-vue-next";
import { InputSchema } from "@/types";
import { getZodSchema } from "@/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import CustomTooltip from "@/components/CustomTooltip.vue";
import CustomInput from "@/components/CustomInput.vue";
import ComboSelect from "@/components/ComboSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import FormInputList from "@/components/FormInputList.vue";
import FormInputGroup from "@/components/FormInputGroup.vue";
import DateInput from "@/components/DateInput.vue";
import NumberInput from "@/components/NumberInput.vue";
import FormRange from "@/components/FormRange.vue";
import { useVtField } from "@/composables/useVtField";
import { cn } from "@/lib/utils";

const props = defineProps<{
    fieldKey: string;
    field: InputSchema;
    disabled?: boolean;
}>();

const fieldUnwrapped = props.field.unwrap();

const model = defineModel<z.infer<typeof fieldUnwrapped>>({ required: true });
const { errorMessage, required, validate, resetField } = useVtField(props.field, model);
const fieldDef = getZodSchema(props.field)._def;

const fieldMeta = props.field.metadata;

const inputComponent = computed(() => {
    switch (fieldMeta.type) {
        case "text":
        case "url":
        case "tel":
        case "email":
        case "password":
            return CustomInput;
        case "textarea":
            return Textarea;
        case "checkbox":
            return Checkbox;
        case "switch":
            return Switch
        case "select":
            return ComboSelect;
        case "add":
            return FormInputList;
        case "search":
            return SearchInput;
        case "group":
            return FormInputGroup;
        case "date":
            return DateInput;
        case "number":
            return NumberInput;
        case "range":
            return FormRange;
        default:
            return CustomInput;
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
            <component :is="inputComponent"
                :id="props.fieldKey"
                :type="['text', 'url', 'tel', 'email', 'password'].includes(fieldMeta.type) ? fieldMeta.type : undefined"
                :placeholder="fieldMeta.placeholder"
                v-model="model"
                :class="errorMessage ? 'border-destructive' : ''"
                :options="fieldMeta.type === 'select' ? fieldMeta.options : undefined"
                :multiple="fieldMeta.type === 'select' ? fieldMeta.multiple : undefined"
                :fieldKey="['add', 'group'].includes(fieldMeta.type) ? props.fieldKey : undefined"
                :field="['add', 'group'].includes(fieldMeta.type) ? props.field : undefined"
                :listQuery="fieldMeta.type === 'search' ? fieldMeta.listQuery || undefined : undefined"
                :getQuery="fieldMeta.type === 'search' ? fieldMeta.getQuery || undefined : undefined"
                :resultLabel="fieldMeta.type === 'search' ? fieldMeta.resultLabel || undefined : undefined"
                :checked="(fieldMeta.type === 'switch' || fieldMeta.type === 'checkbox') ? model === fieldMeta.trueValue : undefined"
                :min="fieldDef.checks?.find(c => c.kind === 'min')?.value"
                :max="fieldDef.checks?.find(c => c.kind === 'max')?.value"
                :minlength="fieldDef.checks?.find(c => c.kind === 'min')?.value"
                :maxlength="fieldDef.checks?.find(c => c.kind === 'max')?.value"
                @update:checked="(checked: boolean) => (fieldMeta.type === 'switch' || fieldMeta.type === 'checkbox') ? (model = checked ? fieldMeta.trueValue : fieldMeta.falseValue) : undefined"
                @blur="validate"
                @clear="resetField"
                :disabled="disabled"
            />
            <Label v-if="fieldMeta.type === 'switch' && fieldMeta.falseLabel">{{ fieldMeta.falseLabel }}</Label>
        </div>
        <p v-if="fieldMeta.description" :id="`${props.fieldKey}-desc`" class="text-sm text-muted-foreground">{{ fieldMeta.description }}</p>
        <div v-if="errorMessage" :name="props.fieldKey" class="text-destructive">{{ errorMessage }}</div>
    </div>
</template>
