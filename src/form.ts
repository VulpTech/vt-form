import * as z from "zod";
import { type FormSchema, type InputMeta, type InputSchema, ZodMetadata } from "@/types";

export function formField<T extends z.ZodTypeAny, M extends InputMeta>(
    schema: T,
    metadata: M
): ZodMetadata<T, M> {
    return new ZodMetadata(schema.refine(() => true)._def, metadata);
}

export function schemaCreateEmptyObject<T extends FormSchema>(schema: T): z.infer<T> {
    return Object.entries(schema.shape).reduce((obj, [key, val]) => {
        obj[key] = structuredClone(val.metadata.initial);
        return obj;
    }, {} as Record<string, any>);
}

/**
 * Unwraps a zod schema to get the inner definition
 * 
 * @param field 
 * @returns 
 */
export function getZodSchema<T extends z.ZodTypeAny>(field: InputSchema<T> | T): T {
    let schema = "metadata" in field ? field.unwrap() : field;
    // optional
    if (schema._def.typeName === "ZodOptional") {
        schema = schema._def.innerType;
    }

    // refine
    if (schema._def.typeName === "ZodEffects") {
        schema = schema._def.schema;
    }

    return schema;
}
