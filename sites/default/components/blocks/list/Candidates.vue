<script setup lang="ts">
import { useVueTable, createColumnHelper, getCoreRowModel, getSortedRowModel, type SortingState } from '@tanstack/vue-table';
import { computed } from 'vue';
import { onSort, getCellLabel } from '~/sites/default/components/blocks/list/lib/helpers';
import type { AsyncDataRequestStatus } from '#app';
import type { IJobCandidate } from '~/sites/default/types/jobs';

const { _route: route, $router: router } = useNuxtApp();

const emits = defineEmits<{
    (e: 'refresh' | 'loadMoreItems'): void
}>();

const props = defineProps<{
    gridClass?: string
    hasMoreItems?: boolean
    loading: AsyncDataRequestStatus
    data?: IJobCandidate[]
}>();
const initialSorting = ref<SortingState>((route.query.sort as string)?.split(',').map((s) => {
    const [
        id,
        desc,
    ] = s.split(':');
    return { id,
        desc: desc === 'desc' };
}) ?? []);
const sorting = ref<SortingState>(initialSorting.value);

const columnHelper = createColumnHelper<IJobCandidate>();

const columns = computed(() => [
    columnHelper.accessor(
        'id',
        {
            header: 'Detail',
            cell: (info) => ({
                id: info.getValue(),
            }),
        },
    ),
]);

const table = computed(() => useVueTable({
    get data() {
        return props.data ?? [];
    },
    columns: columns.value,
    state: {
        get sorting() {
            return sorting.value;
        },
    },
    onSortingChange: (updaterOrValue) => {
        sorting.value = typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue;
        const sortParams = sorting.value.map((sort) => `${sort.id}:${sort.desc ? 'desc' : 'asc'}`).join(',');
        const query = {
            ...router.currentRoute.value.query,
            sort: sortParams || undefined,
        };
        router.push({ query }).then(() => {
            nextTick(() => {
                emits('refresh');
            });
        });
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
}));
</script>

<template>
    <div class="@container/list relative">
        <slot
            name="table"
            :table="table"
            :headers="table.getHeaderGroups()[0].headers"
            :on-sort="($event, header) => onSort($event, header)"
            :rows="table.getRowModel().rows"
            :cell-label="getCellLabel"
        >
            <div
                :class="[props.gridClass ?? 'grid w-full grid-cols-[1fr_max-content_max-content_max-content]'].join(' ')"
            >
                <slot
                    name="header"
                    :headers="table.getHeaderGroups()[0].headers"
                    :on-sort="($event, header) => onSort($event, header)"
                >
                    <BlocksListHeader
                        v-if="false"
                        :headers="table.getHeaderGroups()[0].headers"
                        :on-sort="($event, header) => onSort($event, header)"
                    ></BlocksListHeader>
                </slot>
                <template
                    v-for="row in table.getRowModel().rows"
                    :key="row.id"
                >
                    <slot
                        name="row"
                        :row="row"
                        :cells="row.getVisibleCells()"
                        :get-cell-label="getCellLabel"
                        :anchor="row.original.anchor"
                    >
                        <BlocksListCandidateRow
                            :row="row"
                            :get-cell-label="getCellLabel"
                        ></BlocksListCandidateRow>
                    </slot>
                </template>
            </div>
        </slot>
        <slot
            name="load-more-items"
            :load-more-items="() => emits('loadMoreItems')"
            :has-more-items="props.hasMoreItems"
        >
            <div
                v-if="props.hasMoreItems"
                class="flex justify-center pt-6 lg:pt-8"
            >
                <Button @click="() => emits('loadMoreItems')">
                    Načíst více
                </Button>
            </div>
        </slot>
        <div
            v-if="loading === 'pending'"
            class="absolute inset-0 z-50 grid"
        >
            <div class="text-brand-500 -m-2 grid place-items-center bg-white/10 backdrop-blur-sm">
                <Loading></Loading>
            </div>
        </div>
    </div>
</template>
