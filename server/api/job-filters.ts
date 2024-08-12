import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
    const { query } = getQuery(event) as Record<string, any>;
    const queryString = new URLSearchParams(query as Record<string, string>).toString();
    const url = `http://localhost:3002/api2/career-jobs/filters?${queryString}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    /* await new Promise((resolve) => setTimeout(resolve, 2000)); */

    return data;
});
