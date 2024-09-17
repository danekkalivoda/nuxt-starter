<script setup lang="ts">
import Logo from '~/recruitis-shared/components/logo.vue'

const localePath = useLocalePath()
const props = withDefaults(
    defineProps<{ theme?: 'dark' | 'light' }>(),
    {
        theme: 'light',
    },
)
</script>

<template>
    <NuxtLink
        :to="localePath('/')"
        class="grid h-8 w-24 lg:h-12 lg:w-32"
    >
        <slot>
            <Logo
                :theme="props.theme"
                class="grid size-full [&>*]:size-full"
            ></Logo>
        </slot>
    </NuxtLink>
</template>
