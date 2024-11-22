<script setup lang="ts">
import { useValidation, type ValidatedFieldInterface, type ValidationMessages } from '~/recruitis-shared/composables/useValidation'
import type { FileInteface } from '~/recruitis-shared/components/forms/file.vue'
import { omit, lodashCloneDeep } from '~/recruitis-shared/utils/common'
import type { FieldInterface, FormFieldsInterface } from '~/recruitis-shared/components/forms/formFields.vue'

const FormFields = defineAsyncComponent(() => import('~/recruitis-shared/components/forms/formFields.vue'))
const FormFileList = defineAsyncComponent(() => import('./fileList.vue'))
const File = defineAsyncComponent(() => import('~/recruitis-shared/components/forms/file.vue'))
const DateTimePicker = defineAsyncComponent(() => import('~/recruitis-shared/components/forms/dateTimePicker.vue'))

export interface IFormRenderer extends FormFieldsInterface {
    validationMessages?: ValidationMessages
}
const emits = defineEmits<{
    (
        e: 'update:fields',
        fields: FieldInterface[],
    ): void
    (
        e: 'submit',
        hasErrors?: boolean,
    ): void
}>()
const props = withDefaults(
    defineProps<IFormRenderer>(),
    {
        fields: () => [],
        validationMessages: () => ({
            isUrl: {
                type: 'error',
                text: 'Zadejte platnou URL adresu.',
                show: true,
            },
            isRequired: {
                type: 'error',
                text: 'Toto pole je povinné.',
                show: true,
            },
            notEmpty: {
                type: 'error',
                text: 'Pole nesmí být prázdné.',
                show: true,
            },
            isNumber: {
                type: 'error',
                text: 'Musí být číslo.',
                show: true,
            },
            isEmail: {
                type: 'error',
                text: 'Zadejte platnou e-mailovou adresu.',
                show: true,
            },
            isCzOrSkPhone: {
                type: 'error',
                text: 'Zadejte telefonní číslo ve formátu +420608123456',
                show: true,
            },
            maxFileSize: {
                type: 'error',
                text: 'Příliš velká příloha. Maximálně můžete odeslat: ',
                show: true,
            },
        }),
    },
)

const { validateAllFields, updateFieldWithValidation, hasErrors } = useValidation(props)

const onUpdate = async (
    index: number,
    value: {
        updatedFieldOrFields: ValidatedFieldInterface | ValidatedFieldInterface[]
        filtersPersistsOnChange: string[]
        changedField: ValidatedFieldInterface
    },
) => {
    const originalFields = lodashCloneDeep(props.fields)
    const changedField = lodashCloneDeep(value.updatedFieldOrFields)
    const updatedFields = updateFieldWithValidation(
        originalFields,
        index,
        changedField,
    )

    emits(
        'update:fields',
        updatedFields as FieldInterface[],
    )
}

const validateAllFieldsHandler = async () => {
    const updatedFields = validateAllFields(props.fields as ValidatedFieldInterface[])
    emits(
        'update:fields',
        updatedFields as FieldInterface[],
    )
}
const formState = computed({
    get: () => props.fields,
    set: (value) => {
        emits(
            'update:fields',
            value,
        )
    },
})
const onDeleteFile = (value: { name: string
    file: FileInteface }, field: FieldInterface) => {
    const updatedFields = formState.value.map((f) => {
        if (f.name === field.name && Array.isArray(f.initialValue)) {
            return {
                ...f,
                initialValue: f.initialValue.filter((item: any) => item.id !== value.file.id),
            }
        }
        return f
    })
    formState.value = updatedFields
}
const onSubmit = async (e) => {
    e.preventDefault()
    await validateAllFieldsHandler()
    emits(
        'submit',
        hasErrors(props.fields as ValidatedFieldInterface[]),
    )
}
</script>

<template>
    <form
        class="contents"
        @submit="onSubmit($event)"
    >
        <template
            v-for="(field, fieldIndex) in formState"
            :key="field.id"
        >
            <FormFields
                :fields="[field]"
                :controlled="true"
                :show-errors="true"
                @update:fields="(value) => onUpdate(fieldIndex, value)"
            >
                <template #datepickers="slotProps">
                    <DateTimePicker
                        v-if="slotProps.filter.type === 'date'"
                        :data-cy="slotProps.dataCy"
                        :disabled="slotProps.disabled"
                        :label="slotProps.label"
                        :label-tooltip="slotProps.labelTooltip"
                        :description="slotProps.filter.description"
                        :message="{ type: slotProps.message?.type, text: slotProps.message?.text }"
                        :name="slotProps.filter.name"
                        :show-message="slotProps.showMessage"
                        :position="slotProps.position"
                        :teleport="true"
                        :lang="slotProps.filter.lang"
                        v-bind="slotProps.filter.props && omit(slotProps.filter.props, ['class'])"
                        :initial-value="slotProps.initialValue"
                        @update:initial-value="
                            (value) => {
                                slotProps.onChange(slotProps.filter, value);
                                slotProps.handleUpdateInitialValue(value, slotProps.filter);
                            }
                        "
                    >
                        <template #input-icon>
                            <Icon
                                name="tabler:calendar-month"
                                class="absolute top-1/2 ml-2 size-5 -translate-y-1/2 text-gray-300 transition-transform"
                            ></Icon>
                        </template>
                        <template #clear-icon="{ clear }">
                            <button
                                type="button"
                                class="flex w-full items-center justify-center self-stretch focus:outline-none"
                                @click="clear"
                            >
                                <Icon
                                    name="ion:close"
                                    class="mr-2.5 size-4 text-gray-300 transition-transform"
                                ></Icon>
                            </button>
                        </template>
                    </DateTimePicker>
                </template>
                <template #fileUpload="slotProps">
                    <File
                        v-if="slotProps.filter.type === 'fileUpload'"
                        :data-cy="slotProps.dataCy"
                        :label="slotProps.label"
                        :label-tooltip="slotProps.filter.labelTooltip"
                        :description="slotProps.filter.description"
                        :message="{ type: slotProps.filter?.message?.type, text: slotProps.filter?.message?.text }"
                        :name="slotProps.filter.name"
                        :show-message="slotProps.showMessage"
                        v-bind="slotProps.filter.props && omit(slotProps.filter.props, ['class'])"
                        :class="slotProps.class"
                        :initial-value="slotProps.initialValue"
                        :lang="slotProps.filter.lang"
                        :accept="slotProps.filter.accept || '*'"
                        :disabled="slotProps.disabled"
                        :custom-file-list="FormFileList"
                        :show-file-list="false"
                        @on-action="(value) => onDeleteFile(value, slotProps.filter)"
                        @update:files="
                            (value) => {
                                slotProps.onChange(slotProps.filter, value);
                                slotProps.handleUpdateInitialValue(value, slotProps.filter);
                            }
                        "
                    ></File>
                </template>
            </FormFields>
        </template>
        <div class="col-span-full">
            <Button
                type="submit"
                theme="primary"
            >
                Odeslat
            </Button>
        </div>
    </form>
</template>
