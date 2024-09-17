<script setup lang="ts">
import type { IJob } from '~/sites/default/components/blocks/jobsList/types'

definePageMeta({
    middleware: 'dynamic-redirect',
})
const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug || 'index'
const splitSlug = (slug: string): { number: number | null
    rest: string } => {
    const match = slug.match(/^(\d+)(?:-(.+))?/)
    return match
        ? {
                number: parseInt(
                    match[1],
                    10,
                ),
                rest: match[2] || '', // Pokud část za pomlčkou není, vrátí prázdný řetězec
            }
        : { number: null,
                rest: slug }
}
const { number } = splitSlug(slug)

const { data: job } = await useJobsData<{
    data: IJob
    meta: { entries_total: number }
}>(
    'jobDetail',
    '/api/jobs',
    String(number),
)
</script>

<template>
    <Page
        :title="job.data.title"
        :description="job.data.shortDesc"
    >
        <div class="container">
            <div
                class="prose mx-auto"
                v-html="job.data.description"
            >
            </div>
        </div>
    </Page>
</template>
