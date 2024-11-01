import {
    type IPage,
    type IStrapiPage,
    type IStrapiBlockUnion,
    type IHeroBlock,
    type IHeroSlide,
    IStrapiBlockName,
} from '~/sites/default/types/pages'
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
    const strapiUrl = runtimeConfig.public.strapi.url
    const apiUrl = `${strapiUrl}/api/${url}&filters[title][$eq]=${locale}`
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
            throw new Error('Špatný formát.')
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

const updateBackgroundImage = (blk: any, strapiUrl: string) => {
    const bgImageData = blk?.baseSettings?.backgroundImage?.data?.attributes
    if (bgImageData) {
        const { url, width, height } = bgImageData
        return {
            ...blk,
            baseSettings: {
                ...blk.baseSettings,
                backgroundImage: {
                    url: strapiUrl + url,
                    width,
                    height,
                },
            },
        }
    }
    return blk
}

const updateHeroSlides = (blk: any, strapiUrl: string) => {
    if (blk.__component === IStrapiBlockName.hero && Array.isArray(blk.slides)) {
        const updatedSlides = blk.slides.map((slide: any) => {
            const imageData = slide?.image?.data?.attributes
            if (imageData) {
                const { url, width, height } = imageData
                return {
                    ...slide,
                    image: {
                        alt: slide.hero || slide.description || '',
                        url: strapiUrl + url,
                        width,
                        height,
                    },
                }
            }
            return slide
        })
        return {
            ...blk,
            slides: updatedSlides,
        }
    }
    return blk
}
const updateTextBlock = (blk: any, strapiUrl: string) => {
    if (blk.__component === IStrapiBlockName.text && blk?.images) {
        const updatedImages = blk?.images.images.data.map((image: any) => {
            const imageData = image?.attributes
            if (imageData) {
                const { url, width, height } = imageData
                return {
                    id: image.id,
                    alt: image.attributes.alternativeText || '',
                    url: strapiUrl + url,
                    width,
                    height,
                    formats: {
                        large: {
                            url: strapiUrl + (imageData.formats?.large?.url || imageData.url),
                            width: (imageData.formats?.large?.width || imageData.width),
                            height: (imageData.formats?.large?.height || imageData.height),
                        },
                        medium: {
                            url: strapiUrl + (imageData.formats?.medium?.url || imageData.url),
                            width: (imageData.formats?.medium?.width || imageData.width),
                            height: (imageData.formats?.medium?.height || imageData.height),
                        },
                        small: {
                            url: strapiUrl + (imageData.formats?.small?.url || imageData.url),
                            width: (imageData.formats?.small?.width || imageData.width),
                            height: (imageData.formats?.small?.height || imageData.height),
                        },
                    },
                }
            }
            return image
        })
        return {
            ...blk,
            images: {
                ...blk.images,
                images: updatedImages,
            },
        }
    }
    return blk
}

const processBlocks = (blocks: IStrapiBlockUnion[], strapiUrl: string) => {
    return blocks.map((block) => {
        let updatedBlock = { ...block }
        updatedBlock = updateBackgroundImage(
            updatedBlock,
            strapiUrl,
        )
        updatedBlock = updateHeroSlides(
            updatedBlock,
            strapiUrl,
        )
        updatedBlock = updateTextBlock(
            updatedBlock,
            strapiUrl,
        )
        return updatedBlock
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
    const runtimeConfig = useRuntimeConfig()
    const strapiUrl = runtimeConfig.public.strapi.url
    const l = locale === 'cs-CZ' ? 'cs' : locale
    const filter = homepage ? 'homepage' : 'url'
    const filterValue = homepage ? 'true' : slug
    const urlToFetch = strapiUrl + '/api/' + `${url}&filters[${filter}][$eq]=${filterValue}`
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
            strapiUrl,
        )
    }

    const { title, description, blocks } = pageRawData.attributes

    return {
        title,
        description: description ?? undefined,
        blocks,
    }
}
