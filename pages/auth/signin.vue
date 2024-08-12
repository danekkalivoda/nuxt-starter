<script setup lang="ts">
import Input from '~/recruitis-shared/components/forms/input.vue';
import Button from '~/sites/default/components/Button.vue';
/* eslint-disable */
const { signIn, signOut, data, status, getSession, getCsrfToken, getProviders } = await useAuth();
const providers = await getProviders();
const crsf = await getCsrfToken();

let credentials = reactive({
  username: "",
  password: "",
});

const logIn = async (e: Event) => {
  e.preventDefault();

  await signIn("credentials", {
    callbackUrl: "/protected/globally",
    redirect: true,
    username: credentials.username,
    password: credentials.password,
  });
};

</script>

<template>
  <div class="border-t border-gray-100 pt-4">
  <form class="flex flex-col gap-4 max-w-md container">
    <input v-model="crsf" name="csrfToken" type="hidden" />
    <Input :initialValue="credentials.username" @update:initial-value="(value) => credentials.username = value" type="text" name="email" placeholder="Email" />
    <Input :initialValue="credentials.password" @update:initial-value="(value) => credentials.password = value" type="password" name="password" placeholder="Password" />
    <Button type="submit" theme="primary" @click="logIn">
      Sign in
    </Button>
  </form>
</div>
</template>
