export default defineNuxtRouteMiddleware(async (to, from) => {
    const slug = Array.isArray(to.params.slug) ? to.params.slug[0] : to.params.slug || 'index'

    const splitSlug = (slug: string): { number: number | null
        rest: string } => {
        const match = slug.match(/^(\d+)(?:-(.+))?/)
        return match
            ? {
                    number: parseInt(
                        match[1],
                        10,
                    ),
                    rest: match[2] || '',
                }
            : { number: null,
                    rest: slug }
    }

    const { number, rest } = splitSlug(slug)

    if (number && rest === '') {
        try {
            const response = await useFetch(`/api/jobs?id=${number}`)
            const data = await response.data.value.data

            if (data && data.title) {
                const expectedSlug = data.title
                    .toLowerCase()
                    .replace(
                        /[^a-z0-9]+/g,
                        '-',
                    )
                    .replace(
                        /(^-|-$)/g,
                        '',
                    )

                if (rest !== expectedSlug) {
                    return navigateTo(
                        `/pozice/${number}-${expectedSlug}`,
                        { redirectCode: 301 },
                    )
                }
            }
        } catch (error) {
            console.error(
                'Error fetching job data:',
                error,
            )

            return navigateTo(
                '/404',
                { redirectCode: 404 },
            )
        }
    }
})
