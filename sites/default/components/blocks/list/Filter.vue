<script setup lang="ts">
import type { LocationQueryValue } from 'vue-router';
import { useDebounceFn } from '@vueuse/core';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import { useRequestHeaders } from '#app';
import type { IActiveFilter, IFilterField, ICheckboxes, IInput, IMultiselect, IRadioTabs } from '~/sites/default/components/blocks/list/types';
import type { IStrapiBlockFilterTabs } from '~/sites/default/types/pages';
import type { IOption } from '~/sites/default/components/Multiselect/types';
import { omit } from '~/recruitis-shared/utils/common';
import { removeAll } from '~/sites/default/components/blocks/list/lib/activeFilters';

const { status: authStatus } = useAuth();
const RadioTabs = defineAsyncComponent(() => import('~/recruitis-shared/components/forms/radioTabs.vue'));
const Box = defineAsyncComponent(() => import('~/sites/default/components/Box.vue'));

const props = withDefaults(
    defineProps<{
        showSubmitButton?: boolean;
        entriesCount?: number;
        filterTabs?: IStrapiBlockFilterTabs;
        hideHeader?: boolean;
        url?: string;
        showTabs?: boolean;
        boxed?: boolean;
    }>(),
    {
        showSubmitButton: true,
        entriesCount: 0,
        hideHeader: false,
        url: '/api/jobs/filters',
        filterTabs: 'All' as IStrapiBlockFilterTabs,
        showTabs: true,
        boxed: true,
    },
);
const emits = defineEmits<{
    (e: 'update:formState'): void;
}>();
const { _route: route, $router: router } = useNuxtApp();
const headers = useRequestHeaders(['cookie']) as HeadersInit;

const { data: filters, refresh } = await useAsyncData(
    'jobs-filters',
    () => {
        const params = { ...router.currentRoute.value.query };

        if (props.filterTabs === 'Candidates' || props.filterTabs === 'Positions') {
            params.listFiltersTab = props.filterTabs.toLowerCase();
        }
        return $fetch(
            props.url,
            {
                params,
                headers,
            },
        );
    },
);

const formState = ref<IFilterField[]>(structuredClone(toRaw(filters.value.data)));
const activeFilters = ref<IActiveFilter>({});
const form = ref<HTMLFormElement | null>(null);
const isLoading = ref(false);

watch(
    () => filters.value.data,
    (newFiltersData) => {
        formState.value = structuredClone(toRaw(newFiltersData));
    },
);

const updateListFilter = async (filters: Record<string, any>) => {
    const query: Record<string, LocationQueryValue | LocationQueryValue[]>
    = { ...router.currentRoute.value.query };

    if (Object.keys(filters).length > 0) {
        query.listFilter = JSON.stringify(filters);
    } else {
        delete query.listFilter;
    }

    return router.push({ query });
};
const setActiveFiltersFromQuery = async () => {
    const query = router.currentRoute.value.query;
    if (query.listFilter) {
        const parsedFilters = JSON.parse(String(query.listFilter));
        activeFilters.value = Object.fromEntries(
            Object.entries(parsedFilters).filter(([key]) => {
                const formField = formState.value.find((field) => field.name === key);
                return formField ? formField.showInActiveFilters !== false : true;
            }),
        ) as IActiveFilter;
    } else {
        activeFilters.value = {};
    }
};
const setFormState = async () => {
    if (form.value) {
        const formData = new FormData(form.value);
        for (const [
            key,
            value,
        ] of formData.entries()) {
            if (value === '' || value === null) {
                formData.delete(key);
            }
        }
        const queryString = new URLSearchParams(formData as unknown as Record<string, string>);
        const filters: Record<string, any> = {};

        for (const [
            key,
            value,
        ] of queryString.entries()) {
            if (!filters[key]) {
                filters[key] = [];
            }
            filters[key].push(value);
        }

        await updateListFilter(filters);
        await setActiveFiltersFromQuery();
        await refresh();
        nextTick(() => {
            emits('update:formState');
        });
        isLoading.value = false;
    }
};
const clearFormState = async () => {
    await removeAll(
        activeFilters,
        formState,
    );
    await setFormState();
};
const debouncedSetFormState = useDebounceFn(
    setFormState,
    800,
);

const onChange = (field: IFilterField, value: string | string[] | undefined | null | IOption[]) => {
    switch (field.type) {
        case 'multiSelect':
            if (Array.isArray(value) && value.every((v) => typeof v === 'object')) {
                field.initialValue = value;
                nextTick(() => setFormState());
            }
            break;
        case 'checkboxes':
            if (Array.isArray(value) && value.every((v) => typeof v === 'string')) {
                field.initialValue = value;
                nextTick(() => setFormState());
            }
            break;
        case 'inputSearch':
            if (typeof value === 'string' || value === undefined) {
                field.initialValue = value;
                nextTick(() => debouncedSetFormState());
            }
            break;
        case 'radioTabs':
            if (typeof value === 'string' || value === undefined || value === null) {
                field.initialValue = value;
                nextTick(() => setFormState());
            }
            break;
        default:
            field.initialValue = value;
            nextTick(() => debouncedSetFormState());
            break;
    }
};

