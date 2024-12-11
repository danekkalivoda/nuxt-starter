<!-- eslint-disable vue/no-v-html -->
<script setup lang="ts">
import { useNotification } from 'naive-ui';
import type { FieldInterface } from '~/recruitis-shared/components/forms/formFields.vue';
import type {
    IJobDetail,
} from '~/sites/default/types/jobs';
import {
    type IStrapiBlockUnion,
} from '~/sites/default/types/pages';
import { useRequestHeaders } from '#app';
const { locale } = useI18n();
const notification = useNotification();
const route = useRoute();
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug || 'index';
const { number } = splitSlug(slug);

/* Data */
const headers = useRequestHeaders(['cookie']) as HeadersInit;
const { data: job } = await useAsyncData<{
    data: IJobDetail
    strapiData: {
        blocksBefore: IStrapiBlockUnion[]
        blocksAfter: IStrapiBlockUnion[]
    }
}>(`job-${number}`, () => $fetch(
    '/api/jobs',
    {
        params: { id: String(number), locale: locale.value },
        headers,
    },
));

/* Form */
const formFields = ref<FieldInterface[]>(job.value.data.form.fields);
const formState = computed({
    get: () => formFields.value,
    set: (newFields) => {
        formFields.value = newFields;
    },
});
const onSubmit = async (hasErrors?: boolean) => {
    if (hasErrors) {
        return;
    }
    await $fetch(
        '/api/jobs/form',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState.value),
            async onResponse({ request, options, response }) {
                const status = response._data.statusCode;
                switch (status) {
                    case 200:
                        notification.success({
                            title: 'Formulář byl úspěšně odeslán',
                            duration: 5000,
                        });
                        break;
                    default:
                        notification.error({
                            title: 'Chyba v odeslání formuláře',
                            duration: 5000,
                        });
                        break;
                }
            },
        },
    );
};

</script>

<template>
    <div
        v-if="job"
    >
        <NuxtPage></NuxtPage>
        <Blocks
            v-if="job.strapiData.blocksBefore"
            :blocks="job.strapiData.blocksBefore"
        >
        </Blocks>
        <div class="container my-8 grid grid-cols-1 items-start gap-x-8 gap-y-6 lg:my-16 lg:grid-cols-[560px_1fr] xl:grid-cols-[768px_1fr] 2xl:grid-cols-[1024px_1fr]">
            <div class="space-y-6">
                <div
                    class="prose mx-auto max-w-none"
                    v-html="job.data.description"
                ></div>
                <Box
                    id="answerForm"
                    class="grid scroll-mt-[calc(var(--header-height)+var(--subheader-height)+16px)] grid-cols-1 gap-4"
                >
                    <FormRenderer
                        v-model:fields="formState"
                        @submit="onSubmit"
                    ></FormRenderer>
                </Box>
            </div>
            <Box class="flex flex-col overflow-hidden p-2 lg:sticky lg:top-[calc(var(--header-height)+var(--subheader-height)+16px)] lg:max-h-[calc(100vh-var(--header-height)-var(--subheader-height)-32px)] lg:p-2">
                <div class="customScrollbar max-h-full shrink grow space-y-4 overscroll-contain p-4 lg:overflow-y-auto lg:p-6">
                    <div v-if="job.data?.referral">
                        <div class="text-xs md:text-sm">
                            <template
                                v-for="(reward, index) in job.data.referral.rewards"
                                :key="index"
                            >
                                <span class="text-brand-500 mr-1 font-semibold">{{ reward.value }}</span>
                                <span>{{ reward.title }}</span>
                                <span v-if="index < job.data.referral.rewards.length - 1">, </span>
                            </template>
                        </div>
                    </div>
                    <div class="prose mx-auto max-w-none">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                    </div>
                </div>
            </Box>
        </div>
        <Blocks
            v-if="job.strapiData.blocksAfter"
            :blocks="job.strapiData.blocksAfter"
        ></Blocks>
    </div>
</template>
