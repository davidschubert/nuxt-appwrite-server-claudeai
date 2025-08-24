import { SESSION_COOKIE, createSessionClient } from "~~/server/lib/appwrite";

export default defineEventHandler(async (event) => {
    const sessionToken = getCookie(event, SESSION_COOKIE);

    if (!sessionToken) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized: No session cookie found",
        });
    }

    try {
        // Session beenden in Appwrite und lokalen Cookie Token löschen
        const { account } = createSessionClient(sessionToken);

        await account.deleteSession("current");
        deleteCookie(event, SESSION_COOKIE);

        return { success: true };
    } catch (error) {
        console.error("(server/api/logout.ts) Logout error:", error);
        const err = error as any;
        throw createError({ statusCode: 401, statusMessage: err?.message });
    }
});
