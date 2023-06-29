<script lang="ts" setup>
import Button, { ButtonInterface } from "~/recruitis-shared/components/forms/button.vue";
export type NButtonInterface = ButtonInterface;
const props = withDefaults(defineProps<NButtonInterface>(), {});
const customStyles = computed(() => {
    if (props.theme === "primary") {
        return "!rounded-full border-none bg-gradient-to-r from-blue-700 via-blue-500 to-blue-200 hover:from-blue-500 hover:to-blue-500 focus:ring-gray-300 ring-offset-1 shadow-none";
    }
    return "";
});
</script>
<template>
    <Button v-bind="props" :class="customStyles"><slot /></Button>
</template>
