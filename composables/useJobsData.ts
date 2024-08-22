export const useJobsData = <T>(initialKey = 'jobs', initialUrl = '/api/jobs') => {
    const route = useRoute()
    const url = ref(initialUrl)
    const key = ref(initialKey)

    const { data, refresh, status } = useAsyncData<T>(
        key.value,
        () => $fetch(
            url.value,
            {
                params: route.query,
            },
        ),
    )

    return { data,
        refresh,
        status }
}
