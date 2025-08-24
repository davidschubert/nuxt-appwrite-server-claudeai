<template>
    <section class="border-b border-gray-200 dark:border-gray-800 pt-16">
        <UContainer
            class="grid grid-rows-1 grid-cols-[min-content_1fr] gap-0 h-full"
        >
            <div class="col-span-1 min-content pr-4">
                <UAvatar
                    v-if="auth2Store.isLoading"
                    icon="i-heroicons-photo"
                    size="3xl"
                    :ui="{
                        icon: {
                            base: 'text-pink-400 dark:text-pink-400',
                        },
                    }"
                />
                <UAvatar
                    v-else-if="auth2Store.isAuthenticated"
                    :alt="auth2Store.user?.name"
                    size="3xl"
                />
                <UAvatar v-else icon="i-heroicons-photo" size="3xl" />
            </div>

            <div class="col-span-1 flex flex-col justify-center">
                <p>Willkommen</p>
                <p class="text-2xl font-bold">
                    {{ auth2Store.user?.name || "Dein Profil" }}
                </p>
            </div>
        </UContainer>
        <UContainer><ProfileHeadernavigation /></UContainer>
    </section>
</template>

<script lang="ts" setup>
const auth2Store = useAuth2Store();
</script>
