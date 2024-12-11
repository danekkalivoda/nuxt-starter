<script lang="ts" setup>
import Badge from '~/recruitis-shared/components/badge.vue'
import type { BadgeInterface } from '~/recruitis-shared/components/badge.vue'

const props = withDefaults(
    defineProps<BadgeInterface>(),
    {
        outlined: true,
    },
)
</script>

<template>
    <Badge
        v-bind="props"
    >
        <slot/>
    </Badge>
</template>
