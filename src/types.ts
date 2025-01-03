import * as z from "zod";

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
export type FormSchema = z.ZodObject<{[key: string]: InputSchema}>;

export const optionSchema = z.object({
    label: z.string().min(1),
    value: z.string().min(1),
});
export interface Option extends z.infer<typeof optionSchema> { };

export const inputMetaSchema = z.discriminatedUnion("type", [
    z.object({
        type: z.enum(["text", "url", "password", "email", "date", "tel", "textarea"]),
        initial: z.string(),
    }),
    z.object({
        type: z.enum(["group"]),
        initial: z.any(),
    }),
    z.object({
        type: z.literal("number"),
        initial: z.number(),
    }),
    z.object({
        type: z.literal("range"),
        initial: z.union([z.number(), z.number().array()]),
    }),
    z.object({
        type: z.literal("select"),
        options: z.union([optionSchema.array(), z.null()]).optional(),
        initial: z.union([z.string(), z.string().array()]),
    }),
    z.object({
        type: z.literal("search"),
        listQuery: z.function().args(z.string()).returns(optionSchema.array()).optional(),
        getQuery: z.function().args(z.string()).returns(z.any()).optional(),
        resultLabel: z.string().optional(),
        initial: z.any(),
    }),
    z.object({
        type: z.literal("add"),
        element: z.any().optional(),
        initial: z.any().array(),
    }),
    z.object({
        type: z.literal("checkbox"),
        trueValue: z.any().optional(),
        falseValue: z.any().optional(),
        initial: z.any(),
    }),
    z.object({
        type: z.literal("switch"),
        trueValue: z.any().optional(),
        falseValue: z.any().optional(),
        falseLabel: z.string().optional(),
        initial: z.any(),
    }),
    z.object({
        type: z.literal("hidden"),
        initial: z.any(),
    })
]).and(z.object({
    label: z.string().optional(),
    description: z.string().optional(),
    placeholder: z.string().optional(),
    style: z.string().optional(),
    class: z.string().optional(),
    tooltip: z.string().optional(),
}));
export type InputMeta = z.infer<typeof inputMetaSchema>;
// export const sectionMetaSchema = z.object({
//     class: z.string().optional(),
//     style: z.string().optional(),
// });
// export interface SectionMeta extends z.infer<typeof sectionMetaSchema> { };
