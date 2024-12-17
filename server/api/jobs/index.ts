import { defineEventHandler, getQuery } from 'h3';
import qs from 'qs';
import { getServerSession } from '#auth';
import { processListFilter } from '~/utils/server';
import { useJobs } from '~/composables/useStrapi';
import { processAllJobDetailMutations } from '~/utils/dataMutations';

const modifyQuery = (query: Record<string, any>, session: any) => {
    if (!query.id) {
        processListFilter(query);
    }
    if (session?.user) {
        query.getReferral = 1;
    }
    if (query.customParams !== undefined) {
        query.customParams = JSON.parse(query.customParams);
        query.referralJobsOnly = query.customParams.referralJobsOnly;
        delete query.customParams;
    }
};

const getData = async (url: string): Promise<any> => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};
const getStrapiJobsData = async (query: Record<string, any>) => {
    return useJobs({
        url: 'jobs?populate=deep,5',
        locale: query.locale as string,
        id: query.id as string,
    });
};

const getUrl = (query: Record<string, any>, queryString: string): string => {
    let baseUrl = 'http://localhost:3002/api2/career-jobs';
    if (query.listFiltersTab === 'candidates' && !query.id) {
        baseUrl = `${baseUrl}/referral/candidates`;
        delete query.listFiltersTab;
    }
    return `${baseUrl}?${queryString}`;
};

export default defineEventHandler(async (event) => {
    const query = getQuery(event) as Record<string, any>;
    const session = await getServerSession(event);

    modifyQuery(query, session);

    const queryString = qs.stringify(
        query,
        { arrayFormat: 'brackets' },
    );

    const url = getUrl(query, queryString);
    const data = await getData(url);

    if (query.id) {
        const strapiData = await getStrapiJobsData(query);
        processAllJobDetailMutations(strapiData, data);
        return { ...data, strapiData };
    }

    return data;
});
