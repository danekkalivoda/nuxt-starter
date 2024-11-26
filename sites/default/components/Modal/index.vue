<script setup lang="ts">
import { NModal } from 'naive-ui';
import { ref, watch } from 'vue';

const showModal = defineModel<boolean>('show', { default: false });
const showContent = ref(false);

watch(showModal, (newValue) => {
    if (newValue) {
        // Počkáme na další tick před zobrazením obsahu
        nextTick(() => {
            showContent.value = true;
        });
    } else {
        showContent.value = false;
    }
});
</script>

<template>
    <ClientOnly>
        <n-modal
            v-model:show="showModal"
            :block-scroll="true"
        >
            <slot>
                <slot name="content"></slot>
            </slot>
        </n-modal>
    </ClientOnly>
</template>
