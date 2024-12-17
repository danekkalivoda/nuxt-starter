import { defineEventHandler, getQuery } from 'h3';
import { usePages, isBlockOfType } from '~/composables/useStrapi';
import {

    type IHeaderBlock,
    type IStrapiBlockUnion,
    IStrapiBlockName,
} from '~/sites/default/types/pages';
export default defineEventHandler(async (event) => {
    const { locale, homepage, slug } = getQuery(event);
    const page: IPage | undefined = await usePages({
        url: 'pages?populate=deep,5',
        locale: locale as string,
        slug: slug as string,
        homepage: homepage === 'true' ? true : false,
    });

    if (!page) {
        throw createError({ statusCode: 404, statusMessage: 'Page not found' });
    }

    const blocks = page.blocks ?? [];
    const hasHeader = blocks.some((block) =>
        isBlockOfType<IHeaderBlock>(block, IStrapiBlockName.header),
    );


    if (!hasHeader) {
        const defaultHeaderBlock: IHeaderBlock = {
            __component: IStrapiBlockName.header,
            id: 0,
            text: page.title || '',
            baseSettings: {
                topGap: 'Small',
                bottomGap: 'Small',
            },
        };
        page.blocks = [defaultHeaderBlock as IStrapiBlockUnion, ...blocks];
    }

    return page;
});
