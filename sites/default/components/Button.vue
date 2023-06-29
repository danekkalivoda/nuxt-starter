<script lang="ts" setup>
import Button, { ButtonInterface } from "~/recruitis-shared/components/forms/button.vue";
export type NButtonInterface = ButtonInterface;
const props = withDefaults(defineProps<NButtonInterface>(), {});
const customStyles = computed(() => {
    if (props.theme === "primary") {
        return "";
    }
    return "";
});
</script>
<template>
    <Button v-bind="props" :class="customStyles"><slot /></Button>
</template>
