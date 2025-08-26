import { SESSION_COOKIE } from "~~/server/lib/appwrite";

export default defineNuxtRouteMiddleware(async (to, from) => {
    // @ts-ignore - auto-import by Nuxt
    const authStore = useAuthStore();

    if (!authStore.isAuthenticated && !authStore.isLoading) {
        try {
            // @ts-ignore - auto-import by Nuxt
            const sessionToken = useCookie(SESSION_COOKIE);
            if (sessionToken.value) {
                authStore.updateAuthStatus(sessionToken.value);
                // await authStore.getUser();
            } else {
                return navigateTo("/account/login");
            }
        } catch (error) {
            return navigateTo("/account/login");
        }
    }
});
