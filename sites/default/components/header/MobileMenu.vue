<script lang="ts" setup>
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

const { locales } = useI18n()
interface MenulinkInterface {
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
export interface MobileMenuInterface {
    menu: MenulinkInterface[]
    isOpen?: boolean
}
const emit = defineEmits(['on-menu-toggle'])
withDefaults(
    defineProps<MobileMenuInterface>(),
    {
        isOpen: false,
    },
)
</script>

<template>
    <Dialog
        as="div"
        class="lg:hidden"
        :open="isOpen"
        @close="emit('on-menu-toggle', false)"
    >
        <div class="fixed inset-0 z-10"/>
        <DialogPanel
            class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        >
            <div class="flex items-center justify-between">
                <HeaderLogo/>
                <button
                    type="button"
                    class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    @click="emit('on-menu-toggle', false)"
                >
                    <Icon
                        name="ion:close"
                        class="size-4 text-gray-400 transition-transform"
                    />
                </button>
            </div>
            <div class="mt-6 flow-root">
                <div class="-my-6 divide-y divide-gray-500/10">
                    <div class="space-y-2 py-6">
                        <template
                            v-for="item in menu"
                            :key="item.title"
                        >
                            <Disclosure
                                v-if="item.children"
                                v-slot="{ open }"
                                as="div"
                                class="-mx-3"
                            >
                                <DisclosureButton
                                    class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Product
                                    <Icon
                                        name="ion:chevron-down"
                                        class="size-4 text-gray-400"
                                        :class="open ? 'rotate-180' : ''"
                                    />
                                </DisclosureButton>
                                <DisclosurePanel class="mt-2 space-y-2">
                                    <NuxtLink
                                        v-for="child in item.children"
                                        :key="child.title"
                                        :href="child.url"
                                        class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {{ child.title }}
                                    </NuxtLink>
                                </DisclosurePanel>
                            </Disclosure>
                            <NuxtLink
                                v-else
                                :href="item.url"
                                :target="item.target"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                {{ item.title }}
                            </NuxtLink>
                        </template>
                    </div>
                    <div
                        v-if="locales.length !== 1"
                        class="py-6"
                    >
                        <HeaderLanguageSwitch/>
                    </div>
                </div>
            </div>
        </DialogPanel>
    </Dialog>
</template>
