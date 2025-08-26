<script setup lang="ts">
definePageMeta({
    middleware: ["appwrite-auth-protected"],
});

const authStore = useAuthStore();
</script>

<template>
    <section class="py-16">
        <UContainer class="dark:bg-gray-900">
            <div v-if="authStore.isLoading">Lade Benutzerdaten...</div>
            <div v-else-if="authStore.user">
                <p>Willkommen {{ authStore?.user?.name }}</p>
                <p>{{ authStore?.user?.name }}</p>
                <pre>{{ authStore?.user }}</pre>
            </div>
            <div v-else>Keine Benutzerinformationen vorhanden.</div>
        </UContainer>
    </section>
</template>
