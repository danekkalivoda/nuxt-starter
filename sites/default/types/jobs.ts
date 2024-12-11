import type { FormFieldsInterface } from '~/recruitis-shared/components/forms/formFields.vue';
import type { FlowbarInterface } from '~/recruitis-shared/components/flowBar/flowBar.vue';
import type { ITheme } from '~/recruitis-shared/components/badge.vue';
export interface IReward {
    value: string
    title: string
}
export interface IJobCandidate {
    id: number
    date: string
    rejected?: boolean
    state?: {
        text: string
        theme: ITheme
    }
    flow: FlowbarInterface
    anchor?: string | null
    position?: {
        id: string
        title: string
    }
    contestState?: {
        text: string
        theme: ITheme
    }
    rewards?: IReward[]
}
export interface IJobReferral {
    active: boolean
    candidates: IJobCandidate[]
    rewards: IReward[]
}

export interface IJob {
    id: string
    title: string
    shortDesc: string
    location?: string
    employmentType?: string
    description?: string
    anchor?: string | null
    referral?: IJobReferral
    params?: {
        id: string
        title: string
        value: {
            id: string
            value: string
        }[]
    }[]
}
export interface IJobDetail extends IJob {
    form?: FormFieldsInterface
}
