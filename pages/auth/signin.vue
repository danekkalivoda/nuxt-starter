<script setup lang="ts">
/* eslint-disable */
const { signIn, signOut, data, status, getSession, getCsrfToken, getProviders } = await useAuth();
const providers = await getProviders();
const crsf = await getCsrfToken();

let credentials = reactive({
    username: "",
    password: "",
});

const logIn = async (e) => {
    e.preventDefault();

    await signIn("credentials", {
        callbackUrl: "/protected/globally",
        redirect: true,
        username: credentials.username,
        password: credentials.password,
    });
};
/* eslint-enable */
</script>

<template>
    <section class="wrapper mx-auto my-6 grid items-center justify-center">
        <!-- login container -->
        <div
            class="mx-auto flex max-w-[60rem] items-center rounded-2xl bg-gray-100 p-5 shadow-xl duration-300 ease-in-out"
        >
            <!-- form -->
            <div class="px-8 md:px-16">
                <h2 class="text-2xl font-bold text-[#002D74]">Login</h2>
                <p class="mt-4 text-xs text-[#002D74]">
                    Strapi users can login with their username (or e-mail) and password.
                </p>

                <form class="flex flex-col gap-4">
                    <input v-model="crsf" name="csrfToken" type="hidden" />
                    <input
                        v-model="credentials.username"
                        class="mt-8 rounded-xl border p-2"
                        type="text"
                        name="email"
                        placeholder="Email"
                    />
                    <div class="relative">
                        <input
                            v-model="credentials.password"
                            class="w-full rounded-xl border p-2"
                            type="password"
                            name="password"
                            placeholder="Password"
                        />
                    </div>

                    <button class="rounded-xl bg-[#002D74] py-2 text-white duration-300 hover:scale-105" @click="logIn">
                        Sign in (Credential Flow)
                    </button>
                </form>
            </div>
        </div>
    </section>
</template>
