<script lang="ts" setup>
import { computed } from "vue";
import * as z from "zod";
import { useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
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

const props = defineProps<{
    fieldKey: string;
    field: InputSchema;
}>();

const fieldUnwrapped = props.field.unwrap();

// @ts-ignore
const model = defineModel<z.infer<typeof fieldUnwrapped>>({ required: true });
const { value, errorMessage, meta, validate, resetField } = useField(props.fieldKey, toTypedSchema(props.field.unwrap()), { syncVModel: true });

const fieldDef = getZodSchema(props.field)._def;

const fieldMeta = props.field.metadata;

// const inputType = computed(() => {
//     if (fieldMeta && fieldMeta.type) {
//         return fieldMeta.type;
//     }

//     switch (fieldDef.typeName) {
//         case "ZodString":
//             if ((props.field as z.ZodString).isURL) {
//                 return "url";
//             } else {
//                 return "text";
//             }
//         case "ZodArray":
//             if (fieldDef.type._def.typeName === "ZodString") {
//                 return "select";
//             } else if (fieldDef.type._def.typeName === "ZodObject") {
//                 return "add";
//             }
//         // case "ZodEffects": // custom schema
//         case "ZodObject":
//             return "group";
//         default:
//             return "text";
//     }
// });

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

const multiple = computed(() => {
    if (fieldDef.typeName === "ZodArray") {
        if (fieldDef.type._def.typeName === "ZodString") {
            return true;
        }
    }
    return false;
});
</script>

<template>
    <div v-if="fieldMeta.type !== 'hidden'" class="form-input flex flex-col gap-1">
        <div :class="`flex gap-1 ${['checkbox', 'switch', 'radio'].includes(fieldMeta.type) ? 'flex-row-reverse items-center justify-end' : 'flex-col'}`">
            <div class="flex flex-row gap-1 items-center">
                <Label v-if="fieldMeta.label" :for="props.fieldKey">{{ fieldMeta.label }}<span v-if="meta.required" class="text-destructive"> *</span></Label>
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
                v-model="value"
                :class="errorMessage ? 'border-destructive' : ''"
                :options="fieldMeta.type === 'select' ? fieldMeta.options : undefined"
                :multiple="multiple"
                :fieldKey="['add', 'group'].includes(fieldMeta.type) ? props.fieldKey : undefined"
                :field="['add', 'group'].includes(fieldMeta.type) ? props.field : undefined"
                :listQuery="fieldMeta.type === 'search' ? fieldMeta.listQuery || undefined : undefined"
                :getQuery="fieldMeta.type === 'search' ? fieldMeta.getQuery || undefined : undefined"
                :resultLabel="fieldMeta.type === 'search' ? fieldMeta.resultLabel || undefined : undefined"
                :checked="(fieldMeta.type === 'switch' || fieldMeta.type === 'checkbox') ? value === fieldMeta.trueValue : undefined"
                :min="fieldDef.checks?.find(c => c.kind === 'min')?.value"
                :max="fieldDef.checks?.find(c => c.kind === 'max')?.value"
                :minlength="fieldDef.checks?.find(c => c.kind === 'min')?.value"
                :maxlength="fieldDef.checks?.find(c => c.kind === 'max')?.value"
                @update:checked="(checked: boolean) => (fieldMeta.type === 'switch' || fieldMeta.type === 'checkbox') ? (value = checked ? fieldMeta.trueValue : fieldMeta.falseValue) : undefined"
                @blur="validate"
                @clear="resetField({ value: fieldMeta.initial })"
            />
            <Label v-if="fieldMeta.type === 'switch' && fieldMeta.falseLabel">{{ fieldMeta.falseLabel }}</Label>
        </div>
        <p v-if="fieldMeta.description" :id="`${props.fieldKey}-desc`" class="text-sm text-muted-foreground">{{ fieldMeta.description }}</p>
        <div v-if="errorMessage" :name="props.fieldKey" class="text-destructive">{{ errorMessage }}</div>
    </div>
</template>
