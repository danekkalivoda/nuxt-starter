import type { IFilterField, IMultiselect, ICheckboxes, IInput, IActiveFilter } from '~/sites/default/components/blocks/jobsList/types'

export const remove = async (key: string, value: string, formState: Ref<IFilterField[]>) => {
    const field = formState.value.find((f) => f.name + '[]' === key || f.name === key)
    if (field) {
        if (field.type === 'multiSelect') {
            const values = (field as IMultiselect).initialValue;
            (field as IMultiselect).initialValue = values?.filter((v) => v.value !== value)
        } else if (field.type === 'checkboxes') {
            const values = (field as ICheckboxes).initialValue as string[];
            (field as ICheckboxes).initialValue = values.filter((v) => v !== value)
        } else if (field.type === 'inputSearch') {
            (field as IInput).initialValue = ''
        }
        await nextTick()
    }
}
export const getLabel = (key: string, value: string, formState: Ref<IFilterField[]>) => {
    const field = formState.value.find((f) => f.name + '[]' === key || f.name === key)
    if (field) {
        if (field.type === 'multiSelect' || field.type === 'checkboxes') {
            const options = (field as IMultiselect | ICheckboxes).options
            if (Array.isArray(options)) {
                const option = options.find((opt) => opt.value === value)
                return option?.label || value
            }
        } else if (field.type === 'inputSearch') {
            return value
        }
    }
    return value
}

export const findByKey = (key: string, formState: Ref<IFilterField[]>) => {
    return formState.value.some((f) => f.name + '[]' === key || f.name === key)
}
export const removeAll = async (activeFilters: Ref<IActiveFilter>, formState: Ref<IFilterField[]>) => {
    for (const [
        key,
        values,
    ] of Object.entries(activeFilters.value)) {
        for (const value of values as string[]) {
            remove(
                key,
                value,
                formState,
            )
        }
    }
    await nextTick()
}
