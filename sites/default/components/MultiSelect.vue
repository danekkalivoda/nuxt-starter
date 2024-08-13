<script lang="ts" setup>
import Multiselect from '~/recruitis-shared/components/forms/multiSelect.vue';
import type { MultiselectInterface } from '~/recruitis-shared/components/forms/multiSelect.vue';
export type { MultiselectInterface };
const emit = defineEmits(['update:initialValue']);
const props = withDefaults(defineProps<MultiselectInterface>(), {});
</script>
<template>
    <Multiselect
        v-bind="props"
        @update:initial-value="(value) => emit('update:initialValue', value)"
    >
        <template #tag="{ option, handleTagRemove, disabled }">
            <slot
                name="tag"
                :option="option"
                :handle-tag-remove="handleTagRemove"
                :disabled="disabled"
            ></slot>
        </template>
        <template #multiplelabel="{ values}">
            <slot
                name="multiplelabel"
                :values="values"
            ></slot>
        </template>
    </Multiselect>
</template>
