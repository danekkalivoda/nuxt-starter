<script setup lang="ts">
import { useVueTable, createColumnHelper, FlexRender, getCoreRowModel, getSortedRowModel } from '@tanstack/vue-table';
import Loading from '~/sites/default/components/Loading.vue';
import type { SortingState } from '@tanstack/vue-table';
import { JobsFilter } from '~/sites/default/components/blocks/jobsList';
import type { Types } from '~/sites/default/components/blocks/jobsList';
import type { IJobsListBlock } from '~/sites/default/types/pages.types';
import slugify from 'slugify';
const router = useRouter();
const route = useRoute();
const props = defineProps<IJobsListBlock>();

const fetchJobsData = async () => {
    const { data: jobs, refresh, status } = await useAsyncData('jobs', () => $fetch('/api/jobs', {
        params: { query: route.query },
    }));
    return { jobs, refresh, status };
};

const { jobs, refresh, status } = await fetchJobsData();

const data = ref<Types.IJob[]>(jobs.value.data);
const columnHelper = createColumnHelper<Types.IJob>();
const columns = [
    columnHelper.accessor('title', {
        header: 'Pozice',
        cell: (info) => info.getValue(),
        sortDescFirst: true,
    }),
    columnHelper.accessor('description', {
        header: 'Popis',
        cell: (info) => info.getValue(),
        sortDescFirst: true,
    }),
];
const initialSorting = ref<SortingState>(
    (route.query.sort as string)?.split(',').map((s) => {
        const [id, desc] = s.split(':');
        return { id, desc: desc === 'desc' };
    }) ?? [],
);
const sorting = ref<SortingState>(initialSorting.value);
const table = useVueTable({
    get data() {
        return data.value;
    },
    columns,
    state: {
        get sorting() {
            return sorting.value;
        },
    },
    onSortingChange: (updaterOrValue) => {
        sorting.value = typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue;
        const sortParams = sorting.value.map((sort) => `${sort.id}:${sort.desc ? 'desc' : 'asc'}`).join(',');
        const query = { ...router.currentRoute.value.query, sort: sortParams || undefined };
        router.push({ query }).then(() => {
            nextTick(() => {
                refresh();
            });
        });
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
});
</script>
<template>
  <div class="container">
    <JobsFilter
      v-if="props.showFilter"
      @update:form-state="() => refresh()"
    />
    <div class="relative">
      <div class="w-full table-fixed md:table">
        <div class="overflow-hidden rounded md:table-row">
          <div
            v-for="header in table.getHeaderGroups()[0].headers"
            :key="header.id"
            class="hidden border-b bg-gray-100 md:table-cell md:first:rounded-l md:last:rounded-r"
            @click="header.column.getToggleSortingHandler()?.($event)"
          >
            <button
              type="button"
              class="group flex items-center gap-2 px-4 py-2 text-sm font-medium"
            >
              {{ header.column.columnDef.header }}
              <div class="inline-flex">
                <Icon
                  name="ion:arrow-up"
                  :class="header.column.getIsSorted() === 'asc' ? 'text-gray-800' : 'text-gray-300'"
                  class="inline-flex group-hover:text-gray-800"
                />
                <Icon
                  name="ion:arrow-down"
                  :class="header.column.getIsSorted() === 'desc' ? 'text-gray-800' : 'text-gray-300'"
                  class="inline-flex group-hover:text-gray-800"
                />
              </div>
            </button>
          </div>
        </div>
        <a
          v-for="row in table.getRowModel().rows.slice(0, 10)"
          :key="row.id"
          :href="'/pozice/' + slugify(row.original.title, { lower: true, strict: true })"
          class="group block overflow-hidden rounded md:table-row md:py-0"
        >
          <div
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
            class="px-4 first:pt-3 last:pb-3 group-hover:bg-gray-50 md:table-cell md:py-2 md:first:rounded-l md:last:rounded-r"
            :class="[cell.column.id === 'title' ? 'text-base' : 'text-xs text-gray-400 md:text-sm'].join('')"
          >
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </div>
        </a>
      </div>
      <div
        v-if="status === 'pending'"
        class="absolute inset-0 grid"
      >
        <div class="bg-white/10 backdrop-blur-sm text-brand-500 -m-2 grid place-items-center">
          <Loading />
        </div>
      </div>
    </div>
  </div>
</template>
