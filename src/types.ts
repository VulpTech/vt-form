import type { Ref, Component, HTMLAttributes, InjectionKey, ComputedRef } from "vue";
import * as z from "zod";

export const optionSchema = z.object({
    label: z.string().min(1),
    value: z.union([z.string().min(1), z.number(), z.record(z.any())]),
});
export interface Option extends z.infer<typeof optionSchema> { };

export const externalInputSchema = z.object({
    label: z.string().optional(),
    description: z.string().optional(),
    placeholder: z.string().optional(),
    style: z.string().optional(),
    class: z.string().optional(),
    tooltip: z.string().optional(),
    step: z.string().optional(),
});

export const inputMetaSchema = z.discriminatedUnion("type", [
    z.object({
        type: z.enum(["text", "url", "password", "email", "tel", "textarea"]),
        initial: z.string().optional(),
        resetValue: z.string().optional(),
        emptyValue: z.string().optional(),
    }),
    z.object({
        type: z.literal("date"),
        initial: z.string().optional(),
        resetValue: z.string().optional(),
        emptyValue: z.string().optional(),
        yearRange: z.tuple([z.number().int(), z.number().int()]).optional()
    }),
    z.object({
        type: z.literal("group"),
        initial: z.any().optional(),
        resetValue: z.any().optional(),
        emptyValue: z.any().optional(),
        display: z.enum(["card", "div"]).optional(),
    }),
    z.object({
        type: z.literal("number"),
        initial: z.number().optional(),
        resetValue: z.number().optional(),
        emptyValue: z.number().optional(),
    }),
    z.object({
        type: z.literal("range"),
        initial: z.union([z.number(), z.number().array()]),
        resetValue: z.union([z.number(), z.number().array()]).optional(),
        emptyValue: z.union([z.number(), z.number().array()]).optional(),
    }),
    z.object({
        type: z.literal("select"),
        options: z.union([optionSchema.array(), z.null()]).optional(),
        initial: z.union([z.string(), z.string().array()]).optional(),
        resetValue: z.union([z.string(), z.string().array()]).optional(),
        emptyValue: z.union([z.string(), z.string().array()]).optional(),
        multiple: z.boolean().optional(),
        hideSearch: z.boolean().optional(),
    }),
    z.object({
        type: z.literal("radio"),
        options: z.union([optionSchema.array(), z.null()]).optional(),
        initial: z.string().optional(),
        resetValue: z.string().optional(),
        emptyValue: z.string().optional(),
    }),
    z.object({
        type: z.literal("search"),
        listQuery: z.function().args(z.string()).returns(optionSchema.array()),
        getQuery: z.function().args(z.string()).returns(z.any()).optional(),
        resultLabel: z.string().optional(),
        initial: z.any().optional(),
        resetValue: z.any().optional(),
        emptyValue: z.any().optional(),
    }),
    z.object({
        type: z.literal("add"),
        element: z.any().optional(),
        initial: z.any().array().optional(),
        resetValue: z.any().array().optional(),
        emptyValue: z.any().array().optional(),
        elementClass: z.string().optional(),
    }),
    z.object({
        type: z.literal("checkbox"),
        trueValue: z.any().optional(),
        falseValue: z.any().optional(),
        initial: z.any().optional(),
        resetValue: z.any().optional(),
        emptyValue: z.any().optional(),
    }),
    z.object({
        type: z.literal("switch"),
        trueValue: z.any().optional(),
        falseValue: z.any().optional(),
        falseLabel: z.string().optional(),
        initial: z.any().optional(),
        resetValue: z.any().optional(),
        emptyValue: z.any().optional(),
    }),
    z.object({
        type: z.literal("rating"),
        initial: z.number().optional(),
        icon: z.enum(["star", "number"]).default("star").optional(),
        resetValue: z.number().optional(),
        emptyValue: z.number().optional(),
    }),
    z.object({
        type: z.literal("tags"),
        initial: z.string().array().optional(),
        resetValue: z.string().array().optional(),
        emptyValue: z.string().array().optional(),
    }),
    z.object({
        type: z.literal("hidden"),
        initial: z.any(),
    })
]).and(externalInputSchema);

