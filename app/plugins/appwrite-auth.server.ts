import { defineNuxtPlugin, useCookie } from "#imports";
import { SESSION_COOKIE } from "~~/server/lib/appwrite";
import { useAuthStore } from "@/stores/auth";

export default defineNuxtPlugin(async (nuxtApp) => {
    try {
        const authStore = useAuthStore();
        const sessionToken = useCookie<string | null>(SESSION_COOKIE);

        if (sessionToken.value) {
            try {
                console.log("(plugins) sessionToken found");
                authStore.updateAuthStatus(sessionToken.value);
                console.log("(plugins) updated Auth Status");
                //await authStore.getUser();
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
                //authStore.updateAuthStatus(sessionToken.value);

                //await authStore.checkAuthStatus();
            }
        });
    } catch (error) {
        console.error("Error in auth plugin:", error);
    }
});
