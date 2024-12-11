<script lang="ts" setup>
import { BenefitCard, type IBenefit } from '~/recruitis-shared/components/benefitCard';

definePageMeta({
    middleware: 'auth',
});
const { $router: router } = useNuxtApp();
const headers = useRequestHeaders(['cookie']) as HeadersInit;
const { data: products, refresh } = await useAsyncData<{
    data: IBenefit.Card[]
    meta: {
        entries_total: number
    }
}>(
    'referral-products',
    () => {
        const params = { ...router.currentRoute.value.query };
        return $fetch(
            '/api/referral/products',
            {
                params,
                headers,
            },
        );
    },
);

const showModal = ref(false);
const selectedProduct = ref<IBenefit.Card>(null);

const openModal = (product: IBenefit.Card) => {
    selectedProduct.value = product;
    showModal.value = true;
};
</script>

<template>
    <div class="space-y-4 py-4 lg:space-y-8 lg:py-8">
        <div class="container">
            <h1 class="font-display text-2xl font-semibold lg:text-4xl">
                Referral shop
            </h1>
        </div>
        <div class="border-t bg-gray-50 py-4 lg:py-8">
            <div class="@container/referralProducts container space-y-4 lg:space-y-8">
                <BlocksListFilter
                    :show-tabs="false"
                    :hide-header="true"
                    :show-submit-button="false"
                    :entries-count="products.meta.entries_total"
                    url="/api/referral/filters"
                    @update:form-state="() => refresh()"
                ></BlocksListFilter>
                <div class="@xl/referralProducts:grid-cols-2 @4xl/referralProducts:grid-cols-3 @6xl/referralProducts:grid-cols-4 @7xl/referralProducts:gap-8 grid grid-cols-1 gap-4">
                    <template
                        v-for="(product, index) in products.data"
                        :key="index"
                    >
                        <BenefitCard
                            v-bind="product"
                            :show-images="true"
                        >
                            <Button
                                theme="primary"
                                @click="openModal(product)"
                            >
                                Uplatnit kredity
                            </Button>
                        </BenefitCard>
                    </template>
                </div>
                <Modal
                    v-model:show="showModal"
                    class="max-w-md text-center"
                >
                    <div class="space-y-6 lg:space-y-8">
                        <h2 class="font-display text-lg font-semibold lg:text-2xl">
                            Uplatnit kredity
                        </h2>
                        <div
                            v-html="$t('referral.modal.confirmation', {
                                credits: selectedProduct.price,
                                currency: selectedProduct.currency,
                                title: selectedProduct.title
                            })"
                        >
                        </div>
                        <div class="flex w-full justify-between gap-4">
                            <Button @click="showModal = false">
                                Zrušit
                            </Button>
                            <Button
                                theme="primary"
                                @click="showModal = false"
                            >
                                Uplatnit
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    </div>
</template>
