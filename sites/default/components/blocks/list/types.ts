import type { BaseFormElementInterface } from '~/recruitis-shared/components/forms/commons';
import type { IMultiselectProps } from '~/sites/default/components/Multiselect';
import type { InputInterface } from '~/recruitis-shared/components/forms/input.vue';
import type { RadioTabsInterface } from '~/recruitis-shared/components/forms/radioTabs.vue';

type FilterType = 'multiSelect' | 'checkboxes' | 'inputSearch' | 'radioTabs';
export interface Base {
    showInActiveFilters?: boolean
    type: FilterType
}
export interface ICheckboxes extends Base, BaseFormElementInterface {
    type: FilterType
    options: {
        label: string
        value: string
    }[]
    initialValue: string | string[] | undefined
}
export type IMultiselect = Base & BaseFormElementInterface & IMultiselectProps;
export type IInput = Base &  BaseFormElementInterface & InputInterface;
export type IRadioTabs = Base & BaseFormElementInterface & RadioTabsInterface;

export type IFilterField = IMultiselect | ICheckboxes | IInput | IRadioTabs;
export type IActiveFilter = Record<string, string[]>;
