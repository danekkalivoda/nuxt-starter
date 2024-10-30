import type { FormFieldsInterface } from '~/recruitis-shared/components/forms/formFields.vue'

export interface IJob {
    id: string
    title: string
    shortDesc: string
    description?: string
    anchor?: string | null
}
export interface IJobDetail extends IJob {
    form?: FormFieldsInterface
}
