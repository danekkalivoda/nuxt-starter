<script setup lang="ts">

import { useRoute } from '#app';
definePageMeta({
    middleware: 'dynamic-redirect',
});
const showModal = ref(true);
const route = useRoute();
const id = route.params.slug;
</script>
<template>
    <Modal v-model:show="showModal">
        <BlocksJobsListRecommendDialog></BlocksJobsListRecommendDialog>
    </Modal>
</template>
