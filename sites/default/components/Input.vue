<script lang="ts" setup>
import Input from '~/recruitis-shared/components/forms/input.vue';
import type { InputInterface } from '~/recruitis-shared/components/forms/input.vue';
export type { InputInterface };
const props = withDefaults(defineProps<InputInterface>(), {});
const emit = defineEmits(['update:initialValue']);
</script>
<template>
    <Input
        v-bind="props"
        :controlled="true"
        @update:initial-value="(value) => emit('update:initialValue', value)"
    ></Input>
</template>
