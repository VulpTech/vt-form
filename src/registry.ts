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
            type: () => "text",
            minlength: ({ def }) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'min')?.value,
            maxlength: ({ def }) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'max')?.value,
        }
    },
    url: {
        component: CustomInput,
        props: {
            type: () => "url",
            minlength: ({ def }) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'min')?.value,
            maxlength: ({ def }) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'max')?.value,
        }
    },
    tel: {
        component: CustomInput,
        props: {
            type: () => "tel",
            minlength: ({ def }) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'min')?.value,
            maxlength: ({ def }) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'max')?.value,
        }
    },
    email: {
        component: CustomInput,
        props: {
            type: () => "email",
            minlength: ({ def }) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'min')?.value,
            maxlength: ({ def }) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'max')?.value,
        }
    },
    password: {
        component: CustomInput,
        props: {
            type: () => "password",
            minlength: ({ def }) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'min')?.value,
            maxlength: ({ def }) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'max')?.value,
        }
    },
    textarea: {
        component: Textarea,
        props: {
            minlength: ({ def }) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'min')?.value,
            maxlength: ({ def }) => (def as z.ZodStringDef).checks?.find(c => c.kind === 'max')?.value,
        }
    },
    checkbox: {
        component: CustomCheckbox,
        props: {
            trueValue: ({ meta }) => meta.type === "checkbox" ? meta.trueValue : undefined,
            falseValue: ({ meta }) => meta.type === "checkbox" ? meta.falseValue : undefined,
        },
    },
    switch: {
        component: CustomSwitch,
        props: {
            trueValue: ({ meta }) => meta.type === "switch" ? meta.trueValue : undefined,
            falseValue: ({ meta }) => meta.type === "switch" ? meta.falseValue : undefined,
        },
    },
    select: {
        component: ComboSelect,
        props: {
            options: ({ meta }) => meta.type === "select" ? meta.options : undefined,
            multiple: ({ meta }) => meta.type === "select" ? meta.multiple : undefined,
            hideSearch: ({ meta }) => meta.type === "select" ? meta.hideSearch : undefined,
        }
    },
    radio: {
        component: RadioInput,
        props: {
            options: ({ meta }) => meta.type === "radio" ? meta.options : undefined,
        }
    },
    add: {
        component: FormInputList,
        props: {
            fieldKey: ({ fieldKey }) => fieldKey,
            field: ({ field }) => field,
            elementClass: ({ meta }) => meta.type === "add" ? meta.elementClass : undefined,
        }
    },
    search: {
        component: SearchInput,
        props: {
            listQuery: ({ meta }) => meta.type === "search" ? meta.listQuery : undefined,
            getQuery: ({ meta }) => meta.type === "search" ? (meta.getQuery || undefined) : undefined,
            resultLabel: ({ meta }) => meta.type === "search" ? (meta.resultLabel || undefined) : undefined,
        }
    },
    group: {
        component: FormInputGroup,
        props: {
            fieldKey: ({ fieldKey }) => fieldKey,
            field: ({ field }) => field,
            display: ({ meta }) => meta.type === "group" ? meta.display : undefined,
        }
    },
    date: {
        component: DateInput,
        props: {
            yearRange: ({ meta }) => meta.type === "date" ? meta.yearRange : undefined,
        }
    },
    number: {
        component: NumberInput,
        props: {
            min: ({ def }) => (def as z.ZodNumberDef).checks?.find(c => c.kind === 'min')?.value,
            max: ({ def }) => (def as z.ZodNumberDef).checks?.find(c => c.kind === 'max')?.value,
        }
    },
    range: {
        component: FormRange,
        props: {
            min: ({ def }) => (def as z.ZodNumberDef).checks?.find(c => c.kind === 'min')?.value,
            max: ({ def }) => (def as z.ZodNumberDef).checks?.find(c => c.kind === 'max')?.value,
            step: ({ def }) => (def as z.ZodNumberDef).checks?.find(c => c.kind === 'multipleOf')?.value,
        }
    },
    rating: {
        component: Rating,
        props: {
            icon: ({ meta }) => meta.type === "rating" ? meta.icon : undefined,
            min: ({ def }) => (def as z.ZodNumberDef).checks?.find(c => c.kind === 'min')?.value,
            max: ({ def }) => (def as z.ZodNumberDef).checks?.find(c => c.kind === 'max')?.value,
            step: ({ def }) => (def as z.ZodNumberDef).checks?.find(c => c.kind === 'multipleOf')?.value,
        }
    },
    tags: {
        component: TagInput,
    },
    default: {
        component: CustomInput,
    },
};
