<script lang="ts" setup>
const emit = defineEmits(['onMenuToggle']);
</script>
<template>
    <div class="flex lg:hidden">
        <button
            type="button"
            class="-my-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="emit('onMenuToggle', true)"
        >
            <Icon
                name="ion:menu"
                class="h-6 w-6 text-gray-900 transition-transform"
            ></Icon>
        </button>
    </div>
</template>
