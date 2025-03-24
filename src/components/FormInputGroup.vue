<script lang="ts" setup>
import * as z from "zod";
import { getZodSchema } from "@/form";
import FormInput from "@/components/FormInput.vue";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { InputSchema, Registry } from "@/types";

type ObjectGroupSchema = z.ZodObject<{[key: string]: InputSchema}>;

const props = defineProps<{
    // fieldKey: string;
    field: InputSchema<ObjectGroupSchema> | ObjectGroupSchema;
    registry?: Registry;
}>();

const model = defineModel<z.infer<typeof props.field>>({ required: true });

const shape = getZodSchema(props.field).shape;
</script>

<template>
    <Card class="grow">
        <CardContent class="p-6">
            <div :class="cn('grid grid-cols-2 gap-2', 'metadata' in props.field && props.field.metadata.type === 'group' ? props.field.metadata.groupClass : undefined)">
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
                            :registry="props.registry"
                        />
                    </div>
                </template>
            </div>
        </CardContent>
    </Card>
</template>
