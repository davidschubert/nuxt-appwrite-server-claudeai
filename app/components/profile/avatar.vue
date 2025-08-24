<script setup lang="ts">
const auth2Store = useAuth2Store();

const userName = computed(() => auth2Store.user?.name ?? "User");
const profileLinkLabel = computed(() => `View profile of ${userName.value}`);
</script>

<template>
    <NuxtLink
        v-if="auth2Store.isAuthenticated && auth2Store.user"
        to="/account/profile"
        :aria-label="profileLinkLabel"
    >
        <UAvatar
            :alt="userName"
            size="sm"
            class="hover:ring-2 hover:ring-primary-500 transition-all duration-300"
        />
    </NuxtLink>
</template>
