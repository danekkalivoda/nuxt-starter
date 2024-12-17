<script setup lang="ts">
import type { IJobReferral } from '~/sites/default/types/jobs';
import { useIsIOS } from '~/recruitis-shared/composables/useIsIos.js';
const showModal = ref(false);
const props = defineProps<{
    data: IJobReferral
    id: string
    detailHref: string
}>();

const { $router: router, _route: route } = useNuxtApp();
const openModal = (event: Event) => {
    event.preventDefault();
    const currentPath = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;
    if (useIsIOS()) {
        router.push(`${currentPath}/referralForm`);
    } else {
        showModal.value = true;
    }
};
const showCandidates = ref(false);
</script>

<template>
    <div class="relative overflow-hidden rounded-md bg-gray-50 pt-px text-base">
        <div
            class="grid grid-cols-[1fr_max-content] items-center gap-x-4 gap-y-2 rounded-t-md p-3 ring-1 ring-black/10 xl:grid-cols-[max-content_1fr] xl:pr-5"
            :class="props.data.candidates ? 'pb-5' : ''"
        >
            <div
                v-if="props.data.candidates || props.data.active"
                class="order-2 flex flex-wrap items-center gap-x-2 xl:order-1"
            >
                <div>
                    <Button
                        type="button"
                        size="small"
                        :theme="props.data.active ? 'primary' : 'secondary'"
                        :disabled="!props.data.active"
                        @click="openModal"
                    >
                        Typ na kandidáta
                    </Button>
                    <Modal
                        v-model:show="showModal"
                    >
                        <RecommendDialog in-modal></RecommendDialog>
                    </Modal>
                </div>
                <Button
                    v-if="props.data.candidates"
                    size="small"
                    theme="custom"
                    class="flex items-center gap-2 rounded-md border border-transparent font-medium ring-2 ring-transparent transition-colors hover:border-gray-200 hover:bg-white hover:ring-gray-100 focus:border-gray-300 focus:bg-white focus:ring-gray-300"
                    @click="showCandidates = !showCandidates"
                >
                    <Badge
                        size="xsmall"
                        theme="light-brand"
                        class="-my-2 -ml-1 mr-2 rounded"
                    >
                        {{ props.data.candidates.length }}
                    </Badge>
                    Vaše doporučení
                    <Icon
                        name="tabler:chevron-down"
                        class="-my-2 ml-2 transition-transform duration-150"
                        :class="showCandidates ? 'rotate-180' : ''"
                    ></Icon>
                </Button>
                <Share></Share>
            </div>
            <div
                class="order-1 col-span-full text-sm xl:order-2 xl:col-span-1 xl:text-right"
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
            class="pointer-events-none absolute inset-0 rounded-md shadow-[inset_0_6px_4px_-2px_rgb(0_0_0_/_0.05)]"
        ></div>
        <div
            v-if="props.data.candidates"
            class="-mt-2 grid  transition-all duration-150"
            :class="[showCandidates ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'].join(' ')"
        >
            <div class="overflow-hidden">
                <div
                    class="rounded-b-md pt-[9px]"
                >
                    <template
                        v-for="(candidate, index) in props.data.candidates"
                        :key="index"
                    >
                        <BlocksListCandidate
                            :show-tooltips="showCandidates"
                            v-bind="candidate"
                            class="-mt-2 rounded-md bg-white pb-6 pt-4 ring-1 ring-black/10 xl:pb-8 xl:pl-4 xl:pt-6"
                        ></BlocksListCandidate>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
