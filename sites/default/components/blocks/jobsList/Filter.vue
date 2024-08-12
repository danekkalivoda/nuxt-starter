<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import type { Types } from '~/sites/default/components/blocks/jobsList';
import { Button, Checkboxes } from '~/sites/default/components';

const emits = defineEmits<{
    (e: 'update:formState', queryString: URLSearchParams): void;
}>();
const router = useRouter();
const route = useRoute();

const fetchFiltersData = async () => {
    const { data: filters, refresh, status } = await useAsyncData('filters', () => $fetch('/api/job-filters', {
        params: { query: route.query },
    }));
    return { filters, refresh, status };
};

const { filters, refresh, status } = await fetchFiltersData();

const formState = ref<Types.IFilterField[]>(JSON.parse(JSON.stringify(filters.value.data)));
const activeFilters = ref<Record<string, string[]>>({});
const form = ref<HTMLFormElement | null>(null);
const setFormState = () => {
    if (form.value) {
        const formData = new FormData(form.value);
        const queryString = new URLSearchParams(formData as unknown as Record<string, string>);
        const query: Record<string, any> = { ...router.currentRoute.value.query };
        const filters: Record<string, string[]> = {};

        queryString.forEach((value, key) => {
            if (!filters[key]) {
                filters[key] = [];
            }
            filters[key].push(value);
        });

        Object.keys(query).forEach(key => {
            if (!(key in filters)) {
                delete query[key];
            }
        });

        Object.entries(filters).forEach(([key, values]) => {
            if (values.length > 0) {
                query[key] = values.join(',');
            } else {
                delete query[key];
            }
        });

        router.push({ query }).then(() => {
            nextTick(() => {
                refresh();
                emits('update:formState', queryString);
                activeFilters.value = filters;
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
        default:
            nextTick(() => debouncedSetFormState());
            break;
    }
};

const getActiveFilterLabel = (key: string, value: string) => {
    const field = formState.value.find((f) => f.name + '[]' === key);
    if (field && Array.isArray(field.options)) {
        const option = field.options.find((option: any) => option.value === value);
        return option?.label || value;
    }
    return value;
};

const removeActiveFilter = (key: string, value: string) => {
    const field = formState.value.find((f) => f.name + '[]' === key);
    if (field) {
        if (field.type === 'multiSelect') {
            const values = (field as Types.IMultiselect).initialValue as string[];
            (field as Types.IMultiselect).initialValue = values.filter(v => v !== value);
        } else if (field.type === 'checkboxes') {
            const values = (field as Types.ICheckboxes).initialValue as string[];
            (field as Types.ICheckboxes).initialValue = values.filter(v => v !== value);
        }
        nextTick(() => setFormState());
    }
};

const hasActiveFilters = computed(() => Object.keys(activeFilters.value).length > 0);

const findFieldByKey = (key: string) => {
    return formState.value.some((f) => f.name + '[]' === key);
};
const clearFormState = () => {
    formState.value.forEach(field => {
        if (field.type === 'multiSelect') {
            (field as Types.IMultiselect).initialValue = [];
        } else if (field.type === 'checkboxes') {
            (field as Types.ICheckboxes).initialValue = [];
        }
    });
    activeFilters.value = {};
    nextTick(() => setFormState());
};
</script>

<template>
  <div class="space-y-4 py-4">
    <form
      ref="form"
      class="grid w-full xs:grid-cols-[1fr_max-content] gap-4 items-end"
      @submit.prevent="setFormState"
    >
      <div class="grid w-full grid-cols-[repeat(auto-fit,minmax(200px,_auto))] gap-4">
        <template
          v-for="field in formState"
          :key="field.name"
        >
          <MultiSelect
            v-if="field.type === 'multiSelect'"
            v-bind="(field as Types.IMultiselect)"
            :name="field.name"
            :native-support="true"
            :lang="{
              placeholder: 'Vyberte',
              multipleLabels: ['vybraná', 'vybrané', 'vybraných']
            }"
            :close-on-select="true"
            :initial-value="(field as Types.IMultiselect).initialValue"
            :options="(field as Types.IMultiselect).options"
            @update:initial-value="(value) => onChange(field, value)"
          />
          <Checkboxes
            v-else-if="field.type === 'checkboxes'"
            v-bind="(field as Types.ICheckboxes)"
            @update:initial-value="(value) => onChange(field, value)"
          />
        </template>
      </div>
      <Button
        type="submit"
        theme="primary"
      >
        Submit
      </Button>
    </form>
    <div
      v-if="hasActiveFilters"
      class="flex gap-4 items-center flex-wrap"
    >
      <div class="text-gray-400">
        Máme pro vás 1 pozici
      </div>
      <div class="inline-flex gap-2 items-center flex-wrap">
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
              class="cursor-pointer ring-1 ring-black/5 shadow px-2 py-1 rounded text-sm tracking-tight inline-flex flex-nowrap items-center gap-1"
              @click="removeActiveFilter(key, value)"
            >
              <Icon
                name="ion:close"
                class="w-4 h-4"
              />
              {{ getActiveFilterLabel(key, value) }}
            </span>
          </template>
        </template>
      </div>
      <button
        type="button"
        class="text-gray-700 underline hover:no-underline focus:outline-none text-sm tracking-tight"
        @click="() => clearFormState()"
      >
        Zrušit všechny filtry
      </button>
    </div>
  </div>
</template>
