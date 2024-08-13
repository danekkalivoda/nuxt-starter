<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import type { Types } from '~/sites/default/components/blocks/jobsList';
import { Button, Checkboxes, Input } from '~/sites/default/components';
import { ActiveFilters } from '~/sites/default/components/blocks/jobsList';
const props = withDefaults(defineProps<{
    showSubmitButton?: boolean
}>(), {
    showSubmitButton: true,
});
const emits = defineEmits<{
    (e: 'update:formState', queryString: URLSearchParams): void;
}>();
const router = useRouter();
const route = useRoute();

/* TODO: Tady by se to mělo udělat tak, že filtry, které se vrátí z api, by měli setnout do formState
  aktuálně je jen zkopiruji, abych je mohl mutovat, ale lepší by bylo, aby to ovladalo API.
*/
const fetchFiltersData = async () => {
    const { data: filters, refresh, status } = await useAsyncData('filters', () => $fetch('/api/job-filters', {
        params: route.query,
    }));
    return { filters, refresh, status };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- at na ten status nezapomenu, případně ho smaznu později
const { filters, refresh, status } = await fetchFiltersData();
const formState = ref<Types.IFilterField[]>(structuredClone(toRaw(filters.value.data)));
const activeFilters = ref<Types.IActiveFilter>({});
const form = ref<HTMLFormElement | null>(null);
const setFormState = () => {
    if (form.value) {
        const formData = new FormData(form.value);
        for (const [key, value] of formData.entries()) {
            if (value === '') {
                formData.delete(key);
            }
        }
        const queryString = new URLSearchParams(formData as unknown as Record<string, string>);
        const query: Record<string, any> = { ...router.currentRoute.value.query };
        const f: Record<string, string[]> = {};

        for (const [key, value] of queryString.entries()) {
            if (!f[key]) {
                f[key] = [];
            }
            f[key].push(value);
        }

        for (const key of Object.keys(query)) {
            if (!(key in f)) {
                delete query[key];
            }
        }

        for (const [key, values] of Object.entries(f)) {
            if (values.length > 0) {
                query[key] = values.join(',');
            } else {
                delete query[key];
            }
        }

        router.push({ query }).then(() => {
            nextTick(() => {
                refresh();
                emits('update:formState', queryString);
                activeFilters.value = f;
            });
        });
    }
};
const debouncedSetFormState = useDebounceFn(setFormState, 500);
const onChange = (field: Types.IFilterField, value: string | string[] | undefined) => {
    switch (field.type) {
        case 'multiSelect':
            (field as Types.IMultiselect).initialValue = value;
            nextTick(() => setFormState());
            break;
        case 'checkboxes':
            (field as Types.ICheckboxes).initialValue = value;
            nextTick(() => setFormState());
            break;
        case 'inputSearch':
            (field as Types.IInput).initialValue = value as string | undefined;
            nextTick(() => debouncedSetFormState());
            break;
        default:
            nextTick(() => debouncedSetFormState());
            break;
    }
};

const hasActiveFilters = computed(() => Object.keys(activeFilters.value).length > 0);
const hasSubmitButton = computed(() => {
    return props.showSubmitButton;
});
const getMultiselectOptions = (field: Types.IFilterField) => {
    return (field as Types.IMultiselect).options;
};
</script>

<template>
    <div class="space-y-4 py-4">
        <form
            ref="form"
            class="grid w-full items-end gap-2"
            :class="{ 'xs:grid-cols-[1fr_max-content]': hasSubmitButton }"
            @submit.prevent="setFormState"
        >
            <div class="grid w-full grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-2">
                <template
                    v-for="field in formState"
                    :key="field.name"
                >
                    <MultiSelect
                        v-if="field.type === 'multiSelect'"
                        :lang="{
                            placeholder: 'Vyberte',
                            multipleLabels: ['vybraná', 'vybrané', 'vybraných']
                        }"
                        v-bind="(field as Types.IMultiselect)"
                        :name="field.name"
                        :native-support="true"
                        :close-on-select="true"
                        :initial-value="(field as Types.IMultiselect).initialValue"
                        :options="getMultiselectOptions(field)"
                        @update:initial-value="(value) => onChange(field, value)"
                    ></MultiSelect>
                    <Checkboxes
                        v-else-if="field.type === 'checkboxes'"
                        v-bind="(field as Types.ICheckboxes)"
                        @update:initial-value="(value) => onChange(field, value)"
                    ></Checkboxes>
                    <Input
                        v-else-if="field.type === 'inputSearch'"
                        :input-props="{
                            autocomplete:'off'
                        }"
                        v-bind="(field as Types.IInput)"
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
        <ActiveFilters
            v-if="hasActiveFilters"
            :form="formState"
            :active="activeFilters"
            @update:active-filters="(value) => (activeFilters = value)"
            @update:form-state="(value) => (formState = value)"
            @clear-form-state="() => setFormState()"
        ></ActiveFilters>
    </div>
</template>
