export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();

    // Warte auf die Authentifizierungsprüfung
    //await authStore.checkAuthStatus();

    console.log("authStore.user.name", authStore.user?.name);
    console.log("authStore.isAuthenticated", authStore.isAuthenticated);

    if (
        (to.path === "/account/login" || to.path === "/account/signup") &&
        !!authStore.isAuthenticated
    ) {
        return navigateTo("/account/profile");
    }
});
