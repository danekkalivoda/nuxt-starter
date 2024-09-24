<script setup lang="ts">
import { textBlockClasses, proseClasses } from './styles'
import type { ITextBlock } from '~/sites/default/types/pages'

const props = defineProps<ITextBlock>()
</script>

<template>
    <div class="container">
        <div
            :class="textBlockClasses({
                width: props.width,
                centered: props.centered,
            })"
        >
            <Box v-if="props.boxed">
                <div
                    :class="proseClasses({ dark: (props.baseSettings.background === 'Dark' || props.baseSettings.background === 'Brand') && !props.boxed })"
                    v-html="props?.text"
                >
                </div>
            </Box>
            <div
                v-else
                :class="proseClasses({ dark: (props.baseSettings.background === 'Dark' || props.baseSettings.background === 'Brand') && !props.boxed })"
                v-html="props?.text"
            >
            </div>
        </div>
    </div>
</template>
