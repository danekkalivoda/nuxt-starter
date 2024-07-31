/* eslint-disable */
import type { PageInterface } from "~/pages/[slug].vue";
import type { MenulinkInterface } from "~/sites/default/components/header/DesktopMenu.vue";
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
        },
      ];
    };
    page_relation: MenuItemPageRelation;
  };
}

const getMenuLinkUrl = (item: MenuItem) => {
  if (item.attributes.url !== "") {
    return item.attributes.url;
  } else if (item.attributes.page_relation.data) {
    return slugify(item.attributes.page_relation.data.attributes.Title, {
      lower: true,
      strict: true,
    });
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
  const visibleItemsList: any[] = [];
  for (const item of data) {
    const visibleItems = item.attributes.items.data
      .filter((menuItem: MenuItem) => !menuItem.attributes?.link_hidden)
      .map((menuItem: MenuItem) => ({
        ...getMenuLinkBase(menuItem),
        children: getMenuLinkChildren(menuItem),
      }));
    visibleItemsList.push(...visibleItems);
  }
  return visibleItemsList;
};

export const useMenu = async ({ url = "", locale = "cs-CZ", useFetchMode = false }: { url?: string, locale?: string, useFetchMode?: boolean }): Promise<MenulinkInterface[]> => {
  const runtimeConfig = useRuntimeConfig();
  let data: any;

  if (useFetchMode) {
    const { data: fetchData }: { data: any } = await useFetch(runtimeConfig.public.strapi.url + '/api/' + url + '&filters[title][$eq]=' + locale, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    data = fetchData.value.data;
  } else {
    const response = await fetch(runtimeConfig.public.strapi.url + '/api/' + url + '&filters[title][$eq]=' + locale, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const jsonData = await response.json();
    data = jsonData.data;
  }

  const finalData = getMenus(data);
  return finalData;
};

interface StrapiPageInterface {
  attributes: {
    Homepage: boolean;
    Description: string;
    Title: string;
  };
}

/**
 * This function fetches a page from Strapi based on the provided slug and locale.
 * If the homepage flag is true, it fetches the page marked as the homepage.
 * Otherwise, it uses the findOne method to fetch the page by its slug.
 */
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
  const filter = homepage ? "Homepage" : "Url";
  const filterValue = homepage ? "true" : slug;
  const runtimeConfig = useRuntimeConfig();
  const urlToFetch = runtimeConfig.public.strapi.url + '/api/' + `${url}&filters[${filter}][$eq]=${filterValue}`
  let data: any;
  const response = await fetch(urlToFetch, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
  const jsonData = await response.json();
  data = jsonData.data;

  const findPageData = (data: any) => {
    if (l === "cs") {
      return data.find((item: any) => item.attributes.locale === l);
    } else {
      return data.flatMap((item: any) => item.attributes.localizations.data).find((loc: any) => loc.attributes.locale === l);
    }
  };

  const pageRawData = findPageData(data);

  return pageRawData ? {
    title: pageRawData.attributes.Title,
    description: pageRawData.attributes.Description,
  } : undefined;
};
/* eslint-enable */
