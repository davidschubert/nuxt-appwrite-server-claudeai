import { defineNuxtPlugin, useCookie } from "#imports";
import { SESSION_COOKIE } from "~~/server/lib/appwrite";
import { useAuth2Store } from "@/stores/auth2";

export default defineNuxtPlugin(async (nuxtApp) => {
    try {
        const auth2Store = useAuth2Store();
        const sessionToken = useCookie<string | null>(SESSION_COOKIE);

        if (sessionToken.value) {
            try {
                console.log("(plugins) sessionToken found");
                auth2Store.updateAuthStatus(sessionToken.value);
                console.log("(plugins) updated Auth Status");
                //await auth2Store.getUser();
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        } else {
            //console.log("(plugins) sessionToken not found");
        }

        nuxtApp.hook("app:created", async () => {
            //console.log("(plugins) test 2");
            if (sessionToken.value) {
                console.log("(plugins) getUser 2");
                //auth2Store.updateAuthStatus(sessionToken.value);

                //await auth2Store.checkAuthStatus();
            }
        });
    } catch (error) {
        console.error("Error in auth plugin:", error);
    }
});
