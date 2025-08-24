import { SESSION_COOKIE, createSessionClient } from "~~/server/lib/appwrite";

export default defineEventHandler(async (event) => {
    const sessionToken = getCookie(event, SESSION_COOKIE);
    const { account } = createSessionClient(sessionToken || "");

    await account.deleteSession("current");
    deleteCookie(event, SESSION_COOKIE);

    await sendRedirect(event, "/tutorial/signup");
});
