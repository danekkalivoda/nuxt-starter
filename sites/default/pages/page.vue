<script setup lang="ts">
import type {
    IPage,
} from '~/sites/default/types/pages';
const props = defineProps<IPage>();
const { _route: route } = useNuxtApp();
const isReferralForm = computed(() => route.path.endsWith('referralForm'));
const shouldHideContent = computed(() => isReferralForm.value);
/* ten v-if způsobí chybu v hydrataci, ale tady nám to asi nevadí - ssr se může lišit, pokud jde o referralForm */
</script>

<template>
    <div v-if="!shouldHideContent">
        <slot></slot>
        <Blocks
            v-if="props.blocks"
            :blocks="props.blocks"
            :title="props.title"
            :description="props?.description"
        ></Blocks>
    </div>
    <NuxtPage></NuxtPage>
</template>
