import {
    type IPage,
    type IStrapiPage,
    type IStrapiBlockUnion,
    IStrapiBlockName,
} from '~/sites/default/types/pages';
import type { IMenuItem } from '~/sites/default/types/menus';
import type { MenulinkInterface } from '~/sites/default/components/header/DesktopMenu.vue';

const getMenuLinkUrl = (item: IMenuItemBase) => {
    if (item.url !== '' && item.url !== null) {
        return item.url;
    } else if (item.page.data) {
        return item.page.data.attributes.url;
    } else {
        return null;
    }
};

const getMenuLinkBase = (item: IMenuItemBase) => {
    return {
        title: item.title,
        url: getMenuLinkUrl(item),
        target: item.target,
    };
};

export const useNavigation = async ({
    url = '',
    locale = 'cs-CZ',
    name = 'header',
}: {
    url?: string
    locale?: string
    name?: string
    useFetchMode?: boolean
}): Promise<MenulinkInterface[]> => {
    const runtimeConfig = useRuntimeConfig();
    const strapiUrl = runtimeConfig.public.strapi.url;
    const l = locale === 'cs-CZ' ? 'cs' : locale;
    const apiUrl = `${strapiUrl}/api/${url}&filters[name][$eq]=${name}&locale=${l}`;

    const response = await fetch(
        apiUrl,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
    const jsonData = await response.json();
    const data = jsonData.data;

    if (!data || !data.length || !data[0]?.attributes?.items) {
        return [];
    }

    const items = data[0].attributes.items.filter((item: { attributes: IMenuItem }) =>
        !item.attributes?.hidden)
        .map((item: IMenuItem) => {
            return {
                ...getMenuLinkBase(item),
                items: item?.items?.length > 0 ? item.items.map((i: IMenuItemBase) => ({
                    ...getMenuLinkBase(i),
                }))
                    : null,
            };
        });
    return items;
};

const updateBackgroundImage = (blk: any, strapiUrl: string) => {
    const bgImageData = blk?.baseSettings?.backgroundImage?.data?.attributes;
    if (bgImageData) {
        const { url, width, height } = bgImageData;
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
        };
    }
    return blk;
};

const updateHeroSlides = (blk: any, strapiUrl: string) => {
    if (blk.__component === IStrapiBlockName.hero && Array.isArray(blk.slides)) {
        const updatedSlides = blk.slides.map((slide: any) => {
            const imageData = slide?.image?.data?.attributes;
            if (imageData) {
                const { url, width, height } = imageData;
                return {
                    ...slide,
                    image: {
                        alt: slide.hero || slide.description || '',
                        url: strapiUrl + url,
                        width,
                        height,
                    },
                };
            }
            return slide;
        });
        return {
            ...blk,
            slides: updatedSlides,
        };
    }
    return blk;
};
const updateTextBlock = (blk: any, strapiUrl: string) => {
    if (blk.__component === IStrapiBlockName.text && blk?.images) {
        const updatedImages = blk?.images.images.data.map((image: any) => {
            const imageData = image?.attributes;
            if (imageData) {
                const { url, width, height } = imageData;
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
                };
            }
            return image;
        });
        return {
            ...blk,
            images: {
                ...blk.images,
                images: updatedImages,
            },
        };
    }
    return blk;
};

const processBlocks = (blocks: IStrapiBlockUnion[], strapiUrl: string) => {
    return blocks.map((block) => {
        let updatedBlock = { ...block };
        updatedBlock = updateBackgroundImage(
            updatedBlock,
            strapiUrl,
        );
        updatedBlock = updateHeroSlides(
            updatedBlock,
            strapiUrl,
        );
        updatedBlock = updateTextBlock(
            updatedBlock,
            strapiUrl,
        );
        return updatedBlock;
    });
};

export const usePages = async ({
    url = '',
    slug,
    locale = 'cs-CZ',
    homepage = false,
}: {
    url: string
    slug: string
    locale: string
    homepage?: boolean
}): Promise<IPage | undefined> => {
    const runtimeConfig = useRuntimeConfig();
    const strapiUrl = runtimeConfig.public.strapi.url;
    const l = locale === 'cs-CZ' ? 'cs' : locale;
    const filter = homepage ? 'homepage' : 'url';
    const filterValue = homepage ? 'true' : slug;
    const urlToFetch = strapiUrl + '/api/' + `${url}&filters[${filter}][$eq]=${filterValue}&locale=${l}`;

    const response = await fetch(
        urlToFetch,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
    const jsonData = await response.json();
    const data = jsonData.data;

    const findPageData = (pageData: IStrapiPage[]): IStrapiPage | undefined => {
        return pageData.find((item: IStrapiPage) => item.attributes.locale === l);
        /*         if (l === 'cs') {
        } else {
            return pageData
                .flatMap((item: IStrapiPage) => item.attributes.localizations.data)
                .find((loc: IStrapiPage) => loc.attributes.locale === l);
        } */
    };

    const pageRawData: IStrapiPage | undefined = findPageData(data);

    if (pageRawData === undefined) {
        return undefined;
    }

    if (pageRawData.attributes?.blocks) {
        pageRawData.attributes.blocks = processBlocks(
            pageRawData.attributes.blocks,
            strapiUrl,
        );
    }

    const { title, description, blocks } = pageRawData.attributes;

    return {
        title,
        description: description ?? undefined,
        blocks,
    };
};

export const useJobs = async ({
    url = '',
    locale = 'cs-CZ',
    id,
}: {
    url: string
    locale: string
    id: string
}): Promise<{
    blocksBefore: IStrapiBlockUnion[]
    blocksAfter: IStrapiBlockUnion[]
}> => {
    const runtimeConfig = useRuntimeConfig();
    const strapiUrl = runtimeConfig.public.strapi.url;
    const l = locale === 'cs-CZ' ? 'cs' : locale;
    const urlToFetch = strapiUrl + '/api/' + `${url}&locale=${l}`;
    const response = await fetch(
        urlToFetch,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
    const jsonData = await response.json();
    const data = jsonData.data;
    const foundJob = data.find((item) => item.attributes.jobId === id);

    if (foundJob) {
        return {
            blocksBefore: processBlocks(foundJob.attributes.blocksBefore, strapiUrl),
            blocksAfter: processBlocks(foundJob.attributes.blocksAfter, strapiUrl),
        };
    }

    if (data.length > 0) {
        return {
            blocksBefore: processBlocks(data[0].attributes.blocksBefore, strapiUrl),
            blocksAfter: processBlocks(data[0].attributes.blocksAfter, strapiUrl),
        };
    }

    return {
        blocksBefore: [],
        blocksAfter: [],
    };
};

export const isBlockOfType = <T extends IStrapiBlockUnion>(
    block: IStrapiBlockUnion,
    type: IStrapiBlockName,
): block is T => {
    return block.__component === type;
};
