<!-- eslint-disable vue/no-v-html -->
<script setup lang="ts">
import type {
    IJobDetail,
} from '~/sites/default/types/jobs'
import FormFields from '~/recruitis-shared/components/forms/formFields.vue'

const props = defineProps<IJobDetail>()
</script>

<template>
    <div class="container space-y-6">
        <div class="space-y-4 rounded bg-gray-50 p-8">
            <FormFields :fields="props.form.fields"></FormFields>
        </div>
        <div
            class="prose mx-auto max-w-none"
            v-html="props.description"
        >
        </div>
    </div>
</template>
