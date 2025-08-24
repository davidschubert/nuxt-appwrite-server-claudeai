<template>
    <div class="min-h-screen flex flex-col">
        <header
            class="z-50 sticky top-0 w-full border-b border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900"
        >
            <Navigation />
        </header>

        <main class="grow">
            <slot />
        </main>

        <AppFooter />
    </div>
</template>
