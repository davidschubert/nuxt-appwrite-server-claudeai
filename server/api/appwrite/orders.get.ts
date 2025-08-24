import { defineEventHandler, getCookie, createError } from "h3";
import { SESSION_COOKIE, createSessionClient } from "~~/server/lib/appwrite";

export default defineEventHandler(async (event) => {
    const sessionToken = getCookie(event, SESSION_COOKIE);

    if (!sessionToken) {
        throw createError({
            statusCode: 401,
            statusMessage: "Access Denied: Authorization Required",
        });
    }

    try {
        const { databases } = createSessionClient(sessionToken);
        const { documents: orders, total } = await databases.listDocuments(
            process.env.NUXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NUXT_PUBLIC_APPWRITE_COLLECTION_ORDERS!
        );

        return { orders, total };
    } catch (error) {
        throw createError({
            statusCode: 403,
            statusMessage:
                "The current user is not authorized to perform the requested action.",
        });
    }
});
