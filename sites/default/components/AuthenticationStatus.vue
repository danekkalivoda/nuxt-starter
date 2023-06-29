<script lang="ts" setup>
const { status, data, signOut, signIn } = useAuth();
</script>

<template>
    <div class="bg-gray-100">
        <div class="mx-auto w-full max-w-7xl px-6 py-1 text-base lg:px-8">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <div v-if="status === 'authenticated'">Přihlášený: {{ data?.user?.name }}</div>
                    <div v-else>Nepřihlášený</div>
                </div>
                <Button
                    v-if="status === 'authenticated'"
                    theme="danger"
                    size="small"
                    @click="signOut({ callbackUrl: '/' })"
                >
                    Odhlásit
                </Button>
                <Button v-else size="small" @click="signIn()"> Přihlásit </Button>
            </div>
        </div>
    </div>
</template>
