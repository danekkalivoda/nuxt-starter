<script setup lang="ts">
const props = defineProps<{
    getCellLabel: (cell: any) => any
    row: any
}>();
</script>

<template>
    <div
        :id="props.row.original.anchor"
        class="group/jobRow col-span-full mt-4 grid grid-cols-subgrid items-stretch rounded-md bg-white px-4 py-6 ring-1 ring-black/10 transition-shadow hover:ring-black/15 lg:mt-8 lg:py-8 lg:pl-8 lg:first:mt-4"
    >
        <BlocksListCandidate
            v-bind="row.getVisibleCells()[0].row.original"
        ></BlocksListCandidate>
    </div>
</template>
