<script setup lang="ts">
import type { ICheckboxes } from '~/sites/default/components/blocks/list/types';

const props = defineProps<ICheckboxes>();

const emit = defineEmits<{
    (e: 'update:initialValue', value: string[]): void
}>();

const selectedValues = computed({
    get: () => (Array.isArray(props.initialValue) ? props.initialValue : []),
    set: (value: string[]) => {
        emit(
            'update:initialValue',
            value,
        );
    },
});
</script>

<template>
    <div class="flex min-h-10 flex-wrap gap-4 self-end">
        <div
            v-for="option in props.options"
            :key="option.value"
            class="flex flex-nowrap items-center gap-2"
        >
            <input
                :id="option.value"
                v-model="selectedValues"
                type="checkbox"
                :name="`${props.name}[]`"
                :value="option.value"
                class="form-checkbox text-brand-500 focus:ring-brand-500 size-5 cursor-pointer rounded-md border-gray-300"
            >
            <label
                :for="option.value"
                class="cursor-pointer"
            >{{ option.label }}</label>
        </div>
    </div>
</template>
