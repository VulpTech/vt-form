import * as z from "zod";
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
import Rating from "@/components/Rating.vue";
import RadioInput from "@/components/RadioInput.vue";

export const defaultRegistry: Registry = {
    text: {
        component: CustomInput,
        props: {
            type: (def, meta, model) => "text",
            minlength: (def, meta, model) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'min')?.value,
            maxlength: (def, meta, model) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'max')?.value,
        }
    },
    url: {
        component: CustomInput,
        props: {
            type: (def, meta, model) => "url",
            minlength: (def, meta, model) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'min')?.value,
            maxlength: (def, meta, model) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'max')?.value,
        }
    },
    tel: {
        component: CustomInput,
        props: {
            type: (def, meta, model) => "tel",
            minlength: (def, meta, model) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'min')?.value,
            maxlength: (def, meta, model) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'max')?.value,
        }
    },
    email: {
        component: CustomInput,
        props: {
            type: (def, meta, model) => "email",
            minlength: (def, meta, model) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'min')?.value,
            maxlength: (def, meta, model) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'max')?.value,
        }
    },
    password: {
        component: CustomInput,
        props: {
            type: (def, meta, model) => "password",
            minlength: (def, meta, model) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'min')?.value,
            maxlength: (def, meta, model) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'max')?.value,
        }
    },
    textarea: {
        component: Textarea,
        props: {
            minlength: (def, meta, model) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'min')?.value,
            maxlength: (def, meta, model) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'max')?.value,
        }
    },
    checkbox: {
        component: Checkbox,
        props: {
            checked: (def, meta, model) => meta.type === "checkbox" ? model.value === meta.trueValue : undefined,
        },
        events: {
            "update:checked": (def, meta, model) => ((checked: boolean) => meta.type === "checkbox" ? (model.value = checked ? meta.trueValue : meta.falseValue) : undefined),
        }
    },
    switch: {
        component: Switch,
        props: {
            checked: (def, meta, model) => meta.type === "switch" ? model.value === meta.trueValue : undefined,
        },
        events: {
            "update:checked": (def, meta, model) => ((checked: boolean) => meta.type === "switch" ? (model.value = checked ? meta.trueValue : meta.falseValue) : undefined),
        }
    },
    select: {
        component: ComboSelect,
        props: {
            options: (def, meta, model) => meta.type === "select" ? meta.options : undefined,
            multiple: (def, meta, model) => meta.type === "select" ? meta.multiple : undefined,
            hideSearch: (def, meta, model) => meta.type === "select" ? meta.hideSearch : undefined,
        }
    },
    radio: {
        component: RadioInput,
        props: {
            options: (def, meta, model) => meta.type === "radio" ? meta.options : undefined,
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
            listQuery: (def, meta, model) => meta.type === "search" ? meta.listQuery : undefined,
            getQuery: (def, meta, model) => meta.type === "search" ? (meta.getQuery || undefined) : undefined,
            resultLabel: (def, meta, model) => meta.type === "search" ? (meta.resultLabel || undefined) : undefined,
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
            min: (def, meta, model) => (def as z.ZodNumberDef).checks?.find(c => c.kind === 'min')?.value,
            max: (def, meta, model) => (def as z.ZodNumberDef).checks?.find(c => c.kind === 'max')?.value,
        }
    },
    range: {
        component: FormRange,
        props: {
            min: (def, meta, model) => (def as z.ZodNumberDef).checks?.find(c => c.kind === 'min')?.value,
            max: (def, meta, model) => (def as z.ZodNumberDef).checks?.find(c => c.kind === 'max')?.value,
            step: (def, meta, model) => (def as z.ZodNumberDef).checks?.find(c => c.kind === 'multipleOf')?.value,
        }
    },
    rating: {
        component: Rating,
        props: {
            icon: (def, meta, model) => meta.type === "rating" ? meta.icon : undefined,
            min: (def, meta, model) => (def as z.ZodNumberDef).checks?.find(c => c.kind === 'min')?.value,
            max: (def, meta, model) => (def as z.ZodNumberDef).checks?.find(c => c.kind === 'max')?.value,
            step: (def, meta, model) => (def as z.ZodNumberDef).checks?.find(c => c.kind === 'multipleOf')?.value,
        }
    },
    default: {
        component: CustomInput,
    },
};
