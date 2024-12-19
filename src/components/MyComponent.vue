<script lang="ts" setup>
const props = defineProps<{
    title: string;
}>();
</script>

<template>
    <div class="card">
        <h3>{{ props.title }}</h3>
        <slot />
        <slot name="footer" />
    </div>
</template>

<style scoped>
h3 {
    color: green;
}
</style>