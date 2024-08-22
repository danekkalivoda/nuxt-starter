<script lang="ts" setup>
const { status, data, signOut, signIn } = useAuth()
</script>

<template>
    <div class="border-b border-gray-100">
        <div class="container py-2 text-base">
            <div class="flex items-center justify-between text-sm">
                <div class="flex items-center space-x-2">
                    <div
                        v-if="status === 'authenticated'"
                        class="flex items-center gap-2 text-gray-500"
                    >
                        <Icon
                            name="ion:person-circle-outline"
                            class="size-5 text-gray-400 transition-transform"
                        ></Icon>
                        <span>
                            Přihlášený:
                            <strong class="font-medium text-gray-900">{{ data?.user?.name }}</strong>
                        </span>
                    </div>
                    <div
                        v-else
                        class="text-gray-400"
                    >
                        Nepřihlášený
                    </div>
                </div>
                <Button
                    v-if="status === 'authenticated'"
                    theme="danger"
                    size="xsmall"
                    @click="signOut({ callbackUrl: '/' })"
                >
                    Odhlásit
                </Button>
                <Button
                    v-else
                    size="xsmall"
                    @click="signIn('credentials', { callbackUrl: '/' })"
                >
                    Přihlásit
                </Button>
            </div>
        </div>
    </div>
</template>
