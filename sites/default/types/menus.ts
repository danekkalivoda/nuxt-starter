interface IMenuItemPageRelation {
    data: {
        id: number
        attributes: {
            title: string
            url: string
            homepage: boolean
        }
    }
}

export interface IMenuItemBase {
    title: string
    url: string
    target: string
    hidden?: boolean
    page: IMenuItemPageRelation
}

export interface IMenuItem extends IMenuItemBase {
    items?: IMenuItemBase[]
}
