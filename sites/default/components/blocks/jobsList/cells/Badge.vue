<script setup lang="ts">
const props = defineProps<{
    cell: any
}>()
</script>

<template>
    <Badge
        v-if="props.cell.title !== null"
        v-bind="props.cell.badge"
    >
        {{ props.cell.title }}
    </Badge>
</template>
