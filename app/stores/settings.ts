import { defineStore } from "pinia";
import { useAppConfig, useCookie } from "#imports";
import { ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
	const appConfig = useAppConfig();

	const defaultSettings = [appConfig.ui.colors.primary, appConfig.ui.colors.neutral];

	const cookieSettings = useCookie("ui-settings", {
		default: () => defaultSettings,
		watch: true,
	});

	// Reaktive Referenzen für die Farben
	const primaryColor = ref<string>(cookieSettings.value[0] as any);
	const grayColor = ref<string>(cookieSettings.value[1] as any);

	// Funktion zum Aktualisieren der Einstellungen
	function updateSettings() {
	cookieSettings.value = [primaryColor.value, grayColor.value] as any;
	appConfig.ui.colors.primary = primaryColor.value as any;
	appConfig.ui.colors.neutral = grayColor.value as any;
	}

	function changeColor(newColor: any) {
		primaryColor.value = newColor;
		updateSettings();
		console.log("Primärer Farbwert aktualisiert", primaryColor.value);
	}

	function changeGrayColor(newGrayColor: any) {
		grayColor.value = newGrayColor;
		updateSettings();
		console.log("Grauer Farbwert aktualisiert", grayColor.value);
	}

	// Initialisierung der App-Konfiguration
	updateSettings();

	return {
		primaryColor,
		grayColor,
		changeColor,
		changeGrayColor,
	};
});
