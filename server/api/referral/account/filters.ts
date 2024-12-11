import { defineEventHandler, getQuery } from 'h3';
import qs from 'qs';
import { getServerSession } from '#auth';
import { processListFilter } from '~/utils/server';

export default defineEventHandler(async (event) => {
    const query = getQuery(event) as Record<string, any>;
    const session = await getServerSession(event);

    if (session?.user) {
        query.getReferral = 1;
    }

    processListFilter(query);

    const queryString = qs.stringify(
        query,
        { arrayFormat: 'brackets' },
    );

    const baseUrl = 'http://localhost:3002/api2/career-jobs/referral/account/filters';

    const url = `${baseUrl}?${queryString}`;

    const response = await fetch(
        url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );

    const data = await response.json();

    if (Array.isArray(data.data)) {
        data.data = data.data.map((item) => {
            if (
                item.type === 'radioTabs'
              && Array.isArray(item.tabs)
            ) {
                const foundTab = Array.isArray(item.initialValue)
                    ? item.tabs.find((tab) => item.initialValue.includes(tab.value))
                    : null;
                item.initialValue = foundTab ? foundTab.value : item.tabs[0]?.value;
            }
            return item;
        });
    }
    return data;
});
