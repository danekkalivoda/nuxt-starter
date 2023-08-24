import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
const config = useRuntimeConfig();

export default NuxtAuthHandler({
    secret: config.private.NUXT_SECRET,
    providers: [
        CredentialsProvider.default({
            name: "Credentials",
            credentials: {},
            async authorize(credentials: any) {
                const body = JSON.stringify({
                    identifier: credentials.username,
                    password: credentials.password,
                });
                console.log(body);
                console.log(`${config.private.STRAPI_BASE_URL}/api/auth/local`);

                const response: any = await fetch(`${config.private.STRAPI_BASE_URL}/api/auth/local`, {
                    method: "POST",
                    headers: {
                        /* Authorization: `Bearer ${config.private.NUXT_SECRET}`, */
                        Accept: "*/*",
                        "Content-Type": "application/json",
                        "Accept-Encoding": "gzip, deflate, br",
                    },
                    body: JSON.stringify({
                        identifier: credentials.username,
                        password: credentials.password,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const u = { id: data.id, name: data.user.username, email: data.jwt };
                    return u;
                } else {
                    const data = await response.json();
                    console.log(data);

                    throw createError({ statusCode: 401, message: "Unauthorized" });
                    /* if (response.status === 400) {
                        throw new Error("Špatné jméno nebo heslo");
                    }
                    return null; */
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        error: "/auth/signin",
    },
});
