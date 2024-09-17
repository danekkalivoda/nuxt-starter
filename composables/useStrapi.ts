import { type IPage, type IStrapiPage, IStrapiBlockName } from '~/sites/default/types/pages'
import type { IMenuItem } from '~/sites/default/types/menus'
import type { MenulinkInterface } from '~/sites/default/components/header/DesktopMenu.vue'

const getMenuLinkUrl = (item: IMenuItem) => {
    if (item.attributes.url !== '') {
        return item.attributes.url
    } else if (item.attributes.page_relation.data) {
        return item.attributes.page_relation.data.attributes.url
    } else {
        return null
    }
}

const getMenuLinkBase = (item: IMenuItem) => {
    return {
        title: item.attributes.title,
        url: getMenuLinkUrl(item),
        target: item.attributes.target,
    }
}

const getMenuLinkChildren = (item: IMenuItem) => {
    if (item.attributes.children && item.attributes.children.data.length > 0) {
        const finalChildren = item.attributes.children?.data
            .filter((child: IMenuItem) => !child.attributes.link_hidden)
            .map((child: IMenuItem) => ({
                ...getMenuLinkBase(child),
            }))
        return finalChildren
    } else {
        return null
    }
}

const getMenus = (data: any) => {
    const visibleItemsList: any[] = []
    for (const item of data) {
        const visibleItems = item.attributes.items.data
            .filter((IMenuItem: IMenuItem) => !IMenuItem.attributes?.link_hidden)
            .map((IMenuItem: IMenuItem) => ({
                ...getMenuLinkBase(IMenuItem),
                children: getMenuLinkChildren(IMenuItem),
            }))
        visibleItemsList.push(...visibleItems)
    }
    return visibleItemsList
}

export const useMenu = async ({
    url = '',
    locale = 'cs-CZ',
    useFetchMode = false,
}: {
    url?: string
    locale?: string
    useFetchMode?: boolean
}): Promise<MenulinkInterface[]> => {
    const runtimeConfig = useRuntimeConfig()
    const apiUrl = `${runtimeConfig.public.strapi.url}/api/${url}&filters[title][$eq]=${locale}`
    const fetchOptions = {
        method: 'GET' as const,
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const fetchData = async (): Promise<any> => {
        if (useFetchMode) {
            const response = await useFetch(
                apiUrl,
                fetchOptions,
            )
            if (response && typeof response.data === 'object' && response.data !== null) {
                return (response.data as any).value.data
            }
            throw new Error('Špatný formát format.')
        } else {
            const response = await fetch(
                apiUrl,
                fetchOptions,
            )
            const jsonData = await response.json()
            return jsonData.data
        }
    }

    return getMenus(await fetchData())
}

/**
 * This function fetches a page from Strapi based on the provided slug and locale.
 * If the homepage flag is true, it fetches the page marked as the homepage.
 * Otherwise, it uses the findOne method to fetch the page by its slug.
 */
const processBlocks = (blocks: any[], runtimeConfig: any) => {
    return blocks.map((block) => {
        if (block.__component === IStrapiBlockName.hero) {
            return {
                ...block,
                slides: (block as any).slides.map((slide: any) => {
                    return {
                        ...slide,
                        image: {
                            alt: slide?.hero || slide?.description || '',
                            url: runtimeConfig.public.strapi.url + slide.image.data.attributes.url,
                            width: slide.image.data.attributes.width,
                            height: slide.image.data.attributes.height,
                        },
                    }
                }),
            }
        }
        return block
    })
}

export const usePages = async ({
    url = '',
    slug,
    locale,
    homepage = false,
}: {
    url: string
    slug: string
    locale: string
    homepage?: boolean
}): Promise<IPage | undefined> => {
    const l = locale === 'cs-CZ' ? 'cs' : locale
    const filter = homepage ? 'homepage' : 'url'
    const filterValue = homepage ? 'true' : slug
    const runtimeConfig = useRuntimeConfig()
    const urlToFetch = runtimeConfig.public.strapi.url + '/api/' + `${url}&filters[${filter}][$eq]=${filterValue}`
    const response = await fetch(
        urlToFetch,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    )
    const jsonData = await response.json()
    const data = jsonData.data

    const findPageData = (pageData: IStrapiPage[]): IStrapiPage | undefined => {
        if (l === 'cs') {
            return pageData.find((item: IStrapiPage) => item.attributes.locale === l)
        } else {
            return pageData
                .flatMap((item: IStrapiPage) => item.attributes.localizations.data)
                .find((loc: IStrapiPage) => loc.attributes.locale === l)
        }
    }

    const pageRawData: IStrapiPage | undefined = findPageData(data)

    if (pageRawData === undefined) {
        return undefined
    }

    if (pageRawData.attributes?.blocks) {
        pageRawData.attributes.blocks = processBlocks(
            pageRawData.attributes.blocks,
            runtimeConfig,
        )
    }

    const { title, description, hideTitle, hideDescription, blocks } = pageRawData.attributes

    return {
        title,
        description: description ?? undefined,
        hideTitle,
        hideDescription,
        blocks,
    }
}
