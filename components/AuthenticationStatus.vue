<script lang="ts" setup>
const { status, data, signOut, signIn } = useAuth();
</script>

<template>
  <div class="w-full max-w-5xl mx-auto px-5 py-4 border-b text-sm">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <img
          v-if="status === 'authenticated' && data?.user?.image"
          class="w-8 h-8 rounded-full"
          :src="data.user.image"
          alt="User Avatar"
        />
        <div v-if="status === 'authenticated'">
          Přihlášený: {{ data?.user?.name }}
        </div>
        <div v-else>Nepřihlášený</div>
      </div>
      <button
        v-if="status === 'authenticated'"
        class="flex items-center justify-center space-x-2 bg-red-500 text-white rounded-lg py-2 px-3 text-sm"
        @click="signOut({ callbackUrl: '/' })"
      >
        <span>Odhlásit</span>
      </button>
      <button
        v-else
        class="flex items-center justify-center space-x-2 bg-brand-500 text-white rounded-lg py-2 px-3 text-sm"
        @click="signIn()"
      >
        <span>Přihlásit</span>
      </button>
    </div>
  </div>
</template>
