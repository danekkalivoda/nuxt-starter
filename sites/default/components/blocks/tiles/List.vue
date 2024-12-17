<script setup lang="ts">
import {
    type ITilesBlock,
} from '~/sites/default/types/pages';
import { tv } from 'tailwind-variants';
import Box from '~/sites/default/components/Box.vue';

const props = defineProps<ITilesBlock>();

const wrapperClasses = tv({
    base: ' grid',
    variants: {
        theme: {
            'Theme 1': '@lg/tiles:grid-cols-[repeat(auto-fit,minmax(290px,1fr))] -mb-px -mr-px border-black/10',
            'Theme 2': '@lg/tiles:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6',
            'Theme 3': '@lg/tiles:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6',
        },
    },
});
const boxClasses = tv({
    base: 'overflow-hidden p-0 lg:p-0',
    variants: {
        theme: {
            'Theme 1': '',
            'Theme 2': 'rounded-none bg-transparent shadow-none ring-0',
            'Theme 3': 'rounded-none bg-transparent shadow-none ring-0',
        },
    },
});
</script>

<template>
    <div class="@container/tiles container">
        <Box
            :class="boxClasses({ theme: props.theme })"
        >
            <div
                :class="wrapperClasses({ theme: props.theme })"
            >
                <BlocksTilesTile
                    v-for="(tile) in props.tiles"
                    :key="tile.id"
                    :tile="tile"
                    class="@lg/tiles:p-8 p-6"
                    :theme="props.theme"
                    :base-settings="props.baseSettings"
                ></BlocksTilesTile>
            </div>
        </Box>
    </div>
</template>
