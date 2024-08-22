import type { BaseFormElementInterface } from '~/recruitis-shared/components/forms/commons'
import type { IMultiselectProps } from '~/sites/default/components/Multiselect'
import type { InputInterface } from '~/recruitis-shared/components/forms/input.vue'

export interface IJob {
    title: string
    description: string
    anchor: string
}

type FilterType = 'multiSelect' | 'checkboxes' | 'inputSearch'
export interface ICheckboxes extends BaseFormElementInterface {
    type: FilterType
    options: {
        label: string
        value: string
    }[]
    initialValue: string | string[] | undefined
}
export interface IMultiselect extends BaseFormElementInterface, IMultiselectProps {
    type: FilterType
}

export interface IInput extends BaseFormElementInterface, InputInterface {
    type: FilterType
}

export type IFilterField = IMultiselect | ICheckboxes | IInput
export type IActiveFilter = Record<string, string[]>
