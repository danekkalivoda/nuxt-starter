<script lang="ts" setup>
import Button from '~/recruitis-shared/components/forms/button.vue';
import type { ButtonInterface } from '~/recruitis-shared/components/forms/button.vue';
export type NButtonInterface = ButtonInterface;
const props = withDefaults(defineProps<NButtonInterface>(), {});
const customStyles = computed(() => {
    if (props.theme === 'primary') {
        return '!rounded-full border-none bg-gradient-to-r from-brand-700 via-brand-500 to-brand-200 hover:from-brand-500 hover:to-brand-500 focus:ring-gray-300 ring-offset-1 shadow-none';
    }
    return '';
});
</script>
<template>
    <Button
        v-bind="props"
        :class="customStyles"
        :show-default-slot="true"
    >
        <slot name="default"></slot>
    </Button>
</template>
