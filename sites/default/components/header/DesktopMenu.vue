<script lang="ts" setup>
import { Popover, PopoverButton, PopoverGroup, PopoverPanel, provideUseId } from '@headlessui/vue'
import { getUrl } from '~/utils/client'

const { locale } = useI18n()
provideUseId(() => useId())
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
}
withDefaults(
    defineProps<MenuInterface>(),
    {},
)
</script>

<template>
    <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <template
            v-for="item in menu"
            :key="item.title"
        >
            <Popover
                v-if="item.children"
                v-slot="{ open }"
                class="relative"
            >
                <PopoverButton
                    class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 focus:outline-none"
                >
                    {{ item.title }}
                    <Icon
                        name="ion:chevron-down"
                        class="size-4 text-gray-400 transition-transform"
                        :class="open ? '-rotate-180' : ''"
                    ></Icon>
                </PopoverButton>

                <transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0 translate-y-1"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 translate-y-1"
                >
                    <PopoverPanel
                        class="absolute -left-5 top-full z-10 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5"
                    >
                        <NuxtLink
                            v-for="child in item.children"
                            :key="child.title"
                            :to="child.url"
                            :custom="item.url !== null"
                            class="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-900 hover:bg-gray-50"
                        >
                            {{ child.title }}
                        </NuxtLink>
                    </PopoverPanel>
                </transition>
            </Popover>
            <NuxtLink
                :to="getUrl(item.url, locale)"
                :target="item.target"
                class="text-sm font-semibold leading-6 text-gray-900"
            >
                {{ item.title }}
            </NuxtLink>
        </template>
    </PopoverGroup>
</template>
