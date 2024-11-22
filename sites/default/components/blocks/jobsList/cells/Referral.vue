<script setup lang="ts">
import type { IJobReferral } from '~/sites/default/types/jobs'

const props = defineProps<{
    data: IJobReferral
}>()
</script>

<template>
    <div class="@container/referralLine overflow-hidden rounded-md bg-gray-50 pt-px text-base">
        <div
            class="grid grid-cols-[1fr_max-content] items-center gap-x-4 gap-y-2 rounded-t-md p-3 ring-1 ring-black/5 lg:grid-cols-[max-content_1fr] lg:px-5"
            :class="props.data.candidates ? 'pb-5' : ''"
        >
            <div
                v-if="props.data.candidates || props.data.active"
                class="order-2 flex flex-wrap items-center gap-x-4 lg:order-1"
            >
                <Button
                    v-if="props.data.active"
                    type="button"
                    size="small"
                    theme="primary"
                >
                    Doporučit
                </Button>
                <div
                    v-if="props.data.candidates"
                    class="order-2 flex grow items-center gap-2 text-sm font-medium"
                >
                    Vaše doporučení <Icon name="tabler:arrow-down"></Icon>
                </div>
            </div>
            <div
                class="order-1 col-span-full text-sm lg:order-2 lg:col-span-1 lg:text-right"
            >
                <div v-if="props.data.active">
                    <div class="inline">
                        Možné odměny:
                    </div>
                    <template
                        v-for="(reward, index) in props.data.rewards"
                        :key="index"
                    >
                        <span class="text-brand-500 mr-1 font-semibold">{{ reward.value }}</span>
                        <span>{{ reward.title }}</span>
                        <span v-if="index < props.data.rewards.length - 1">, </span>
                    </template>
                </div>
                <div
                    v-else
                    class="inline-flex items-center gap-2 text-gray-400"
                >
                    <div class="inline-flex size-2.5 rounded-full bg-red-600 ring-1 ring-black/5"></div>Soutěž již není aktivní.
                </div>
            </div>
        </div>
        <div
            v-if="props.data.candidates"
            class="-mt-2 overflow-hidden rounded-b-md pt-[9px]"
        >
            <template
                v-for="(candidate, index) in props.data.candidates"
                :key="index"
            >
                <BlocksJobsListCandidate
                    v-bind="candidate"
                    class="-mt-2 rounded-md bg-white pb-6 pt-4 ring-1 ring-black/5 lg:pb-8 lg:pl-4 lg:pt-6"
                >
                </BlocksJobsListCandidate>
            </template>
        </div>
    </div>
</template>
