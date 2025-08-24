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
			const data = await $fetch<{ user: User }>("/api/appwrite/user");
			console.log("Data Log:", data);
			console.log("Data User Log:", data.user);
			user.value = data.user as any;
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
