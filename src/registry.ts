import { type Registry } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import CustomInput from "@/components/CustomInput.vue";
import ComboSelect from "@/components/ComboSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import FormInputList from "@/components/FormInputList.vue";
import FormInputGroup from "@/components/FormInputGroup.vue";
import DateInput from "@/components/DateInput.vue";
import NumberInput from "@/components/NumberInput.vue";
import FormRange from "@/components/FormRange.vue";

export const defaultRegistry: Registry = {
    text: {
        component: CustomInput,
        props: {
            type: (def, meta, model) => "text",
            minlength: (def, meta, model) => def.checks?.find(c => c.kind === 'min')?.value,
            maxlength: (def, meta, model) => def.checks?.find(c => c.kind === 'max')?.value,
        }
    },
    url: {
        component: CustomInput,
        props: {
            type: (def, meta, model) => "url",
            minlength: (def, meta, model) => def.checks?.find(c => c.kind === 'min')?.value,
            maxlength: (def, meta, model) => def.checks?.find(c => c.kind === 'max')?.value,
        }
    },
    tel: {
        component: CustomInput,
        props: {
            type: (def, meta, model) => "tel",
            minlength: (def, meta, model) => def.checks?.find(c => c.kind === 'min')?.value,
            maxlength: (def, meta, model) => def.checks?.find(c => c.kind === 'max')?.value,
        }
    },
    email: {
        component: CustomInput,
        props: {
            type: (def, meta, model) => "email",
            minlength: (def, meta, model) => def.checks?.find(c => c.kind === 'min')?.value,
            maxlength: (def, meta, model) => def.checks?.find(c => c.kind === 'max')?.value,
        }
    },
    password: {
        component: CustomInput,
        props: {
            type: (def, meta, model) => "password",
            minlength: (def, meta, model) => def.checks?.find(c => c.kind === 'min')?.value,
            maxlength: (def, meta, model) => def.checks?.find(c => c.kind === 'max')?.value,
        }
    },
    textarea: {
        component: Textarea,
        props: {
            minlength: (def, meta, model) => def.checks?.find(c => c.kind === 'min')?.value,
            maxlength: (def, meta, model) => def.checks?.find(c => c.kind === 'max')?.value,
        }
    },
    checkbox: {
        component: Checkbox,
        props: {
            checked: (def, meta, model) => model.value === meta.trueValue,
        },
        events: {
            "update:checked": (def, meta, model) => ((checked: boolean) => model.value = checked ? meta.trueValue : meta.falseValue),
        }
    },
    switch: {
        component: Switch,
        props: {
            checked: (def, meta, model) => model.value === meta.trueValue,
        },
        events: {
            "update:checked": (def, meta, model) => ((checked: boolean) => model.value = checked ? meta.trueValue : meta.falseValue),
        }
    },
    select: {
        component: ComboSelect,
        props: {
            options: (def, meta, model) => meta.options,
            multiple: (def, meta, model) => meta.multiple,
        }
    },
    add: {
        component: FormInputList,
        props: {
            fieldKey: (def, meta, model, field, fieldKey) => fieldKey,
            field: (def, meta, model, field, fieldKey) => field,
        }
    },
    search: {
        component: SearchInput,
        props: {
            listQuery: (def, meta, model) => meta.listQuery || undefined,
            getQuery: (def, meta, model) => meta.getQuery || undefined,
            resultLabel: (def, meta, model) => meta.resultLabel || undefined,
        }
    },
    group: {
        component: FormInputGroup,
        props: {
            fieldKey: (def, meta, model, field, fieldKey) => fieldKey,
            field: (def, meta, model, field, fieldKey) => field,
        }
    },
    date: {
        component: DateInput,
    },
    number: {
        component: NumberInput,
        props: {
            min: (def, meta, model) => def.checks?.find(c => c.kind === 'min')?.value,
            max: (def, meta, model) => def.checks?.find(c => c.kind === 'max')?.value,
        }
    },
    range: {
        component: FormRange,
        props: {
            min: (def, meta, model) => def.checks?.find(c => c.kind === 'min')?.value,
            max: (def, meta, model) => def.checks?.find(c => c.kind === 'max')?.value,
        }
    },
    default: {
        component: CustomInput,
    },
};
