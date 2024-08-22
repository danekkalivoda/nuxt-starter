<script lang="ts" setup>
import Button from '~/recruitis-shared/components/forms/button.vue'
import type { ButtonInterface } from '~/recruitis-shared/components/forms/button.vue'

export interface NButtonInterface extends ButtonInterface {
    showDefaultSlot?: boolean
}
const props = withDefaults(
    defineProps<NButtonInterface>(),
    {
        showDefaultSlot: true,
    },
)
const customStyles = computed(() => {
    if (props.theme === 'primary') {
        return '!font-semibold'
    }
    return '!font-semibold'
})
</script>

<template>
    <Button
        v-bind="props"
        :class="customStyles"
    >
        <slot></slot>
    </Button>
</template>
