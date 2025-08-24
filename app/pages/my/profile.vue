<template>
    <div class="container font-sans">
        <div class="space-y-4">
            <h1 class="text-4xl font-bold text-primary">
                Protected Profile
            </h1>
            <p>Du bist eingeloggt und in einem abgesicherten Bereich.</p>
            <UButton @click="signOut" color="primary">Sign Out</UButton>
            <pre>{{ userStore.myUser }}</pre>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: ["protect-auth"],
});

const userStore = useUserStore();

const signOut = async () => {
    await userStore.signOut();

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
