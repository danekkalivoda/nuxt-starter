<script setup lang="ts">
import {
    type IPage,
    type IHeaderBlock,
    type IJobHeaderBlock,
    type IHeroBlock,
    type IListBlock,
    type ITextBlock,
    type IStrapiBlockUnion,
    type ITilesBlock,
    IStrapiBlockName,
} from '~/sites/default/types/pages';

const props = defineProps<IPage>();
</script>

<template>
    <BlocksBase
        v-for="block in props.blocks"
        v-bind="block?.baseSettings"
        :id="'block___' + block.id"
        :key="block.id"
        :type="block.__component"
    >
        <BlocksHeader
            v-if="isBlockOfType<IJobHeaderBlock>(block, IStrapiBlockName.jobHeader)"
            v-bind="block"
        ></BlocksHeader>
        <BlocksHeader
            v-if="isBlockOfType<IHeaderBlock>(block, IStrapiBlockName.header)"
            v-bind="block"
        ></BlocksHeader>
        <!-- Tento blok může být i LazyBlocksJosList, ale z pohledu SSR to takto funguje lépe -->
        <BlocksList
            v-if="isBlockOfType<IListBlock>(block, IStrapiBlockName.jobsList)"
            v-bind="block"
        ></BlocksList>
        <LazyBlocksHeroImage
            v-if="isBlockOfType<IHeroBlock>(block, IStrapiBlockName.hero)"
            v-bind="block"
        ></LazyBlocksHeroImage>
        <LazyBlocksTextProse
            v-if="isBlockOfType<ITextBlock>(block, IStrapiBlockName.text)"
            v-bind="block"
        ></LazyBlocksTextProse>
        <LazyBlocksTilesList
            v-if="isBlockOfType<ITilesBlock>(block, IStrapiBlockName.tiles)"
            v-bind="block"
        ></LazyBlocksTilesList>
    </BlocksBase>
</template>
