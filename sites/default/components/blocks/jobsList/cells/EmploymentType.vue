<script setup lang="ts">
const props = defineProps<{
    cell: {
        id: number
    }
}>()

const employmentType = computed(() => {
    switch (props.cell.id) {
        case 1:
            return 'Plný úvazek'
        case 2:
            return 'Částečný úvazek'
        case 3:
            return 'Brigáda'
        default:
            return ''
    }
})
</script>

<template>
    <div class="inline-flex items-center justify-end text-sm text-gray-500">
        {{ employmentType }}
    </div>
</template>
