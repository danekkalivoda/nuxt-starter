export const useJobsData = <T>(initialKey = 'jobs', initialUrl = '/api/jobs', id?: string) => {
    const route = useRoute()
    const url = ref(initialUrl)
    const key = ref(initialKey)

    const { data, refresh, status } = useAsyncData<T>(
        key.value,
        () => {
            const params = { ...route.query }
            if (id) {
                params.id = id
            }
            return $fetch(
                url.value,
                {
                    params,
                },
            )
        },
    )

    return { data,
        refresh,
        status }
}
