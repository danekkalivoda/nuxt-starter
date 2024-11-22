import { defineEventHandler, getQuery } from 'h3'
import qs from 'qs'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const query = getQuery(event) as Record<string, any>
    const session = await getServerSession(event)
    if (session?.user) {
        query.getReferral = 1
    }

    if (query.listFilter) {
        let listFilterContent: Record<string, any>
        if (typeof query.listFilter === 'string') {
            try {
                listFilterContent = JSON.parse(query.listFilter)
            } catch (e) {
                console.error(
                    'Chyba při parsování listFilter:',
                    e,
                )
                listFilterContent = {}
            }
        } else {
            listFilterContent = query.listFilter
        }

        // odstraníme případné '[]' na konci klíčů
        const normalizedListFilterContent: Record<string, any> = {}
        for (const key of Object.keys(listFilterContent)) {
            let normalizedKey = key
            if (key.endsWith('[]')) {
                normalizedKey = key.slice(
                    0,
                    -2,
                ) // Odstraníme poslední dva znaky
            }
            normalizedListFilterContent[normalizedKey] = listFilterContent[key]
        }

        Object.assign(
            query,
            normalizedListFilterContent,
        )

        delete query.listFilter
    }

    const queryString = qs.stringify(
        query,
        { arrayFormat: 'brackets' },
    )

    const url = `http://localhost:3002/api2/career-jobs/filters?${queryString}`

    const response = await fetch(
        url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    )

    const data = await response.json()

    /* Tady je potřeba upravit data, pokud se vrátí multiselect, jako ["value", "value"] a input jako [string] */
    if (Array.isArray(data.data)) {
        data.data = data.data.map((item) => {
            if (
                item.type === 'multiSelect'
                && Array.isArray(item.initialValue)
                && Array.isArray(item.options)
            ) {
                item.initialValue = item.options.filter((option) => item.initialValue.includes(option.value))
            } else if (item.type === 'inputSearch' && Array.isArray(item.initialValue)) {
                item.initialValue = item.initialValue.join('')
            }
            return item
        })
    }

    return data
})
