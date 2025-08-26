<script setup lang="ts">
const authStore = useAuthStore();

const userName = computed(() => authStore.user?.name ?? "User");
const profileLinkLabel = computed(() => `View profile of ${userName.value}`);
</script>

<template>
    <NuxtLink
        v-if="authStore.isAuthenticated && authStore.user"
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
