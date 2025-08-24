<template>
    <ProfileHeader />
    <section class="py-16">
        <UContainer class="space-y-4 max-w-(--breakpoint-sm) mx-auto">
            <UCard>
                <template #header>
                    <h1 class="text-2xl">Profile</h1>
                </template>

                <div v-if="auth2Store.isLoading">Lade Benutzerdaten...</div>
                <div v-else-if="!auth2Store.isAuthenticated" class="space-y-4">
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
                <div v-else-if="auth2Store.isAuthenticated && auth2Store.user">
                    <ProfileInfo class="mb-8" />
                    <p>Willkommen {{ auth2Store?.user?.name }}</p>
                    <pre>{{ auth2Store?.user }}</pre>
                </div>
                <div v-else>Keine Benutzerinformationen vorhanden.</div>
            </UCard>
        </UContainer>
    </section>
</template>

<script setup lang="ts">
const auth2Store = useAuth2Store();
</script>
