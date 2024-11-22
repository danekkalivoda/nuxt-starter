<script setup lang="ts">
import type { FileInteface } from '@ui/components/forms/file.vue'
import { toRaw } from 'vue'

export interface FileListInterface {
    files: FileInteface[]
}
const emit = defineEmits([
    'onFile',
    'onAction',
])
const props = withDefaults(
    defineProps<FileListInterface>(),
    {},
)
const onDelete = (file: FileInteface) => {
    emit(
        'onAction',
        {
            name: 'delete',
            file: { ...toRaw(file) },
        },
    )
}
</script>

<template>
    <div
        v-if="files.length > 0"
        class="@container/filesList mt-2 flex w-full min-w-0 flex-col"
    >
        <div
            class="@md/filesList:grid-cols-2 @2xl/filesList:grid-cols-3 @5xl/filesList:grid-cols-4 @7xl/filesList:grid-cols-5 grid grid-cols-1 gap-x-4 gap-y-2"
        >
            <div
                v-for="(file, fileIndex) in props.files"
                :key="fileIndex"
                class="flex flex-nowrap items-stretch rounded bg-gray-100 transition-colors duration-150"
            >
                <div
                    class="flex min-w-0 grow flex-nowrap items-center gap-2 rounded-l p-2"
                >
                    <Icon
                        name="tabler:file"
                        class="shrink-0"
                    ></Icon>
                    <div class="min-w-0 grow truncate text-left">
                        {{ file.name }}
                    </div>
                </div>
                <button
                    type="button"
                    class="pointer-events-auto relative flex items-center justify-center rounded-r border-l border-black/5 px-2.5 text-gray-400 hover:bg-gray-200 hover:text-gray-700"
                    @click="onDelete(file)"
                >
                    <Icon
                        name="tabler:x"
                        class="shrink-0"
                    ></Icon>
                </button>
            </div>
        </div>
    </div>
</template>
