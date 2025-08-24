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
const auth2Store = useAuth2Store();

const handleLogout = async () => {
    await auth2Store.logout();

    localStorage.setItem(
        "logoutToast",
        JSON.stringify({
            title: "Logout erfolgreich",
            description: "Du hast dich erfolgreich ausgeloggt!",
            color: "green",
        })
    );

    useRouter().go(0);
};
</script>
