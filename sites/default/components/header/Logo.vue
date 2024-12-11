<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import Logo from '~/recruitis-shared/components/logo.vue';
import { cn } from '~/utils/client';

const localePath = useLocalePath();
const props = withDefaults(
    defineProps<{ theme?: 'dark' | 'light'
        class?: HTMLAttributes['class'] }>(),
    {
        theme: 'light',
        class: '',
    },
);
</script>

<template>
    <NuxtLink
        :to="localePath('/')"
        :class="cn('grid h-8 w-24 lg:h-12 lg:w-32', props.class)"
    >
        <slot>
            <Logo
                :theme="props.theme"
                class="grid size-full [&>*]:size-full"
            ></Logo>
        </slot>
    </NuxtLink>
</template>
