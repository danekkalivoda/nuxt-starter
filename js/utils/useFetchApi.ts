import { BeforeFetchContext, createFetch } from "@vueuse/core";

declare const __RECRUITIS_API_TEMP_TOKEN: string;
declare const __RECRUITIS_CSRF_TOKEN: string;

const injectToken = function ({ options }: BeforeFetchContext) {
    // TODO: refresh token if expired
    const headers = new Headers(options.headers);
    if (typeof __RECRUITIS_API_TEMP_TOKEN !== "undefined") {
        headers.append("Authorization", `Bearer ${__RECRUITIS_API_TEMP_TOKEN}`);
    }

    return { options: { ...options, headers } };
};

export const useFetchRecruitisApi2 = createFetch({
    baseUrl: import.meta.env.VITE_API_ENDPOINT_PREFIX,
    options: {
        beforeFetch: injectToken,
        onFetchError(ctx) {
            if (ctx.data && ctx.data.meta) {
                ctx.error = ctx.data;
            }
            return ctx;
        },
    },
});
export const useFetchRecruitis = createFetch({
    options: {
        // eslint-disable-next-line require-await
        async beforeFetch({ options }) {
            const headers = new Headers(options.headers);
            if (typeof __RECRUITIS_CSRF_TOKEN !== "undefined") {
                headers.append("X-Csrf-Token", __RECRUITIS_CSRF_TOKEN);
                headers.append("X-Requested-With", "XMLHttpRequest");
            }

            return { options: { ...options, headers } };
        },
    },
});