// const inputMetaSchema2 = z.union([z.discriminatedUnion("type", [
//     z.object({
//         type: z.enum(["text", "url", "password", "email", "date", "tel", "textarea"]),
//         initial: z.string().optional(),
//         resetValue: z.string().optional(),
//     }),
//     z.object({
//         type: z.literal("group"),
//         initial: z.any().optional(),
//         resetValue: z.any().optional(),
//         groupClass: z.string().optional(),
//     }),
//     z.object({
//         type: z.literal("number"),
//         initial: z.number().optional(),
//         resetValue: z.number().optional(),
//     }),
//     z.object({
//         type: z.literal("range"),
//         initial: z.union([z.number(), z.number().array()]),
//         resetValue: z.union([z.number(), z.number().array()]).optional(),
//     }),
//     z.object({
//         type: z.literal("select"),
//         options: z.union([optionSchema.array(), z.null()]).optional(),
//         initial: z.union([z.string(), z.string().array()]).optional(),
//         resetValue: z.union([z.string(), z.string().array()]).optional(),
//         multiple: z.boolean().optional(),
//         hideSearch: z.boolean().optional(),
//     }),
//     z.object({
//         type: z.literal("radio"),
//         options: z.union([optionSchema.array(), z.null()]).optional(),
//         initial: z.string().optional(),
//         resetValue: z.string().optional(),
//     }),
//     z.object({
//         type: z.literal("search"),
//         listQuery: z.function().args(z.string()).returns(optionSchema.array()),
//         getQuery: z.function().args(z.string()).returns(z.any()).optional(),
//         resultLabel: z.string().optional(),
//         initial: z.any().optional(),
//         resetValue: z.any().optional(),
//     }),
//     z.object({
//         type: z.literal("add"),
//         element: z.any().optional(),
//         initial: z.any().array().optional(),
//         resetValue: z.any().array().optional(),
//     }),
//     z.object({
//         type: z.literal("checkbox"),
//         trueValue: z.any().optional(),
//         falseValue: z.any().optional(),
//         initial: z.any().optional(),
//         resetValue: z.any().optional(),
//     }),
//     z.object({
//         type: z.literal("switch"),
//         trueValue: z.any().optional(),
//         falseValue: z.any().optional(),
//         falseLabel: z.string().optional(),
//         initial: z.any().optional(),
//         resetValue: z.any().optional(),
//     }),
//     z.object({
//         type: z.literal("rating"),
//         initial: z.number().optional(),
//         icon: z.enum(["star", "number"]).default("star").optional(),
//         resetValue: z.number().optional(),
//     }),
//     z.object({
//         type: z.literal("tags"),
//         initial: z.string().array().optional(),
//         resetValue: z.string().array().optional(),
//     }),
//     z.object({
//         type: z.literal("hidden"),
//         initial: z.any(),
//     })

// ]).and(externalInputSchema), externalInputSchema])


export type InputMeta = z.infer<typeof inputMetaSchema>;
// export const sectionMetaSchema = z.object({
//     class: z.string().optional(),
//     style: z.string().optional(),
// });
// export interface SectionMeta extends z.infer<typeof sectionMetaSchema> { };

export class ZodMetadata<
    T extends z.ZodTypeAny,
    M extends InputMeta
> extends z.ZodEffects<T> {
    constructor(def: z.ZodEffectsDef<T>, public metadata: M) {
        super(def);
    }

    unwrap() {
        return this._def.schema;
    }
};

export type InputSchema<T extends z.ZodTypeAny = z.ZodTypeAny> = ZodMetadata<T, InputMeta>;
export type FormSchema = z.ZodObject<{ [key: string]: InputSchema }>;

export type Registry = Record<string, {
    component: Component;
    props?: Record<string, (options: {def: z.ZodTypeDef, meta: InputMeta, model: Ref<any>, field: InputSchema, fieldKey: string}) => any>;
    events?: Record<string, (options: {def: z.ZodTypeDef, meta: InputMeta, model: Ref<any>, field: InputSchema, fieldKey: string}) => Function>;
}>;

export type Step = {
    id: string;
    label?: string;
    description?: string;
    class?: HTMLAttributes["class"];
};

type BaseStepConfig = {
    type: "stepper" | "group";
    steps: Step[];
};

type StepperStepConfig = BaseStepConfig & {
    type: "stepper";
    orientation?: "vertical" | "horizontal";
    linear?: boolean;
};

type GroupStepConfig = BaseStepConfig & {
    type: "group";
};

export type StepConfig = StepperStepConfig | GroupStepConfig;

export type FormError = Omit<z.ZodIssue, "path"> & { path: string };

export const formErrorsKey = Symbol() as InjectionKey<ComputedRef<FormError[]>>;

export const visitedKey = Symbol() as InjectionKey<(key: string, value?: -1 | 0 | 1) => boolean | void>;
