<script setup lang="ts">
const props = defineProps<{
    cell: any
}>()
</script>

<template>
    <h3 class="group-hover/jobRow:text-brand-500 text-[clamp(0.9rem,1vw,1.2rem)] font-semibold transition-colors">
        {{ props.cell.title }}
    </h3>
</template>
