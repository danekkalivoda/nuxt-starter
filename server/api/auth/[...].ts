 
import CredentialsProvider from 'next-auth/providers/credentials';
import { NuxtAuthHandler } from '#auth';

const config = useRuntimeConfig();

export default NuxtAuthHandler({
    secret: config.private.NUXT_SECRET,
    providers: [
        CredentialsProvider.default({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials: {
                username: string
                password: string
            }) {
                const body = JSON.stringify({
                    identifier: credentials.username,
                    password: credentials.password,
                });
                const response: Response = await fetch(
                    `${config.private.STRAPI_BASE_URL}/api/auth/local`,
                    {
                        method: 'POST',
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'application/json',
                            'Accept-Encoding': 'gzip, deflate, br',
                        },
                        body: body,
                    },
                );

                if (response.ok) {
                    const data = await response.json();
                    const u = {
                        id: data.id,
                        name: data.user.name,
                        surname: data.user.surname,
                        username: data.user.username,
                        email: data.jwt,
                    };
                    return u;
                } else {
                    const data = await response.json();

                    throw createError({
                        statusCode: data.error.status,
                        message: data.error.message,
                    });
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.surname = user.surname;
                token.username = user.username;
                token.credits = user.credits;
            }
            return token;
        },
        async session({ session, token }) {
            // TODO: tady bych měl získat kredity pro konkrétního uživatele recruitisu
            return {
                ...session,
                user: {
                    ...session.user,
                    name: token.name,
                    surname: token.surname,
                    username: token.username,
                    email: session.user?.email,
                    credits: 11500,
                },
            };
        },
    },
    pages: {
        signIn: '/login',
    },
});
