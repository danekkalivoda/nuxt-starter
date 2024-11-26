<script lang="ts" setup>
const emit = defineEmits(['onMenuToggle']);
const props = defineProps<{ isOpen: boolean }>();
const open = () => {
    emit('onMenuToggle', !props.isOpen);
};
</script>

<template>
    <div class="ml-auto flex lg:hidden">
        <button
            type="button"
            class="-my-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 focus:outline-none"
            @click="() => open()"
        >
            <Icon
                :name="props.isOpen ? 'tabler:x' : 'tabler:menu-2'"
                class="size-5 text-gray-900 transition-transform"
            ></Icon>
        </button>
    </div>
</template>
