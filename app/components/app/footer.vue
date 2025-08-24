<template>
    <div class="bg-primary-50 dark:bg-primary-950 py-16">
        <UContainer class="space-y-12">
            <AppBreadcrumb />
            <div class="flex justify-between space-x-6">
                <div class="flex-1 bg-primary-900 text-center p-6">
                    <UButton
                        icon="i-heroicons-face-smile"
                        color="primary"
                        square
                        variant="solid"
                        to="/x"
                        target="_blank"
                        size="xl"
                    />
                </div>
                <div class="flex-1 bg-primary-900 text-center p-6">
                    <UButton
                        variant="solid"
                        color="primary"
                        to="/youtube"
                        target="_blank"
                        size="xl"
                        >YouTube</UButton
                    >
                </div>
                <div class="flex-1 bg-primary-900 text-center p-6">
                    <UButton
                        variant="solid"
                        color="primary"
                        to="/linkedin"
                        target="_blank"
                        size="xl"
                        >LinkedIn</UButton
                    >
                </div>
                <div class="flex-1 bg-primary-900 text-center p-6">
                    <UButton
                        variant="solid"
                        color="primary"
                        to="/github"
                        target="_blank"
                        size="xl"
                        >GitHub</UButton
                    >
                </div>
                <div class="flex-1 bg-primary-900 text-center p-6">
                    <UButton
                        variant="solid"
                        color="primary"
                        to="/instagram"
                        target="_blank"
                        size="xl"
                        >Instagram</UButton
                    >
                </div>
                <div class="flex-1 bg-primary-900 text-center p-6">
                    <UButton
                        variant="solid"
                        color="primary"
                        to="/facebook"
                        target="_blank"
                        size="xl"
                        >Facebook</UButton
                    >
                </div>
                <div class="flex-1 bg-primary-900 text-center p-6">
                    <UButton
                        variant="solid"
                        color="primary"
                        to="/discord"
                        target="_blank"
                        size="xl"
                        >Discord</UButton
                    >
                </div>
            </div>
            <div class="flex">Navigation</div>
            <div class="flex justify-between items-center md:flex-row flex-col">
                <p>© 2024 by David Schubert</p>
                <ul class="flex space-x-6 items-baseline">
                    <li>
                        <UChip color="success" inset>
                            <UButton
                                variant="ghost"
                                color="primary"
                                to="https://status.davidschubert.com"
                                target="_blank"
                            >
                                Status
                            </UButton>
                        </UChip>
                    </li>
                    <li>
                        <ULink
                            to="/imprint"
                            active-class="text-primary"
                            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        >
                            Impressum
                        </ULink>
                    </li>
                    <li>
                        <ULink
                            to="/datenschutz"
                            active-class="text-primary"
                            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        >
                            Datenschutz
                        </ULink>
                    </li>
                    <li>
                        <ULink
                            to="/cookies"
                            active-class="text-primary"
                            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        >
                            Cookies
                        </ULink>
                    </li>
                </ul>
            </div>
        </UContainer>
    </div>
</template>

<script lang="ts" setup></script>
