import * as z from "zod"
import { ref, computed } from 'vue'
import { schemaCreateEmptyObject } from "@/form";

export default function useVtForm<T extends z.AnyZodObject>(schema:T) {
    const error = ref<string|null>(null)
    const data =ref<z.infer<typeof schema>|undefined>()
    try{
        data.value = schemaCreateEmptyObject(schema);
    }
    catch{
        error.value = "Invalid form schema"
    }
    const isValidating = ref<boolean>(false)
   
    const validity = computed(()=>{
        isValidating.value = true 
        const errors = schema.safeParse(data.value).error
        isValidating.value = false 
        return errors
    })

    const isValid = computed(()=>{
        return schema.safeParse(data.value).success
    })

    const resetValues= ()=>{
        data.value = schemaCreateEmptyObject(schema);
    }
    
    return {

        data,
        isValidating,
        validity,
        error,
        isValid,
        resetValues,
    }
}