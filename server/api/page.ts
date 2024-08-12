
import { defineEventHandler, getQuery } from 'h3';
import { usePages } from '~/composables/useStrapi';

export default defineEventHandler(async (event) => {
    const { locale, homepage, slug } = getQuery(event);
    const page = await usePages({
        url: 'pages?populate=deep,5',
        locale: locale as string,
        slug: slug as string,
        homepage: homepage === 'true' ? true : false,
    });
    return page;
});
