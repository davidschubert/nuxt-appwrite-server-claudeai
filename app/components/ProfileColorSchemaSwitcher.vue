<script setup lang="ts">
const theme = [
    {
        name: "Hell",
        value: "light",
    },
    {
        name: "Dunkel",
        value: "dark",
    },
    {
        name: "Automatisch",
        value: "system",
    },
];
</script>

<template>
    <ClientOnly>
        <ColorScheme>
            <USelect
                id="color-mode"
                v-model="$colorMode.preference"
                :options="theme"
                option-attribute="name"
            />
        </ColorScheme>
    </ClientOnly>
</template>
