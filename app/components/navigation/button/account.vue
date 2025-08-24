<template>
    <nav>
        <ul class="flex space-x-4">
            <template v-if="!!isAuthenticated">
                <li><ProfileAvatar /></li>
                <li>
                    <UButton variant="ghost" to="/account/profile"
                        >Profile</UButton
                    >
                </li>
                <li>
                    <UButton variant="soft" @click="handleLogout"
                        >Logout</UButton
                    >
                </li>
            </template>
            <template v-else>
                <li>
                    <UButton variant="ghost" to="/account/login">Login</UButton>
                </li>
                <!--<li>
                    <UButton to="/account/signup">Register</UButton>
                </li>-->
            </template>
        </ul>
    </nav>
    <template v-if="!!isAuthenticated">
        <UBadge
            color="green"
            variant="soft"
            size="xs"
            :ui="{ rounded: 'rounded-full' }"
            class="uppercase"
            >Online</UBadge
        >
    </template>
    <template v-else>
        <UBadge
            color="red"
            variant="soft"
            size="xs"
            :ui="{ rounded: 'rounded-full' }"
            class="uppercase"
            >Offline</UBadge
        >
    </template>
</template>

<script setup>
const auth2Store = useAuth2Store();
const { isAuthenticated } = storeToRefs(auth2Store);

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
