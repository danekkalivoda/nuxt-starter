<script setup lang="ts">
import { scrollToAnchor } from '~/sites/default/components/blocks/list/lib/helpers';
import type { IJob, IJobCandidate } from '~/sites/default/types/jobs';
import type { IListBlock } from '~/sites/default/types/pages';

const { $router: router, _route: route } = useNuxtApp();
const headers = useRequestHeaders(['cookie']) as HeadersInit;
const props = defineProps<IListBlock>();

const { data: jobs, refresh, status: loading } = await useAsyncData<{
    data: IJob[] | IJobCandidate[] | null | undefined
    meta: { entries_total: number }
}>(
    'jobs-data',
    () => {
        const params = { ...router.currentRoute.value.query };
        if (props.filterTabs === 'Candidates' || props.filterTabs === 'Positions') {
            params.listFiltersTab = props.filterTabs.toLowerCase();
        }
        if (props.customParams) {
            params.customParams = JSON.stringify(props.customParams);
        }
        return $fetch(
            '/api/jobs',
            {
                params,
                headers,
            },
        );
    },
);
const hasMoreItems = computed(() => {
    return jobs.value?.data?.length < jobs.value?.meta.entries_total;
});
const isJobsArray = (data: IJob[] | IJobCandidate[] | null | undefined): data is IJob[] => {
    return (
        !!data && (data.length === 0 || 'title' in data[0])
    );
};
const loadMoreItems = async (limit: number = 25) => {
    const currentLimit = parseInt(route.query.limit as string) || 25;
    const newLimit = currentLimit + limit;
    router.push({ query: { ...route.query,
        limit: newLimit.toString() } }).then(async () => {
        await refresh();
        scrollToAnchor(String(currentLimit));
    });
};
onMounted(() => {
    const limit = route.query.limit as string;
    if (limit) {
        scrollToAnchor(
            limit,
            false,
        );
    }
});
</script>

<template>
    <div class="container">
        <slot
            :jobs="jobs"
            :loading="loading"
            :has-more-items="hasMoreItems"
            :entries-count="jobs?.meta.entries_total"
            :show-filter="props.showFilter"
            :show-submit-button="props.showSubmitButton"
            :filter-tabs="props.filterTabs"
            :hide-header="props?.hideHeader"
            :is-jobs-array="(data) => isJobsArray(data)"
            :load-more-items="loadMoreItems"
            :refresh="refresh"
            :update:form-state="refresh"
        >
            <div class="space-y-4">
                <BlocksListFilter
                    v-if="props.showFilter"
                    :entries-count="jobs?.meta.entries_total"
                    :show-submit-button="props.showSubmitButton"
                    :filter-tabs="props.filterTabs"
                    :hide-header="props?.hideHeader"
                    @update:form-state="() => refresh()"
                ></BlocksListFilter>

                <BlocksListJobs
                    v-if="isJobsArray(jobs?.data)"
                    :data="jobs?.data"
                    :loading="loading"
                    :has-more-items="hasMoreItems"
                    @load-more-items="() => loadMoreItems()"
                    @refresh="() => refresh()"
                ></BlocksListJobs>

                <LazyBlocksListCandidates
                    v-else
                    :data="jobs?.data"
                    :loading="loading"
                    :has-more-items="hasMoreItems"
                    @load-more-items="() => loadMoreItems()"
                    @refresh="() => refresh()"
                ></LazyBlocksListCandidates>
            </div>
        </slot>
    </div>
</template>
