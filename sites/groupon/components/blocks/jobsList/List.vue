<script setup lang="ts">
import JobsList from '~/sites/default/components/blocks/list/List.vue';
import type { IListBlock } from '~/sites/default/types/pages';

const props = defineProps<IListBlock>();
</script>

<template>
    <JobsList v-bind="props">
        <template #default="slotProps">
            <div class="grid grid-cols-[400px_1fr] gap-4">
                <div class="sticky top-0 space-y-4">
                    <BlocksListFilter
                        v-if="slotProps.showFilter"
                        :entries-count="slotProps.entriesCount"
                        :show-submit-button="slotProps.showSubmitButton"
                        :filter-tabs="slotProps.filterTabs"
                        :hide-header="slotProps?.hideHeader"
                        @update:form-state="() => slotProps.refresh()"
                    ></BlocksListFilter>
                </div>

                <BlocksListJobs
                    v-if="slotProps.isJobsArray(slotProps.jobs?.data)"
                    :data="slotProps.jobs?.data"
                    :loading="slotProps.loading"
                    :has-more-items="slotProps.hasMoreItems"
                    @load-more-items="() => slotProps.loadMoreItems()"
                    @refresh="() => slotProps.refresh()"
                ></BlocksListJobs>

                <BlocksListCandidates
                    v-else
                    :data="slotProps.jobs?.data"
                    :loading="slotProps.loading"
                    :has-more-items="slotProps.hasMoreItems"
                    @load-more-items="() => slotProps.loadMoreItems()"
                    @refresh="() => slotProps.refresh()"
                ></BlocksListCandidates>
            </div>
        </template>
    </JobsList>
</template>
