<script lang="ts" setup>
import Input from "~/recruitis-shared/components/forms/input.vue";
import type { InputInterface } from "~/recruitis-shared/components/forms/input.vue";
const props = withDefaults(defineProps<InputInterface>(), {});
</script>
<template>
    <Input v-bind="props" />
</template>
