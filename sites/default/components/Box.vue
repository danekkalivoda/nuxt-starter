<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/utils/client'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
    <div
        :class="cn('rounded-md bg-white p-6 shadow-lg ring-1 ring-black/5 lg:p-8', props.class)"
    >
        <slot/>
    </div>
</template>
