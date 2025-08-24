<template>
    <ProfileHeader />
    <section class="py-16">
        <UContainer class="space-y-8">
            <h1 class="text-2xl font-bold">Settings</h1>
            <UCard>
                <template #header>
                    <h2 class="text-xl font-bold">Erscheinungsbild</h2>
                </template>
                <div class="flex justify-between items-center">
                    <ProfileColorSchemaSwitcher />
                    <ProfileColorMode />
                </div>
            </UCard>
            <UCard>
                <template #header>
                    <h2 class="text-xl font-bold">Akzentfarbe</h2>
                </template>

                <div>
                    <div class="space-x-3">
                        <UButton
                            v-for="primaryColor in availablePrimaryColors"
                            :key="primaryColor"
                            :color="toUiColor(primaryColor)"
                            @click="changeAppConfigPrimaryColor(primaryColor)"
                            square
                            size="xl"
                            icon="i-heroicons-paint-brush-solid"
                            variant="soft"
                        />
                    </div>
                </div>

                <template #footer>
                    <p class="text-primary capitalize">
                        {{ appConfig.ui.colors.primary }}
                    </p>
                </template>
            </UCard>
            <UCard>
                <template #header>
                    <h2 class="text-xl font-bold">Hintergrundfarbe</h2>
                </template>
                <div>
                    <div class="space-x-3">
                        <UButton
                            v-for="grayColor in availableGrayColors"
                            :key="grayColor"
                            @click="changeAppConfigGrayColor(grayColor)"
                            icon="i-heroicons-paint-brush-solid"
                            :label="grayColor"
                            variant="solid"
                            color="neutral"
                            class="capitalize"
                        />
                    </div>
                </div>

                <template #footer>
                    <p class="text-gray-500 capitalize">
                        {{ appConfig.ui.colors.neutral }}
                    </p>
                </template>
            </UCard>
        </UContainer>
    </section>
</template>

<script lang="ts" setup>
import { useSettingsStore } from "~/stores/settings";
const settingsStore = useSettingsStore();
const appConfig = useAppConfig();

// Helper, um Nuxt UI Farbtokens in der Template-Typisierung zuzulassen
const toUiColor = (c: string) => c as any;

const availablePrimaryColors = [
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
    "fleava-green-mist",
    "fleava-frangipani",
    "fleava-flesh",
    "fleava-wax-flower",
    "fleava-tropical-blue",
    "fleava-parchment",
    "fleava-bone",
    "fleava-just-right",
    "fleava-malta",
    "fleava-silver-chalice",
    "fleava-navajo-white",
    "fleava-moon-raker",
    "fleava-steel-gray",
    "fleava-mirage",
    "fleava-heavy-metal",
    "fleava-log-cabin",
    "fleava-rangoon-green",
    "fleava-mine-shaft",
    "fleava-masala",
    "fleava-shark",
    "fleava-zeus",
    "fleava-oil",
    "fleava-blue-whale",
    "fleava-woodsmoke",
    "fleava-mine-shaft",
    "fleava-birch",
    "fleava-heavy-metal",
    "fleava-pancho",
];

const availableGrayColors = ["slate", "cool", "zinc", "neutral", "stone"];

const changeAppConfigPrimaryColor = (primaryColor: string) => {
    // @ts-ignore runtime field
    appConfig.ui.colors.primary = primaryColor;
    settingsStore.changeColor(primaryColor);
};

const changeAppConfigGrayColor = (grayColor: string) => {
    // @ts-ignore runtime field
    appConfig.ui.colors.neutral = grayColor;
    settingsStore.changeGrayColor(grayColor);
};
</script>
