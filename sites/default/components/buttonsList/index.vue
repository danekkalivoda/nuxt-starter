<script setup lang="ts">
import type { IButtonsList } from './types';
import Button from '~/sites/default/components/Button.vue';
const props = defineProps<IButtonsList>();

const scrollToAnchor = (anchor: string) => {
    const element = document.querySelector(anchor);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

const buttonsWithComponent = computed(() => {
    return props.buttons.map((button) => {
        if (button.action.startsWith('#')) {
            return {
                ...button,
                isNuxtLink: false,
                component: Button,
                onClick: () => scrollToAnchor(button.action),
                props: {},
            };
        } else if (button.action.startsWith('/')) {
            return {
                ...button,
                isNuxtLink: true,
                component: defineNuxtLink({}),
                onClick: () => {},
                props: { to: button.action },
            };
        } else {
            return {
                ...button,
                isNuxtLink: false,
                component: Button,
                onClick: () => {},
                props: { href: button.action, target: '_blank', rel: 'noopener noreferrer' },
            };
        }
    });
});
</script>
<template>
    <component
        :is="button.component"
        v-for="button in buttonsWithComponent"
        :key="button.id"
        v-bind="button.props"
        :theme="button.theme"
        @click="button.onClick"
    >
        <Button v-if="button.isNuxtLink">
            {{ button.text }}
        </Button>
        <template v-else>
            {{ button.text }}
        </template>
    </component>
</template>
