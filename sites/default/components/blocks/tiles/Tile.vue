<script setup lang="ts">
import { computed } from 'vue';
import { tv } from 'tailwind-variants';
import { proseClasses } from '../text/styles';
import type { ITile, ITileTheme, IStrapiBlockSettings } from '~/sites/default/types/pages';
import { formatIconName } from '~/utils/client';

const props = defineProps<{
    tile: ITile
    baseSettings: IStrapiBlockSettings
    theme: ITileTheme
}>();

const combinedContent = computed(() => {
    const header = props.tile.header ? `<h2>${props.tile.header}</h2>` : '';
    const text = props.tile.text ? props.tile.text : '';
    return `${header}${text}`;
});

const iconName = computed(() => {
    return props.tile?.icon ? formatIconName(props.tile.icon) : null;
});
const linkTarget = computed(() => {
    return props.tile.linkUrl.startsWith('/') ? '' : '_blank';
});
const tileWrapper = tv({
    base: '',
    variants: {
        theme: {
            'Theme 1': 'border-b border-r border-black/10',
            'Theme 2': 'rounded border border-black/10 bg-white',
            'Theme 3': '',
        },
    },
});
</script>

<template>
    <div
        :class="tileWrapper({ theme: props.theme })"
    >
        <Icon
            v-if="iconName"
            :name="iconName"
            class="text-brand-500 @lg/tiles:size-12 mb-3 size-8 lg:mb-4"
        ></Icon>
        <div
            :class="proseClasses({ dark: (props.baseSettings.background === 'Dark' || props.baseSettings.background === 'Brand') })"
            v-html="combinedContent"
        ></div>
        <NuxtLink
            v-if="props.tile.linkUrl"
            :to="props.tile.linkUrl"
            :target="linkTarget"
            class="mt-3 inline-block lg:mt-4"
        >
            <Button tag="div">
                {{ props.tile.linkText }}
            </Button>
        </NuxtLink>
    </div>
</template>
