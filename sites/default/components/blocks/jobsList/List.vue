<script setup lang="ts">
import type { IJob } from '~/sites/default/components/blocks/jobsList/types'
import type { IJobsListBlock } from '~/sites/default/types/pages'
import { useJobsData } from '~/composables/useJobsData'

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
    <div class="container">
        <Box class="space-y-4 px-0 pt-6 lg:px-0 lg:pt-8">
            <div class="prose prose-sm lg:prose px-6 lg:px-8">
                <h2>
                    Máme pro vás <span class="text-brand-500">{{ jobs?.meta.entries_total }} volných pozic</span>.
                </h2>
            </div>
            <BlocksJobsListFilter
                v-if="props.showFilter"
                ref="filter"
                :show-submit-button="props.showSubmitButton"
                class="rounded px-6 lg:px-8 lg:pb-6"
                @update:form-state="() => refresh()"
            ></BlocksJobsListFilter>
            <BlocksJobsListJobs
                :data="jobs?.data"
                :total="jobs?.meta.entries_total"
                :loading="status"
                @refresh="() => refresh()"
                @load-more="(limit) => onAfterRefresh(limit)"
            >
            </BlocksJobsListJobs>
        </Box>
    </div>
</template>
