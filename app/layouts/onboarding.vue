<template>
    <header
        class="z-50 sticky top-0 w-full border-b border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900"
    >
        <NavigationSimple />
    </header>
    <main class="container mx-auto px-4 py-8">
        <UContainer class="max-w-(--breakpoint-sm) mx-auto">
            <slot />
        </UContainer>
    </main>
</template>
