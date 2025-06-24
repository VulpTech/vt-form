import { ref, computed, provide } from "vue";
import * as z from "zod";
import { schemaCreateEmptyObject } from "@/form";
import { type FormSchema, type StepConfig, formErrorsKey } from "@/types";

export default function useVtForm<T extends FormSchema>(schema: T, options?: {
    steps?: StepConfig;
}) {
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

    const formErrors = computed(() => parsed.value.error?.errors.map(e => {
        return {
            ...e,
            path: e.path.join(".")
        }
    }) || []);

    provide(formErrorsKey, formErrors);

    const isValid = computed(() => parsed.value.success);

    const resetValues = () => {
        formData.value = schemaCreateEmptyObject(schema);
    }

    return {
        formData,
        isValidating,
        formErrors,
        error,
        isValid,
        resetValues,
    }
}