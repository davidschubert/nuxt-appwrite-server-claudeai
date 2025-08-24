import { defineStore } from "pinia";
import type { Login, LoginResponse, LogoutResponse } from "~~/types/credentials";
import type { User } from "~~/types/user";

export const useAuth2Store = defineStore(
    "auth2",
    () => {
        // State
        const user = ref<User | null>(null);
        const isAuthenticated = ref(false);
        const isLoading = ref(false);

        // Actions
        const login = async (credentials: Login): Promise<boolean> => {
            isLoading.value = true;
            try {
                const session = await $fetch<LoginResponse>(
                    "/api/appwrite/login",
                    {
                        method: "POST",
                        body: credentials,
                    }
                );

                if (!session || !session.secret) {
                    throw new Error(
                        "Login failed: Invalid session data received"
                    );
                }
                updateAuthStatus(session.secret);
                return true;
            } catch (error) {
                console.error("Login error:", error);
                return false;
            } finally {
                isLoading.value = false;
            }
        };

        const logout = async (): Promise<boolean> => {
            isLoading.value = true;
            try {
                const success = await $fetch<LogoutResponse>(
                    "/api/appwrite/logout",
                    {
                        method: "POST",
                    }
                );

                if (success) {
                    user.value = null;
                    isAuthenticated.value = false;

                    return true;
                }

                return false;
            } catch (error) {
                console.error("Logout error:", error);
                return false;
            } finally {
                isLoading.value = false;
            }
        };

        const getUser = async (): Promise<boolean> => {
            isLoading.value = true;
            try {
                const { user: userData } = await $fetch<{ user: User }>(
                    "/api/appwrite/user",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (userData) {
                    user.value = { ...userData };
                    isAuthenticated.value = true;
                    return true;
                }

                await logout();
                return false;
            } catch (error) {
                console.error("Failed to fetch user:", error);
                await logout();
                return false;
            } finally {
                isLoading.value = false;
            }
        };

        const updateAuthStatus = (sessionToken: string): void => {
            isAuthenticated.value = !!sessionToken;
            //await checkAuthStatus();
        };

        const checkAuthStatus = async (): Promise<void> => {
            if (isAuthenticated.value) {
                try {
                    await getUser();
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        // Return the state and actions
        return {
            user,
            isAuthenticated,
            isLoading,
            login,
            logout,
            getUser,
            checkAuthStatus,
            updateAuthStatus,
        };
    },
    {
        persist: {
            key: "my-custom-key",
            paths: ["user", "isAuthenticated"],
            debug: true,
            beforeRestore: (ctx: any) => {
                console.log(`about to restore '${ctx.store.$id}'`);
            },
            afterRestore: (ctx: any) => {
                console.log(`just restored '${ctx.store.$id}'`);
            },
            // Fallback auf Standard-Storage (Client: localStorage). Cookie-Storage kann später ergänzt werden.
        },
    } as any
);
