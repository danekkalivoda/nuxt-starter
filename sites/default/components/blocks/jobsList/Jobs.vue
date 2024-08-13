<script setup lang="ts">
import { useVueTable, createColumnHelper, getCoreRowModel, getSortedRowModel } from '@tanstack/vue-table';
import Loading from '~/sites/default/components/Loading.vue';
import type { SortingState } from '@tanstack/vue-table';
import type { Types } from '~/sites/default/components/blocks/jobsList';
import { type AsyncDataRequestStatus } from '#app';
import slugify from 'slugify';
const router = useRouter();
const route = useRoute();
const emits = defineEmits<{ (e: 'refresh'): void }>();
const props = defineProps<{ data?: Types.IJob[]; loading: AsyncDataRequestStatus }>();
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
        return props.data ?? [];
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
                emits('refresh');
            });
        });
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
});
const hasHeader = computed(() => {
    return false; //TODO strapi
});

const getCellLabel = (cell: any) => {
    return typeof cell.column.columnDef.cell === 'function'
        ? cell.column.columnDef.cell(cell.getContext())
        : cell.column.columnDef.cell;
};

</script>
<template>
    <div class="relative">
        <div class="grid w-full gap-2">
            <div
                v-if="hasHeader"
                class="overflow-hidden rounded md:table-row"
            >
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
                            ></Icon>
                            <Icon
                                name="ion:arrow-down"
                                :class="header.column.getIsSorted() === 'desc' ? 'text-gray-800' : 'text-gray-300'"
                                class="inline-flex group-hover:text-gray-800"
                            ></Icon>
                        </div>
                    </button>
                </div>
            </div>
            <template
                v-for="row in table.getRowModel().rows.slice(0, 10)"
                :key="row.id"
            >
                <slot
                    :row="row"
                    :cells="row.getVisibleCells()"
                    :link="'/pozice/' + slugify(row.original.title, { lower: true, strict: true })"
                    :get-cell-label="getCellLabel"
                >
                    <a
                        :href="'/pozice/' + slugify(row.original.title, { lower: true, strict: true })"
                        class="group block grid-cols-2 items-stretch overflow-hidden rounded ring-1 ring-black/5 md:grid md:py-0"
                    >
                        <div
                            v-for="cell in row.getVisibleCells()"
                            :key="cell.id"
                            class="px-4 first:pt-3 last:pb-3 group-hover:bg-gray-50 md:flex md:items-center md:py-2 md:first:rounded-l md:first:pt-2 md:last:rounded-r md:last:pb-2"
                            :class="[cell.column.id === 'title' ? 'text-base' : 'text-xs text-gray-400 md:text-sm'].join('')"
                        >

                            {{ getCellLabel(cell) }}
                        </div>
                    </a>
                </slot>
            </template>
        </div>
        <div
            v-if="loading === 'pending'"
            class="absolute inset-0 grid"
        >
            <div class="text-brand-500 -m-2 grid place-items-center bg-white/10 backdrop-blur-sm">
                <Loading></Loading>
            </div>
        </div>
    </div>
</template>
