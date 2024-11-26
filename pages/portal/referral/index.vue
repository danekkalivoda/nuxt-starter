<script lang="ts" setup>
import BenefitCard from '~/recruitis-shared/components/benefitCard/benefitCard.vue';
import Filter from '~/sites/default/components/blocks/jobsList/Filter.vue';

definePageMeta({
    middleware: 'auth',
});
const { $router: router } = useNuxtApp();
const headers = useRequestHeaders(['cookie']) as HeadersInit;
const { data: products, refresh } = await useAsyncData(
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
</script>

<template>
    <div class="bg-gray-50">
        <div class="sticky top-0 z-50 py-4 lg:py-8">
            <div class="relative">
                <div class="absolute -top-4 left-0 z-40 block h-full w-full bg-gray-50/50 backdrop-blur-md [mask:_linear-gradient(black,_black,_transparent)] lg:-top-8">
                </div>
                <div class="container relative z-50">
                    <Filter
                        :show-tabs="false"
                        :hide-header="true"
                        :show-submit-button="false"
                        :entries-count="products.meta.entries_total"
                        url="/api/referral/filters"
                        @update:form-state="() => refresh()"
                    ></Filter>
                </div>
            </div>
        </div>
        <div class="@container/referralProducts container">
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
                        >
                            Uplatnit kredity
                        </Button>
                    </BenefitCard>
                </template>
            </div>
        </div>
    </div>
</template>
