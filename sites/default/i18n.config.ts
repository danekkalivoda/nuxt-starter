export default defineI18nConfig(() => ({
    legacy: false,
    lazy: true,
    locale: "cs-CZ",
    fallbackLocale: "cs-CZ",
    skipSettingLocaleOnNavigate: true,
    messages: {
        "cs-CZ": {
            welcome: "Vítejte",
        },
        en: {
            welcome: "Welcome",
        },
    },
}));
