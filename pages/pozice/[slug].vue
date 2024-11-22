<script setup lang="ts">
import type { IJobDetail } from '~/sites/default/types/jobs'

definePageMeta({
    middleware: 'dynamic-redirect',
})
const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug || 'index'
const splitSlug = (slug: string): {
    number: number | null
    rest: string
} => {
    const match = slug.match(/^(\d+)(?:-(.+))?/)
    return match
        ? {
                number: parseInt(
                    match[1],
                    10,
                ),
                rest: match[2] || '',
            }
        : { number: null,
                rest: slug }
}
const { number } = splitSlug(slug)

const { data: job } = await useAsyncData<{
    data: IJobDetail
}>(() => $fetch(
    '/api/job/list',
    {
        params: { id: String(number) },
    },
))
</script>

<template>
    <JobDetail
        v-if="job"
        :id="job.data.id"
        :title="job.data.title"
        :short-desc="job.data.shortDesc"
        :description="job.data.description"
        :referral="job.data.referral"
        :form="job.data.form"
    ></JobDetail>
</template>
