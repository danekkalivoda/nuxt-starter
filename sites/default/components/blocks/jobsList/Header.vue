<script setup lang="ts">
const props = defineProps<{
    headers: any
    onSort: (event: Event, header: any) => void
}>()
</script>

<template>
    <div
        class="col-span-full hidden grid-cols-subgrid items-stretch overflow-hidden md:grid md:py-0"
    >
        <div
            v-for="header in props.headers"
            :key="header.id"
            class="group flex"
            @click="($event) => props.onSort($event, header)"
        >
            <button
                type="button"
                class="group flex w-full items-center gap-2 px-6 py-2 text-sm font-medium lg:px-8"
            >
                {{ header.column.columnDef.header }}
                <div
                    v-if="header.column.columnDef.enableSorting ?? true"
                    class="inline-flex"
                >
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
</template>
