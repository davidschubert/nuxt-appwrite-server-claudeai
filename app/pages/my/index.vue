<template>
    <div class="container">
        <div class="space-y-4">
            <h1 class="text-4xl font-bold text-primary">Login</h1>
            <p>
                Sign in to see your
                <NuxtLink to="/my/profile">protected profile</NuxtLink>.
            </p>
            <UButton @click="signIn" color="primary">Sign In</UButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: ["already-auth"],
});

const userStore = useUserStore();
const toast = useToast();

// Wenn die Seite neu geladen wird, wird geprüft, ob eine Toast-Nachricht im Local Storage gespeichert ist
if (process.client) {
    const savedToast = localStorage.getItem("logoutToast");
    if (savedToast) {
        toast.add({
            title: "Logout erfolgreich",
            description: "Du hast dich erfolgreich ausgeloggt!",
            color: "green",
        });

        // Toast-Nachricht aus dem Local Storage entfernen
        localStorage.removeItem("logoutToast");
    }
}

const signIn = async () => {
    await userStore.signIn({
        username: "emilys",
        password: "emilyspass",
    });

    toast.add({
        avatar: {
            src:
                userStore.myUser.image ||
                "https://avatars.githubusercontent.com/u/739984?v=4",
        },
        title: "Login erfolgreich",
        description: "Herzlich willkommen " + userStore.myUser.firstName,
        color: "green",
    });

    await navigateTo("/my/profile");
};
</script>
