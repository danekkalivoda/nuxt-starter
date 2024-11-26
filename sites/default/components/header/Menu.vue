<script setup lang="ts">
import { getUrl } from '~/utils/client';
import { NPopover } from 'naive-ui';

const { locales, locale } = useI18n();
export interface MenulinkInterface {
    title: string
    url: string
    target: string
    children: [
        {
            title: string
            url: string
            target: string
        },
    ]
}
export interface MenuInterface {
    menu: MenulinkInterface[]
    isMobile?: boolean
}
const { $router: router } = useNuxtApp();
const emits = defineEmits(['close']);
withDefaults(
    defineProps<MenuInterface>(),
    {
        isMobile: false,
    },
);
const popoverOpenStates = ref<Record<number, boolean>>({});
const handleUpdateShow = (index: number, value: boolean) => {
    popoverOpenStates.value[index] = value;
};
const currentRoute = computed(() => router.currentRoute.value);
const isActive = (itemUrl: string | null | undefined) => {
    if (!itemUrl) {
        return false;
    }

    if (itemUrl.match(/^https?:\/\//)) {
        return false;
    }

    const itemPath = router.resolve(itemUrl).path;
    return currentRoute.value.path === itemPath;
};
</script>
<template>
    <div>
        <div class="flex flex-col gap-x-2 gap-y-2 lg:flex-row lg:items-center xl:gap-x-4">
            <template
                v-for="(item, index) in menu"
                :key="item.title"
            >
                <ClientOnly>
                    <NPopover
                        v-if="!isMobile && item.children"
                        placement="bottom"
                        trigger="click"
                        class="relative bg-transparent shadow-none"
                        :show-arrow="false"
                        style="--n-padding: 0"
                        @update:show="value => handleUpdateShow(index, value)"
                    >
                        <template #trigger>
                            <button
                                :data-active="popoverOpenStates[index] ? true : false"
                                class="flex items-center gap-x-1 rounded-md px-3 py-2 text-sm font-medium leading-6 ring-1 ring-transparent transition-all data-[active=true]:bg-gray-50 data-[active=false]:text-gray-500 data-[active=true]:ring-black/5 data-[active=false]:hover:bg-gray-50 data-[active=false]:hover:text-gray-900 data-[active=false]:hover:ring-black/5"
                            >
                                {{ item.title }}
                                <Icon
                                    name="tabler:chevron-down"
                                    class="size-4 text-gray-400 transition-transform"
                                    :class="popoverOpenStates[index] ? '-rotate-180' : ''"
                                ></Icon>
                            </button>
                        </template>


                        <div
                            class="w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5"
                        >
                            <NuxtLink
                                v-for="child in item.children"
                                :key="child.title"
                                :to="child.url"
                                :custom="item.url !== null"
                                class="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-900 hover:bg-gray-50"
                                @click="emits('close')"
                            >
                                {{ child.title }}
                            </NuxtLink>
                        </div>
                    </NPopover>
                </ClientOnly>
                <div
                    v-if="item.children"
                    class="grid grid-rows-[max-content_0fr] ring-1 ring-transparent transition-all data-[open=true]:grid-rows-[max-content_1fr]  lg:hidden"
                    :data-open="popoverOpenStates[index]"
                >
                    <button
                        class="flex items-center justify-between gap-x-1 rounded px-3 py-2 text-sm font-medium leading-6 text-gray-500 ring-1 ring-transparent hover:bg-gray-50 hover:text-gray-900 hover:ring-black/5"
                        @click="handleUpdateShow(index, !popoverOpenStates[index])"
                    >
                        {{ item.title }}
                        <Icon
                            name="tabler:chevron-down"
                            class="size-4 text-gray-400 transition-transform"
                            :class="popoverOpenStates[index] ? '-rotate-180' : ''"
                        ></Icon>
                    </button>
                    <div
                        class="overflow-hidden p-px"
                    >
                        <div
                            :data-active="popoverOpenStates[index] ? true : false"
                            class="data-[active=true]:text-brand-500 mt-2 rounded-md py-2 ring-1 ring-transparent transition-all data-[active=true]:shadow data-[active=true]:ring-black/5"
                        >
                            <NuxtLink
                                v-for="child in item.children"
                                :key="child.title"
                                :to="child.url"
                                :custom="item.url !== null"
                                :data-active="isActive(item.url)"
                                class="mx-2 block rounded px-3 py-2 text-sm font-medium leading-6 ring-1 ring-transparent data-[active=false]:text-gray-500 data-[active=true]:shadow data-[active=true]:ring-black/5 data-[active=false]:hover:bg-gray-50 data-[active=false]:hover:text-gray-900 data-[active=false]:hover:ring-black/5"
                                @click="emits('close')"
                            >
                                {{ child.title }}
                            </NuxtLink>
                        </div>
                    </div>
                </div>
                <NuxtLink
                    :to="getUrl(item.url, locale)"
                    :target="item.target"
                    :data-active="isActive(item.url)"
                    class="data-[active=true]:text-brand-500 block rounded-md px-3 py-2 text-sm font-medium leading-6 ring-1 ring-transparent transition-all data-[active=false]:text-gray-500 data-[active=true]:shadow data-[active=true]:ring-black/5 data-[active=false]:hover:bg-gray-50 data-[active=false]:hover:text-gray-900 data-[active=false]:hover:ring-black/5"
                    @click="emits('close')"
                >
                    {{ item.title }}
                </NuxtLink>
            </template>
        </div>
        <div
            v-if="locales.length !== 1"
            class="mt-4 border-t pt-4 lg:mt-0 lg:border-0 lg:pt-0"
        >
            <HeaderLanguageSwitch></HeaderLanguageSwitch>
        </div>
    </div>
</template>
