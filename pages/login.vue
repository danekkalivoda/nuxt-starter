<script setup lang="ts">
import FormFields from "~/recruitis-shared/components/forms/formFields.vue";
definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/",
    },
});
const { signIn } = useAuth();
const loginForm = ref();
const fields = ref([
    {
        name: "username",
        type: "input",
        lang: {
            placeholder: "Vaše uživatelské jméno",
        },
        message: {
            type: "error",
            text: "Toto pole je povinné, vyplňte jej prosím.",
        },
        id: "username",
    },
    {
        name: "password",
        type: "password",
        lang: {
            placeholder: "Vaše heslo",
        },
        message: {
            type: "error",
            text: "Toto pole je povinné, vyplňte jej prosím.",
        },
        id: "username",
    },
]);
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
        <form ref="loginForm" class="mx-auto flex max-w-4xl flex-col gap-4 p-4" @submit="($event) => onLogin($event)">
            <FormFields :fields="fields" :controlled="false" />
            <Button type="submit" theme="primary"> login </Button>
        </form>
    </div>
</template>
