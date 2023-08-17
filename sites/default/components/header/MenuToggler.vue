<script lang="ts" setup>
const emit = defineEmits(["onMenuToggle"]);
</script>
<template>
    <div class="flex lg:hidden">
        <button
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="emit('onMenuToggle', true)"
        >
            <span class="sr-only">Open main menu</span>
            toggle
        </button>
    </div>
</template>
