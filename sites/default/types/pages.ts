import type { IButtonsListButton } from '~/sites/default/components/buttonsList/types';
import type { LocationQueryValue } from 'vue-router';

interface IStrapiPageLocalizations {
    data: IStrapiPage[]
}

export enum IStrapiBlockName {
    jobHeader = 'blocks.job-header',
    header = 'blocks.header',
    jobsList = 'blocks.jobs-list',
    hero = 'blocks.hero-image',
    text = 'blocks.text',
    tiles = 'blocks.tiles',
}
export type IStrapiBlockNameUnion =
    IStrapiBlockName.header |
    IStrapiBlockName.jobHeader |
    IStrapiBlockName.jobsList |
    IStrapiBlockName.hero |
    IStrapiBlockName.text |
    IStrapiBlockName.tiles;

export enum IStrapiBlockBackground {
    Transparent = 'Transparent',
    White = 'White',
    Light = 'Light',
    Dark = 'Dark',
    Brand = 'Brand',
}

export enum IStrapiBlockGap {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export enum IStrapiBlockFilterTabs {
    All = 'All',
    Positions = 'Positions',
    Candidates = 'Candidates',
}

export interface IStrapiBlockSettings {
    type?: IStrapiBlockNameUnion
    background?: keyof typeof IStrapiBlockBackground
    bottomGap?: keyof typeof IStrapiBlockGap
    topGap?: keyof typeof IStrapiBlockGap
    bottomBorder?: 'None' | 'Light'
    topBorder?: 'None' | 'Light'
    backgroundImage?: {
        url: string
        width: number
        height: number
    }
    backgroundPosition?: 'TopLeft' | 'TopCenter' | 'TopRight' | 'CenterLeft' | 'Center' | 'CenterRight' | 'BottomLeft' | 'BottomCenter' | 'BottomRight'
    backgroundRepeat?: 'NoRepeat' | 'Repeat' | 'RepeatX' | 'RepeatY'
    backgroundSize?: 'Auto' | 'Cover' | 'Contain'
}

export interface IStrapiBlock {
    id: number
    __component?: IStrapiBlockName
    baseSettings?: IStrapiBlockSettings
}

export interface IIcon {
    iconPackage?: 'tabler'
    iconName?: string
}

export interface IFilterItem extends IIcon {
    id: number | string
    title: string
    showTitle?: boolean
    value?: number | string
    values?: {
        id: string | number
        value: string | number
    }[]
}

export interface IHeaderBlock extends IStrapiBlock {
    text: string
    centered?: boolean
    filterItems?: IFilterItem[]
    buttons?: IButtonsListButton[]
    stickySubHeader?: boolean
}
export type IJobHeaderBlock = IHeaderBlock;
export interface IListBlock extends IStrapiBlock {
    showFilter?: boolean
    showSubmitButton?: boolean
    filterTabs?: IStrapiBlockFilterTabs
    hideHeader?: boolean
    customParams?: Record<string, any>
}

export interface IImage {
    id: number
    alt: string
    url: string
    width: number
    height: number
    formats?: {
        large?: IImage
        medium?: IImage
        small?: IImage
    }
}

export interface IHeroSlide {
    id: number
    header?: string
    description?: string
    image: IImage
    textBackground: 'None' | 'White' | 'Black'
    textColor: 'White' | 'Black'
    textAlignX: 'Left' | 'Center' | 'Right'
    textAlignY: 'Top' | 'Center' | 'Bottom'
    buttonName?: string
    buttonLink?: string
}

export interface IHeroBlock extends IStrapiBlock {
    autoplay: boolean
    showProgress: boolean
    slides: IHeroSlide[]
}

export interface ITextBlock extends IStrapiBlock {
    text?: string
    boxed?: boolean
    centered?: boolean
    width?: 'Small' | 'Medium' | 'Large' | 'Full'
    images?: {
        id: number
        theme: 'List' | 'Simple grid'
        beforeText: boolean
        overlapY: boolean
        alignX: 'Left' | 'Center' | 'Right'
        alignY: 'Top' | 'Center' | 'Bottom'
        size: 'Small' | 'Medium' | 'Large'
        onMobile: boolean
        onTable: boolean
        onDesktop: boolean
        images: IImage[]
    }
}

export interface ITile extends IIcon {
    id: number
    header?: string
    text?: string
    linkUrl?: string
    linkText?: string
}

export type ITileTheme = 'Theme 1' | 'Theme 2' | 'Theme 3';

export interface ITilesBlock extends IStrapiBlock {
    tiles: ITile[]
    theme: ITileTheme
}

export type IStrapiBlockUnion = IListBlock | IHeroBlock | ITextBlock | ITilesBlock;

export interface IStrapiPage {
    attributes: {
        homepage: boolean
        description?: string | null
        title: string
        locale: string
        localizations: IStrapiPageLocalizations
        blocks: IStrapiBlockUnion[]
        url: string
        createdAt: string
        updatedAt: string
        publishedAt: string
    }
}

export interface IPage {
    title?: string | null
    description?: string | null
    blocks?: IStrapiBlockUnion[]
}
