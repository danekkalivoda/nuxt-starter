import { groupParamsByKey } from "@/js/utils/common";

export const getUrlParamsAsObject = () => {
    const array = new URLSearchParams(window.location.search);
    const object = groupParamsByKey(array);
    return object;
};

export function addProtocol(url) {
    if (!/^(?:f|ht)tps?:\/\//.test(url)) {
        url = "https://" + url;
    }
    return url;
}

export const setUrlParamsFromObject = (obj, urlParams) => {
    for (const [key, value] of obj.entries()) {
        if (value) {
            urlParams.append(key, value);
        }
    }
};

export const pushParamsToUrl = (params: string) => {
    window.history.pushState({}, "", window.location.pathname + "?" + params);
};

export const siteUrl = (path: string) => {
    return document.location.protocol + "//" + document.location.host + "/" + path;
};
