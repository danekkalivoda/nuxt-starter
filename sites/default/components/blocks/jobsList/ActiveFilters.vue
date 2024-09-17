<script setup lang="ts">
import type { IFilterField, IActiveFilter } from '~/sites/default/components/blocks/jobsList/types'
import { remove, getLabel, findByKey, removeAll } from '~/sites/default/components/blocks/jobsList/lib/activeFilters'

const props = defineProps<{
    form: IFilterField[]
    active: IActiveFilter
}>()

const emits = defineEmits<{
    (e: 'update:formState', formState: IFilterField[]): void
    (e: 'update:activeFilters', activeFilters: IActiveFilter): void
    (e: 'clearFormState'): void
}>()

const formState = computed({
    get: () => props.form,
    set: (newFormState) => emits(
        'update:formState',
        newFormState,
    ),
})
const activeFilters = computed({
    get: () => props.active,
    set: (value) => emits(
        'update:activeFilters',
        value,
    ),
})
const getActiveFilterLabel = (key: string, value: string) => {
    return getLabel(
        key,
        value,
        formState,
    )
}
const removeActiveFilter = async (key: string, value: string) => {
    await remove(
        key,
        value,
        formState,
    )
    emits('clearFormState')
}
const findFieldByKey = (key: string) => {
    return findByKey(
        key,
        formState,
    )
}
const clearFormState = async () => {
    await removeAll(
        activeFilters,
        formState,
    )
    emits('clearFormState')
}
</script>

<template>
    <div

        class="flex flex-wrap items-center gap-4 border-t pt-4"
    >
        <div class="inline-flex flex-wrap items-center gap-2">
            <template
                v-for="(values, key) in activeFilters"
                :key="key"
            >
                <template
                    v-for="value in values"
                    :key="value"
                >
                    <span
                        v-if="findFieldByKey(key)"
                        role="button"
                        class="inline-flex cursor-pointer flex-nowrap items-center gap-1 rounded bg-white px-2 py-1 text-sm tracking-tight shadow ring-1 ring-black/5"
                        @click="removeActiveFilter(key, value)"
                    >
                        <Icon
                            name="ion:close"
                            class="size-4"
                        ></Icon>
                        {{ getActiveFilterLabel(key, value) }}
                    </span>
                </template>
            </template>
            <button
                type="button"
                class="text-sm tracking-tight text-gray-700 underline hover:no-underline focus:outline-none"
                @click="() => clearFormState()"
            >
                Zrušit všechny filtry
            </button>
        </div>
    </div>
</template>
