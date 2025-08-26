<script setup lang="ts">
const items = [
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
    <UNavigationMenu 
        highlight 
        highlight-color="primary" 
        orientation="horizontal" 
        :items="items" 
        class="data-[orientation=horizontal]:border-b border-default data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-48"
    />
</template>
