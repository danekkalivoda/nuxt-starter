<script setup lang="ts">
import type {
    IPage,
} from '~/sites/default/types/pages'

const props = defineProps<IPage>()
</script>

<template>
    <slot></slot>
    <Blocks :blocks="props.blocks"></Blocks>
</template>
