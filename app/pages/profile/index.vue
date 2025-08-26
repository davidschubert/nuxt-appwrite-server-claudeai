<template>
    <ProfileHeader />
    <section class="py-16">
        <UContainer class="space-y-4 max-w-(--breakpoint-sm) mx-auto">
            <UCard>
                <template #header>
                    <h1 class="text-2xl">Profile</h1>
                </template>

                <div v-if="authStore.isLoading">Lade Benutzerdaten...</div>
                <div v-else-if="!authStore.isAuthenticated" class="space-y-4">
                    <p>
                        Bitte melde dich an oder registriere dich, um dein
                        Profil zu sehen.
                    </p>
                    <div class="space-x-2">
                        <UButton variant="outline" to="/account/login"
                            >Login</UButton
                        >
                        <UButton to="/account/signup">Register</UButton>
                    </div>
                </div>
                <div v-else-if="authStore.isAuthenticated && authStore.user">
                    <ProfileInfo class="mb-8" />
                    <p>Willkommen {{ authStore?.user?.name }}</p>
                    <pre>{{ authStore?.user }}</pre>
                </div>
                <div v-else>Keine Benutzerinformationen vorhanden.</div>
            </UCard>
        </UContainer>
    </section>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
</script>
