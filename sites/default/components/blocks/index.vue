<script setup lang="ts">
import {
    type IHeroBlock,
    type IJobsListBlock,
    type ITextBlock,
    type IStrapiBlockUnion,
    type ITilesBlock,
    IStrapiBlockName,
} from '~/sites/default/types/pages'

const props = defineProps<{ blocks: IStrapiBlockUnion[] }>()

function isBlockOfType<T extends IStrapiBlockUnion>(
    block: IStrapiBlockUnion,
    type: IStrapiBlockName,
):
  block is T {
    return block.__component === type
}
</script>

<template>
    <BlocksBase
        v-for="block in props.blocks"
        v-bind="block?.baseSettings"
        :id="'block___' + block.id"
        :key="block.id"
        :type="block.__component"
    >
        <!-- Tento blok může být i LazyBlocksJosList, ale z pohledu SSR to takto funguje lépe -->
        <BlocksJobsList
            v-if="isBlockOfType<IJobsListBlock>(block, IStrapiBlockName.jobsList)"
            v-bind="block"
        ></BlocksJobsList>
        <LazyBlocksHeroImage
            v-if="isBlockOfType<IHeroBlock>(block, IStrapiBlockName.hero)"
            v-bind="block"
        ></LazyBlocksHeroImage>
        <LazyBlocksTextProse
            v-if="isBlockOfType<ITextBlock>(block, IStrapiBlockName.text)"
            v-bind="block"
        >
        </LazyBlocksTextProse>
        <LazyBlocksTilesList
            v-if="isBlockOfType<ITilesBlock>(block, IStrapiBlockName.tiles)"
            v-bind="block"
        >
        </LazyBlocksTilesList>
    </BlocksBase>
</template>
