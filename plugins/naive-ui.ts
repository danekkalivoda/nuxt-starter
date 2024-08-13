import { setup } from '@css-render/vue3-ssr';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
    if (process.server) {
        const { collect } = setup(nuxtApp.vueApp);
        const originalRenderMeta = nuxtApp.ssrContext?.renderMeta;
        if (!nuxtApp.ssrContext) {
            return;
        }
        nuxtApp.ssrContext.renderMeta = () => {
            if (!originalRenderMeta) {
                return {
                    headTags: collect(),
                };
            }
            const originalMeta = typeof originalRenderMeta === 'function' ? originalRenderMeta() : originalRenderMeta;
            if (originalMeta && typeof originalMeta.then === 'function') {
                return originalMeta.then((resolvedOriginalMeta: Record<string, unknown>) => {
                    return {
                        ...resolvedOriginalMeta,
                        headTags: (resolvedOriginalMeta.headTags as string) + collect(),
                    };
                });
            } else {
                return {
                    ...originalMeta,
                    headTags: (originalMeta.headTags as string) + collect(),
                };
            }
        };
    }
});
