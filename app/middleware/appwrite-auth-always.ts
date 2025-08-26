export default defineNuxtRouteMiddleware(async () => {
    // @ts-ignore Nuxt Auto-Import
    const authStore = useAuthStore();
    try {
        if (!authStore.isAuthenticated && !authStore.isLoading) {
            await authStore.getUser();
        }
    } catch (error) {
        // still allow navigation; optional: handle/log
        console.debug("(appwrite-auth-always) error:", error);
    }
});
