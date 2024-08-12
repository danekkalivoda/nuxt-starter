import type { BaseFormElementInterface } from '~/recruitis-shared/components/forms/commons';
import type { MultiselectInterface } from '~/recruitis-shared/components/forms/multiSelect.vue';

export interface IJob {
    title: string;
    description: string;
}

type FilterType = 'multiSelect' | 'checkboxes';
export interface ICheckboxes extends BaseFormElementInterface {
    type: FilterType;
    options: {
        label: string;
        value: string;
    }[];
    initialValue: string | string[] | undefined;
}
export interface IMultiselect extends BaseFormElementInterface, MultiselectInterface {
    type: FilterType;
}

export type IFilterField = IMultiselect | ICheckboxes;
