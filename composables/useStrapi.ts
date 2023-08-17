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

export const useMenu = async (strapiMenuUrl: string) => {
    const { find } = useStrapi();
    const { data } = await useAsyncData(() => find<object>(strapiMenuUrl));
    const originalData = JSON.parse(JSON.stringify(data.value));
    /* console.log(originalData.data.attributes.items.data); */

    const finalData = originalData.data.attributes.items.data
        .filter((item: MenuItem) => !item.attributes.link_hidden)
        .map((item: MenuItem) => ({
            ...getMenuLinkBase(item),
            children: getMenuLinkChildren(item),
        }));
    return finalData;
};
