<template>
    <NuxtLoadingIndicator />
    <NuxtLayout>
        <UApp>
            <NuxtPage />
        </UApp>
    </NuxtLayout>
    <UNotifications />
</template>

<script setup>
// Auth
/* const auth2Store = useAuth2Store();
onMounted(() => {
    auth2Store.checkAuthStatus();
}); */

// Color settings
const settingsStore = useSettingsStore();
const appConfig = useAppConfig();

// UI Colors nach Settings synchronisieren
appConfig.ui.colors.primary = settingsStore.primaryColor;
appConfig.ui.colors.neutral = settingsStore.grayColor;
</script>
