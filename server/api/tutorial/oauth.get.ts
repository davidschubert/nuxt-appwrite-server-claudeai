import { SESSION_COOKIE, createAdminClient } from "~~/server/lib/appwrite";

export default defineEventHandler(async (event) => {
    // Extract the userId and secret from the URL query parameters
    const { userId, secret } = getQuery(event) as {
        userId?: string;
        secret?: string;
    };
    if (!userId || !secret) {
        return sendRedirect(event, "/tutorial/signup");
    }

    // Create the Appwrite client
    const { account } = createAdminClient();

    // Exchange the token userId and secret for a session
    const session = await account.createSession(userId as string, secret as string);

    // Set the session cookie
    setCookie(event, SESSION_COOKIE, session.secret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: Math.max(1, Math.floor((new Date(session.expire).getTime() - Date.now()) / 1000)),
        path: "/",
    });

    // Redirect the user to the account page
    await sendRedirect(event, "/tutorial/account");
});
