<script setup lang="ts">
import { type IHeroBlock, type IJobsListBlock, type IPage, type IStrapiBlockUnion, IStrapiBlockName } from '~/sites/default/types/pages'

const props = defineProps<IPage>()

function isBlockOfType<T extends IStrapiBlockUnion>(block: IStrapiBlockUnion, type: IStrapiBlockName): block is T {
    return block.__component === type
}
</script>

<template>
    <BlocksBase
        v-if="!props.hideTitle || !props.hideDescription"
    >
        <div class="container">
            <div class="prose prose-sm lg:prose mx-auto text-center">
                <h1 :class="props.hideTitle ? 'visually-hidden' : ''">
                    {{ props.title }}
                </h1>
                <p v-if="!props.hideDescription && props?.description">
                    {{ props.description }}
                </p>
            </div>
        </div>
    </BlocksBase>
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
    </BlocksBase>
</template>
