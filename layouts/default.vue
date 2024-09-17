<script lang="ts" setup>
import DefaultLayout from '~/sites/default/layout/default.vue'
import GrouponLayout from '~/sites/groupon/layout/default.vue'

/* Chtěl sem to udělat async, ale v tu chvíli to rozbije SSR. */

const config = useRuntimeConfig()
const layoutName = config.public.NUXT_PROJECT_NAME

const layouts: { [key: string]: typeof DefaultLayout } = {
    default: DefaultLayout,
    groupon: GrouponLayout,
}

const layoutComponent = layouts[layoutName] || DefaultLayout
</script>

<template>
    <component :is="layoutComponent"></component>
</template>
