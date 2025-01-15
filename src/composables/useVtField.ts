import { schemaCreateEmptyObject } from '@/form'
import { FormSchema } from '@/types'
import { ref } from 'vue'
import * as z from "zod"

type resetProp = { value: any }
export function useVtField( schema: z.ZodTypeAny ){
    const value = ref(schemaCreateEmptyObject(schema as FormSchema))
    const errorMessage = ref()
    const meta = ref({required:!schema.isOptional()})

    const required = !schema.isOptional()
    const validate = ()=>{
        const res = schema.safeParse(value.value)
        if (!res.success){
            errorMessage.value = res.error
        }
    }
    const resetField = (newValue: resetProp)=>{
        value.value = newValue.value
    }
    return {
        value, 
        errorMessage, 
        meta, 
        required,
        validate, 
        resetField
    }
}