import { SESSION_COOKIE } from "~~/server/lib/appwrite";

export default defineNuxtRouteMiddleware(async (to, from) => {
    // @ts-ignore - auto-import by Nuxt
    const auth2Store = useAuth2Store();

    if (!auth2Store.isAuthenticated && !auth2Store.isLoading) {
        try {
            // @ts-ignore - auto-import by Nuxt
            const sessionToken = useCookie(SESSION_COOKIE);
            if (sessionToken.value) {
                auth2Store.updateAuthStatus(sessionToken.value);
                // await auth2Store.getUser();
            } else {
                return navigateTo("/account/login");
            }
        } catch (error) {
            return navigateTo("/account/login");
        }
    }
});
