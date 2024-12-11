import type { BadgeInterface } from '~/recruitis-shared/components/badge.vue';

declare global {
    interface PortalAccount {
        meta: PortalAccountMeta;
        data: PortalAccountLineData[];
    }
    interface PortalAccountMeta {
        entries_total: number;
    }
    interface PortalAccountLineReward {
        name: string;
        value: number;
        currency: string;
    }
    interface PortalAccountLineData {
        reward: PortalAccountLineReward;
        date: string;
        state: BadgeInterface;
        payer: string;
        accountBalanceType: 'in' | 'out';
    }
    export {};
}
