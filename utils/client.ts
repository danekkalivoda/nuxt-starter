import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

const camelCaseToKebabCase = (str) => {
    return str
        .replace(
            /([a-z])([A-Z])/g,
            '$1-$2',
        )
        .replace(
            /([A-Z])([A-Z][a-z])/g,
            '$1-$2',
        )
        .toLowerCase();
};

export const iconSetMapping = {
    Tb: 'tabler',
    Io: 'ion',
    Md: 'mdi',
    Ri: 'remix',
    Ti: 'typicons',
};

export const formatIconName = (iconPackage: 'tabler', iconName: string) => {
    if (!iconString || typeof iconString !== 'string') {
        console.warn(`Neplatný název ikony: ${iconString}`);
        return null;
    }

    const prefix = iconString.substring(
        0,
        2,
    );
    const iconSet = iconSetMapping[prefix];

    if (!iconSet) {
        console.warn(`Neznámý prefix: ${prefix}`);
        return null;
    }

    const iconNameCamel = iconString.substring(2);
    const iconNameKebab = camelCaseToKebabCase(iconNameCamel);

    return `${iconSet}:${iconNameKebab}`;
};

export const isAbsoluteUrl = (url: string): boolean => {
    return (/^https?:\/\//i).test(url);
};

export const getUrl = (url: string, locale: string) => {
    if (isAbsoluteUrl(url)) {
        return url;
    } else if (url !== null) {
        if (url === '/') {
            return locale === 'cs-CZ' ? '/' : '/' + locale;
        }
        return locale === 'cs-CZ' ? '/' + url : '/' + locale + '/' + url;
    }
    return undefined;
};
