export default defineNuxtPlugin(async (nuxtApp) => {
    /*     const mycookie = useCookie("MY_COOKIE");
    console.log("(plugins) myCookie:", mycookie.value); */

    const userStore = useUserStore();
    /* console.log("(plugins) myToken:", userStore.myToken); */

    if (!userStore.myUser) {
        await userStore.fetchCustomer();
    } else {
        console.log("(plugins) userStore.myUser", userStore.myUser.firstName);
    }
});
