<script setup lang="ts">
import type { ITilesBlock } from '~/sites/default/types/pages'

const props = defineProps<ITilesBlock>()
</script>

<template>
    <div class="@container/tiles container">
        <Box class="overflow-hidden p-0 lg:p-0">
            <div class="@lg/tiles:grid-cols-[repeat(auto-fit,minmax(290px,1fr))] -mb-px -mr-px grid border-black/10">
                <BlocksTilesTile
                    v-for="(tile) in props.tiles"
                    :key="tile.id"
                    :tile="tile"
                    class="@lg/tiles:p-8 p-6"
                    :base-settings="props.baseSettings"
                >
                </BlocksTilesTile>
            </div>
        </Box>
    </div>
</template>
