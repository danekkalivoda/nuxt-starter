export function processListFilter(query: Record<string, any>): void {
    if (!query.listFilter) {
        return;
    }

    let listFilterContent: Record<string, any>;
    if (typeof query.listFilter === 'string') {
        try {
            listFilterContent = JSON.parse(query.listFilter);
        } catch (e) {
            console.error('Chyba při parsování listFilter:', e);
            listFilterContent = {};
        }
    } else {
        listFilterContent = query.listFilter;
    }

    const normalizedListFilterContent: Record<string, any> = {};
    for (const key of Object.keys(listFilterContent)) {
        let normalizedKey = key;
        if (key.endsWith('[]')) {
            normalizedKey = key.slice(0, -2); // Odstraníme poslední dva znaky
        }
        normalizedListFilterContent[normalizedKey] = listFilterContent[key];
    }

    Object.assign(query, normalizedListFilterContent);

    delete query.listFilter;
}

export const splitSlug = (url: string): { number: number | null
    rest: string } => {
    const match = url.match(/^(\d+)(?:-(.+))?/);
    return match
        ? {
            number: parseInt(
                match[1],
                10,
            ),
            rest: match[2] || '',
        }
        : { number: null,
            rest: url };
};
