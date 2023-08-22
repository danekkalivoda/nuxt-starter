export default defineNuxtPlugin((nuxtApp) => {
    // called right before setting a new locale
    const myLocale = ref();
    nuxtApp.hook("i18n:beforeLocaleSwitch", ({ oldLocale, newLocale, initialSetup, context }) => {
        /* console.log("onBeforeLanguageSwitch", oldLocale, newLocale, initialSetup); */
    });

    // called right after a new locale has been set
    nuxtApp.hook("i18n:localeSwitched", ({ oldLocale, newLocale }) => {
        myLocale.value = newLocale;
        /* console.log("onLanguageSwitched", oldLocale, newLocale); */
    });
    return {
        provide: {
            myLocale: myLocale.value,
        },
    };
});
