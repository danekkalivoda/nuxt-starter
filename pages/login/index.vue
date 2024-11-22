<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { useNotification } from 'naive-ui'
import Input from '~/recruitis-shared/components/forms/input.vue'
import Button from '~/sites/default/components/Button.vue'

const { t } = useI18n()

const { $router: router } = useNuxtApp()
const { signIn, signOut, data, status, getCsrfToken } = await useAuth()
const crsf = await getCsrfToken()
const notification = useNotification()
const errorMessage = ref('')
const loading = ref(false)
const credentials = reactive({
    username: '',
    password: '',
})

const logIn = async () => {
    loading.value = true
    const res = await signIn(
        'credentials',
        {
            callbackUrl: '/login',
            redirect: false,
            username: credentials.username,
            password: credentials.password,
        },
    )
    if (res && !res.error) {
        loading.value = false
        router.push('/')
    } else if (res && res.error) {
        notification.error({
            title: 'Chyba',
            content: t(`strapiErrors.${res.error}`),
            duration: 5000,
        })
        loading.value = false
    }
}
</script>

<template>
    <div
        class="relative border-t border-gray-100 py-4"
    >
        <div
            v-if="status === 'authenticated' && !loading"
            class="container flex max-w-md flex-col items-center gap-4"
        >
            <div>
                Přihlášený: <strong class="font-medium text-gray-900">{{ data?.user?.name }}</strong>
            </div>
            <Button
                theme="danger"
                @click="signOut({ callbackUrl: '/login' })"
            >
                Odhlásit
            </Button>
        </div>
        <template v-else>
            <div
                v-if="errorMessage"
                class="container max-w-md"
            >
                <div

                    class="text-red-500"
                >
                    {{ errorMessage }}
                </div>
            </div>
            <form
                class="container flex max-w-md flex-col gap-4"
                @submit.prevent="logIn"
            >
                <input
                    v-model="crsf"
                    name="csrfToken"
                    type="hidden"
                >
                <Input
                    v-model:initial-value="credentials.username"
                    type="text"
                    name="email"
                    placeholder="Email"
                    :disabled="loading"
                ></Input>
                <Input
                    v-model:initial-value="credentials.password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    :disabled="loading"
                ></Input>
                <Button
                    type="submit"
                    theme="primary"
                    :disabled="loading"
                >
                    <div
                        v-if="loading"
                        class="loader mr-2 size-3 border-2 border-white"
                    ></div>Sign in
                </Button>
            </form>
        </template>
    </div>
</template>
