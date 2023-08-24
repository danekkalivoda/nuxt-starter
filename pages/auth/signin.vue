<script setup lang="ts">
definePageMeta({ auth: false });
const { signIn, signOut, data, status, getSession, getCsrfToken, getProviders } = await useAuth();
const providers = await getProviders();
const crsf = await getCsrfToken();

let credentials = reactive({
    username: "",
    password: "",
});

const logIn = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
        callbackUrl: "/protected/globally",
        redirect: true,
        username: credentials.username,
        password: credentials.password,
    });
};
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="gray"
                            class="bi bi-eye absolute right-3 top-1/2 -translate-y-1/2"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                            />
                            <path
                                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                            />
                        </svg>
                    </div>

                    <button class="rounded-xl bg-[#002D74] py-2 text-white duration-300 hover:scale-105" @click="logIn">
                        Sign in (Credential Flow)
                    </button>
                </form>
            </div>
        </div>

    </section>
</template>
