<script lang="ts" setup>
import * as z from "zod";
import { getZodSchema } from "@/form";
import FormInput from "@/components/FormInput.vue";
import { Card, CardContent } from "@/components/ui/card";
import { InputSchema } from "@/types";

type ObjectGroupSchema = z.ZodObject<{[key: string]: InputSchema}>;

const props = defineProps<{
    // fieldKey: string;
    field: InputSchema<ObjectGroupSchema> | ObjectGroupSchema;
}>();

const model = defineModel<z.infer<typeof props.field>>({ required: true });

const shape = getZodSchema(props.field).shape;
</script>

<template>
    <Card class="grow">
        <CardContent class="p-6">
            <div class="grid grid-cols-2 flex-grow gap-2">
                <template v-for="(f, k) in shape" :key="k">
                    <div
                        v-if="f.metadata.type !== 'hidden'"
                        :class="f.metadata?.class"
                        :style="f.metadata?.style"
                    >
                        <FormInput
                            :fieldKey="(k as string)"
                            :field="f"
                            v-model="model[k]"
                        />
                    </div>
                </template>
            </div>
        </CardContent>
    </Card>
</template>
