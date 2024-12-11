import slugify from 'slugify'

/* TODO: překlad */
export const getDetailLink = (id: string, title: string) => {
    return '/pozice/' + id + '-' + slugify(
        title,
        { lower: true,
            strict: true },
    )
}
export const scrollToAnchor = (limit: string, smooth: boolean = true) => {
    const element = document.getElementById(`anchor-${limit}`)
    if (element) {
        element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
    }
}

export const onSort = ($event: Event, header: any) => {
    return header.column.getToggleSortingHandler()?.($event)
}
export const getCellLabel = (cell) => {
    return typeof cell.column.columnDef.cell === 'function'
        ? cell.column.columnDef.cell(cell.getContext())
        : cell.column.columnDef.cell
}
