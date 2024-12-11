<script setup lang="ts">
import { useRoute } from '#app';
import { useWindowSize } from '@vueuse/core';

definePageMeta({
    middleware: 'dynamic-redirect',
});

const { width } = useWindowSize();
const showModal = ref(true);
const route = useRoute();
const id = route.params.slug;

const isDesktop = computed(() => width.value >= 1024);
</script>

<template>
    <Modal v-model:show="showModal">
        <BlocksListRecommendDialog></BlocksListRecommendDialog>
    </Modal>
</template>
