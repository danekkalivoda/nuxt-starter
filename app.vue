<script setup lang="ts">
import { NNotificationProvider } from 'naive-ui'

const config = useRuntimeConfig()
const notificationThemeOverrides
= config.public.NUXT_PROJECT_CONFIG.notificationThemeOverrides || {}

useHead({
    title: 'Nuxt starter',
})
</script>

<template>
    <NuxtLoadingIndicator color="repeating-linear-gradient(to right,var(--tw-brand-300) 0%,var(--tw-brand-500) 50%,var(--tw-brand-700) 100%)"></NuxtLoadingIndicator>
    <NNotificationProvider :theme-overrides="notificationThemeOverrides">
        <NuxtLayout>
            <NuxtPage></NuxtPage>
        </NuxtLayout>
    </NNotificationProvider>
</template>

<style lang="pcss">
body {
    @apply font-sans text-gray-800;
}
</style>
