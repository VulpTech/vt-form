import { ref, computed } from "vue";
import * as z from "zod";
import { schemaCreateEmptyObject } from "@/form";
import { FormSchema, StepConfig } from "@/types";

export default function useVtForm<T extends FormSchema>(schema: T, steps?: StepConfig) {
    const error = ref<string | null>(null);
    const formData = ref<z.infer<typeof schema> | undefined>();
    const isValidating = ref<boolean>(false);

    try {
        formData.value = schemaCreateEmptyObject(schema);
    }
    catch {
        error.value = "Invalid form schema";
    }

    const parsed = computed(() => {
        isValidating.value = true;
        const result = schema.safeParse(formData.value)
        isValidating.value = false;
        return result;
    });

    const validity = computed(() => parsed.value.error);

    const isValid = computed(() => parsed.value.success);

    const resetValues = () => {
        formData.value = schemaCreateEmptyObject(schema);
    }

    return {
        formData,
        isValidating,
        validity,
        error,
        isValid,
        resetValues,
    }
}