export default defineNuxtRouteMiddleware(async () => {
    // @ts-ignore Nuxt Auto-Import
    const auth2Store = useAuth2Store();
    try {
        if (!auth2Store.isAuthenticated && !auth2Store.isLoading) {
            await auth2Store.getUser();
        }
    } catch (error) {
        // still allow navigation; optional: handle/log
        console.debug("(appwrite-auth-always) error:", error);
    }
});