const hasActiveFilters = computed(() => {
    return Object.keys(activeFilters.value).length > 0;
});
const hasSubmitButton = computed(() => {
    return props.showSubmitButton;
});
const getMultiselectOptions = (field: IFilterField) => {
    return (field as IMultiselect).options ?? [];
};

const tabs = ref({
    initialValue: router.currentRoute.value.query.listFiltersTab ? String(router.currentRoute.value.query.listFiltersTab) : props.filterTabs === 'Candidates' ? 'candidates' : 'positions',
    tabs: [
        {
            value: 'positions',
            label: 'Pozice',
        },
        {
            value: 'candidates',
            label: 'Vaše doporučení',
        },
    ],
});

const showTabs = computed(() => {
    if (!props.showTabs) {
        return false;
    }
    if (props.filterTabs === 'All') {
        return authStatus.value === 'authenticated';
    } else {
        return false;
    }
});
const tabValue = computed(() => {
    return router.currentRoute.value.query.listFiltersTab ? String(router.currentRoute.value.query.listFiltersTab) : props.filterTabs === 'Candidates' ? 'candidates' : 'positions';
});

const setTab = async (value: string) => {
    isLoading.value = true;
    const query: Record<string, LocationQueryValue | LocationQueryValue[]>
    = { ...router.currentRoute.value.query };
    query.listFiltersTab = value;
    await router.push({ query });
    await clearFormState();
};
setActiveFiltersFromQuery();
</script>

<template>
    <div
        v-if="!props.hideHeader"
        class="prose prose-sm lg:prose"
    >
        <h2>
            <template v-if="tabValue === 'positions'">
                Máme pro vás <span class="text-brand-500">{{ props.entriesCount }} volných pozic</span>.
            </template>
            <template v-else>
                Vámi doporučení kandidáti: <span class="text-brand-500">{{ props.entriesCount }}</span>.
            </template>
        </h2>
    </div>
    <component
        :is="props.boxed ? Box : 'div'"
        class="@container/jobsFilter"
    >
        <div
            v-if="showTabs"
            class="col-span-full mb-4"
        >
            <slot name="tabs">
                <Tabs
                    :value="tabValue"
                    class="relative"
                    @update:value="setTab"
                >
                    <TabList>
                        <Tab
                            v-for="tab in tabs.tabs"
                            :key="tab.value"
                            :value="tab.value"
                            class="data-[p-active=true]:text-brand-500 mr-2 rounded-md px-3 py-2 text-sm font-semibold tracking-tight ring-1 ring-transparent data-[p-active=false]:text-gray-400 data-[p-active=true]:shadow data-[p-active=true]:ring-black/5 data-[p-active=false]:hover:bg-gray-50 data-[p-active=false]:hover:text-gray-900 data-[p-active=false]:hover:ring-black/5 lg:px-5 lg:py-2 lg:text-base"
                        >
                            {{ tab.label }}
                        </Tab>
                    </TabList>
                </Tabs>
            </slot>
        </div>
        <div class="relative">
            <form
                ref="form"
                class="grid w-full items-end gap-2 lg:gap-8"
                :class="{ '@2xl/jobsFilter:grid-cols-[1fr_max-content]': hasSubmitButton }"
                @submit.prevent="setFormState"
            >
                <div class="@2xl/jobsFilter:grid-cols-2 @4xl/jobsFilter:grid-cols-3 @6xl/jobsFilter:grid-cols-4 grid w-full grid-cols-1 gap-4">
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
                        <RadioTabs
                            v-else-if="field.type === 'radioTabs'"
                            v-bind="(field as IRadioTabs)"
                            @update:initial-value="(value) => onChange(field, value)"
                        ></RadioTabs>
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
            <BlocksListActiveFilters
                v-if="hasActiveFilters"
                ref="activeFiltersRef"
                :form="formState"
                :active="activeFilters"
                class="mt-4"
                @update:active-filters="(value) => (activeFilters = value)"
                @update:form-state="(value) => (formState = value)"
                @clear-form-state="() => setFormState()"
            ></BlocksListActiveFilters>
            <div
                v-if="isLoading"
                class="absolute inset-0 z-50 grid"
            >
                <div class="text-brand-500 -m-2 grid place-items-center bg-white/10 backdrop-blur-sm">
                    <Loading></Loading>
                </div>
            </div>
        </div>
    </component>
</template>
