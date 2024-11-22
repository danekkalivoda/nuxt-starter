<script setup lang="ts">
import JobsList from '~/sites/default/components/blocks/jobsList/List.vue'
import type { IJobsListBlock } from '~/sites/default/types/pages'

const props = defineProps<IJobsListBlock>()
</script>

<template>
    <JobsList v-bind="props">
        <template #default="slotProps">
            <div class="grid grid-cols-[400px_1fr] gap-4">
                <div class="sticky top-0 space-y-4">
                    <BlocksJobsListFilter
                        v-if="slotProps.showFilter"
                        :entries-count="slotProps.entriesCount"
                        :show-submit-button="slotProps.showSubmitButton"
                        :filter-tabs="slotProps.filterTabs"
                        :hide-header="slotProps?.hideHeader"
                        @update:form-state="() => slotProps.refresh()"
                    ></BlocksJobsListFilter>
                </div>

                <BlocksJobsListJobs
                    v-if="slotProps.isJobsArray(slotProps.jobs?.data)"
                    :data="slotProps.jobs?.data"
                    :loading="slotProps.loading"
                    :has-more-items="slotProps.hasMoreItems"
                    @load-more-items="() => slotProps.loadMoreItems()"
                    @refresh="() => slotProps.refresh()"
                >
                </BlocksJobsListJobs>

                <BlocksJobsListCandidates
                    v-else
                    :data="slotProps.jobs?.data"
                    :loading="slotProps.loading"
                    :has-more-items="slotProps.hasMoreItems"
                    @load-more-items="() => slotProps.loadMoreItems()"
                    @refresh="() => slotProps.refresh()"
                >
                </BlocksJobsListCandidates>
            </div>
        </template>
    </JobsList>
</template>
