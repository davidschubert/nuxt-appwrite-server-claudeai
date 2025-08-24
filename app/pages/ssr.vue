<script setup lang="ts">
const nuxtApp = useNuxtApp();
const {
    data: userData,
    status,
    error,
    refresh,
} = await useFetch("/api/appwrite/user", {
    getCachedData(key) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
});
</script>

<template>
    <section class="py-32">
        <UContainer class="max-w-(--breakpoint-sm) mx-auto">
            <UCard>
                <template #header>
                    <div
                        class="grid grid-rows-1 grid-cols-[min-content_1fr] gap-0 h-full"
                    >
                        <div class="col-span-1 min-content pr-4">
                            <UAvatar
                                v-if="status === 'pending'"
                                icon="i-heroicons-photo"
                                size="3xl"
                                :ui="{
                                    icon: {
                                        base: 'text-pink-400 dark:text-pink-400',
                                    },
                                }"
                            />
                            <UAvatar
                                v-else-if="error"
                                icon="i-heroicons-photo"
                                size="3xl"
                            />
                            <UAvatar
                                v-else
                                :alt="data?.user?.name"
                                size="3xl"
                            />
                        </div>

                        <div class="col-span-1 flex flex-col justify-center">
                            <p>Willkommen</p>
                            <p class="text-2xl font-bold">Dein Profil</p>
                        </div>
                    </div>
                </template>

                <template v-if="status === 'pending'"
                    ><p>Laden...</p>
                    <ProfileSkeleton
                /></template>

                <template v-else-if="status === 'error'">
                    <UTooltip
                        :text="error.statusCode + ' – ' + error.statusMessage"
                    >
                        <p>
                            Du bist nicht eingeloggt. Bitte melde dich an oder
                            registriere dich, um dein Profil zu sehen.
                        </p>
                    </UTooltip>
                </template>

                <template v-else-if="status === 'success'">
                    <pre>Moin {{ userData?.user?.name || "Fehler User" }}</pre>
                    <pre>{{ userData }}</pre>
                </template>

                <template v-else>
                    <p>Keine Daten gefunden</p>
                </template>

                <template #footer>
                    <div class="flex justify-end space-x-2">
                        <UButton v-if="!error" variant="ghost" @click="refresh"
                            >Refresh</UButton
                        >
                    </div>
                </template>
            </UCard>
        </UContainer>
    </section>
</template>
