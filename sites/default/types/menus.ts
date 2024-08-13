interface IMenuItemPageRelation {
    data: {
        id: number;
        attributes: {
            Title: string;
            Url: string;
            Homepage: boolean;
        };
    };
}
export interface IMenuItem {
    attributes: {
        title: string;
        url: string;
        target: string;
        link_hidden: boolean;
        children?: {
            data: [
                {
                    attributes: {
                        title: string;
                        url: string;
                        target: string;
                        link_hidden: boolean;
                        page_relation: IMenuItemPageRelation;
                    };
                },
            ];
        };
        page_relation: IMenuItemPageRelation;
    };
}
