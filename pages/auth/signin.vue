<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import Input from '~/recruitis-shared/components/forms/input.vue';
import Button from '~/sites/default/components/Button.vue';
const { signIn, signOut, data, status, getSession, getCsrfToken, getProviders } = await useAuth();
const providers = await getProviders();
const crsf = await getCsrfToken();

let credentials = reactive({
    username: '',
    password: '',
});

const logIn = async (e: Event) => {
    e.preventDefault();

    await signIn('credentials', {
        callbackUrl: '/protected/globally',
        redirect: true,
        username: credentials.username,
        password: credentials.password,
    });
};

</script>

<template>
    <div class="border-t border-gray-100 pt-4">
        <form class="container flex max-w-md flex-col gap-4">
            <input
                v-model="crsf"
                name="csrfToken"
                type="hidden"
            >
            <Input
                :initial-value="credentials.username"
                type="text"
                name="email"
                placeholder="Email"
                @update:initial-value="(value) => credentials.username = value"
            ></Input>
            <Input
                :initial-value="credentials.password"
                type="password"
                name="password"
                placeholder="Password"
                @update:initial-value="(value) => credentials.password = value"
            ></Input>
            <Button
                type="submit"
                theme="primary"
                @click="logIn"
            >
                Sign in
            </Button>
        </form>
    </div>
</template>
