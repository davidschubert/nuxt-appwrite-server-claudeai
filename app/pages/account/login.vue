<template>
    <div>
        <UCard>
            <template #header>
                <h1 class="text-2xl font-bold">Login</h1>
            </template>

            <ClientOnly>
                <UForm
                    :schema="schema"
                    :state="state"
                    class="space-y-4"
                    @submit.prevent="onSubmit"
                >
                    <UFormField
                        label="Deine E-Mail-Adresse"
                        name="email"
                        required
                        v-slot="{ error }"
                    >
                        <UInput
                            v-model.trim="state.email"
                            type="email"
                            autocomplete="email"
                            icon="i-heroicons-envelope"
                            :trailing-icon="
                                error
                                    ? 'i-heroicons-exclamation-triangle-20-solid'
                                    : undefined
                            "
                        />
                    </UFormField>
                    <UFormField label="Dein Passwort" name="password" required>
                        <UInput
                            v-model.trim="state.password"
                            type="password"
                            autocomplete="current-password"
                            icon="i-heroicons-lock-closed"
                        />
                    </UFormField>
                    <p>
                        <ULink
                            to="/account/signup"
                            active-class="text-primary"
                            inactive-class="text-neutral-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm"
                        >
                            Passwort vergessen?
                        </ULink>
                    </p>
                    <UButton type="submit" color="primary" :loading="loading"
                        >Einloggen</UButton
                    >
                </UForm>
            </ClientOnly>

            <template #footer>
                <p class="text-sm">
                    Du hast noch keinen Account?
                    <ULink
                        to="/account/signup"
                        active-class="text-primary"
                        inactive-class="text-neutral-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                        Jetzt erstellen
                    </ULink>
                </p>
            </template>
        </UCard>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ["appwrite-already-authed"],
    layout: "onboarding",
});

import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const authStore = useAuthStore();
const toast = useToast();

const schema = z.object({
    email: z
        .string({
            required_error: "Bitte gebe deine E-Mail-Adresse ein.",
        })
        .email("Ungültige E-Mail-Adresse."),
    password: z
        .string({
            required_error: "Bitte gebe dein Passwort ein.",
        })
        .min(8, "Das Passwort muss mindestens 8 Zeichen lang sein."),
});

type Schema = z.output<typeof schema>;

const state = reactive({
    email: undefined,
    password: undefined,
});

const loading = ref(false);

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
    console.log("%c(login.vue) Attempting login", "color: lime;");
    console.log("%c(login.vue) Login data:", "color: lime;", event.data);

    loading.value = true;
    try {
        await authStore.login(event.data);

        if (authStore.isAuthenticated) {
            await authStore.getUser();
            toast.add({
                title: "Erfolg",
                description: "Login erfolgreich!",
                color: "success",
            });

            await navigateTo("/account/profile");
        } else {
            toast.add({
                title: "Login Fehler",
                description:
                    "Bitte überprüfe die E-Mail-Adresse und das Passwort!",
                color: "error",
            });
        }
    } catch (error) {
        console.error("(login.vue) Login-Fehler:", error);

        toast.add({
            title: "Login Fehler",
            description: "Bitte überprüfe die E-Mail-Adresse und das Passwort.",
            color: "error",
        });
    } finally {
        loading.value = false;
    }
};
</script>
