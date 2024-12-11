<script lang="ts" setup>
import type { IStrapiBlockName, IStrapiBlockFilterTabs, IStrapiBlockSettings } from '~/sites/default/types/pages';

definePageMeta({
    middleware: 'auth',
});
const data = {
    id: 4,
    __component: 'blocks.jobs-list' as IStrapiBlockName,
    showFilter: true,
    showSubmitButton: false,
    filterTabs: 'Candidates' as IStrapiBlockFilterTabs,
    hideHeader: true,
    baseSettings: {
        id: 4,
        background: 'Transparent',
        topGap: 'None',
        bottomGap: 'None',
        backgroundPosition: null,
        backgroundRepeat: null,
        backgroundSize: null,
        topBorder: 'None',
        bottomBorder: 'None',
    } as IStrapiBlockSettings,
};
</script>

<template>
    <div class="space-y-4 py-4 lg:space-y-8 lg:py-8">
        <h1 class="font-display container text-2xl font-semibold lg:text-4xl">
            Moje doporučení
        </h1>
        <div class="border-t bg-gray-50 py-4 lg:py-8">
            <BlocksBase v-bind="data?.baseSettings">
                <BlocksList v-bind="data"></BlocksList>
            </BlocksBase>
        </div>
    </div>
</template>
