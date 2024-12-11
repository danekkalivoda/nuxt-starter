<script setup lang="ts">
import { NModal } from 'naive-ui';
import type { HTMLAttributes } from 'vue';

const props = withDefaults(
    defineProps<{
        class: HTMLAttributes['class']
    }>(), {
        class: '',
    },
);
const showModal = defineModel<boolean>('show', { default: false });

const closeModal = () => {
    showModal.value = false;
};

</script>

<template>
    <ClientOnly>
        <n-modal
            v-model:show="showModal"
            :block-scroll="true"
        >
            <div
                class="w-full p-4 shadow-none"
                @click="closeModal"
            >
                <div
                    :class="cn('mx-auto max-w-2xl rounded-lg bg-white p-6 ring-1 ring-black/5 lg:p-8', props.class)"
                    @click.stop
                >
                    <slot>
                        <slot name="content"></slot>
                    </slot>
                </div>
            </div>
        </n-modal>
    </ClientOnly>
</template>
