import type { MultiSelectProps } from 'primevue/multiselect'

export interface IOption {
    label: string
    value: string
}

export interface IMultiselectProps extends MultiSelectProps {
    id: string
    name?: string
    initialValue?: IOption[] | null | undefined
    options: IOption[]
    closeOnSelect?: boolean
    lang?: {
        placeholder?: string
    }
}
