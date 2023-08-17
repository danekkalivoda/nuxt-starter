<script lang="ts" setup>
import Multiselect, { MultiselectInterface } from "~/recruitis-shared/components/forms/multiSelect.vue";
const emit = defineEmits(["update:initialValue"]);
const props = withDefaults(defineProps<MultiselectInterface>(), {});
</script>
<template>
    <Multiselect v-bind="props" @update:initial-value="(value) => emit('update:initialValue', value)" />
</template>
