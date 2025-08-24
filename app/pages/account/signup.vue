<template>
    <div>
        <UCard>
            <template #header>
                <h1 class="text-2xl font-bold">Richte dein Account ein</h1>
            </template>

            <ClientOnly>
                <UForm
                    :schema="schema"
                    :state="state"
                    @submit.prevent="onSubmit"
                >
                    <UFormGroup
                        label="Name"
                        name="name"
                        class="mb-4"
                        hint="Optional"
                        v-slot="{ error }"
                    >
                        <UInput
                            v-model="state.name"
                            autocomplete="name"
                            icon="i-heroicons-user"
                            :trailing-icon="
                                error
                                    ? 'i-heroicons-exclamation-triangle-20-solid'
                                    : undefined
                            "
                        />
                    </UFormGroup>
                    <UFormGroup
                        label="E-Mail"
                        name="email"
                        class="mb-4"
                        required
                        v-slot="{ error }"
                    >
                        <UInput
                            v-model="state.email"
                            type="email"
                            autocomplete="email"
                            icon="i-heroicons-envelope"
                            :trailing-icon="
                                error
                                    ? 'i-heroicons-exclamation-triangle-20-solid'
                                    : undefined
                            "
                        />
                    </UFormGroup>
                    <UFormGroup
                        label="Passwort"
                        name="password"
                        class="mb-4"
                        required
                        help="Das Passwort muss mindestens 8 Zeichen lang sein."
                        v-slot="{ error }"
                    >
                        <UInput
                            v-model="state.password"
                            type="password"
                            autocomplete="new-password"
                            icon="i-heroicons-lock-closed"
                            :trailing-icon="
                                error
                                    ? 'i-heroicons-exclamation-triangle-20-solid'
                                    : undefined
                            "
                        />
                    </UFormGroup>
                    <UButton type="submit" color="primary" :loading="loading"
                        >Registrieren</UButton
                    >
                </UForm>
            </ClientOnly>

            <template #footer>
                <p class="text-sm">
                    Du hast bereits ein Account?
                    <ULink
                        to="/account/login"
                        active-class="text-primary"
                        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                        Einloggen
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
    name: z
        .string({
            required_error: "Bitte gebe deinen Namen ein.",
        })
        .min(3, "Name muss mindestens 3 Zeichen lang sein."),
    email: z
        .string({
            required_error: "Bitte gebe deine E-Mail-Adresse ein.",
        })
        .email("Ungültige E-Mail-Adresse."),
    password: z
        .string({
            required_error:
                "Bitte gebe ein Passwort mit mindestens 8 Zeichen ein.",
        })
        .min(8, "Das Passwort muss mindestens 8 Zeichen lang sein."),
});

type Schema = z.output<typeof schema>;

const state = reactive({
    name: undefined,
    email: undefined,
    password: undefined,
});

const loading = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
    loading.value = true;

    try {
        const response = await $fetch("/api/appwrite/signup", {
            method: "POST",
            body: event.data,
        });

        if (response.success) {
            await authStore.checkAuth();

            toast.add({
                title: "Erfolg",
                description: "Registrierung war erfolgreich!",
                color: "green",
            });

            await navigateTo("/profile");
        } else {
            throw new Error("(signup.vue) Registrierung fehlgeschlagen.");
        }
    } catch (error) {
        if (
            error?.message?.includes(
                "A user with the same id, email, or phone already exists in this project"
            )
        ) {
            console.error("Registrierungsfehler:", error);

            toast.add({
                title: "Fehler",
                description:
                    "Ein Benutzer mit dieser E-Mail-Adresse existiert bereits. Bitte verwenden Sie eine andere E-Mail-Adresse oder versuchen Sie sich anzumelden.",
                color: "red",
            });
        } else {
            console.error("Registrierungsfehler:", error);

            toast.add({
                title: "Fehler",
                description: "Registrierung fehlgeschlagen.",
                color: "red",
            });
        }
    } finally {
        loading.value = false;
    }
}
</script>
