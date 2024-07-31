<script lang="ts" setup>
const { status, data, signOut, signIn } = useAuth();
</script>

<template>
    <div class="bg-gray-100">
        <div class="mx-auto w-full max-w-7xl px-6 py-2 text-base lg:px-8">
            <div class="flex items-center justify-between text-sm">
                <div class="flex items-center space-x-2">
                    <div v-if="status === 'authenticated'" class="flex items-center gap-2 text-gray-500">
                        <Icon name="ion:person-circle-outline" class="h-5 w-5 text-gray-400 transition-transform" />
                        <span>
                            Přihlášený:
                            <strong class="font-medium text-gray-900">{{ data?.user?.name }}</strong>
                        </span>
                    </div>
                    <div v-else class="text-gray-400">Nepřihlášený</div>
                </div>
                <Button
                    v-if="status === 'authenticated'"
                    theme="danger"
                    size="xsmall"
                    @click="signOut({ callbackUrl: '/' })"
                >
                    Odhlásit
                </Button>
                <Button v-else size="xsmall" @click="signIn('credentials', { callbackUrl: '/' })"> Přihlásit </Button>
            </div>
        </div>
    </div>
</template>
