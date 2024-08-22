import type { Types } from '~/sites/default/components/blocks/jobsList'

export const remove = async (key: string, value: string, formState: Ref<Types.IFilterField[]>) => {
    const field = formState.value.find((f) => f.name + '[]' === key || f.name === key)
    if (field) {
        if (field.type === 'multiSelect') {
            const values = (field as Types.IMultiselect).initialValue;
            (field as Types.IMultiselect).initialValue = values?.filter((v) => v.value !== value)
        } else if (field.type === 'checkboxes') {
            const values = (field as Types.ICheckboxes).initialValue as string[];
            (field as Types.ICheckboxes).initialValue = values.filter((v) => v !== value)
        } else if (field.type === 'inputSearch') {
            (field as Types.IInput).initialValue = ''
        }
        await nextTick()
    }
}
export const getLabel = (key: string, value: string, formState: Ref<Types.IFilterField[]>) => {
    const field = formState.value.find((f) => f.name + '[]' === key || f.name === key)
    if (field) {
        if (field.type === 'multiSelect' || field.type === 'checkboxes') {
            const options = (field as Types.IMultiselect | Types.ICheckboxes).options
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

export const findByKey = (key: string, formState: Ref<Types.IFilterField[]>) => {
    return formState.value.some((f) => f.name + '[]' === key || f.name === key)
}
export const removeAll = async (activeFilters: Ref<Types.IActiveFilter>, formState: Ref<Types.IFilterField[]>) => {
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
