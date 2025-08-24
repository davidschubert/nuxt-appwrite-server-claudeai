import { ID } from "node-appwrite";
import { SESSION_COOKIE, createAdminClient } from "~~/server/lib/appwrite";

export default defineEventHandler(async (event) => {
    // Body des Formulars auslesen
    const body = await readBody(event);
    const { name, email, password } = body;

    // E-Mail und Passwort überprüfen
    if (!email || !password) {
        return { success: false, error: "Email and password are required" };
    }

    // Admin-Client erstellen und Anmeldung durchführen
    try {
        // Admin-Client erstellen
        const { account } = createAdminClient();

        // Neuen Appwrite User estellen
        const user = await account.create(ID.unique(), email, password, name);

        // Den neu angelegten User einloggen
        const session = await account.createEmailPasswordSession(
            email,
            password
        );

        // Appwrite Session-Cookie setzen
        setCookie(event, SESSION_COOKIE, session.secret, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            // maxAge expects seconds; Appwrite's expire is ISO date
            maxAge: Math.max(1, Math.floor((new Date(session.expire).getTime() - Date.now()) / 1000)),
            path: "/",
        });

        return { success: true, user, session };
    } catch (error) {
        // Fehlerbehandlung
        console.error("Registration error:", error);
        return { success: false, error: (error as Error).message };
    }
});
