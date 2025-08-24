<script lang="ts" setup>
definePageMeta({
    middleware: ["appwrite-auth-protected"],
    title: "Protected Page",
    description: "Protected Page",
});

const auth2Store = useAuth2Store();
</script>

<template>
    <section class="py-32">
        <UContainer>
            <h1 class="text-xl mb-4">Protected Page with Pinia Auth</h1>
            <ClientOnly>
                <template v-if="auth2Store.isLoading">
                    <p>Loading...</p>
                </template>

                <template v-else-if="auth2Store.isAuthenticated">
                    <p>Du bist eingeloggt.</p>
                    <br />
                    <pre>{{ auth2Store.user }}</pre>
                </template>

                <template v-else>
                    <p>You are not signed in.</p>
                </template>
            </ClientOnly>
        </UContainer>
    </section>
</template>
