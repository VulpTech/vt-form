<script lang="ts" setup>
import { computed, inject, type HTMLAttributes } from "vue";
import * as z from "zod";
import { Trash } from "lucide-vue-next";
import { visitedKey, type InputSchema, type Registry } from "@/types";
import { getZodSchema } from "@/form";
import FormInputGroup from "@/components/FormInputGroup.vue";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const props = defineProps<{
    fieldKey: string;
    field: InputSchema<z.ZodArray<z.AnyZodObject>>;
    fieldPath: string;
    registry?: Registry;
    class?: HTMLAttributes["class"];
    elementClass?: HTMLAttributes["class"];
}>();

const fieldUnwrapped = props.field.unwrap();
const fieldSchema = getZodSchema(props.field);

const model = defineModel<z.infer<typeof fieldUnwrapped>>();

const isVisited = inject(visitedKey) as (key: string, value?: -1 | 0 | 1) => boolean | void;

const element = Object.keys(fieldSchema.element.shape).reduce((obj, key) => {
    obj[key] = fieldSchema.element.shape[key].metadata.type === "hidden" ? fieldSchema.element.shape[key].metadata.initial : undefined;
    return obj;
}, {} as Record<string, any>);

const canAdd = computed(() => {
    if (model.value) {
        if (!!fieldSchema._def.exactLength) {
            return false;
        } else if (!!fieldSchema._def.maxLength) {
            return model.value.length < fieldSchema._def.maxLength.value;
        } else {
            return true;
        }
    } else {
        return true;
    }
});

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
    <Card :class="cn('p-6 flex flex-grow gap-6', props.class)">
        <template v-if="model">
            <div v-for="(_, index) in model" :key="index" class="flex flex-row gap-2">
                <FormInputGroup v-model="model[index]" :field="fieldSchema.element" :registry="props.registry" :fieldPath="`${props.fieldPath}.${index}`" :class="props.elementClass" />
                <div v-if="!fieldSchema._def.exactLength" class="w-6 flex">
                    <Button variant="destructive" size="sm" class="my-auto" @click="remove(index)">
                        <Trash class="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </template>
        <div v-if="canAdd">
            <Button @click="add">+ Add</Button>
        </div>
    </Card>
</template>
