import CredentialsProvider from 'next-auth/providers/credentials';
import { NuxtAuthHandler } from '#auth';
const config = useRuntimeConfig();

export default NuxtAuthHandler({
    secret: config.private.NUXT_SECRET,
    providers: [
        CredentialsProvider.default({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: { username: string; password: string }) {
                const body = JSON.stringify({
                    identifier: credentials.username,
                    password: credentials.password,
                });
                const response: Response = await fetch(`${config.private.STRAPI_BASE_URL}/api/auth/local`, {
                    method: 'POST',
                    headers: {
                        Accept: '*/*',
                        'Content-Type': 'application/json',
                        'Accept-Encoding': 'gzip, deflate, br',
                    },
                    body: body,
                });

                if (response.ok) {
                    const data = await response.json();
                    const u = { id: data.id, name: data.user.username, email: data.jwt };
                    return u;
                } else {
                    const data = await response.json();
                    console.log(data);

                    throw createError({ statusCode: 401, message: 'Unauthorized' });
                }
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin',
        error: '/auth/signin',
    },
});
