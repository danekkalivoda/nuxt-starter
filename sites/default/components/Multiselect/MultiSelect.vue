<script lang="ts" setup>
import Multiselect, { type MultiSelectMethods } from 'primevue/multiselect'
import { MultiselectStyles } from '~/sites/default/components/Multiselect'
import type { IMultiselectProps, IOption } from '~/sites/default/components/Multiselect/types'
import { getWordingByCount } from '~/recruitis-shared/utils/common'

const props = withDefaults(
    defineProps<IMultiselectProps>(),
    {
        name: '',
        initialValue: undefined,
        display: 'comma',
        showToggleAll: false,
        maxSelectedLabels: 3,
        closeOnSelect: false,
        options: () => [],
        lang: () => {
            return {}
        },
    },
)
const multiselect = ref<MultiSelectMethods>()
const t = computed(() => {
    return {
        placeholder: 'Vyberte',
        ...props.lang,
    }
})

const value = defineModel<IOption[]>('initialValue')

const close = () => props.closeOnSelect && multiselect.value?.hide()
</script>

<template>
    <div class="flex flex-col">
        <Multiselect
            ref="multiselect"
            v-model="value"
            option-label="label"
            :display="props.display"
            :options="props.options"
            :placeholder="t.placeholder"
            :max-selected-labels="props.display === 'comma' ? props.maxSelectedLabels : null"
            :show-toggle-all="props.showToggleAll"
            :selected-items-label="'{0} ' + getWordingByCount(Number(value?.length), ['hodnota', 'hodnoty', 'hodnot'])"
            :pt="MultiselectStyles"
            @update:model-value="close"
        >
            <template
                #itemcheckboxicon="slotProps"
            >
                <div
                    class="text-brand-500 absolute inset-0 z-10 flex items-center justify-center"
                    :class="slotProps.checked ? 'opacity-100' : 'opacity-0'"
                >
                    <Icon
                        name="ion:checkmark-sharp"
                        class="size-4"
                    ></Icon>
                </div>
            </template>
            <template #chip="slotProps">
                <div class="bg-brand-50/50 border-brand-200 inline-flex flex-wrap items-center rounded border px-1.5 py-1 text-sm text-gray-800 [&>div]:inline-flex [&>div]:items-center">
                    {{ slotProps.value.label }}
                    <div
                        role="button"
                        class="text-brand-600/50 hover:text-brand-600 ml-1 inline-flex items-center justify-center"
                        @click="slotProps.removeCallback($event, slotProps.item)"
                    >
                        <Icon
                            name="ion:close"
                            class="size-4"
                        ></Icon>
                    </div>
                </div>
            </template>
        </Multiselect>
        <div v-if="props.name">
            <div
                v-for="option in value"
                :key="option.value"
            >
                <input
                    type="hidden"
                    :name="`${props.name}[]`"
                    :value="option.value"
                >
            </div>
        </div>
    </div>
</template>
