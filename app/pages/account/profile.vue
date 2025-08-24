<script setup lang="ts">
definePageMeta({
    middleware: ["appwrite-auth-protected"],
});

const auth2Store = useAuth2Store();
</script>

<template>
    <section class="py-16">
        <UContainer class="dark:bg-gray-900">
            <div v-if="auth2Store.isLoading">Lade Benutzerdaten...</div>
            <div v-else-if="auth2Store.user">
                <p>Willkommen {{ auth2Store?.user?.name }}</p>
                <p>{{ auth2Store?.user?.name }}</p>
                <pre>{{ auth2Store?.user }}</pre>
            </div>
            <div v-else>Keine Benutzerinformationen vorhanden.</div>
        </UContainer>
    </section>
</template>
