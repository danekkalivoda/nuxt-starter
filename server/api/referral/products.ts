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

    const baseUrl = 'http://localhost:3002/api2/career-jobs/referral/products'

    /*
     *     if (query.filtersTab === 'candidates' && !query.id) {
     *      baseUrl = `${baseUrl}/referral/candidates`
     *      delete query.filtersTab
     *     }    
     */

    const url = `${baseUrl}?${queryString}`

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
    return data
})
