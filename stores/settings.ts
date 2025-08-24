import { defineStore } from "pinia";
import { useAppConfig } from "#imports";

export const useSettingsStore = defineStore("settings", () => {
    const appConfig = useAppConfig();

    const defaultSettings = [appConfig.ui.primary, appConfig.ui.gray];

    const cookieSettings = useCookie("ui-settings", {
        default: () => defaultSettings,
        watch: true,
    });

    // Reaktive Referenzen für die Farben
    const primaryColor = ref(cookieSettings.value[0]);
    const grayColor = ref(cookieSettings.value[1]);

    // Funktion zum Aktualisieren der Einstellungen
    function updateSettings() {
        cookieSettings.value = [primaryColor.value, grayColor.value];
        appConfig.ui.primary = primaryColor.value;
        appConfig.ui.gray = grayColor.value;
    }

    function changeColor(newColor) {
        primaryColor.value = newColor;
        updateSettings();
        console.log("Primärer Farbwert aktualisiert", primaryColor.value);
    }

    function changeGrayColor(newGrayColor) {
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
