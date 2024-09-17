<script setup lang="ts">
import type { IJob } from '~/sites/default/components/blocks/jobsList/types'
import type { IJobsListBlock } from '~/sites/default/types/pages'

const props = defineProps<IJobsListBlock>()
const { data: jobs, refresh, status } = useJobsData<{
    data: IJob[]
    meta: { entries_total: number }
}>()

const route = useRoute()

const scrollToAnchor = (limit: string, smooth: boolean = true) => {
    const element = document.getElementById(`anchor-${limit}`)
    if (element) {
        element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
    }
}

const onAfterRefresh = async (limit: number) => {
    await refresh()
    scrollToAnchor(limit.toString())
}

// Scroll to anchor on page load if limit is present in query string
onMounted(() => {
    const limit = route.query.limit as string
    if (limit) {
        scrollToAnchor(
            limit,
            false,
        )
    }
})
const filter = ref()
watch(
    () => route.query,
    async (newQuery, oldQuery) => {
        if (Object.keys(newQuery).length === 0 && JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
            if (filter.value) {
                await filter.value?.clearFormState()
            }
            await refresh()
        }
    },
    { deep: true },
)
</script>

<template>
    <div class="container space-y-4">
        <div class="prose max-w-none text-center">
            <h2>
                Máme pro vás <span class="text-brand-500">{{ jobs?.meta.entries_total }} volných pozic</span>.
            </h2>
        </div>
        <div class="grid items-start xl:grid-cols-[300px_1fr] xl:gap-4">
            <BlocksJobsListFilter
                v-if="props.showFilter"
                ref="filter"
                :show-submit-button="props.showSubmitButton"
                class="top-4 xl:sticky"
                @update:form-state="() => refresh()"
            ></BlocksJobsListFilter>
            <div class="rounded bg-white px-4 pb-4 pt-8 ring-1 ring-black/10 lg:px-8">
                <BlocksJobsListJobs
                    :data="jobs?.data"
                    :total="jobs?.meta.entries_total"
                    :loading="status"
                    grid-class="grid grid-cols-1 gap-4 md:grid-cols-2"
                    @refresh="() => refresh()"
                    @load-more="(limit) => onAfterRefresh(limit)"
                >
                    <template #default="{ cells, getCellLabel, link, anchor }">
                        <a
                            :id="anchor"
                            :href="link"
                            class="group block auto-rows-min items-start overflow-hidden rounded text-gray-800 hover:ring-1 hover:ring-black/10 md:grid md:py-0"
                        >
                            <div
                                v-for="cell in cells"
                                :key="cell.id"
                                class="px-4 first:pt-3 last:pb-3 group-hover:bg-white md:flex md:items-start md:py-1 md:first:rounded-l md:first:pt-2 md:last:rounded-r md:last:pb-2"
                                :class="[cell.column.id === 'title' ? 'text-base font-bold' : 'text-xs text-gray-500 md:text-sm'].join('')"
                            >
                                {{ getCellLabel(cell) }}
                            </div>
                        </a>
                    </template>
                    <template #load-more-items="{ loadMoreItems, hasMoreItems }">
                        <div
                            v-if="hasMoreItems"
                            class="flex justify-center py-4 lg:pt-8"
                        >
                            <Button
                                @click="() => loadMoreItems()"
                            >
                                Načíst více
                            </Button>
                        </div>
                    </template>
                </BlocksJobsListJobs>
            </div>
        </div>
    </div>
</template>
