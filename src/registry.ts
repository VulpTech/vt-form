import * as z from "zod";
import { type Registry } from "@/types";
import { Textarea } from "@/components/ui/textarea";
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
import TagInput from "./components/TagInput.vue";
import CustomCheckbox from "./components/CustomCheckbox.vue";
import CustomSwitch from "./components/CustomSwitch.vue";

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
        component: CustomCheckbox,
        props: {
            trueValue: (def, meta, model) => meta.type === "checkbox" ? meta.trueValue : undefined,
            falseValue: (def, meta, model) => meta.type === "checkbox" ? meta.falseValue : undefined,
        },
    },
    switch: {
        component: CustomSwitch,
        props: {
            trueValue: (def, meta, model) => meta.type === "switch" ? meta.trueValue : undefined,
            falseValue: (def, meta, model) => meta.type === "switch" ? meta.falseValue : undefined,
        },
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
            elementClass: (def, meta, model) => meta.type === "add" ? meta.elementClass : undefined,
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
    tags: {
        component: TagInput,
    },
    default: {
        component: CustomInput,
    },
};
