<template>
    <div
        class="fixed inset-0 bg-black/40 transition-opacity duration-200"
        :class="{ 'pointer-events-none': !isOpen }"
        :style="{
            opacity,
            zIndex: 999
        }"
        @click="onClose"
    ></div>
</template>

<script setup lang="ts">
defineProps<{
    isOpen: boolean
    opacity: number
    onClose: () => void
}>();
</script>
