<script lang="ts" setup>
import { RouterView, RouterLink } from "vue-router";
import { Button } from "./components/ui/button";
</script>

<template>
    <div class="min-h-dvh">
        <nav class="px-4 flex flex-row gap-2 items-center">
            <Button variant="secondary" as-child>
                <RouterLink to="/">Home</RouterLink>
            </Button>
            <Button variant="secondary" as-child>
                <RouterLink to="/steps">Steps</RouterLink>
            </Button>
        </nav>
        <div class="p-4 flex flex-col items-start gap-3">
            <RouterView></RouterView>
        </div>
    </div>
</template>
