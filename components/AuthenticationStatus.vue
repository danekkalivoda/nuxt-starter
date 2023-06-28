<script lang="ts" setup>
const { status, data, signOut, signIn } = useAuth();
</script>

<template>
    <div class="bg-gray-100">
        <div class="mx-auto w-full max-w-7xl px-6 py-1 text-sm lg:px-8">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <div v-if="status === 'authenticated'">Přihlášený: {{ data?.user?.name }}</div>
                    <div v-else>Nepřihlášený</div>
                </div>
                <button
                    v-if="status === 'authenticated'"
                    class="flex items-center justify-center space-x-2 rounded-lg bg-red-500 px-3 py-2 text-sm text-white"
                    @click="signOut({ callbackUrl: '/' })"
                >
                    <span>Odhlásit</span>
                </button>
                <button
                    v-else
                    class="bg-brand-500 flex items-center justify-center space-x-2 rounded-lg px-3 py-2 text-sm text-white"
                    @click="signIn()"
                >
                    <span>Přihlásit</span>
                </button>
            </div>
        </div>
    </div>
</template>
