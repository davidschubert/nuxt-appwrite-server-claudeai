import { SESSION_COOKIE, createAdminClient } from "~~/server/lib/appwrite";

export default defineEventHandler(async (event) => {
    // Extract the form data
    const formData = await readFormData(event);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Create the Appwrite client.
    const { account } = createAdminClient();

    // Create the session using the client
    const session = await account.createEmailPasswordSession(email, password);

    // Set the session cookie with the secret
    setCookie(event, SESSION_COOKIE, session.secret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: Math.max(1, Math.floor((new Date(session.expire).getTime() - Date.now()) / 1000)),
        path: "/",
    });

    // Redirect to the account page.
    await sendRedirect(event, "/account");
});
