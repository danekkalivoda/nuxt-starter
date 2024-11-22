import type { NotificationProviderProps } from 'naive-ui'

type NotificationProviderThemeOverrides = NotificationProviderProps['themeOverrides']
export const i18n = {
    defaultLocale: 'cs-CZ',
    locales: [
        {
            code: 'cs-CZ',
            name: 'CZ',
        },
    ],
    vueI18n: './sites/default/i18n.config.ts',
}
export const googleFonts = {
    families: {
        'Onest': {
            wght: [
                300,
                400,
                600,
                700,
            ],
        },
        'DM+Serif+Display': {
            wght: [400],
        },
    },
}
export const componentsPaths = [
    '~/sites/groupon/components',
    '~/sites/default/components',
    '~/sites/groupon/pages',
    '~/sites/default/pages',
]
export const notificationThemeOverrides: NotificationProviderThemeOverrides = {
    color: 'var(--tw-white)',
    textColor: 'var(--tw-gray-600)',
    headerTextColor: 'var(--tw-gray-900)',
    borderRadius: '8px',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
}
