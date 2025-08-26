<template>
    <NuxtLoadingIndicator />
    <NuxtLayout>
        <UApp>
            <NuxtPage />
        </UApp>
    </NuxtLayout>
</template>

<script setup>
// Auth
/* const authStore = useAuthStore();
onMounted(() => {
    authStore.checkAuthStatus();
}); */

// Color settings
const settingsStore = useSettingsStore();
const appConfig = useAppConfig();

// UI Colors nach Settings synchronisieren
appConfig.ui.colors.primary = settingsStore.primaryColor;
appConfig.ui.colors.neutral = settingsStore.grayColor;
</script>
