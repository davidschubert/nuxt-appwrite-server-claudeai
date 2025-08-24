export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth2Store = useAuth2Store();

    // Warte auf die Authentifizierungsprüfung
    //await auth2Store.checkAuthStatus();

    console.log("auth2Store.user.name", auth2Store.user?.name);
    console.log("auth2Store.isAuthenticated", auth2Store.isAuthenticated);

    if (
        (to.path === "/account/login" || to.path === "/account/signup") &&
        !!auth2Store.isAuthenticated
    ) {
        return navigateTo("/account/profile");
    }
});
