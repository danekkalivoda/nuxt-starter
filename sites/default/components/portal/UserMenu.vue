<script setup lang="ts">
import Menubar from 'primevue/menubar'
import { computed } from 'vue'
import { useRequestHeaders } from '#app'

const { $router: router } = useNuxtApp()
const headers = useRequestHeaders(['cookie']) as HeadersInit
const currentRoute = computed(() => router.currentRoute.value)

const { signOut, data } = useAuth()
const { data: filters } = await useAsyncData(
    'jobs-list',
    () => {
        const params = { ...router.currentRoute.value.query }

        params.filtersTab = 'candidates'

        return $fetch(
            '/api/job/list',
            {
                params,
                headers,
            },
        )
    },
)

const itemsLeft = computed(() => [
    {
        label: 'Dashboard',
        icon: 'tabler:home',
        active: currentRoute.value.path === '/portal/dashboard',
        command: () => {
            router.push('/portal/dashboard')
        },
    },
    {
        label: 'Moje doporučení',
        badge: filters.value.meta.entries_total,
        icon: 'tabler:users',
        active: currentRoute.value.path === '/portal/candidates',
        command: () => {
            router.push('/portal/candidates')
        },
    },
    {
        label: 'Referral shop',
        icon: 'tabler:shopping-cart',
        active: currentRoute.value.path === '/portal/referral',
        command: () => {
            router.push('/portal/referral')
        },
    },
])
const itemsRight = computed(() => [
    {
        label: 'Můj účet',
        subText: data.value?.user?.credits?.toLocaleString('cs-CZ') + ' Kreditů',
        icon: 'tabler:user',
        active: currentRoute.value.path === '/portal/referral/account',
        command: () => {
            router.push('/portal/referral/account')
        },
    },
    {
        label: 'Odhlásit',
        subText: data.value?.user?.name + ' ' + data.value?.user?.surname,
        icon: 'tabler:logout',
        command: () => {
            signOut()
        },
    },
])
</script>

<template>
    <div class="flex w-full">
        <Menubar
            :pt="{
                root: {
                    class: 'text-gray-400 p-0 flex',
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
            :model="itemsLeft"
        >
            <template #item="{ item }">
                <div
                    class="m-2 grid grid-cols-[max-content_1fr] items-center gap-2 rounded py-1.5 pl-3 pr-4 text-sm font-medium"
                    :class="[item.active ? 'text-white bg-gray-700 group-hover:bg-gray-700' : 'group-hover:bg-gray-800 group-hover:text-white'].join(' ')"
                >
                    <Icon
                        :name="item.icon"
                        class=" text-brand-500 size-4"
                    ></Icon>
                    <div class="inline-flex gap-2">
                        <div class="whitespace-nowrap">
                            {{ item.label }}
                        </div>
                        <Badge
                            v-if="item.badge"
                            :theme="item.active ? 'dark-brand' : 'dark-brand'"
                            size="xsmall"
                        >
                            {{ item.badge }}
                        </Badge>
                    </div>
                </div>
            </template>
        </Menubar>
        <Menubar
            :pt="{
                root: {
                    class: 'text-gray-400 p-0 flex ml-auto',
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
            :model="itemsRight"
        >
            <template #item="{ item }">
                <div
                    class="m-2 grid grid-cols-[max-content_1fr] items-center gap-2 rounded py-1.5 pl-3 pr-4 text-sm font-medium group-hover:bg-gray-800 group-hover:text-white"
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
</template>
