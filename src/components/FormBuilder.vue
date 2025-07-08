<script lang="ts" setup>
import { type HTMLAttributes, onMounted, ref, watch } from "vue";
import * as z from "zod";
import { Check, Circle, Dot, ChevronLeft, ChevronRight, X, CircleDashed } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import type { FormSchema, Registry, Step, StepConfig } from "@/types";
import FormInput from "@/components/FormInput.vue";
import { Stepper, StepperItem, StepperSeparator, StepperTrigger, StepperTitle, StepperDescription } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";

const props = defineProps<{
    schema: FormSchema;
    disabled?: boolean;
    class?: HTMLAttributes["class"];
    registry?: Registry;
    steps?: StepConfig & {
        steps: (Step & { shape: typeof props.schema.shape; valid: boolean; state: "valid" | "incomplete" | "invalid" })[];
    };
}>();

const model = defineModel<z.infer<typeof props.schema> | undefined>({ required: true });

const stepIndex = defineModel("step", { default: 1 });

const stepVisited = ref(props.steps?.steps.map((_, i) => i + 1).reduce((obj, curr, i) => {
    obj[curr] = i === stepIndex.value - 1 ? true : false;
    return obj;
}, {} as Record<number, boolean>));

if (props.steps) {
    watch(stepIndex, (newValue) => {
        if (stepVisited.value && !stepVisited.value[newValue]) {
            stepVisited.value[newValue] = true;
        }
    });
}
</script>

<template>
    <span v-if="!model" class="text-destructive">Invalid form model.</span>
    <template v-else>
        <template v-if="props.steps">
            <Stepper
                v-if="props.steps.type === 'stepper'"
                v-model="stepIndex"
                :orientation="props.steps.orientation"
                :linear="props.steps.linear ?? false"
                v-slot="{ nextStep, prevStep, isFirstStep, isLastStep }"
                :class="cn('flex flex-col gap-2 pt-1 w-full', props.steps.orientation === 'horizontal' ? '' : 'pl-1', props.class)"
            >
                <div :class="`flex ${props.steps.orientation === 'horizontal' ? 'flex-col items-center gap-4' : 'flex-row gap-8'}`">
                    <div :class="`flex gap-4 ${props.steps.orientation === 'horizontal' ? 'w-full flex-row justify-around' : 'flex-col'}`">
                        <StepperItem v-for="step, index in props.steps.steps" :step="index + 1" :key="index + 1" v-slot="{ state }" :class="`flex relative ${props.steps.orientation === 'horizontal' ? 'flex-col flex-1' : 'flex-row'}`">
                            <StepperSeparator
                                v-if="index !== props.steps.steps.length - 1"
                                :class="`absolute block shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary ${props.steps.orientation === 'horizontal' ? 'left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 h-0.5' : 'left-[18px] top-[38px] h-[105%] w-0.5'}`"
                            />
                            <StepperTrigger as-child>
                                <Button
                                    :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
                                    size="icon"
                                    :class="`z-10 rounded-full shrink-0 ${state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background'}`"
                                >
                                    <CircleDashed v-if="!stepVisited![index + 1]" class="size-5" />
                                    <Check v-else-if="step.valid" class="size-5" />
                                    <Circle v-else-if="step.state === 'incomplete'" class="size-5" />
                                    <X v-else class="size-5" />
                                </Button>
                            </StepperTrigger>
                            <div :class="`flex flex-col gap-1 ${props.steps.orientation === 'horizontal' ? 'items-center text-center' : 'max-w-3xs'}`">
                                <StepperTitle :class="`text-sm font-semibold transition lg:text-base ${state === 'active' && 'text-primary'}`">
                                    {{ step.label }}
                                </StepperTitle>
                            </div>
                        </StepperItem>
                    </div>
                    <div class="w-full">
                        <div class="mb-4">
                            <h3 class="font-bold text-lg">{{ props.steps.steps[stepIndex - 1].label }}</h3>
                            <p v-if="props.steps.steps[stepIndex - 1].description">{{ props.steps.steps[stepIndex - 1].description }}</p>
                        </div>
                        <div :class="props.steps.steps[stepIndex - 1].class">
                            <template v-for="(field, fieldKey) in (props.steps.steps[stepIndex - 1].shape)" :key="fieldKey">
                                <div
                                    v-if="field.metadata"
                                    :class="field.metadata?.class"
                                    :style="field.metadata?.style"
                                >
                                    <FormInput
                                        :fieldKey="(fieldKey as string)"
                                        :field="field"
                                        :fieldPath="(fieldKey as string)"
                                        v-model="model[fieldKey]"
                                        :disabled="disabled"
                                        :registry="props.registry"
                                    />
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row items-center justify-between w-full">
                    <div class="flex flex-row items-center gap-2">
                        <slot v-if="isFirstStep" name="left-buttons-first" />
                        <Button v-else variant="outline" @click="prevStep">
                            <ChevronLeft class="size-4" /> Prev
                        </Button>
                        <slot name="left-buttons" />
                    </div>
                    <div class="flex flex-row items-center gap-2">
                        <slot name="right-buttons" />
                        <template v-if="isLastStep">
                            <slot name="right-buttons-last" />
                        </template>
                        <Button v-else variant="outline" @click="nextStep">
                            Next <ChevronRight class="size-4" />
                        </Button>
                    </div>
                </div>
            </Stepper>
            <div v-else :class="cn('', props.class)">

            </div>
        </template>
        <div v-else :class="cn('', props.class)">
            <template v-for="(field, fieldKey) in props.schema.shape" :key="fieldKey">
                <div
                    v-if="field.metadata"
                    :class="field.metadata?.class"
                    :style="field.metadata?.style"
                >
                    <FormInput
                        :fieldKey="(fieldKey as string)"
                        :field="field"
                        :fieldPath="(fieldKey as string)"
                        v-model="model[fieldKey]"
                        :disabled="disabled"
                        :registry="props.registry"
                    />
                </div>
            </template>
        </div>
    </template>
</template>
