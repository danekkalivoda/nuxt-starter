import { IStrapiBlockName, type IHeaderBlock, type IStrapiBlock } from '~/sites/default/types/pages';
import { isBlockOfType } from '~/composables/useStrapi';

const tagConfigurations: Record<string, { title: string; iconExact: string }> = {
    locality: { title: 'Lokalita', iconExact: 'tabler:map' },
    employmentType: { title: 'Typ zaměstnání', iconExact: 'tabler:briefcase' },
};

export const ensureJobDetailHeaderBlock = (
    blocks: IStrapiBlock[],
    title: string,
    blockType: IStrapiBlockName,
    params: { id: string; title: string; value: any; showTitle?: boolean }[],
): IStrapiBlock[] => {
    const hasHeader = blocks.some((block) => isBlockOfType<IHeaderBlock>(block, blockType));

    if (hasHeader) {
        return blocks;
    }


    // Vytvoření tagů na základě konfigurace a parametrů
    const tags = Object.entries(tagConfigurations).map(([paramId, config]) => {
        const param = params.find((p) => p.id === paramId);
        if (param) {
            return {
                id: param.id,
                title: config.title,
                iconExact: config.iconExact,
                values: param.value,
                showTitle: param.showTitle ?? true, // Nastavte dle vašich požadavků
            };
        }
        return null;
    }).filter((tag) => tag !== null) as any[];

    const defaultHeaderBlock: IHeaderBlock = {
        __component: blockType,
        id: 0,
        text: title,
        tags,
        baseSettings: {
            topGap: 'Small',
            bottomGap: 'Small',
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
                if (block.tags) {
                    block.tags = block.tags
                        .map((tag) => {
                            const param = data.data.params.find((p: { id: string }) => p.id === tag.value);
                            if (param) {
                                if (tag.showTitle) {
                                    return {
                                        ...tag,
                                        title: param.title,
                                        values: param.value,
                                    };
                                } else {
                                    return {
                                        ...tag,
                                        values: param.value,
                                    };
                                }
                            }
                            return undefined;
                        })
                        .filter((tag): tag is NonNullable<typeof tag> => Boolean(tag));
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
