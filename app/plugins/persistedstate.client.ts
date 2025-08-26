import { defineNuxtPlugin } from "#app";
import { createPersistedState } from "pinia-plugin-persistedstate";

export default defineNuxtPlugin((nuxtApp) => {
	// Registriert das PersistedState-Plugin nur im Client
	(nuxtApp.$pinia as any).use(
		createPersistedState({
			// Standard: localStorage
		})
	);
});


