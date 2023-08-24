import { PageInterface } from "~/pages/[slug].vue";
import slugify from "slugify";
interface MenuItemPageRelation {
    data: {
        id: number;
        attributes: {
            Title: string;
        };
    };
}
interface MenuItem {
    attributes: {
        title: string;
        url: string;
        target: string;
        link_hidden: boolean;
        children?: {
            data: [
                {
                    attributes: {
                        title: string;
                        url: string;
                        target: string;
                        link_hidden: boolean;
                        page_relation: MenuItemPageRelation;
                    };
                }
            ];
        };
        page_relation: MenuItemPageRelation;
    };
}

const getMenuLinkUrl = (item: MenuItem) => {
    if (item.attributes.url !== "") {
        return item.attributes.url;
    } else if (item.attributes.page_relation.data) {
        return slugify(item.attributes.page_relation.data.attributes.Title, { lower: true, strict: true });
    } else {
        return null;
    }
};

const getMenuLinkBase = (item: MenuItem) => {
    return {
        title: item.attributes.title,
        url: getMenuLinkUrl(item),
        target: item.attributes.target,
    };
};

const getMenuLinkChildren = (item: MenuItem) => {
    if (item.attributes.children && item.attributes.children.data.length > 0) {
        const finalChildren = item.attributes.children?.data
            .filter((child: MenuItem) => !child.attributes.link_hidden)
            .map((child: MenuItem) => ({
                ...getMenuLinkBase(child),
            }));
        return finalChildren;
    } else {
        return null;
    }
};

const getMenus = (data: any) => {
    return data.reduce((acc: any, item: any) => {
        const slug = item.attributes.slug;
        const visibleItems = item.attributes.items.data
            .filter((menuItem: MenuItem) => !menuItem.attributes?.link_hidden)
            .map((menuItem: MenuItem) => ({
                ...getMenuLinkBase(menuItem),
                children: getMenuLinkChildren(menuItem),
            }));
        acc[slug] = visibleItems;
        return acc;
    }, {});
};

export const useMenu = async ({ url = "" }: { url?: string }) => {
    const { find } = useStrapi();
    const { data: menus } = await useAsyncData("menus", () => find<object>(url));
    const originalData = menus.value;
    const finalData = getMenus(originalData?.data);
    return finalData;
};

interface StrapiPageInterface {
    attributes: {
        Homepage: boolean;
        Description: string;
        Title: string;
    };
}

const getHomepage = (pageData: StrapiPageInterface[]) => {
    const result = pageData.filter((item: StrapiPageInterface) => item.attributes && item.attributes.Homepage).pop();
    return result !== undefined ? result : undefined;
};

const getPage = (pageData: StrapiPageInterface[], slug: string) => {
    const result = pageData.find(
        (item: StrapiPageInterface) =>
            item.attributes && slugify(item.attributes.Title, { lower: true, strict: true }) === slug
    );

    return result !== undefined ? result : undefined;
};

const getPageBySlug = (pageData: any, slug: string, isHomepage: boolean): PageInterface | undefined => {
    const pageRawData = isHomepage ? getHomepage(pageData) : getPage(pageData, slug);

    if (pageRawData !== undefined) {
        return {
            title: pageRawData.attributes.Title,
            description: pageRawData.attributes.Description,
        };
    } else {
        return undefined;
    }
};

export const usePages = async ({
    url = "",
    slug,
    locale,
    homepage = false,
}: {
    url: string;
    slug: string;
    locale: string;
    homepage?: boolean;
}): Promise<PageInterface | undefined> => {
    const l = locale === "cs-CZ" ? "cs" : locale;
    const { find } = useStrapi();
    const { data: pages } = await useAsyncData("pages", () => find<object>(url + "&locale=" + l));

    if (pages.value) {
        return getPageBySlug(pages.value.data, slug, homepage);
    }
    return undefined;
};
