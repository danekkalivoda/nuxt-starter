<script setup lang="ts">
import Menubar from 'primevue/menubar';
import { NDrawer, NDrawerContent } from 'naive-ui';
import { useRequestHeaders } from '#app';
import { useVisibilityObserver } from '~/recruitis-shared/composables/useVisibilityObserver';
const { $router: router } = useNuxtApp();
const headers = useRequestHeaders(['cookie']) as HeadersInit;
const currentRoute = computed(() => router.currentRoute.value);
const emits = defineEmits(['close']);
const { signOut, data } = useAuth();
const { data: filters } = await useAsyncData(
    'jobs-list',
    () => {
        const params = { ...router.currentRoute.value.query };

        params.listFiltersTab = 'candidates';

        return $fetch(
            '/api/jobs',
            {
                params,
                headers,
            },
        );
    },
);
const isOpen = ref(false);
const sizeChecker = ref(null);
const { isVisible: isSmall } = useVisibilityObserver({
    refElement: sizeChecker,
    defaultVisibility: true,
    useIntersectionObserver: false,
});

const baseMenu = computed(() => [
    {
        label: 'Dashboard',
        icon: 'tabler:home',
        active: currentRoute.value.path === '/portal/dashboard',
        command: () => {
            isOpen.value = false;
            router.push('/portal/dashboard');
            emits('close');
        },
    },
    {
        label: 'Moje doporučení',
        badge: filters.value.meta.entries_total,
        icon: 'tabler:users',
        active: currentRoute.value.path === '/portal/candidates',
        command: () => {
            isOpen.value = false;
            router.push('/portal/candidates');
            emits('close');
        },
    },
    {
        label: 'Referral shop',
        icon: 'tabler:shopping-cart',
        active: currentRoute.value.path === '/portal/referral',
        command: () => {
            isOpen.value = false;
            router.push('/portal/referral');
            emits('close');
        },
    },
]);
const myAccountMenu = computed(() => [
    {
        label: 'Můj účet',
        subText: data.value?.user?.credits?.toLocaleString('cs-CZ') + ' Kreditů',
        icon: 'tabler:user',
        active: currentRoute.value.path === '/portal/referral/account',
        command: () => {
            isOpen.value = false;
            router.push('/portal/referral/account');
            emits('close');
        },
    },
]);
const logout = computed(() => [
    {
        label: 'Odhlásit',
        subText: data.value?.user?.name + ' ' + data.value?.user?.surname,
        icon: 'tabler:logout',
        command: () => {
            isOpen.value = false;
            emits('close');
            signOut();
        },
    },
]);
const onMenuToggle = () => {
    nextTick(() => {
        isOpen.value = !isOpen.value;
    });
};
</script>

