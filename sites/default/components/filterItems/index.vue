<script setup lang="ts">
import type { IFilterItem } from '~/sites/default/types/pages';
const props = defineProps<{ items: IFilterItem[]; dark?: boolean }>();
</script>
<template>
    <div
        v-for="item in props.items"
        :key="item.id"
        class="inline-flex items-center gap-x-2 gap-y-2"
    >
        <Icon
            v-if="item?.iconName"
            :name="`${item.iconPackage}:${item.iconName}`"
            class="size-6 shrink-0"
        ></Icon>
        <div
            v-if="item?.title"
            :class="dark ? 'text-white/50' : 'text-black/50'"
        >
            {{ item.title }}:
        </div>
        <div
            v-for="(v, index) in item.values"
            :key="v.id"
            class="inline-flex gap-x-2"
        >
            <div
                class="inline"
                :class="dark ? 'text-white' : 'text-gray-900'"
            >
                {{ v.value }}<span v-if="index < item.values.length - 1">,</span>
            </div>
        </div>
    </div>
</template>
