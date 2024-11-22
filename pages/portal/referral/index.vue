<script lang="ts" setup>
definePageMeta({
    middleware: 'auth',
})
const { _route: route, $router: router } = useNuxtApp()
const headers = useRequestHeaders(['cookie']) as HeadersInit
const { data: products, refresh } = await useAsyncData(
    'jobs-filters',
    () => {
        const params = { ...router.currentRoute.value.query }
        return $fetch(
            '/api/referral/products',
            {
                params,
                headers,
            },
        )
    },
)
console.log(products)
</script>

<template>
    <div>Shop</div>
</template>
