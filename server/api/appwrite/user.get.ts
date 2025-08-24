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
        const { account } = createSessionClient(sessionToken);
        const currentUser = await account.get();

        return {
            user: {
                id: currentUser.$id,
                name: currentUser.name,
                email: currentUser.email,
                $createdAt: currentUser.$createdAt,
                $updatedAt: currentUser.$updatedAt,
                registration: currentUser.registration,
                accessedAt: currentUser.accessedAt,
                labels: currentUser.labels,
                phone: currentUser.phone,
                emailVerification: currentUser.emailVerification,
                phoneVerification: currentUser.phoneVerification,
                mfa: currentUser.mfa,
                prefs: currentUser.prefs,
            },
        };
    } catch (error) {
        console.error("(server/api/appwrite/user) Auth check error:", error);

        return {
            user: null,
            error: `(server/api/appwrite/user) An unexpected error occurred: ${
                (error as Error).message
            }`,
        };
    }
});
