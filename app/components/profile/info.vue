<template>
    <div class="space-y-2">
        <ProfileInfoItem
            v-for="item in userInfoItems"
            :key="item.label"
            v-bind="item"
        />
    </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Nicht verfügbar";
    return new Date(dateString).toLocaleString();
};

const userInfoItems = computed(() => {
    const user = authStore.user;
    if (!user) return [];

    return [
        { label: "Name", value: user.name || "Nicht angegeben" },
        { label: "E-Mail", value: user.email || "Nicht angegeben" },
        { label: "User ID", value: user.$id || "Nicht angegeben" },
        { label: "Erstellt am", value: formatDate(user.$createdAt.toString()) },
        {
            label: "Zuletzt aktualisiert",
            value: formatDate(user.$updatedAt.toString()),
        },
        {
            label: "Registrierung",
            value: formatDate(user.registration.toString()),
        },
        {
            label: "Letzter Login",
            value: formatDate(user.accessedAt.toString()),
        },
        { label: "Labels", value: user.labels?.join(", ") || "Keine" },
        { label: "Telefon", value: user.phone || "Nicht angegeben" },
        {
            label: "E-Mail verifiziert",
            value: user.emailVerification ? "Ja" : "Nein",
        },
        {
            label: "Telefon verifiziert",
            value: user.phoneVerification ? "Ja" : "Nein",
        },
        { label: "MFA aktiviert", value: user.mfa ? "Ja" : "Nein" },
        {
            label: "Präferenzen",
            value: user.prefs ? JSON.stringify(user.prefs) : "Keine",
        },
    ];
});
</script>
