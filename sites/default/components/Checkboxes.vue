<script setup lang="ts">
import type { ICheckboxes } from '~/sites/default/components/blocks/jobsList/types';
const props = defineProps<ICheckboxes>();

const emit = defineEmits<{
    (e: 'update:initialValue', value: string[]): void;
}>();

const selectedValues = computed({
    get: () => (Array.isArray(props.initialValue) ? props.initialValue : []),
    set: (value: string[]) => {
        emit('update:initialValue', value);
    },
});
</script>
<template>
  <div class="flex flex-wrap gap-4 self-end min-h-10">
    <div
      v-for="option in props.options"
      :key="option.value"
      class="flex items-center flex-nowrap gap-2"
    >
      <input
        :id="option.value"
        v-model="selectedValues"
        type="checkbox"
        :name="`${props.name}[]`"
        :value="option.value"
        class="form-checkbox cursor-pointer rounded-md text-brand-500 border-gray-300 focus:ring-brand-500 w-5 h-5"
      >
      <label
        :for="option.value"
        class="cursor-pointer"
      >{{ option.label }}</label>
    </div>
  </div>
</template>
