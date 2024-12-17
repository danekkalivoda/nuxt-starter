<script setup lang="ts">
import { getDetailLink } from './lib/helpers';
import Badge from '~/recruitis-shared/components/badge.vue';
import FlowBar from '~/recruitis-shared/components/flowBar/flowBar.vue';
import type { IJobCandidate } from '~/sites/default/types/jobs';

const props = withDefaults(defineProps<{ showTooltips?: boolean } & IJobCandidate>(), {
    showTooltips: false,
});
</script>

<template>
    <div class="@5xl/list:grid-cols-[460px_1fr] grid gap-y-4 overflow-hidden lg:items-center">
        <nuxt-link
            v-if="props.position"
            class="@xl/list:grid-cols-[max-content_120px_1fr] @xl/list:gap-2 @xl/list:-mb-2 group col-span-full grid grid-cols-[max-content_1fr] items-center gap-x-1 px-4 text-sm text-gray-400"
            :to="getDetailLink(props.position.id, props.position.title)"
        >
            <Icon
                name="tabler:building"
                class="size-5 "
            ></Icon>
            <div>
                Pozice
            </div>
            <div class="@xl/list:col-start-3 group-hover/list:text-brand-500 @xl/list:pl-3 col-start-2 text-base font-medium text-gray-800">
                {{ props.position.title }}
            </div>
        </nuxt-link>
        <div class="@xl/list:grid-cols-[max-content_120px_1fr] grid grid-cols-[max-content_1fr] gap-y-4 px-4 text-sm ">
            <div class="@xl/list:gap-2 col-span-full -mb-1 grid grid-cols-subgrid items-center gap-x-1 text-gray-400">
                <Icon
                    name="tabler:user"
                    class="size-5 "
                ></Icon>
                <div>Kandidát:</div>
                <div class="@xl/list:pl-5 @xl/list:col-start-3 col-start-2 text-lg font-semibold text-gray-800">
                    {{ props.id }}
                </div>
            </div>
            <div class="@xl/list:gap-2 col-span-full grid grid-cols-subgrid items-center gap-x-1 text-gray-400">
                <Icon
                    name="tabler:calendar-month"
                    class="size-5"
                ></Icon>
                <div>Odpověděl:</div>
                <div class="@xl/list:pl-5 @xl/list:col-start-3 col-start-2 font-semibold text-gray-800">
                    {{ new Date(props.date).toLocaleDateString('cs-CZ') }}
                </div>
            </div>

            <div
                v-if="props.state"
                class="@xl/list:gap-2 col-span-full grid grid-cols-subgrid items-center gap-1 text-gray-400"
            >
                <Icon
                    name="tabler:step-out"
                    class="size-5 rotate-90"
                ></Icon>
                <div class="text-gray-400">
                    Krok ve flow:
                </div>
                <div class="@xl/list:pl-2 @xl/list:col-start-3 col-start-2 flex items-center">
                    <Badge
                        size="xsmall"
                        class="px-3 leading-5"
                        :theme="props.state.theme"
                    >
                        {{ props.state.text }} <template v-if="props?.rejected">
                            / zamítnut
                        </template>
                    </Badge>
                </div>
            </div>
            <div
                v-if="props.contestState"
                class="@xl/list:gap-2 col-span-full grid grid-cols-subgrid items-center gap-x-1 text-gray-400"
            >
                <Icon
                    name="tabler:trophy"
                    class="size-5 "
                ></Icon>
                <div>Stav soutěže:</div>
                <div class="@xl/list:col-start-3 @xl/list:pl-2 col-start-2 flex items-center text-lg font-semibold text-gray-800">
                    <Badge
                        size="xsmall"
                        class="px-3 leading-5"
                        :theme="props.contestState.theme"
                    >
                        {{ props.contestState.text }}
                    </Badge>
                </div>
            </div>
            <div class="@xl/list:gap-2 col-span-full grid grid-cols-subgrid items-center gap-x-1 text-gray-400">
                <div class="col-span-2 grid grid-cols-subgrid items-center gap-2 self-start">
                    <Icon
                        name="tabler:coins"
                        class="self size-5"
                    ></Icon>
                    <span class="font-medium text-gray-800">Vaše výhry:</span>
                </div>
                <div class="@xl/list:col-start-3 @xl/list:pl-5 col-span-full col-start-2 flex flex-wrap gap-1 text-gray-800 lg:flex-col">
                    <div
                        v-for="(reward, index) in props.rewards"
                        :key="index"
                        class="inline"
                    >
                        <span class="text-brand-500 mr-1 font-semibold">{{ reward.value }}</span>
                        <span>{{ reward.title }}</span>
                        <span v-if="index < props.rewards.length - 1">, </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="group min-w-0 px-2 lg:pr-4">
            <FlowBar
                v-bind="props.flow"
                :rejected="props?.rejected"
                :show-step-tooltips="props.showTooltips"
                :class="props?.rejected ? 'opacity-70' : ''"
            >
                <template #lastActiveIcon="slotProps">
                    <Icon
                        v-if="slotProps.rejected"
                        name="tabler:thumb-down"
                        class="size-5 text-white"
                    ></Icon>
                    <Icon
                        v-else
                        name="tabler:check"
                        class="size-5 text-white"
                    ></Icon>
                </template>
                <template #arrows="slotProps">
                    <Button
                        type="button"
                        size="small"
                        class="m-1"
                        :class="slotProps.arrowPosition === 'left'
                            ? (slotProps.isLeftArrowVisible ? 'pointer-events-auto' : 'pointer-events-none')
                            : (slotProps.isRightArrowVisible ? 'pointer-events-auto' : 'pointer-events-none')"
                        @click.stop="
                            slotProps.arrowPosition === 'left'
                                ? slotProps.scrollLeft()
                                : slotProps.scrollRight()
                        "
                    >
                        <Icon
                            :name="slotProps.arrowPosition === 'left' ? 'tabler:chevron-left' : 'tabler:chevron-right'"
                            class="-mx-1.5 -my-0.5 size-5"
                        ></Icon>
                    </Button>
                </template>
                <template #stepText="slotProps">
                    <div :class="[slotProps.isActive ? 'text-gray-900' : 'text-gray-400', 'text-sm leading-4 font-medium'].join(' ')">
                        {{ slotProps.step.name }}
                    </div>
                    <span
                        v-if="slotProps.step.date"
                        class="text-xs"
                    >{{ slotProps.step.date }}</span>
                </template>
                <template #reject>
                    <div class="hidden"></div>
                </template>
            </FlowBar>
        </div>
    </div>
</template>
