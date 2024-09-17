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
export interface IMenuItem {
    attributes: {
        title: string
        url: string
        target: string
        link_hidden: boolean
        children?: {
            data: [
                {
                    attributes: {
                        title: string
                        url: string
                        target: string
                        link_hidden: boolean
                        page_relation: IMenuItemPageRelation
                    }
                },
            ]
        }
        page_relation: IMenuItemPageRelation
    }
}
