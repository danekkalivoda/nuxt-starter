<script setup lang="ts">
const props = defineProps<{
    cell: any
}>()
</script>

<template>
    <div class="inline-flex items-center text-sm text-gray-500">
        {{ props.cell.title }}
    </div>
</template>
