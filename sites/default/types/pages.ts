interface IStrapiPageLocalizations {
    data: IStrapiPage[];
}

export enum IStrapiBlockName {
    JobsList = 'blocks.jobs-list',
    AnotherComponent = 'blocks.another-component',
}
export type IStrapiBlockNameUnion = IStrapiBlockName.JobsList | IStrapiBlockName.AnotherComponent;

export interface IStrapiBlock {
    id: number;
    __component: IStrapiBlockName;
}

export interface IJobsListBlock extends IStrapiBlock {
    showFilter?: boolean;
    showSubmitButton?: boolean;
}

export interface IStrapiAnotherComponentBlock extends IStrapiBlock {
    showFilter?: boolean;
}

export type IStrapiBlockUnion = IJobsListBlock | IStrapiAnotherComponentBlock;

export interface IStrapiPage {
    attributes: {
        Homepage: boolean;
        Description?: string | null;
        Title: string;
        locale: string;
        localizations: IStrapiPageLocalizations;
        Blocks: IStrapiBlockUnion[];
        Url: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}

export interface IPage {
    title: string;
    description?: string | null;
    blocks?: IStrapiBlockUnion[];
}
