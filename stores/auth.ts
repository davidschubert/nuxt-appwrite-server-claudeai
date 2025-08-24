import { defineStore } from "pinia";
import type { User } from "~~/types/user";

export const useAuthStore = defineStore("auth", () => {
    // State
    const user = ref<User | null>(null);
    const isLoading = ref(true);

    // Getters
    const isAuthenticated = computed(() => !!user.value);

    // Actions
    const checkAuth = async () => {
        console.log("%c(stores/auth) Starting Auth check", "color: lime;");
        isLoading.value = true;

        try {
            const data = await $fetch("/api/appwrite/user");
            console.log("Data Log:", data);
            console.log("Data Success Log:", data.success);
            console.log("Data User Log:", data.user);

            if (data.success) {
                user.value = data.user;
            } else {
                user.value = null;
            }
        } catch (error) {
            console.error("(stores/auth.ts) Auth check failed:", error);
            logout();
        } finally {
            isLoading.value = false;
        }
    };

    const logout = () => {
        user.value = null;
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        checkAuth,
        logout,
    };
});
