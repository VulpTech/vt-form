<script lang="ts" setup>
import { inject, type HTMLAttributes } from "vue";
import * as z from "zod";
import { Trash } from "lucide-vue-next";
import { visitedKey, type InputSchema, type Registry } from "@/types";
import { getZodSchema } from "@/form";
import FormInputGroup from "@/components/FormInputGroup.vue";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const props = defineProps<{
    fieldKey: string;
    field: InputSchema<z.ZodArray<z.AnyZodObject>>;
    fieldPath: string;
    registry?: Registry;
    class?: HTMLAttributes["class"];
}>();

const fieldUnwrapped = props.field.unwrap();
const fieldSchema = getZodSchema(props.field);

const model = defineModel<z.infer<typeof fieldUnwrapped>>();

const isVisited = inject(visitedKey) as (key: string, value?: -1 | 0 | 1) => boolean | void;

const element = Object.keys(fieldSchema.element.shape).reduce((obj, key) => {
    obj[key] = undefined;
    return obj;
}, {} as Record<string, any>);

function add() {
    if (model.value === undefined) {
        Object.keys(element).forEach(k => { // if obj array
            isVisited(`${props.fieldPath}.0.${k}`, 0);
        });
        model.value = [element];
    } else {
        Object.keys(element).forEach(k => { // if obj array
            isVisited(`${props.fieldPath}.${model.value!.length}.${k}`, 0);
        });
        model.value.push(structuredClone(element));
    }
}

function remove(index: number) {
    if (model.value !== undefined) {
        Object.keys(element).forEach(k => { // if obj array
            isVisited(`${props.fieldPath}.${index}.${k}`, -1);
        });
        if (model.value.length === 1) {
            model.value = undefined;
        } else {
            model.value.forEach((_, i) => {
                if (i > index) {
                    Object.keys(element).forEach(k => { // if obj array
                        const visited = isVisited(`${props.fieldPath}.${i}.${k}`);
                        isVisited(`${props.fieldPath}.${i - 1}.${k}`, visited ? 1 : 0);
                    });
                    Object.keys(element).forEach(k => { // if obj array
                        isVisited(`${props.fieldPath}.${i}.${k}`, -1);
                    });
                }
            });
            model.value.splice(index, 1);
        }
    }
}
</script>

<template>
    <Card :class="cn('', props.class)">
        <template v-if="model">
            <CardContent v-if="model.length > 0" class="flex flex-col gap-4">
                <div v-for="(_, index) in model" :key="index" class="flex flex-row gap-2">
                    <FormInputGroup v-model="model[index]" :field="fieldSchema.element" :registry="props.registry" :fieldPath="`${props.fieldPath}.${index}`" />
                    <div v-if="!fieldSchema._def.exactLength" class="w-6 flex">
                        <Button variant="destructive" size="sm" class="my-auto" @click="remove(index)">
                            <Trash class="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </template>
        <CardFooter v-if="model ? !fieldSchema._def.exactLength && (fieldSchema._def.maxLength && model.length < fieldSchema._def.maxLength.value) : true">
            <Button @click="add">+ Add</Button>
        </CardFooter>
    </Card>
</template>
