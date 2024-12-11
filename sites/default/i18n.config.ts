export default defineI18nConfig(() => ({
    legacy: false,
    lazy: true,
    locale: 'cs-CZ',
    fallbackLocale: 'cs-CZ',
    messages: {
        'cs-CZ': {
            welcome: 'Vítejte',
            strapiErrors: {
                'identifier is a required field': 'E-mail je povinné pole',
                'password is a required field': 'Heslo je povinné pole',
                'Invalid identifier or password': 'Neplatné přihlašovací údaje',
                '2 errors occurred': 'Vyplňte prosím e-mail a heslo',
            },
            referral: {
                modal: {
                    confirmation: 'Opravdu chcete uplatnit <strong>{credits} {currency}</strong> za položku <strong>{title}</strong>?',
                },
            },
        },
        'en': {
            welcome: 'Welcome',
            strapiErrors: {
                'identifier is a required field': 'E-mail is required field',
                'password is a required field': 'Password is required field',
                'Invalid identifier or password': 'Invalid user name or password',
                '2_errors_occurred': 'Please enter email and password',
            },
            referral: {
                modal: {
                    confirmation: 'Opravdu chcete uplatnit <strong>{credits} {currency}</strong> za položku <strong>{title}</strong>?',
                },
            },
        },
    },
}));