<template>
    <div class="relative bg-gray-900">
        <div
            aria-hidden="true"
            class="absolute left-0 top-full block size-2 bg-gray-900 [mask:radial-gradient(circle_at_bottom_right,_transparent_8px,_var(--tw-gray-900)_9px)]"
        ></div>
        <div
            class="@container/userMenu flex"
        >
            <div
                ref="sizeChecker"
                class="@5xl/userMenu:hidden block"
            ></div>

            <component
                :is="isSmall ? NDrawer : 'div'"
                :show="isOpen"
                placement="left"
                width="auto"
                :show-mask="false"
                class="@5xl/userMenu:w-auto @5xl/userMenu:inline-flex"
            >
                <component
                    :is="isSmall ? NDrawerContent : 'div'"
                    :native-scrollbar="false"
                    :scrollbar-props="{
                        trigger: 'hover'
                    }"
                >
                    <div
                        class="fixed inset-0 z-0 transition-all lg:hidden"
                        @click="isOpen = false"
                    >
                    </div>
                    <Menubar
                        :unstyled="true"
                        :pt="{
                            root: {
                                class: 'p-4 lg:p-0 grow shrink-0 w-full max-w-72 text-gray-400 p-0 flex relative z-10 bg-gray-900',
                            },
                            button: {
                                class: 'hidden',
                            },
                            rootList: {
                                class: 'p-0 flex flex-col w-full @5xl/userMenu:flex-row @5xl/userMenu:items-stretch',
                            },
                            item: {
                                class: 'flex w-full @5xl/userMenu:w-auto self-stretch',
                            },
                            itemContent: {
                                class: 'cursor-pointer group self-stretch flex w-full grow @5xl/userMenu:grow-0 items-stretch',
                            },
                        }"
                        :model="isSmall ? [ ...baseMenu, ...myAccountMenu, ...logout] : baseMenu"
                    >
                        <template #item="{ item }">
                            <div
                                class="@5xl/userMenu:m-1 @5xl/userMenu:py-1 @5xl/userMenu:w-auto grid min-h-12 w-full  grid-cols-[max-content_1fr] items-center gap-2 rounded py-2 pl-4 pr-5 text-sm font-medium"
                                :class="[item.active ? 'text-white bg-gray-700 group-hover:bg-gray-700' : 'group-hover:bg-gray-800 group-hover:text-white'].join(' ')"
                            >
                                <Icon
                                    :name="item.icon"
                                    class=" text-brand-500 size-4"
                                ></Icon>
                                <div class="inline-flex gap-2">
                                    <div :class="item.label && item.subText ? 'leading-4' : ''">
                                        <div
                                            v-if="item.label"
                                            class="whitespace-nowrap"
                                            :class="item.label && item.subText ? 'text-xs' : ''"
                                        >
                                            {{ item.label }}
                                        </div>
                                        <div
                                            v-if="item.subText"
                                            class="text-white"
                                        >
                                            {{ item.subText }}
                                        </div>
                                    </div>
                                    <Badge
                                        v-if="item.badge"
                                        :theme="item.active ? 'dark-brand' : 'dark-brand'"
                                        class="ml-auto"
                                        size="xsmall"
                                    >
                                        {{ item.badge }}
                                    </Badge>
                                </div>
                            </div>
                        </template>
                    </Menubar>
                </component>
            </component>
            <div class="@5xl/userMenu:w-auto @5xl/userMenu:inline-flex ml-auto flex w-full">
                <Button
                    class="@5xl/userMenu:hidden ml-3 block size-10 self-center rounded-md p-0 text-white hover:bg-gray-800 focus:outline-none focus:ring-0"
                    theme="custom"
                    @click="onMenuToggle()"
                >
                    <Icon
                        :name="isOpen ? 'tabler:x' : 'tabler:menu-2'"
                        class="size-5"
                    ></Icon>
                </Button>
                <Menubar
                    :unstyled="true"
                    :pt="{
                        root: {
                            class: 'text-gray-400 p-0 flex shrik-0 grow-0 ml-auto',
                        },
                        button: {
                            class: 'hidden',
                        },
                        rootList: {
                            class: 'p-0 flex items-stretch',
                        },
                        item: {
                            class: 'flex self-stretch',
                        },
                        itemContent: {
                            class: 'cursor-pointer group self-stretch flex items-stretch',
                        },
                    }"
                    :model="isSmall ? logout : [...myAccountMenu, ...logout]"
                >
                    <template #item="{ item }">
                        <div
                            class="m-1 grid min-h-12 grid-cols-[max-content_1fr] items-center gap-2 rounded py-1 pl-3 pr-4 text-sm font-medium group-hover:bg-gray-800 group-hover:text-white"
                            :class="[item.active ? 'text-white bg-gray-700 group-hover:bg-gray-700' : ''].join(' ')"
                        >
                            <Icon
                                :name="item.icon"
                                class="text-brand-500 size-4"
                            ></Icon>
                            <div class="leading-4">
                                <div class="whitespace-nowrap text-xs">
                                    {{ item.label }}
                                </div>
                                <div class="text-white">
                                    {{ item.subText }}
                                </div>
                            </div>
                        </div>
                    </template>
                </Menubar>
            </div>
        </div>
        <div
            aria-hidden="true"
            class="absolute right-0 top-full block size-2 bg-gray-900 [mask:radial-gradient(circle_at_bottom_left,_transparent_8px,_var(--tw-gray-900)_9px)]"
        ></div>
    </div>
</template>
