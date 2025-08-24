export default defineNuxtRouteMiddleware(async (to, from) => {
    const authCookie = useCookie("MY_COOKIE");
    if (!authCookie.value) {
        console.log("%c(protect-auth) KEIN myCookie:", "color: red;");
        //console.log("Weiterleitung zum Login");
        //return await navigateTo("/my");
    } else {
        console.log(
            "%c(protect-auth) myCookie:",
            "color: lime;",
            authCookie.value
        );
    }

    const userStore = useUserStore();
    if (!userStore.myToken) {
        console.log("%c(protect-auth) KEIN myToken:", "color: red;");
    } else {
        console.log(
            "%c(protect-auth) myToken:",
            "color: lime;",
            userStore.myToken
        );
    }

    userStore.fetchCustomer();
    if (!userStore.myUser) {
        console.log("%c(protect-auth) KEIN myUser:", "color: red;");
        console.log("Weiterleitung zum Login");
        //return await navigateTo("/my");
    } else {
        console.log(
            "%c(protect-auth) myUser:",
            "color: lime;",
            userStore.myUser.email
        );
    }
});
