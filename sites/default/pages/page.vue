<script setup lang="ts">
import type { IPage, IStrapiBlock } from '~/sites/default/types/pages'
import { IStrapiBlockName } from '~/sites/default/types/pages'

const props = defineProps<IPage>()

const getComponent = (block: IStrapiBlock) => {
    switch (block.__component) {
        case IStrapiBlockName.JobsList:
            return defineAsyncComponent(() => import('~/sites/default/components/blocks/jobsList/List.vue'))
        default:
            return null
    }
}
</script>

<template>
    <div class="container">
        <div class="prose max-w-none">
            <h1 class="visually-hidden">
                {{ props.title }}
            </h1>
            <p v-if="props?.description">
                {{ props.description }}
            </p>
        </div>
    </div>
    <template v-for="(block, index) in props.blocks">
        <component
            :is="getComponent(block)"
            v-if="getComponent(block)"
            v-bind="block"
            :key="index"
        ></component>
    </template>
</template>
