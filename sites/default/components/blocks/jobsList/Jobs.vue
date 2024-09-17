<script setup lang="ts">
import { type SortingState, useVueTable, createColumnHelper, getCoreRowModel, getSortedRowModel } from '@tanstack/vue-table'
import slugify from 'slugify'
import type { IJob } from '~/sites/default/components/blocks/jobsList/types'
import type { AsyncDataRequestStatus } from '#app'

const router = useRouter()
const route = useRoute()
const emits = defineEmits<{
    (e: 'refresh'): void
    (e: 'loadMore', page: number): void
}>()
const props = defineProps<{ data?: IJob[]
    total?: number
    loading: AsyncDataRequestStatus
    gridClass?: string }>()
const columnHelper = createColumnHelper<IJob>()
const columns = [
    columnHelper.accessor(
        'title',
        {
            header: 'Pozice',
            cell: (info) => info.getValue(),
            sortDescFirst: true,
        },
    ),
    columnHelper.accessor(
        'shortDesc',
        {
            header: 'Popis',
            cell: (info) => info.getValue(),
            sortDescFirst: true,
        },
    ),
]
const initialSorting = ref<SortingState>((route.query.sort as string)?.split(',').map((s) => {
    const [
        id,
        desc,
    ] = s.split(':')
    return { id,
        desc: desc === 'desc' }
}) ?? [])
const sorting = ref<SortingState>(initialSorting.value)
const table = useVueTable({
    get data() {
        return props.data ?? []
    },
    columns,
    state: {
        get sorting() {
            return sorting.value
        },
    },
    onSortingChange: (updaterOrValue) => {
        sorting.value = typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue
        const sortParams = sorting.value.map((sort) => `${sort.id}:${sort.desc ? 'desc' : 'asc'}`).join(',')
        const query = { ...router.currentRoute.value.query,
            sort: sortParams || undefined }
        router.push({ query }).then(() => {
            nextTick(() => {
                emits('refresh')
            })
        })
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true, // Disable pagination
})

const hasHeader = computed(() => {
    return false // TODO strapi
})

const getCellLabel = (cell) => {
    return typeof cell.column.columnDef.cell === 'function'
        ? cell.column.columnDef.cell(cell.getContext())
        : cell.column.columnDef.cell
}

const loadMoreItems = (limit: number = 25) => {
    const currentLimit = parseInt(route.query.limit as string) || 25
    const newLimit = currentLimit + limit
    router.push({ query: { ...route.query,
        limit: newLimit.toString() } }).then(() => {
        nextTick(() => emits(
            'loadMore',
            newLimit,
        ))
    })
}

const hasMoreItems = computed(() => {
    return (props.data?.length ?? 0) < (props.total ?? 0)
})
</script>

<template>
    <div class="relative grid">
        <div
            :class="
                [props.gridClass ? props.gridClass : 'grid w-full divide-y rounded border-t bg-white'].join(' ')
            "
        >
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
                v-for="row in table.getRowModel().rows"
                :key="row.id"
            >
                <slot
                    :row="row"
                    :cells="row.getVisibleCells()"
                    :link="'/pozice/' + row.original.id + '-' + slugify(row.original.title, { lower: true, strict: true })"
                    :get-cell-label="getCellLabel"
                    :anchor="row.original.anchor"
                >
                    <a
                        :id="row.original.anchor"
                        :href="'/pozice/' + row.original.id + '-' + slugify(row.original.title, { lower: true, strict: true })"
                        class="group block grid-cols-2 items-stretch overflow-hidden md:grid md:py-0 lg:grid-cols-[400px_1fr]"
                    >
                        <div
                            v-for="cell in row.getVisibleCells()"
                            :key="cell.id"
                            class="bg-gray-50 px-4 first:pt-3 last:pb-3 group-hover:bg-white md:flex md:items-center md:py-2 md:first:rounded-l md:first:pt-2 md:last:rounded-r md:last:pb-2 lg:px-8"
                            :class="[cell.column.id === 'title' ? 'text-base' : 'text-xs text-gray-400 md:text-sm'].join('')"
                        >

                            {{ getCellLabel(cell) }}
                        </div>
                    </a>
                </slot>
            </template>
        </div>
        <slot
            name="load-more-items"
            :load-more-items="loadMoreItems"
            :has-more-items="hasMoreItems"
        >
            <div
                v-if="hasMoreItems"
                class="flex justify-center border-t py-4 lg:py-8"
            >
                <Button
                    @click="() => loadMoreItems()"
                >
                    Načíst více
                </Button>
            </div>
        </slot>
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
