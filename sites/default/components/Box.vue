<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/utils/client'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
    <div
        :class="cn('rounded bg-white p-6 shadow-lg ring-1 ring-black/5 lg:p-8', props.class)"
    >
        <slot></slot>
    </div>
</template>
