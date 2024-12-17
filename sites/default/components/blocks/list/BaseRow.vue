<script setup lang="ts">
const props = defineProps<{
    getCellLabel: (cell: any) => any
    row: any
    href: string
}>();
const hasRerferral = computed(() => {
    const referral = props.row.original?.referral;
    return !!referral?.candidates?.length || !!referral?.active;
});
</script>

<template>
    <div
        :id="props.row.original.anchor"
        class="group/jobRow col-span-full mt-4 grid scroll-mt-[calc(var(--header-height)+var(--subheader-height))] grid-cols-subgrid items-stretch rounded-md bg-white ring-1  ring-black/10 transition-all first:mt-0 lg:mt-8 lg:first:mt-4"
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
                <BlocksListCellsTitle
                    v-if="cell.column.id === 'title'"
                    :cell="props.getCellLabel(cell)"
                ></BlocksListCellsTitle>

                <BlocksListCellsLocality
                    v-else-if="cell.column.id === 'location'"
                    :cell="props.getCellLabel(cell)"
                ></BlocksListCellsLocality>

                <BlocksListCellsEmploymentType
                    v-else-if="cell.column.id === 'employmentType'"
                    :cell="props.getCellLabel(cell)"
                ></BlocksListCellsEmploymentType>
                <div
                    v-else
                    class="text-brand-500 decoration-brand-500 flex items-center gap-2 self-center text-sm font-medium underline decoration-1 underline-offset-4 group-hover/jobRow:no-underline"
                >
                    Detail pozice
                    <Icon
                        class="size-4"
                        name="tabler:arrow-right"
                    ></Icon>
                </div>
            </template>
        </nuxt-link>
        <BlocksListCellsReferral
            v-if="hasRerferral"
            :id="props.row.original.id"
            :detail-href="props.href"
            :data="props.row.original?.referral"
            class="col-span-full"
        ></BlocksListCellsReferral>
    </div>
</template>
