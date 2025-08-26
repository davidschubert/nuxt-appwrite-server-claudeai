<template>
    <UButton
        @click="handleLogout"
        icon="i-heroicons-arrow-right-end-on-rectangle"
        size="sm"
        color="primary"
        square
        variant="soft"
    />
</template>

<script setup lang="ts">
const authStore = useAuthStore();

const handleLogout = async () => {
    await authStore.logout();

    localStorage.setItem(
        "logoutToast",
        JSON.stringify({
            title: "Logout erfolgreich",
            description: "Du hast dich erfolgreich ausgeloggt!",
            color: "success",
        })
    );

    useRouter().go(0);
};
</script>
