import { IStrapiBlockName, type IHeaderBlock, type IStrapiBlock, type IFilterItem } from '~/sites/default/types/pages';
import { isBlockOfType } from '~/composables/useStrapi';

const defaultFilterItemsConfig: Record<string, { id: number; title: string; iconPackage: 'tabler'; iconName: string }> = {
    locality: { id: 0, title: 'Lokalita', iconPackage: 'tabler', iconName: 'map' },
    employmentType: { id: 1, title: 'Typ zaměstnání', iconPackage: 'tabler', iconName: 'briefcase' },
};

export const ensureJobDetailHeaderBlock = (
    blocks: IStrapiBlock[],
    title: string,
    blockType: IStrapiBlockName,
    params: IFilterItem[],
): IStrapiBlock[] => {
    const hasHeader = blocks.some((block) => isBlockOfType<IHeaderBlock>(block, blockType));

    if (hasHeader) {
        return blocks;
    }

    const filterItems: IFilterItem[] = Object.entries(defaultFilterItemsConfig).map(([paramId, config]) => {
        const param = params.find((p) => p.id === paramId);
        if (param) {
            return {
                id: config.id,
                value: param.id,
                title: config.title,
                iconPackage: config.iconPackage,
                iconName: config.iconName,
                showTitle: param.showTitle ?? true,
            };
        }
        return null;
    }).filter((filterItem) => filterItem !== null);

    const defaultHeaderBlock: IHeaderBlock = {
        __component: blockType,
        id: 0,
        text: title,
        filterItems,
        stickySubHeader: true,
        baseSettings: {
            topGap: 'Small',
            bottomGap: 'None',
        },
    };
    return [defaultHeaderBlock, ...blocks];
};
export const processJobDetailBlocksBefore = (
    strapiData: any,
    data: any,
) => {
    if (strapiData && strapiData.blocksBefore) {

        strapiData.blocksBefore = ensureJobDetailHeaderBlock(
            strapiData.blocksBefore,
            data.data.title,
            IStrapiBlockName.jobHeader,
            data.data.params,
        );

        strapiData.blocksBefore.forEach((block: IStrapiBlock) => {
            if (isBlockOfType<IHeaderBlock>(block, IStrapiBlockName.jobHeader)) {
                const headerBlock = block as IHeaderBlock;
                if (headerBlock && (!headerBlock.text || headerBlock.text.trim() === '')) {
                    headerBlock.text = data.data.title;
                }
                headerBlock.stickySubHeader = true;
                if (block.filterItems) {
                    block.filterItems = block.filterItems
                        .map((filterItem) => {
                            const param = data.data.params.find((p: { id: string }) => p.id === filterItem.value);
                            if (param) {
                                if (filterItem.showTitle) {
                                    return {
                                        ...filterItem,
                                        title: param.title,
                                        values: param.value,
                                    };
                                } else {
                                    return {
                                        ...filterItem,
                                        values: param.value,
                                    };
                                }
                            }
                            return undefined;
                        })
                        .filter((filterItem): filterItem is NonNullable<typeof filterItem> => Boolean(filterItem));
                }
            }
        });
    }
};

export const processAllJobDetailMutations = (
    strapiData: any,
    data: any,
) => {
    processJobDetailBlocksBefore(strapiData, data);
};
