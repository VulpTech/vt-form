import { computed, type Ref, ref, nextTick } from "vue"
import { InputSchema } from "@/types";
import { getZodSchema } from "@/form";

export function useVtField(field: InputSchema, model: Ref<any>) {
    const schema = field.unwrap();
    const errorMessage = ref("");
    const required = !schema.isOptional();

    const isRequiredError = computed(() => {
        switch(getZodSchema(schema)._def.typeName) {
            case "ZodString":
                return model.value === "";
            case "ZodArray":
                return model.value.length === 0;
            case "ZodObject":
                return Object.keys(model.value).length === 0;
            case "ZodBoolean":
                return !model.value;
            default:
                return model.value === undefined;
        }
    })

    const validate = () => {
        if (required && isRequiredError.value) {
            errorMessage.value = `${field.metadata.label} is required`;
        } else {
            const res = schema.safeParse(model.value);
            if (!res.success) {
                errorMessage.value = res.error.errors.map(e => e.message).join(", ");
            } else {
                errorMessage.value = "";
            }
        }
    }

    const resetField = () => {
        model.value = "resetValue" in field.metadata ? field.metadata.resetValue : field.metadata.initial;
        nextTick(() => {
            errorMessage.value = "";
        });
    }

    return {
        errorMessage,
        required,
        validate,
        resetField,
    }
}