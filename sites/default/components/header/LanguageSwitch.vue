<script lang="ts" setup>
const { locale, locales, setLocale } = useI18n()

/* const switchLocalePath = useSwitchLocalePath(); */
interface Locale {
    code: string
    name: string
}
const router = useRouter()
const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale)
    const localeUrl = newLocale === 'cs-CZ' ? '' : newLocale
    router.push({ path: '/' + localeUrl })
}
const initialValue = ref()
const availableLocales = computed(() => locales.value as Locale[])
const options = computed(() => availableLocales.value.map((l: Locale) => ({
    label: l.name,
    value: l.code,
})))
onMounted(() => {
    initialValue.value = locale.value
})
</script>

<template>
    <div v-if="options.length > 0">
        <Select
            :options="options"
            :initial-value="initialValue"
            @update:initial-value="(value) => handleLocaleChange(value)"
        ></Select>
    </div>
</template>
