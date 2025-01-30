<script lang="ts" setup>
import * as z from "zod";
import { Trash } from "lucide-vue-next";
import { InputSchema } from "@/types";
import { getZodSchema } from "@/form";
import FormInputGroup from "@/components/FormInputGroup.vue";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const props = defineProps<{
    // fieldKey: string;
    field: InputSchema<z.ZodArray<z.AnyZodObject>>;
}>();

const fieldUnwrapped = props.field.unwrap();

const model = defineModel<z.infer<typeof fieldUnwrapped>>({ required: true });

const fieldSchema = getZodSchema(props.field);
const fieldMeta = props.field.metadata;

function add() {
    // @ts-ignore
    model.value.push(structuredClone(fieldMeta.element));
}

function remove(index: number) {
    model.value.splice(index, 1);
}
</script>

<template>
    <Card>
        <CardContent v-if="model.length > 0" class="flex flex-col gap-4 p-6">
            <div v-for="(_, index) in model" :key="index" class="flex flex-row gap-2">
                <FormInputGroup v-model="model[index]" :field="fieldSchema.element" />
                <div v-if="!fieldSchema._def.exactLength" class="w-6 flex">
                    <Button
                        v-if="fieldMeta.initial.length === 0 || index > 0"
                        variant="destructive"
                        size="sm"
                        class="my-auto"
                        @click="remove(index)"
                    >
                        <Trash class="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </CardContent>
        <CardFooter v-if="!fieldSchema._def.exactLength || (fieldSchema._def.maxLength && model.length < fieldSchema._def.maxLength.value)">
            <Button @click="add">+ Add</Button>
        </CardFooter>
    </Card>
</template>
