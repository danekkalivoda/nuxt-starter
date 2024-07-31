<script lang="ts" setup>
import Select from "~/recruitis-shared/components/forms/select.vue";
import type { SelectInterface } from "~/recruitis-shared/components/forms/select.vue";
const emit = defineEmits(["update:initialValue"]);
const props = withDefaults(defineProps<SelectInterface>(), {});
</script>
<template>
    <Select v-bind="props" @update:initial-value="(value) => emit('update:initialValue', value)" />
</template>
