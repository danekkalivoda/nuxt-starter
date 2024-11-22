/**
 * Middleware pro dynamické přesměrování URL adres pozic
 *
 * Řeší následující scénáře:
 * 1. Pokud URL obsahuje pouze ID pozice (např. /pozice/123), přesměruje na plnou URL s názvem pozice
 * 2. Pokud pozice neexistuje, přesměruje na 404
 *
 * Funguje následovně:
 * 1. Rozdělí slug na číslo a text pomocí funkce splitSlug
 * 2. Pokud existuje číslo ale chybí text:
 *    - Načte data pozice z API
 *    - Vytvoří správný slug z názvu pozice
 *    - Přesměruje na plnou URL (např. /pozice/123-nazev-pozice)
 * 3. Při chybě přesměruje na 404
 */
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

            console.log(data)

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
