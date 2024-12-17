<script setup lang="ts">
import { getUrl } from '~/utils/client';

const ariaId = useId();
const { locales, locale } = useI18n();
export interface MenulinkInterface {
    title: string
    url: string
    target: string
    items: [
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
    isOpen?: boolean
}
const { $router: router } = useNuxtApp();
const emits = defineEmits(['close']);
const props = withDefaults(
    defineProps<MenuInterface>(),
    {
        isMobile: false,
    },
);
const popoverOpenStates = reactive<Record<number, boolean>>({});
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

const closeAllPopovers = () => {
    emits('close');
    for (const key of Object.keys(popoverOpenStates)) {
        popoverOpenStates[key] = false;
    }
};

</script>
<template>
    <div>
        <div class="flex items-center justify-between px-6 pt-4 lg:hidden lg:px-0">
            <HeaderLogo></HeaderLogo>
            <HeaderMenuToggler
                :is-open="props.isOpen"
                @on-menu-toggle="emits('close')"
            ></HeaderMenuToggler>
        </div>
        <div class="flex flex-col gap-x-2 gap-y-2 px-6 py-4 lg:flex-row lg:items-center lg:px-0 xl:gap-x-4">
            <template
                v-for="(item, index) in props.menu"
                :key="item.title"
            >
                <VDropdown
                    v-if="item.items"
                    :show="popoverOpenStates[index]"
                    :aria-id="ariaId"
                    placement="bottom-end"
                    :disabled="props.isMobile"
                    class="grid grid-rows-[max-content_0fr] ring-1 ring-transparent transition-all data-[open=true]:grid-rows-[max-content_1fr]"
                    :data-open="popoverOpenStates[index]"
                    @apply-hide="() => { popoverOpenStates[index] = false }"
                >
                    <button
                        class="flex items-center justify-between gap-x-1 rounded px-3 py-2 text-sm font-medium leading-6 text-gray-500 ring-1 ring-transparent hover:bg-gray-50 hover:text-gray-900 hover:ring-black/5"
                        @click="() => { popoverOpenStates[index] = !popoverOpenStates[index] }"
                    >
                        {{ item.title }}
                        <Icon
                            name="tabler:chevron-down"
                            class="size-4 text-gray-400 transition-transform"
                            :class="popoverOpenStates[index] ? '-rotate-180' : ''"
                        ></Icon>
                    </button>
                    <template #popper>
                        <div class="">
                            <div
                                :data-active="popoverOpenStates[index] ? true : false"
                                class="mt-2 min-w-56 rounded-lg bg-white py-2 shadow ring-1 ring-black/5"
                            >
                                <NuxtLink
                                    v-for="child in item.items"
                                    :key="child.title"
                                    v-close-popper
                                    :to="getUrl(child.url, locale)"
                                    :data-active="isActive(item.url)"
                                    class="mx-2 block rounded px-3 py-2 text-sm font-medium leading-6 ring-1 ring-transparent data-[active=false]:text-gray-500 data-[active=true]:shadow data-[active=true]:ring-black/5 data-[active=false]:hover:bg-gray-50 data-[active=false]:hover:text-gray-900 data-[active=false]:hover:ring-black/5"
                                    @click.stop="() => closeAllPopovers()"
                                >
                                    {{ child.title }}
                                </NuxtLink>
                            </div>
                        </div>
                    </template>
                    <div
                        class="overflow-hidden p-px lg:hidden"
                    >
                        <div
                            :data-active="popoverOpenStates[index] ? true : false"
                            class="data-[active=true]:text-brand-500 mt-2 rounded-md py-2 ring-1 ring-transparent transition-all data-[active=true]:shadow data-[active=true]:ring-black/5"
                        >
                            <NuxtLink
                                v-for="child in item.items"
                                :key="child.title"
                                :to="getUrl(child.url, locale)"
                                :data-active="isActive(item.url)"
                                class="mx-2 block rounded px-3 py-2 text-sm font-medium leading-6 ring-1 ring-transparent data-[active=false]:text-gray-500 data-[active=true]:shadow data-[active=true]:ring-black/5 data-[active=false]:hover:bg-gray-50 data-[active=false]:hover:text-gray-900 data-[active=false]:hover:ring-black/5"
                                @click="emits('close')"
                            >
                                {{ child.title }}
                            </NuxtLink>
                        </div>
                    </div>
                </VDropdown>
                <NuxtLink
                    v-else
                    :data-active="isActive(item.url)"
                    class="data-[active=true]:text-brand-500 block rounded-md px-3 py-2 text-sm font-medium leading-6 ring-1 ring-transparent transition-all data-[active=false]:text-gray-500 data-[active=true]:shadow data-[active=true]:ring-black/5 data-[active=false]:hover:bg-gray-50 data-[active=false]:hover:text-gray-900 data-[active=false]:hover:ring-black/5"
                    :to="getUrl(item.url, locale)"
                    :target="item.target"
                    @click="emits('close')"
                >
                    {{ item.title }}
                </NuxtLink>
            </template>
        </div>
        <div
            v-if="locales.length !== 1"
            class="px-6 pb-6 lg:px-0 lg:pb-0"
        >
            <HeaderLanguageSwitch></HeaderLanguageSwitch>
        </div>
    </div>
</template>
