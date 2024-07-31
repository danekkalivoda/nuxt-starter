<script lang="ts" setup>
import Input, { InputInterface } from "~/recruitis-shared/components/forms/input.vue";
const props = withDefaults(defineProps<InputInterface>(), {});
</script>
<template>
    <Input v-bind="props" />
</template>
<style lang="pcss">
.n-input {
    @apply !rounded-full;
}
</style>
