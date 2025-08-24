<script setup lang="ts">
const auth2Store = useAuth2Store();
const { isAuthenticated } = storeToRefs(auth2Store);
</script>

<template>
    <nav class="container mx-auto px-4 py-6 flex justify-between items-center">
        <div class="space-x-2 flex items-center justify-center">
            <ULink
                to="/"
                class="text-2xl mr-6"
                active-class="text-primary"
                inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
                Hawaii Studio
            </ULink>
            <UButton variant="ghost" to="/profile">Profile Pinia</UButton>
            <UButton variant="ghost" to="/ssr">Profile SSR</UButton>
            <UButton variant="ghost" to="/orders">Orders SSR</UButton>

            <template v-if="!!isAuthenticated">
                <UButton
                    variant="ghost"
                    to="/protected"
                    color="green"
                    icon="i-heroicons-lock-open-solid"
                    trailing
                    >Protected</UButton
                >
            </template>
            <template v-else>
                <UButton
                    variant="ghost"
                    to="/protected"
                    color="red"
                    icon="i-heroicons-lock-closed-solid"
                    trailing
                    >Protected</UButton
                >
            </template>

            <UButton
                variant="ghost"
                to="/playground/chatgpt"
                icon="i-heroicons-chat-bubble-oval-left-solid"
                trailing
                >Chat</UButton
            >
        </div>
        <div class="space-x-3 flex items-center">
            <!--<NavigationButtonMy />-->
            <NavigationButtonSettings />
            <NavigationButtonAccount />
        </div>
    </nav>
</template>
