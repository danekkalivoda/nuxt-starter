<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});
const { signIn } = useAuth();
const loginForm = ref();
const onLogin = (e: Event) => {
  e.preventDefault();
  const formData = new FormData(loginForm.value);
  const username = formData.get("username");
  const password = formData.get("password");
  signIn("credentials", { username, password });
};
</script>
<template>
  <div>
    <form
      ref="loginForm"
      class="flex flex-col gap-4 p-4"
      @submit="($event) => onLogin($event)"
    >
      <input name="username" type="text" class="border form-input" />
      <input name="password" type="password" class="border form-input" />
      <button type="submit">login</button>
    </form>
  </div>
</template>
