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

    const url = `http://localhost:3002/api2/career-jobs/filters?${queryString}`;

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

    /* Tady je potřeba upravit data, pokud se vrátí multiselect, jako ["value", "value"] a input jako [string] */
    if (Array.isArray(data.data)) {
        data.data = data.data.map((item) => {
            if (
                item.type === 'multiSelect'
                && Array.isArray(item.initialValue)
                && Array.isArray(item.options)
            ) {
                item.initialValue = item.options.filter((option) => item.initialValue.includes(option.value));
            } else if (item.type === 'inputSearch' && Array.isArray(item.initialValue)) {
                item.initialValue = item.initialValue.join('');
            }
            return item;
        });
    }

    return data;
});
