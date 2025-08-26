<script lang="ts" setup>
definePageMeta({
    middleware: ["appwrite-auth-protected"],
    title: "Protected Page",
    description: "Protected Page",
});

const authStore = useAuthStore();
</script>

<template>
    <section class="py-32">
        <UContainer>
            <h1 class="text-xl mb-4">Protected Page with Pinia Auth</h1>
            <ClientOnly>
                <template v-if="authStore.isLoading">
                    <p>Loading...</p>
                </template>

                <template v-else-if="authStore.isAuthenticated">
                    <p>Du bist eingeloggt.</p>
                    <br />
                    <pre>{{ authStore.user }}</pre>
                </template>

                <template v-else>
                    <p>You are not signed in.</p>
                </template>
            </ClientOnly>
        </UContainer>
    </section>
</template>
