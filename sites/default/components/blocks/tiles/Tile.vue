<script setup lang="ts">
import { computed } from 'vue'
import { proseClasses } from '../text/styles'
import type { ITile, IStrapiBlockSettings } from '~/sites/default/types/pages'
import { formatIconName } from '~/utils/client'

const props = defineProps<{ tile: ITile
    baseSettings: IStrapiBlockSettings }>()

const combinedContent = computed(() => {
    const header = props.tile.header ? `<h2>${props.tile.header}</h2>` : ''
    const text = props.tile.text ? props.tile.text : ''
    return `${header}${text}`
})

const iconName = computed(() => {
    return props.tile?.icon ? formatIconName(props.tile.icon) : null
})
</script>

<template>
    <div class="border-b border-r border-black/10 bg-white">
        <Icon
            v-if="iconName"
            :name="iconName"
            class="text-brand-500 @lg/tiles:size-12 mb-3 size-8 lg:mb-4"
        ></Icon>
        <div
            :class="proseClasses({ dark: (props.baseSettings.background === 'Dark' || props.baseSettings.background === 'Brand') })"
            v-html="combinedContent"
        >
        </div>
    </div>
</template>
