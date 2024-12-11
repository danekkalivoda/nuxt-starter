<script setup lang="ts">
const props = defineProps<{
    cell: any
}>();

</script>

<template>
    <div class="inline-flex items-center justify-end text-sm text-gray-500">
        <div
            v-for="(value, index) in props.cell.employmentType"
            :key="value.id"
            class="inline-flex"
        >
            <span class="inline-block">{{ value.value }}
            </span>
            <span
                v-if="index < props.cell.employmentType.length - 1"
                class="mr-1 inline-block"
            >,</span>
        </div>
    </div>
</template>
