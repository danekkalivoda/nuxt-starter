<!-- eslint-disable vue/no-v-html -->
<script setup lang="ts">
import { useNotification } from 'naive-ui';
import type { FieldInterface } from '~/recruitis-shared/components/forms/formFields.vue';
import type {
    IJobDetail,
} from '~/sites/default/types/jobs';

const route = useRoute();
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug || 'index';
const splitSlug = (url: string): {
    number: number | null
    rest: string
} => {
    const match = url.match(/^(\d+)(?:-(.+))?/);
    return match
        ? {
            number: parseInt(
                match[1],
                10,
            ),
            rest: match[2] || '',
        }
        : {
            number: null,
            rest: url,
        };
};
const { number } = splitSlug(slug);

const { data: job } = await useAsyncData<{
    data: IJobDetail
}>(() => $fetch(
    '/api/job/list',
    {
        params: { id: String(number) },
    },
));

const formFields = ref<FieldInterface[]>(job.value.data.form.fields);
const formState = computed({
    get: () => formFields.value,
    set: (newFields) => {
        formFields.value = newFields;
    },
});
const notification = useNotification();
const onSubmit = async (hasErrors?: boolean) => {
    if (hasErrors) {

    /* return */
    }
    await $fetch(
        '/api/job/form',
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
        class="container"
    >
        <NuxtPage></NuxtPage>
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_200px]">
            <div class=" space-y-6">
                <div
                    class="prose mx-auto max-w-none"
                    v-html="job.data.description"
                >
                </div>
                <div class="grid grid-cols-1 gap-4 rounded bg-gray-50 p-8 ring-1 ring-black/10">
                    <FormRenderer
                        v-model:fields="formState"
                        @submit="onSubmit"
                    ></FormRenderer>
                </div>
            </div>
            <div>
                Sidebar
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
            </div>
        </div>
    </div>
</template>
