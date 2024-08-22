<script setup lang="ts">
const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug || 'index'
</script>

<template>
    <div>{{ slug }}</div>
</template>
