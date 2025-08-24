import { createAdminClient, SESSION_COOKIE } from "~~/server/lib/appwrite";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { email, password } = body;

    try {
        // Admin-Client erstellen und Anmeldung durchführen
        const { account } = createAdminClient();

        // Appwrite-Anmeldung durchführen
        const session = await account.createEmailPasswordSession(
            email,
            password
        );

        // Appwrite Session-Cookie setzen
        setCookie(event, SESSION_COOKIE, session.secret, {
            httpOnly: true,
            //secure: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            //sameSite: "lax",
            // maxAge expects seconds; Appwrite's expire is ISO date
            maxAge: Math.max(1, Math.floor((new Date(session.expire).getTime() - Date.now()) / 1000)),
            path: "/",
        });

        // Pinia Cookie setzen
        /* setCookie(event, "my-custom-key", "", {
            httpOnly: true,
            //secure: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            //sameSite: "lax",
            maxAge: new Date(session.expire).getTime(),
            path: "/",
        }); */

        return session;
    } catch (error) {
        console.error("(server/api/login.ts) Login error:", error);
        throw createError({
            statusCode: 401,
            statusMessage: (error as Error).message,
        });
    }
});
