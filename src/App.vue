<script lang="ts" setup>
import { RouterView, RouterLink, useRoute } from "vue-router";
import { Button } from "./components/ui/button";

const route = useRoute();

const links = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "Steps",
        path: "/steps",
    },
];
</script>

<template>
    <div class="min-h-dvh">
        <nav class="px-4 flex flex-row gap-2 items-center">
            <Button v-for="link in links" :variant="route.path === link.path ? 'default' : 'secondary'" as-child>
                <RouterLink :to="link.path">{{ link.title }}</RouterLink>
            </Button>
        </nav>
        <div class="p-4 flex flex-col items-start gap-3">
            <RouterView></RouterView>
        </div>
    </div>
</template>
