interface IStrapiPageLocalizations {
    data: IStrapiPage[]
}

export enum IStrapiBlockName {
    jobsList = 'blocks.jobs-list',
    hero = 'blocks.hero-image',
}
export type IStrapiBlockNameUnion = IStrapiBlockName.jobsList | IStrapiBlockName.hero

export enum IStrapiBlockBackground {
    Transparent = 'Transparent',
    White = 'White',
    Light = 'Light',
    Dark = 'Dark',
    Brand = 'Brand',
}

export enum IStrapiBlockGap {
    none = 'None',
    small = 'Small',
    medium = 'Medium',
    large = 'Large',
}

export interface IStrapiBlockSettings {
    type?: IStrapiBlockNameUnion
    background?: keyof typeof IStrapiBlockBackground
    bottomGap?: keyof typeof IStrapiBlockGap
    topGap?: keyof typeof IStrapiBlockGap
}

export interface IStrapiBlock {
    id: number
    __component: IStrapiBlockName
    baseSettings?: IStrapiBlockSettings
}

export interface IJobsListBlock extends IStrapiBlock {
    showFilter?: boolean
    showSubmitButton?: boolean
}
export interface IHeroSlideImage {
    alt: string
    url: string
    width: number
    height: number
}
export interface IHeroSlide {
    id: number
    header?: string
    description?: string
    image: IHeroSlideImage
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

export type IStrapiBlockUnion = IJobsListBlock | IHeroBlock

export interface IStrapiPage {
    attributes: {
        homepage: boolean
        description?: string | null
        title: string
        hideTitle: boolean
        hideDescription: boolean
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
    hideTitle?: boolean
    hideDescription?: boolean
    blocks?: IStrapiBlockUnion[]
}
