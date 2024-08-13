<script setup lang="ts">
import { JobsFilter, Jobs } from '~/sites/default/components/blocks/jobsList';
import type { IJobsListBlock } from '~/sites/default/types/pages';
import type { Types } from '~/sites/default/components/blocks/jobsList';
import { useJobsData } from '~/composables/useJobsData';
const props = defineProps<IJobsListBlock>();
const { data: jobs, refresh, status } = useJobsData<{ data: Types.IJob[]  }>();
</script>
<template>
    <div class="container space-y-4">
        <div class="prose">
            <h2>
                Máme pro vás <span class="text-brand-500">{{ jobs?.data.length }} volných pozic</span>.
            </h2>
        </div>
        <JobsFilter
            v-if="props.showFilter"
            :show-submit-button="props.showSubmitButton"
            class="rounded bg-gray-50 p-4"
            @update:form-state="() => refresh()"
        ></JobsFilter>
        <Jobs
            :data="jobs?.data"
            :loading="status"
            @refresh="() => refresh()"
        >
            <template #default="{ cells, getCellLabel, link }">
                <a
                    :href="link"
                    class="group block grid-cols-2 items-stretch overflow-hidden rounded ring-1 ring-black/5 md:grid md:py-0"
                >
                    <div
                        v-for="cell in cells"
                        :key="cell.id"
                        class="px-4 first:pt-3 last:pb-3 group-hover:bg-gray-50 md:flex md:items-center md:py-2 md:first:rounded-l md:first:pt-2 md:last:rounded-r md:last:pb-2"
                        :class="[cell.column.id === 'title' ? 'text-base' : 'text-xs text-gray-400 md:text-sm'].join('')"
                    >
                        {{ getCellLabel(cell) }}
                    </div>
                </a>
            </template>
        </Jobs>
    </div>
</template>
