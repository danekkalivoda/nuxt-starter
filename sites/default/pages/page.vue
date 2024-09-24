<!-- eslint-disable vue/no-v-html -->
<script setup lang="ts">
import {
    type IHeroBlock,
    type IJobsListBlock,
    type ITextBlock,
    type IPage,
    type IStrapiBlockUnion,
    type ITilesBlock,
    IStrapiBlockName,
} from '~/sites/default/types/pages'

const props = defineProps<IPage>()
console.warn(props)

function isBlockOfType<T extends IStrapiBlockUnion>(block: IStrapiBlockUnion, type: IStrapiBlockName): block is T {
    return block.__component === type
}
</script>

<template>
    <slot></slot>
    <BlocksBase
        v-for="block in props.blocks"
        v-bind="block?.baseSettings"
        :id="'block___' + block.id"
        :key="block.id"
        :type="block.__component"
    >
        <LazyBlocksJobsList
            v-if="isBlockOfType<IJobsListBlock>(block, IStrapiBlockName.jobsList)"
            v-bind="block"
        ></LazyBlocksJobsList>
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
