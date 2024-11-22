interface IStrapiPageLocalizations {
    data: IStrapiPage[]
}

export enum IStrapiBlockName {
    jobsList = 'blocks.jobs-list',
    hero = 'blocks.hero-image',
    text = 'blocks.text',
    tiles = 'blocks.tiles',
}
export type IStrapiBlockNameUnion =
    IStrapiBlockName.jobsList |
    IStrapiBlockName.hero |
    IStrapiBlockName.text |
    IStrapiBlockName.tiles

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

export interface IJobsListBlock extends IStrapiBlock {
    showFilter?: boolean
    showSubmitButton?: boolean
    filterTabs?: IStrapiBlockFilterTabs
    hideHeader?: boolean
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

export interface ITile {
    id: number
    header?: string
    icon?: string
    text?: string
    linkUrl?: string
    linkText?: string
}
export type ITileTheme = 'Theme 1' | 'Theme 2' | 'Theme 3'
export interface ITilesBlock extends IStrapiBlock {
    tiles: ITile[]
    theme: ITileTheme
}

export type IStrapiBlockUnion = IJobsListBlock | IHeroBlock | ITextBlock | ITilesBlock

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
    title: string
    description?: string | null
    blocks?: IStrapiBlockUnion[]
}
