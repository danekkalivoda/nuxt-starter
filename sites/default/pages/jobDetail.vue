<!-- eslint-disable vue/no-v-html -->
<script setup lang="ts">
import { useNotification } from 'naive-ui'
import type { FieldInterface } from '~/recruitis-shared/components/forms/formFields.vue'
import type {
    IJobDetail,
} from '~/sites/default/types/jobs'

const props = defineProps<IJobDetail>()
const formFields = ref<FieldInterface[]>(props.form.fields)
const formState = computed({
    get: () => formFields.value,
    set: (newFields) => {
        formFields.value = newFields
    },
})
const notification = useNotification()
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
                const status = response._data.statusCode
                switch (status) {
                    case 200:
                        notification.success({
                            title: 'Formulář byl úspěšně odeslán',
                            duration: 5000,
                        })
                        break
                    default:
                        notification.error({
                            title: 'Chyba v odeslání formuláře',
                            duration: 5000,
                        })
                        break
                }
            },
        },
    )
}
</script>

<template>
    <div class="container">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_200px]">
            <div class=" space-y-6">
                <div
                    class="prose mx-auto max-w-none"
                    v-html="props.description"
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
                <div v-if="props.referral">
                    <div class="text-xs md:text-sm">
                        <template
                            v-for="(reward, index) in props.referral.rewards"
                            :key="index"
                        >
                            <span class="text-brand-500 mr-1 font-semibold">{{ reward.value }}</span>
                            <span>{{ reward.title }}</span>
                            <span v-if="index < props.referral.rewards.length - 1">, </span>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
