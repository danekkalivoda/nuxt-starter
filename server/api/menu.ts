import { defineEventHandler, getQuery } from 'h3';
import { useMenu } from '~/composables/useStrapi';

export default defineEventHandler(async (event) => {
    const { locale } = getQuery(event);
    const menu = await useMenu({
        url: 'menus?nested&populate=deep,5',
        locale: locale as string,
    });
    return menu;
});
