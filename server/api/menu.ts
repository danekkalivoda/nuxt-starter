import { defineEventHandler, getQuery } from 'h3';
import { useNavigation } from '~/composables/useStrapi';

export default defineEventHandler(async (event) => {
    const { locale, name } = getQuery(event);

    const navigation = await useNavigation({
        url: 'navigations?populate=deep,5',
        locale: locale as string,
        name: name as string,
    });
    return navigation;
});
