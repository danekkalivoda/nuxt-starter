import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            name?: string | null
            email?: string | null
            image?: string | null
            surname?: string | null
            username?: string | null
            credits?: number
        }
    }
}
declare module 'next-auth/jwt' {
    interface JWT {
        sessionToken?: string
    }
}
