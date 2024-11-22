<script lang="ts" setup>
import type { IStrapiBlockName, IStrapiBlockFilterTabs, IStrapiBlockSettings } from '~/sites/default/types/pages'

definePageMeta({
    middleware: 'auth',
})
const data = {
    id: 4,
    __component: 'blocks.jobs-list' as IStrapiBlockName,
    showFilter: true,
    showSubmitButton: false,
    filterTabs: 'Candidates' as IStrapiBlockFilterTabs,
    hideHeader: true,
    baseSettings: {
        id: 4,
        background: 'Light',
        topGap: 'Small',
        bottomGap: 'Medium',
        backgroundPosition: null,
        backgroundRepeat: null,
        backgroundSize: null,
        topBorder: 'None',
        bottomBorder: 'None',
    } as IStrapiBlockSettings,
}
</script>

<template>
    <BlocksBase v-bind="data?.baseSettings">
        <BlocksJobsList
            v-bind="data"
        ></BlocksJobsList>
    </BlocksBase>
</template>
