<script setup lang="ts">
import type { LocationQueryValue } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'
import type { IActiveFilter, IFilterField, ICheckboxes, IInput, IMultiselect } from '~/sites/default/components/blocks/jobsList/types'
import type { IOption } from '~/sites/default/components/Multiselect/types'
import { omit } from '~/recruitis-shared/utils/common'
import { removeAll } from '~/sites/default/components/blocks/jobsList/lib/activeFilters'

const props = withDefaults(
    defineProps<{
        showSubmitButton?: boolean
    }>(),
    {
        showSubmitButton: true,
    },
)
const emits = defineEmits<{
    (e: 'update:formState', queryString: URLSearchParams): void
}>()
const router = useRouter()
const route = useRoute()

/*
 * TODO: Tady by se to mělo udělat tak, že filtry, které se vrátí z api, by měli setnout do formState
 * aktuálně je jen zkopiruji, abych je mohl mutovat, ale lepší by bylo, aby to ovladalo API.
 */
const fetchFiltersData = async () => {
    const { data: filters, refresh, status } = await useAsyncData(
        'filters',
        () => $fetch(
            '/api/job-filters',
            {
                params: route.query,
            },
        ),
    )
    return {
        filters,
        refresh,
        status,
    }
}

const { filters, refresh } = await fetchFiltersData()
const formState = ref<IFilterField[]>(structuredClone(toRaw(filters.value.data)))
const activeFilters = ref<IActiveFilter>({})

const form = ref<HTMLFormElement | null>(null)
const setFormState = () => {
    if (form.value) {
        const formData = new FormData(form.value)
        for (const [
            key,
            value,
        ] of formData.entries()) {
            if (value === '') {
                formData.delete(key)
            }
        }
        const queryString = new URLSearchParams(formData as unknown as Record<string, string>)
        const query: Record<string, LocationQueryValue | LocationQueryValue[]> = { ...router.currentRoute.value.query }
        const f: Record<string, string[]> = {}

        for (const [
            key,
            value,
        ] of queryString.entries()) {
            if (!f[key]) {
                f[key] = []
            }
            f[key].push(value)
        }

        // Update the query with the new filter state inside "jobsFilter"
        if (Object.keys(f).length > 0) {
            query.jobsFilter = JSON.stringify(f)
        } else {
            delete query.jobsFilter
        }

        router.push({ query }).then(() => {
            nextTick(() => {
                refresh()
                emits(
                    'update:formState',
                    queryString,
                )
                activeFilters.value = f
            })
        })
    }
}
const clearFormState = async () => {
    await removeAll(
        activeFilters,
        formState,
    )
    setFormState()
}
const debouncedSetFormState = useDebounceFn(
    setFormState,
    500,
)

const onChange = (field: IFilterField, value: string | string[] | undefined | null | IOption[]) => {
    switch (field.type) {
        case 'multiSelect':
            if (Array.isArray(value) && value.every((v) => typeof v === 'object')) {
                field.initialValue = value
                nextTick(() => setFormState())
            }
            break
        case 'checkboxes':
            if (Array.isArray(value) && value.every((v) => typeof v === 'string')) {
                field.initialValue = value
                nextTick(() => setFormState())
            }
            break
        case 'inputSearch':
            if (typeof value === 'string' || value === undefined) {
                field.initialValue = value
                nextTick(() => debouncedSetFormState())
            }
            break
        default:
            nextTick(() => debouncedSetFormState())
            break
    }
}

const hasActiveFilters = computed(() => Object.keys(activeFilters.value).length > 0)
const hasSubmitButton = computed(() => {
    return props.showSubmitButton
})
const getMultiselectOptions = (field: IFilterField) => {
    return (field as IMultiselect).options ?? []
}

// eslint-disable-next-line vue/no-expose-after-await -- at na ten status nezapomenu, případně ho smaznu později
defineExpose({ clearFormState })
</script>

<template>
    <div class="@container/jobsFilter space-y-4">
        <form
            ref="form"
            class="grid w-full items-end gap-2 lg:gap-8"
            :class="{ '@2xl/jobsFilter:grid-cols-[1fr_max-content]': hasSubmitButton }"
            @submit.prevent="setFormState"
        >
            <div class="@2xl/jobsFilter:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] grid w-full gap-4">
                <template
                    v-for="field in formState"
                    :key="field.name"
                >
                    <MultiselectMultiSelect
                        v-if="field.type === 'multiSelect'"
                        v-bind="(omit(field, ['type']) as IMultiselect)"
                        :key="field.name"
                        :name="field.name"
                        :initial-value="(field as IMultiselect).initialValue ?? []"
                        :options="getMultiselectOptions(field)"
                        @update:initial-value="(value) => onChange(field, value)"
                    ></MultiselectMultiSelect>
                    <Checkboxes
                        v-else-if="field.type === 'checkboxes'"
                        v-bind="(field as ICheckboxes)"
                        @update:initial-value="(value) => onChange(field, value)"
                    ></Checkboxes>
                    <Input
                        v-else-if="field.type === 'inputSearch'"
                        :input-props="{
                            autocomplete: 'off',
                        }"
                        v-bind="(field as IInput)"
                        @update:initial-value="(value) => onChange(field, value)"
                    ></Input>
                </template>
            </div>
            <Button
                v-if="hasSubmitButton"
                type="submit"
                theme="primary"
            >
                Submit
            </Button>
        </form>
        <BlocksJobsListActiveFilters
            v-if="hasActiveFilters"
            ref="activeFiltersRef"
            :form="formState"
            :active="activeFilters"
            @update:active-filters="(value) => (activeFilters = value)"
            @update:form-state="(value) => (formState = value)"
            @clear-form-state="() => setFormState()"
        ></BlocksJobsListActiveFilters>
    </div>
</template>
