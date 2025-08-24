<script setup lang="ts">
const links = [
    {
        label: "Konto",
        to: "/profile",
    },
    {
        label: "Einstellungen",
        to: "/profile/settings",
    },
];
</script>

<template>
    <UHorizontalNavigation :links="links">
        <template #default="{ link }">
            <span class="group-hover:text-primary relative">{{
                link.label
            }}</span>
        </template>
    </UHorizontalNavigation>
</template>
