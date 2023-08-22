<script lang="ts" setup>
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
interface Locale {
    code: string;
    name: string;
}
const router = useRouter();
const handleLocaleChange = (newLocale: string) => {
    router.push({ path: switchLocalePath(newLocale) });
};
const initialValue = ref();
const availableLocales = computed(() => locales.value as Locale[]);
const options = computed(() =>
    availableLocales.value.map((l: Locale) => ({
        label: l.name,
        value: l.code,
    }))
);
onMounted(() => {
    initialValue.value = locale.value;
});
</script>

<template>
    <div v-if="options.length > 0">
        <Select
            :options="options"
            :initial-value="initialValue"
            @update:initial-value="(value) => handleLocaleChange(value)"
        />
    </div>
</template>
