export default defineNuxtRouteMiddleware(async (to, from) => {
    const authCookie = useCookie("MY_COOKIE");
    if (!authCookie.value) {
        console.log(
            "%c(already-auth) KEIN myCookie",
            "color: red;",
        );
        //console.log("Weiterleitung zum Login");
        //return await navigateTo("/my");
    } else {
        console.log(
            "%c(already-auth) myCookie:",
            "color: lime;",
            authCookie.value
        );
    }

    const userStore = useUserStore();
    if (!userStore.myToken) {
        console.log(
            "%c(already-auth) KEIN myToken",
            "color: red;",
        );
    } else {
        console.log(
            "%c(already-auth) myToken:",
            "color: lime;",
            userStore.myToken
        );
    }

    if (!!userStore.myUser) {
        console.log(
            "%c(already-auth) myUser:",
            "color: lime;",
            userStore.myUser.firstName
        );
        //console.log("Weiterleitung zum Profil");
        //return await navigateTo("/my/profile");
    } else {
        console.log("%c(already-auth) KEIN myUser", "color: red;");
    }
});
