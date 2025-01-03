import * as z from "zod";
import { FormSchema, InputMeta, InputSchema, ZodMetadata } from "@/types";

export function zodMetadata<T extends z.ZodTypeAny, M extends InputMeta>(
    schema: T,
    metadata: M
): ZodMetadata<T, M> {
    return new ZodMetadata(schema.refine(() => true)._def, metadata)
}

export function schemaCreateEmptyObject<T extends FormSchema>(schema: T): z.infer<T> {
    return Object.entries(schema.shape).reduce((obj, [key, val]) => {
        obj[key] = structuredClone(val.metadata.initial);
        return obj;
    }, {} as Record<string, any>);
}

// export function removeEmptyValues(obj: { [key: string]: any }, schema: { [key: string]: z.ZodTypeAny }): { [key: string]: any } {
//     const newObj: { [key: string]: any } = {};
//     Object.entries(obj).forEach(([key, value]) => {
//         const field = getZodSchema(schema[key]);
//         const meta = getZodSchemaMeta(schema[key]);
//         if (meta) {
//             if (meta.type === "group") {
//                 const subObj = removeEmptyValues(value, (field as z.AnyZodObject).shape);
//                 if (Object.keys(subObj).length > 0) {
//                     newObj[key] = subObj;
//                 }
//             } else if (meta.type === "add") {
//                 const initialObj = meta.initial.length === 1 ? meta.initial[0] : {};
//                 const newShape = z.object({...field._def.type.shape}).meta<InputMeta>({
//                     label: `temp-${meta.label}`,
//                     type: "group",
//                     initial: initialObj,
//                 });
//                 const valueArray = (value as Array<any>).map(v => removeEmptyValues(v, newShape.shape)).filter(o => Object.keys(o).length > 0);
//                 if (valueArray.length > 0) {
//                     newObj[key] = valueArray;
//                 }
//             } else if ((JSON.stringify(value) !== JSON.stringify(meta.initial)) || meta.type === "hidden") {
//                 newObj[key] = value;
//             }
//         }
//     });
//     return newObj;
// }

// export function isFormFilled(obj: { [key: string]: any }, schema: { [key: string]: z.ZodTypeAny }): boolean {
//     let isFilled = true;
//     Object.entries(obj).forEach(([key, value]) => {
//         const field = getZodSchema(schema[key]);
//         const meta = getZodSchemaMeta(schema[key]);
//         if (meta) {
//             if (meta.type === "group") {
//                 isFilled = isFormFilled(value, field.shape);
//             } else if (meta.type === "add") {
//                 const initialObj = meta.initial.length === 1 ? meta.initial[0] : {};
//                 const newShape = z.object({...field._def.type.shape}).meta<InputMeta>({
//                     label: `temp-${meta.label}`,
//                     type: "group",
//                     initial: initialObj,
//                 });
//                 isFilled = value.map(v => isFormFilled(v, newShape.shape)).every(x => x)
//             } else if ((JSON.stringify(value) === JSON.stringify(meta.initial))) {
//                 isFilled = false;
//             }
//         }
//     });
//     return isFilled;
// }

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
