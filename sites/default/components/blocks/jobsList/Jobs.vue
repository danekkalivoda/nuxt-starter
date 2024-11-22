<script setup lang="ts">
import { useVueTable, createColumnHelper, getCoreRowModel, getSortedRowModel, type SortingState } from '@tanstack/vue-table'
import { computed } from 'vue'
import { getDetailLink, onSort, getCellLabel } from './lib/helpers'
import type { AsyncDataRequestStatus } from '#app'
import type { IJob } from '~/sites/default/types/jobs'

const { _route: route, $router: router } = useNuxtApp()

const emits = defineEmits<{
    (e: 'refresh' | 'loadMoreItems'): void
}>()

const props = defineProps<{
    gridClass?: string
    hasMoreItems?: boolean
    loading: AsyncDataRequestStatus
    data?: IJob[]
}>()

const initialSorting = ref<SortingState>((route.query.sort as string)?.split(',').map((s) => {
    const [
        id,
        desc,
    ] = s.split(':')
    return { id,
        desc: desc === 'desc' }
}) ?? [])
const sorting = ref<SortingState>(initialSorting.value)

const columnHelper = createColumnHelper<IJob>()

const columns = computed(() => [
    columnHelper.accessor(
        'title',
        {
            header: 'Pozice',
            cell: (info) => ({
                title: info.getValue(),
            }),
            sortDescFirst: true,
        },
    ),
    columnHelper.accessor(
        'location',
        {
            header: 'Lokalita',
            cell: (info) => ({
                title: info.getValue(),
            }),
            sortDescFirst: true,
        },
    ),
    columnHelper.accessor(
        'employmentType',
        {
            header: 'Typ úvazku',
            cell: (info) => ({
                id: info.getValue(),
            }),
            sortDescFirst: true,
        },
    ),
    columnHelper.accessor(
        'id',
        {
            header: 'Detail',
            cell: (info) => ({
                id: info.getValue(),
            }),
        },
    ),
])

const table = computed(() => useVueTable({
    get data() {
        return props.data ?? []
    },
    columns: columns.value,
    state: {
        get sorting() {
            return sorting.value
        },
    },
    onSortingChange: (updaterOrValue) => {
        sorting.value = typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue
        const sortParams = sorting.value.map((sort) => `${sort.id}:${sort.desc ? 'desc' : 'asc'}`).join(',')
        const query = {
            ...router.currentRoute.value.query,
            sort: sortParams || undefined,
        }
        router.push({ query }).then(() => {
            nextTick(() => {
                emits('refresh')
            })
        })
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
}))
</script>

<template>
    <div class="relative grid">
        <slot
            name="table"
            :table="table"
            :headers="table.getHeaderGroups()[0].headers"
            :on-sort="($event, header) => onSort($event, header)"
            :rows="table.getRowModel().rows"
            :cell-label="getCellLabel"
            :detail-link="getDetailLink"
        >
            <div
                :class="[props.gridClass ?? 'grid w-full grid-cols-[1fr_max-content_max-content_max-content]'].join(' ')"
            >
                <slot
                    name="header"
                    :headers="table.getHeaderGroups()[0].headers"
                    :on-sort="($event, header) => onSort($event, header)"
                >
                    <BlocksJobsListHeader
                        v-if="false"
                        :headers="table.getHeaderGroups()[0].headers"
                        :on-sort="($event, header) => onSort($event, header)"
                    ></BlocksJobsListHeader>
                </slot>
                <template
                    v-for="row in table.getRowModel().rows"
                    :key="row.id"
                >
                    <slot
                        name="row"
                        :row="row"
                        :cells="row.getVisibleCells()"
                        :link="getDetailLink(row.original.id, row.original.title)"
                        :get-cell-label="getCellLabel"
                        :anchor="row.original.anchor"
                    >
                        <BlocksJobsListBaseRow
                            :row="row"
                            :href="getDetailLink(row.original.id, row.original.title)"
                            :get-cell-label="getCellLabel"
                        ></BlocksJobsListBaseRow>
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
