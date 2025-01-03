<script lang="ts" setup>
import { ref } from "vue";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const open = ref(false);
</script>

<template>
    <TooltipProvider>
        <Tooltip v-model:open="open">
            <TooltipTrigger as-child>
                <Button variant="link" class="text-muted-foreground cursor-help p-0 h-auto" @click="open = true">
                    <slot name="trigger"></slot>
                </Button>
            </TooltipTrigger>
            <TooltipContent class="max-w-[300px] text-center">
                <slot />
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>
