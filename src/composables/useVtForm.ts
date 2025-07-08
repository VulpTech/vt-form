import { ref, computed, provide } from "vue";
import * as z from "zod";
import { schemaCreateEmptyObject } from "@/form";
import { type FormSchema, InputSchema, type Step, type StepConfig, formErrorsKey, visitedKey } from "@/types";

export default function useVtForm<T extends FormSchema>(schema: T, options?: {
    steps?: StepConfig;
    initialState?: z.infer<typeof schema>;
    validateOnMount?: boolean;
}) {
    const error = ref<string | null>(null);
    const formData = ref<z.infer<typeof schema> | undefined>();
    const isValidating = ref<boolean>(false);
    const visited = ref<Record<string, boolean>>({});

    function buildVisitedObj(shape: {[key: string]: InputSchema<z.ZodTypeAny>}, keyPrefix?: string) {
        Object.entries(shape).forEach(([key, val]) => {
            if (val.metadata.type === "group") {
                buildVisitedObj((val.unwrap() as z.AnyZodObject).shape, key);
            } else if (val.metadata.type === "add") {
                if (val.metadata.initial && val.metadata.initial.length > 0) {
                    val.metadata.initial.forEach((element, index) => {
                        Object.keys(element).forEach(k => {
                            visited.value[`${keyPrefix ? `${keyPrefix}.${key}` : key}.${index}.${k}`] = false;
                        });
                    });
                } else {
                    visited.value[keyPrefix ? `${keyPrefix}.${key}` : key] = false;
                }
            } else {
                visited.value[keyPrefix ? `${keyPrefix}.${key}` : key] = false;
            }
        });
    }

    try {
        formData.value = schemaCreateEmptyObject(schema);
        if (options?.initialState) {
            formData.value = {...formData.value, ...options?.initialState};
        }
        buildVisitedObj(schema.shape);
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

    function validationState(keys?: string[]): "valid" | "incomplete" | "invalid" {
        if ((keys !== undefined && !formErrors.value.some(e => keys.some(k => e.path === k || e.path.startsWith(k + ".")))) || isValid.value) {
            return "valid";
        } else {
            const errorKeys = keys !== undefined ? formErrors.value.map(e => e.path).filter(p => keys.some(k => p === k || p.startsWith(k + "."))): formErrors.value.map(e => e.path);
            const visitedKeys = Object.keys(visited.value).filter(k => visited.value[k]).filter(k => errorKeys.some(e => e === k || k.startsWith(e + ".")));
            if (visitedKeys.length === 0) {
                return "incomplete";
            } else {
                return "invalid";
            }
        }
    }

    const formState = computed(() => validationState());

    const steps = computed(() => {
        if (options?.steps) {
            return {
                ...options.steps,
                steps: options.steps.steps.map(step => {
                    const keys = Object.keys(schema.shape).filter(fieldKey => schema.shape[fieldKey].metadata.step === step.id);
                    const stepObj: Step & { shape: typeof schema.shape, valid: boolean, state: "valid" | "incomplete" | "invalid" } = {
                        ...step,
                        shape: keys.reduce((obj, fieldKey) => {
                                obj[fieldKey] = schema.shape[fieldKey];
                                return obj;
                            }, {} as typeof schema.shape),
                        valid: !formErrors.value.some(e => keys.some(k => k === e.path || e.path.startsWith(k + "."))),
                        state: validationState(keys),
                    };
                    return stepObj;
                })
            }
        } else {
            return undefined;
        }
    });

    provide(formErrorsKey, formErrors);

    function isVisited(key: string, value?: -1 | 0 | 1): boolean | void {
        if (!(key in visited.value)) {
            visited.value[key] = false;
        }
        if (value !== undefined) {
            if (value >= 0) {
                visited.value[key] = Boolean(value);
            } else {
                delete visited.value[key];
            }
        } else {
            return visited.value[key];
        }
    }

    provide(visitedKey, isVisited);

    const isValid = computed(() => parsed.value.success);

    const resetForm = () => {
        formData.value = schemaCreateEmptyObject(schema);
        buildVisitedObj(schema.shape);
    }

    return {
        formData,
        isValidating,
        formErrors,
        error,
        isValid,
        formState,
        resetForm,
        steps,
        visited, // temp
    }
}