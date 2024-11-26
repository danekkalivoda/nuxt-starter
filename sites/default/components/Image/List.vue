<script setup lang="ts">
import type { IImage } from '~/sites/default/types/pages';

const props = withDefaults(
    defineProps<{
        images: IImage[]
        size?: 'Small' | 'Medium' | 'Large'
    }>(),
    {
        size: 'Medium',
    },
);
const imgSizes = (image: IImage) => {
    const width = props.size === 'Small' ? image?.formats?.medium?.width / 2 : props.size === 'Medium' ? image?.formats?.large?.width / 1.5 : image?.width;
    const height = props.size === 'Small' ? image?.formats?.medium?.height / 2 : props.size === 'Medium' ? image?.formats?.large?.height / 1.5 : image?.height;
    const url = props.size === 'Small' ? image?.formats?.medium?.url : props.size === 'Medium' ? image?.formats?.large?.url : image?.url;
    return {
        width,
        height,
        url,
    };
};
</script>

<template>
    <div class="@container/imageList">
        <div class="grid gap-6">
            <div
                v-for="image in props.images"
                :key="image.id"
            >
                <img
                    :src="imgSizes(image).url"
                    :width="imgSizes(image).width"
                    :height="imgSizes(image).height"
                    class="mx-auto rounded"
                >
            </div>
        </div>
    </div>
</template>
