<template>
    <div class="space-x-2 flex items-center">
        <UButton variant="ghost" to="/account/login">Login</UButton>
        <UButton variant="ghost" to="/account/profile">Protected Profile</UButton>
        <template v-if="isAuthenticated">
            <UBadge
                color="success"
                variant="soft"
                size="xs"
                :ui="{ base: 'rounded-full' }"
                class="uppercase"
                >On</UBadge
            >
        </template>
        <template v-else>
            <UBadge
                color="error"
                variant="soft"
                size="xs"
                :ui="{ base: 'rounded-full' }"
                class="uppercase"
                >Off</UBadge
            >
        </template>
    </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);
</script>
