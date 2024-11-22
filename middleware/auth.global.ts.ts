import { defineNuxtRouteMiddleware } from '#app'

export default defineNuxtRouteMiddleware(async (to) => {
    if (to.path.startsWith('/portal/')) {
        await useAuth()
    }
})
