import type { NotificationProviderProps } from 'naive-ui'

type NotificationProviderThemeOverrides = NotificationProviderProps['themeOverrides']
export const i18n = {
    defaultLocale: 'cs-CZ',
    locales: [
        {
            code: 'cs-CZ',
            name: 'CZ',
        },
        {
            code: 'en',
            name: 'EN',
        },
    ],
    vueI18n: './sites/default/i18n.config.ts',
}
export const googleFonts = {
    families: {
        Inter: {
            wght: [
                400,
                500,
                600,
                800,
            ],
        },
    },
}
export const componentsPaths = [
    '~/sites/default/components',
    '~/sites/default/pages',
]

export const notificationThemeOverrides: NotificationProviderThemeOverrides = {
    color: 'var(--tw-white)',
    textColor: 'var(--tw-gray-600)',
    headerTextColor: 'var(--tw-gray-900)',
    borderRadius: '8px',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
}
