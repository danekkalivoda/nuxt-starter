<script setup lang="ts">
const props = defineProps<{
    getCellLabel: (cell: any) => any
    row: any
    href: string
}>()
const hasRerferral = computed(() => {
    const referral = props.row.original?.referral
    return !!referral?.candidates?.length || !!referral?.active
})
</script>

<template>
    <div
        :id="props.row.original.anchor"
        class="group/jobRow transi col-span-full mt-8 grid grid-cols-subgrid items-stretch rounded-md bg-white  ring-1 ring-black/5 first:mt-4"
        :class="hasRerferral ? '' : ''"
    >
        <nuxt-link
            class="col-span-full block grid-cols-subgrid gap-x-4 px-4 py-3 lg:grid lg:gap-x-8 lg:px-6 lg:py-5"
            :to="props.href"
        >
            <template
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
            >
                <BlocksJobsListCellsTitle
                    v-if="cell.column.id === 'title'"
                    :cell="props.getCellLabel(cell)"
                ></BlocksJobsListCellsTitle>

                <BlocksJobsListCellsLocality
                    v-else-if="cell.column.id === 'location'"
                    :cell="props.getCellLabel(cell)"
                ></BlocksJobsListCellsLocality>

                <BlocksJobsListCellsEmploymentType
                    v-else-if="cell.column.id === 'employmentType'"
                    :cell="{ id: Number(props.getCellLabel(cell).id) }"
                ></BlocksJobsListCellsEmploymentType>
                <div
                    v-else
                    class="text-brand-500 decoration-brand-500 flex items-center gap-2 self-center text-sm underline decoration-1 underline-offset-4 group-hover/jobRow:no-underline"
                >
                    Detail pozice <Icon name="tabler:arrow-right"></Icon>
                </div>
            </template>
        </nuxt-link>
        <BlocksJobsListCellsReferral
            v-if="hasRerferral"
            :data="props.row.original?.referral"
            class="col-span-full"
        >
        </BlocksJobsListCellsReferral>
    </div>
</template>
