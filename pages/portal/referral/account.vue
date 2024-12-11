<script lang="ts" setup>
import { getWordingByCount } from '~/recruitis-shared/utils/common';

definePageMeta({
    middleware: 'auth',
});
const { data: authData } = useAuth();
const { $router: router } = useNuxtApp();
const headers = useRequestHeaders(['cookie']) as HeadersInit;
const { data: account, refresh } = await useAsyncData<PortalAccount>(
    'referral-account',
    () => {
        const params = { ...router.currentRoute.value.query };
        return $fetch<PortalAccount>(
            '/api/referral/account',
            {
                params,
                headers,
            },
        );
    },
);

</script>

<template>
    <div class="space-y-4 lg:space-y-8">
        <div class="pt-4 lg:pt-8">
            <div class="container flex flex-wrap items-center gap-x-16 gap-y-4 ">
                <div class="flex flex-col justify-center lg:gap-2">
                    <h1 class="font-display text-2xl font-semibold lg:text-4xl">
                        Můj účet
                    </h1>
                    <div class="text-sm text-gray-500">
                        {{ authData?.user.name }} {{ authData?.user.surname }}
                    </div>
                </div>
                <div>
                    <div class="bg-brand-50/70 inline-flex flex-col rounded px-4 py-2">
                        <div class="text-brand-500 text-lg font-semibold lg:text-xl">
                            {{ authData?.user?.credits?.toLocaleString('cs-CZ') }} {{ getWordingByCount(authData?.user?.credits, ['kredit', 'kredity', 'kreditů']) }}
                        </div>
                        <div class="text-sm text-gray-500">
                            k čerpání
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class=" border-t bg-gray-50  py-4 lg:py-8">
            <div class="container space-y-4 lg:space-y-8">
                <BlocksListFilter
                    :show-tabs="false"
                    :hide-header="true"
                    :show-submit-button="false"
                    :entries-count="account.meta.entries_total"
                    url="/api/referral/account/filters"
                    @update:form-state="() => refresh()"
                >
                </BlocksListFilter>

                <div class="overflow-hidden rounded border bg-white">
                    <DataTable
                        :value="account.data"
                        :pt="{
                            table: { class: 'w-full min-w-[768px] text-sm xl:text-base' },
                            tableContainer: { class: 'w-full ' },
                            thead: { class: ' ' },
                            columnHeaderContent: {
                                class: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-tighter'
                            },
                            tbody: { class: 'bg-white' },
                            bodyRow: ({ props }) => {
                                return {
                                    class: 'hover:bg-gray-100/70 odd:bg-gray-100/50'
                                }
                            },
                        }"
                    >
                        <Column
                            field="reward"
                            header="Výhra"
                            :pt="{
                                root: {class: 'whitespace-nowrap'},
                                columnHeaderContent: {
                                    class: 'text-left text-xs font-medium text-gray-500 uppercase px-6 py-2'
                                },
                                bodyCell: { class: 'px-6 py-3 border-t' },
                            }"
                        >
                            <template #body="{ data }: { data: PortalAccountLineData }">
                                <div class="font-semibold">
                                    {{ data.reward.name }}
                                </div>
                                <div
                                    class="font-medium"
                                    :class="[data.accountBalanceType === 'in' ? 'text-brand-500' : 'text-red-600'].join(' ')"
                                >
                                    {{ data.accountBalanceType === 'in' ? '+' : '-' }} {{ data.reward.value.toLocaleString('cs-CZ') }} {{ data.reward.currency }}
                                </div>
                            </template>
                        </Column>
                        <Column
                            field="date"
                            header="Získáno"
                            :pt="{
                                root: {class: 'whitespace-nowrap'},
                                columnHeaderContent: {
                                    class: 'text-right text-xs font-medium text-gray-500 uppercase px-6 py-2'
                                },
                                bodyCell: { class: 'px-6 py-3 text-right border-t' },
                            }"
                        >
                        </Column>
                        <Column
                            field="state"
                            header="Stav"
                            :pt="{
                                root: {class: 'whitespace-nowrap'},
                                columnHeaderContent: {
                                    class: 'text-right text-xs font-medium text-gray-500 uppercase px-6 py-2'
                                },
                                bodyCell: { class: 'px-6 py-3 text-right border-t' },
                            }"
                        >
                            <template #body="{ data }: { data: PortalAccountLineData }">
                                <Badge
                                    size="small"
                                    v-bind="data.state"
                                ></Badge>
                            </template>
                        </Column>
                        <Column
                            field="payer"
                            header="Vyplatil"
                            :pt="{
                                root: {class: 'whitespace-nowrap'},
                                columnHeaderContent: {
                                    class: 'text-right text-xs font-medium text-gray-500 uppercase px-6 py-2'
                                },
                                bodyCell: { class: 'px-6 py-3 text-right border-t' },
                            }"
                        ></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>
